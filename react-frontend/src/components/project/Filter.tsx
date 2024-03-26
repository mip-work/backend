import { Dispatch, lazy, SetStateAction, Suspense as S, useState } from "react";
import { APIERROR, Issue, Issues } from "../../api/apiTypes";
import { Navigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setIssueQuery } from "../../store/slices/querySlice";
import Avatar from "../util/Avatar";
import toast from "react-hot-toast";
import { useMember } from "../../hooks/useMember";
import { useProject } from "../../hooks/useProject";
import { useUser } from "../../hooks/useUser";
const IssueModelHOC = lazy(() => import("../issue/IssueModelHOC"));
const CreateIssueModal = lazy(() => import("../issue/CreateIssueModal"));

interface Props {
  setIsDragDisabled: Dispatch<SetStateAction<boolean>>;
  projectId: string | undefined;
  isEmpty: boolean;
  issues?: any;
}

function Filter({ projectId, isEmpty, setIsDragDisabled, issues }: Props) {
  const { useGetAllMembers } = useMember();
  const { useGetAllProjects } = useProject();
  const { data: dataMember } = useGetAllMembers(projectId);
  const { data: dataProject } = useGetAllProjects();

  const { useGetUser } = useUser();
  const { data: u } = useGetUser();
  const { userId: uid } = useAppSelector((s) => s.query.issue);
  const [on, setOn] = useState(false);
  const dispatch = useAppDispatch();
  const [fold, setFold] = useState(true);
  const len = dataMember?.data.data.length;
  const [searchIssue, setSearchIssue] = useState<string | any>();
  const [isActive, setIsActive] = useState<boolean>(false);

  if (dataMember?.status === 401) return <Navigate to="/login" />;

  const handleClick = () => {
    if (isEmpty) return toast.error("Please create a list first!");
    setOn(true);
  };

  const handleSetQuery = (query: { userId?: number }) => () => {
    dispatch(setIssueQuery(query));
    setIsDragDisabled(!!query.userId);
  };

  const handleSearched = (query: { issueSearched?: string }) => () => {
    dispatch(setIssueQuery(query));
    setIsDragDisabled(!!query.issueSearched);
  };

  const searchIssues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchIssue(e.target.value.toLowerCase());

    let filteredTasks: Issue[] = [];
    if (issues) {
      for (const issue of Object.values(issues || {})) {
        const filteredIssue = issue?.filter((item: any) =>
          item?.summary.toLowerCase().includes(searchIssue)
        );
        filteredTasks = [...filteredTasks, ...filteredIssue];
      }
    }

    if (!searchIssue) {
      handleSearched({})();
    } else {
      handleSearched({ issueSearched: filteredTasks[0]?.summary })();
    }
  };

  const handleSearchBlur = () => {
    setIsActive(false);

    if (!searchIssue) {
      handleSearched({})();
    } else {
      setIsActive(true);
    }
  };

  const handleClearSearch = () => {
    setSearchIssue("");
    handleSearched({})();
  };

  return (
    <div className="mb-8 flex min-w-fit items-center text-c-5">
      <div className="relative">
        <input
          placeholder="Search issues"
          className="w-44 rounded-sm border-[1.5px] bg-transparent py-[5px] pl-9 pr-2.5 text-sm outline-none focus:border-chakra-blue"
          onChange={(e) => searchIssues(e)}
          onClick={() => setIsActive(true)}
          value={searchIssue}
          onBlur={handleSearchBlur}
        />
        {isActive && (
          <Icon
            width={20}
            icon="ant-design:close-outlined"
            className="absolute right-2 top-[6px] w-[19px] cursor-pointer"
            onClick={handleClearSearch}
            onMouseDown={(e) => e.preventDefault()}
          />
        )}
        <Icon
          width={20}
          icon="ant-design:search-outlined"
          className="absolute left-2 top-[6px] w-[19px]"
        />
      </div>
      {dataMember && len && (
        <div className="ml-7 mr-1 flex">
          {(len > 4 && fold
            ? dataMember.data.data.slice(0, 4)
            : dataMember.data.data
          ).map(({ profileUrl, username, userId }: any, i: number) => (
            <Avatar
              key={userId}
              src={profileUrl}
              name={username}
              style={{ zIndex: len - i }}
              onClick={handleSetQuery({ userId })}
              className={`-ml-2 h-11 w-11 border-2 duration-300 hover:-translate-y-2 ${
                userId === uid ? "border-blue-500" : ""
              }`}
            />
          ))}
          {len > 4 && fold && (
            <button
              onClick={() => setFold(false)}
              className="-ml-2 grid h-11 w-11 items-center rounded-full bg-c-2 pl-2 hover:bg-c-3"
            >
              {len - 4}+
            </button>
          )}
        </div>
      )}
      {u && (
        <button
          className="btn-crystal shrink-0"
          onClick={handleSetQuery({ userId: u?.data.id })}
        >
          Only my issues
        </button>
      )}
      {uid && (
        <>
          <div className="pb-[2px]">|</div>
          <button className="btn-crystal shrink-0" onClick={handleSetQuery({})}>
            Clear all
          </button>
        </>
      )}
      <button onClick={handleClick} className="btn peer relative mx-5 shrink-0">
        Create an issue
      </button>
      {dataProject && dataProject.data.repo && (
        <button
          title="go to github"
          onClick={() => window.open(dataProject.data.repo as string, "_blank")}
          className="ml-auto flex shrink-0 items-center gap-2 rounded-[3px] bg-c-2 px-3 py-1 hover:bg-c-6"
        >
          <Icon icon="bxl:github" />
          GitHub Repo
        </button>
      )}
      {on && !isEmpty && (
        <S>
          <IssueModelHOC
            children={CreateIssueModal}
            onClose={() => setOn(false)}
          />
        </S>
      )}
    </div>
  );
}

export default Filter;
