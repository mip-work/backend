import { useReducer, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { APIERROR, CreateIssue } from "../../api/apiTypes";
import { useCreateIssueMutation } from "../../api/endpoints/issues.endpoint";
import DropDown from "../util/DropDown";
import WithLabel from "../util/WithLabel";
import Item from "../util/Item";
import Model from "../util/Model";
import type { IssueModalProps } from "./IssueModelHOC";
import TextInput from "./TextInput";
import toast from "react-hot-toast";
import { useIssue } from "../../hooks/useIssue";
import { useUser } from "../../hooks/useUser";

const reducer = (state: State, { type, value }: any): State => {
  switch (type) {
    case "type":
      return { ...state, type: value as number };
    case "summary":
      return { ...state, summary: value as string };
    case "descr":
      return { ...state, descr: value as string };
    case "assignee":
      return { ...state, assignees: value as number[] };
    case "priority":
      return { ...state, priority: value as number };
    case "progress":
      return { ...state, progress: value as number };
    case "listId":
      return { ...state, listId: value as StaticRange };
    default:
      return state;
  }
};

const CreateIssueModal = ({
  lists,
  members,
  types,
  priorities,
  onClose,
}: IssueModalProps) => {
  const projectId = useParams().projectId;
  const { useGetUser } = useUser();
  const { data: user } = useGetUser();
  const [form, dispatch] = useReducer(reducer, initial);
  const { priority, type, summary, descr, listId } = form;
  const { useCreateIssue } = useIssue();
  const createIssue = useCreateIssue();
  const [err, setErr] = useState("");

  if (!user?.data) return null;

  const handleCreateIssue = async () => {
    try {
      if (!form.summary) return setErr("summary must not be empty");
      if (!user?.data || form.summary.length > 100 || form.descr.length > 500)
        return;
      const body = {
        priority: Number(priority?.value),
        type: Number(type?.value),
        title: summary,
        descr,
        listId: listId?.id,
      };
      console.log(body)
      const { status } = await createIssue.mutateAsync({
        projectId,
        body,
      });
      if (status === 401) return <Navigate to="/login" />;
      toast("Created an issue!");
      onClose();
    } catch (error) {
      toast("Error!");
    }
  };

  return (
    <Model
      onSubmit={handleCreateIssue}
      {...{ onClose }}
      className="max-w-[35rem]"
    >
      <>
        <span className="text-[22px] font-[600] text-c-1">Create Issue</span>
        <WithLabel label="Issue type">
          <DropDown
            list={types}
            dispatch={dispatch}
            actionType="type"
            type="normal"
            className="w-full"
          />
        </WithLabel>

        <TextInput
          type="summary"
          label="Title"
          dispatch={dispatch}
          value={form.summary}
          max={100}
        />
        {err && <span className="-mb-3 block text-sm text-red-400">{err}</span>}
        <TextInput
          type="descr"
          label="Description"
          dispatch={dispatch}
          value={form.descr}
          max={500}
        />
        {members && (
          <>
            <WithLabel label="Reporter">
              <div className="rounded-sm bg-[#f4f5f7] px-3 py-[5px]">
                <Item
                  {...members.filter(
                    ({ value: v }) => v === user?.data.data.id
                  )[0]}
                  size="h-6 w-6"
                  variant="ROUND"
                />
              </div>
            </WithLabel>
            <WithLabel label="Assignee">
              <DropDown
                list={members}
                dispatch={dispatch}
                actionType="assignee"
                type="multiple"
                className="w-full"
              />
            </WithLabel>
          </>
        )}
        <WithLabel label="Priority">
          <DropDown
            list={priorities}
            dispatch={dispatch}
            actionType="priority"
            type="normal"
            className="w-full"
          />
        </WithLabel>
        {lists && (
          <WithLabel label="Status">
            <DropDown
              list={lists}
              dispatch={dispatch}
              actionType="listId"
              type="normal"
              className="w-full"
            />
          </WithLabel>
        )}
      </>
    </Model>
  );
};

export default CreateIssueModal;

export type T =
  | "type"
  | "summary"
  | "descr"
  | "assignee"
  | "priority"
  | "listId"
  | "progress";

export type A = { type: T; value: any };

const initial: State = {
  descr: "",
  summary: "",
  priority: 0,
  type: 0,
  progress: 0,
  reporterId: null,
  assignees: [],
  listId: null,
};

type State = Omit<any, "projectId">; // débito técnico ICreateIssue

