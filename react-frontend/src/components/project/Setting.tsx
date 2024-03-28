import { FieldError, FieldValues, useForm } from "react-hook-form";
import InputWithValidation from "../util/InputWithValidation";
import MemberInput from "./MemberInput";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import MembersDropdown from "./MemberDropdown";
import { useProject } from "../../hooks/useProject";
import { useMember } from "../../hooks/useMember";
import { useUser } from "../../hooks/useUser";

const Setting = () => {
  const projectId = useParams().projectId;
  const { useGetProjects, useUpdateProject } = useProject();
  const { data: project } = useGetProjects(projectId);
  const { useGetAllMembers } = useMember();
  const { data: members } = useGetAllMembers(projectId);
  const { useGetUser } = useUser();
  const { data: dataUser } = useGetUser();
  const updateProject = useUpdateProject();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!project || !members || !dataUser) return null;

  const { name, descr, repo } = project.data;

  const onSubmit = async (formData: FieldValues) => {
    try {
      if (
        formData.name === name &&
        formData.descr === descr &&
        formData.repo === repo
      )
        return;
      await updateProject.mutateAsync({
        projectId,
        body: { ...formData, userId: dataUser?.data.data.id },
      });
      toast("Project setting updated!");
    } catch (error) {
      toast("Error!");
      console.log(error);
    }
  };

  return (
    <div className="mt-10 px-5 sm:px-10">
      <h1 className="mb-4 text-xl font-semibold text-c-text">
        Project Setting
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-[30rem] flex-col gap-4"
      >
        <InputWithValidation
          defaultValue={name}
          label="Name"
          placeholder="project name"
          register={register("name", {
            required: { value: true, message: "name must not be empty" },
          })}
          error={errors.name as FieldError}
          darkEnabled
          /*readOnly={!isAdmin}*/
        />
        <InputWithValidation
          defaultValue={descr}
          label="Description"
          placeholder="project description"
          register={register("descr")}
          error={errors.descr as FieldError}
          darkEnabled
          /*readOnly={!isAdmin}*/
        />
        <InputWithValidation
          defaultValue={repo}
          label="Repository"
          placeholder="github repo link"
          register={register("repo")}
          error={errors.repo as FieldError}
          darkEnabled
          /*readOnly={!isAdmin}*/
        />
        <MemberInput
          members={members.data.data}
          projectId={projectId}
          // readOnly={!isAdmin}
        />
        {/* <MembersDropdown /> */}
        <div className="mt-2">
          {/* {!isAdmin && (
            <span className="block text-sm text-red-400">
              * Only Admin can edit the project setting *
            </span>
          )} */}
          <button
            className={`btn mt-3 ${"pointer-event-none cursor-not-allowed"}`}
          >
            {"Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
