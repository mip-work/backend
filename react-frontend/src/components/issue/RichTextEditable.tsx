import { useState } from "react";
import RTAutosize from "react-textarea-autosize";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UpdateIssueType } from "../../api/apiTypes";
import WithLabel from "../util/WithLabel";
import type { DispatchMiddleware } from "./IssueDetailModal";

interface Props {
  type: UpdateIssueType;
  label?: string;
  placeholder?: string;
  defaultValue: string;
  className?: string;
  isRequired?: boolean;
  max: number;
  apiFunc: (data: DispatchMiddleware) => void;
}

const RichTextEditable = (props: Props) => {
  const {
    type,
    label,
    defaultValue: dv,
    placeholder,
    apiFunc,
    className,
    isRequired,
    max,
  } = props;
  const [value, setValue] = useState(dv ?? "");

  const handleSave = () => {
    if (value === dv || (!value && isRequired) || value.length > max) return;
    apiFunc({ type, value });
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike", "code-block"],
        [{ script: "sub" }, { script: "super" }],
        [{ color: [] }],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
      ],
    },
  };
  return (
    <WithLabel
      label={label ?? ""}
      labelClass={`sm:ml-3 ${label === "Title" ? "sm:hidden" : ""}`}
    >
      <>
        <ReactQuill
        className="h-auto"
          theme="snow"
          modules={modules}
          onChange={(e) => setValue(e)}
          {...{ value, placeholder }}
        />
        {value && value !== dv && (
          <>
            <hr className="mx-3 mb-2 mt-10 border-t-[.5px] border-gray-400" />
            <div className="relative flex justify-end">
              <span
                className={`absolute -top-7 right-0 text-sm italic  ${
                  value.length > max ? "text-red-400" : "text-gray-800"
                }`}
              >
                {value.length > max ? (
                  "max length exceeded"
                ) : (
                  <>{max - value.length} characters left</>
                )}
              </span>
              <button onClick={() => setValue(dv)} className="btn-crystal">
                cancel
              </button>
              <button onClick={handleSave} className="btn">
                save
              </button>
            </div>
          </>
        )}
      </>
    </WithLabel>
  );
};

export default RichTextEditable;
