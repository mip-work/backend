import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Dispatch, useMemo, useRef } from "react";
import WithLabel from "../util/WithLabel";
import { A, T } from "./CreateIssueModal";
import axios from "axios";

interface Props {
  dispatch: Dispatch<A>;
  value: string;
  type: T;
  max: number;
  label: string;
}

export default function RichText(props: Props) {
  const { dispatch, type, value, label, max } = props;
  const quillRef = useRef<HTMLInputElement | any>(null);

 
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
        // handlers: {
        //   image: imageHandler,
        // },
      },
    }),
    []
  );

  return (
    <WithLabel label={label}>
      <div className="relative">
        <ReactQuill
          ref={quillRef}
          className="h-auto"
          placeholder="Write something..."
          theme="snow"
          onChange={(valor) => dispatch({ type, value: valor })}
          modules={modules}
        />
        {value && (
          <span
            className={`absolute right-0 text-sm italic ${
              value.length > max ? "text-red-400" : "text-gray-800"
            }`}
          >
            {value.length > max ? (
              "max length exceeded"
            ) : (
              <>{max - value.length} characters left</>
            )}
          </span>
        )}
      </div>
    </WithLabel>
  );
}
