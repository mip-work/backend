import { FieldError, FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthUser } from "../../api/apiTypes";
import InputWithValidation from "../util/InputWithValidation";
import { useUser } from "../../hooks/useUser";

function UpdateProfile({ user }: { user: AuthUser }) {
  const { useUpdateUser } = useUser();
  const updateUser = useUpdateUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: loading },
  } = useForm();

  const handleUpdate = async (form: FieldValues) => {
    try {
      if (
        !user ||
        (form.username === user.username &&
          form.email === user.email &&
          form.profileUrl === user.profileUrl)
      )
        return;
      const { username, email } = form;
      await updateUser.mutateAsync({ username, email });
      toast("Updated profile!");
    } catch (error) {
      toast("Error!");
    }
  };
  return (
    <>
      <div className="flex w-[16.5rem] flex-col gap-4">
        <InputWithValidation
          label="Username"
          placeholder="username"
          defaultValue={user.username}
          register={register("username", {
            required: { value: true, message: "username must not be empty" },
          })}
          error={errors.username as FieldError}
          darkEnabled
        />
        <InputWithValidation
          label="Email"
          placeholder="email"
          defaultValue={user.email}
          register={register("email", {
            required: { value: true, message: "username must not be empty" },
          })}
          error={errors.email as FieldError}
          readOnly
          darkEnabled
        />
        <InputWithValidation
          label="Photo Url"
          placeholder="profile picture"
          defaultValue={user.profileUrl}
          register={register("profileUrl")}
          error={errors.profileUrl as FieldError}
          darkEnabled
        />
      </div>
      <button onClick={handleSubmit(handleUpdate)} className="btn mt-10 w-full">
        {loading ? "saving ..." : "Save Changes"}
      </button>
    </>
  );
}

export default UpdateProfile;
