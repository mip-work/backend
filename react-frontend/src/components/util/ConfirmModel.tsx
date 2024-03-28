import { useState } from "react";
import toast from "react-hot-toast";
import Model from "./Model";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { IParamsRequestDeleteList } from "../../hooks/interfaces";
import { useList } from "../../hooks/useList";
import { useParams } from "react-router-dom";

interface Props {
  listId?: any;
  projectId?: any;
  parentId?: string;
  msg?: string;
  toastMsg?: any;
  onClose?: any;
  deleteList?: any;
  onSubmit?: any
}

const ConfirmModel = ({
  listId,
  parentId,
  projectId,
  deleteList,
  onClose,
  msg,
  toastMsg,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteList.mutateAsync({ projectId, listId });
      toast(toastMsg);
      onClose();
    } catch (error) {
      toast("Error!");
    }
  };

  return (
    <Model onClose={onClose} className="max-w-[18rem]">
      <>
        <span>Are you sure you want to {msg ?? "delete"}?</span>
        <div className="mt-8 flex justify-center gap-x-6">
          <button
            onClick={onClose}
            className="btn bg-transparent text-black hover:bg-green-100 active:bg-green-200"
          >
            cancel
          </button>
          <button
            onClick={handleDelete}
            className="btn bg-red-600 hover:bg-red-700"
          >
            {loading ? "proceeding ... " : "Delete"}
          </button>
        </div>
      </>
    </Model>
  );
};

export default ConfirmModel;
