import { useMemo, useRef, useState } from "react";
import RTAutosize from "react-textarea-autosize";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UpdateIssueType } from "../../api/apiTypes";
import WithLabel from "../util/WithLabel";
import type { DispatchMiddleware } from "./IssueDetailModal";
import { A, T } from "./CreateIssueModal";
import axios from "axios";

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
  const quillRef = useRef<HTMLInputElement | any>(null);

  const imageHandler = () => {
    const editor = quillRef.current.getEditor();
    console.log(editor);
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "*/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;

      if (file) {
        if (/^image\//.test(file.type)) {
          console.log(file);
          const formData = new FormData();
          formData.append("logo", file);
          const responseUpload: any = await axios.post(
            "http://159.65.33.34:3000/api/web/upload-image/651cc8f38c213bdfd5a11027",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiNjA4NWE1Y2VhMDRmNDBmNzBmYTJjMmJkIiwiaWF0IjoxNjk5NDYzODQ3fQ.CBme93Jq6TYlUEVeMPaIRSBi5jTX0juSAf93JbQijek`,
              },
            }
          );
          console.log(responseUpload);
          const url =
            "https://www.redgtech-dev.com/api/web/upload-image?imageName=logo&companyId=651cc8f38c213bdfd5a11027&access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiNjA4NWE1Y2VhMDRmNDBmNzBmYTJjMmJkIiwiaWF0IjoxNzEwMjAyOTA0fQ.Wri9Ooj2VF0q34OfRbIiVS8AqfnvtfAynMois50B12Q";

          editor.insertEmbed(editor.getSelection(), "image", url);
        } else {
          console.log("You could only upload images.");
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
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
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );
  return (
    <WithLabel
      label={label ?? ""}
      labelClass={`sm:ml-3 ${label === "Title" ? "sm:hidden" : ""}`}
    >
      <>
        <ReactQuill
          ref={quillRef}
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
