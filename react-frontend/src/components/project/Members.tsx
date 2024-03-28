import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";
import Avatar from "../util/Avatar";
import { useMember } from "../../hooks/useMember";

const Members = () => {
  const projectId = useParams().projectId;
  const { useGetAllMembers } = useMember()
  const { data: members } = useGetAllMembers(projectId)


  function admin(admin: any) {
    if (admin) {
      return (
        <span className="rounded bg-slate-200 p-2 text-sm	font-semibold text-gray-500">
          Administrador
        </span>
      );
    }

    return (
      <span className="rounded bg-slate-200 p-2 text-sm	font-medium text-gray-500">
        Membro
      </span>
    );
  }

  return (
    <>
      <div className="z-10 h-screen min-h-fit grow overflow-auto bg-c-1 px-10 pb-10 pt-12 text-c-5">
        <div className="flex min-w-[43rem] justify-between">
          <span className="text-2xl font-semibold tracking-wide">
            Desktop Members
          </span>
        </div>
        <div className="mt-7">
          <div className="relative">
            <input
              placeholder="Search members"
              className="w-44 rounded-sm border-2 bg-transparent py-[5px] pl-9 pr-2 text-sm outline-none focus:border-chakra-blue"
            />
            <Icon
              width={20}
              icon="ant-design:search-outlined"
              className="absolute top-[6px] left-2 w-[19px]"
            />
          </div>
        </div>
        <hr className="my-5 border-t-[.5px] border-gray-300" />

        {members &&
          members.data.data.map(
            ({ id, userId, username, email, isAdmin, profileUrl }) => (
              <div key={id}>
                <div className="flex min-w-0 items-center justify-between gap-x-4">
                  <div className="flex items-center gap-4">
                    <Avatar key={userId} src={profileUrl} name={username} />
                    <div className="flex flex-col">
                      <span className="text-base font-semibold leading-6 text-gray-900">
                        {username}
                      </span>
                      <span className="text-sm leading-5 text-gray-700">
                        {email}
                      </span>
                    </div>
                  </div>
                  {admin(isAdmin)}
                </div>
                <hr className="my-3 border-t-[.5px] border-gray-300" />
              </div>
            )
          )}
      </div>
    </>
  );
};

export default Members;
