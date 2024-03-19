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
          console.log(responseUpload)
          const url =
            "https://www.redgtech-dev.com/api/web/upload-image?imageName=logo&companyId=651cc8f38c213bdfd5a11027&access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiNjA4NWE1Y2VhMDRmNDBmNzBmYTJjMmJkIiwiaWF0IjoxNzEwMjAyOTA0fQ.Wri9Ooj2VF0q34OfRbIiVS8AqfnvtfAynMois50B12Q";
  
        

          editor.insertEmbed(editor.getSelection(), "image", url);
        } else {
          console.log("You could only upload images.");
        }
      }
    };
  }

 
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
