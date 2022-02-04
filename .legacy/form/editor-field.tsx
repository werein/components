import { useTranslation } from "react-i18next";
import Editor from "rich-markdown-editor";
import { useStyletron } from "styletron-react";
import { border, borderRadius, padding } from "../utils/css";
import cs from "./editor-field/cs";
import Field, { FieldProps } from "./field";
import { upload } from "./image-uploader-field-form";

export type EditorFieldProps = {
  name: string;
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
} & FieldProps;

const { REACT_APP_API: API = "" } = process.env;
const prefix = process.env.NODE_ENV !== "production" ? "_dev/" : "";

const imageUploadUrl = (scope: string) =>
  `${API}/upload/image?scope=${prefix}${scope}`;

export default function EditorField(props: EditorFieldProps) {
  const [css] = useStyletron();
  const { name, label, caption, error, autoHide, placeholder } = props;
  const [t] = useTranslation();

  const uploadImage = async (file: Blob) => {
    const payload = new FormData();
    payload.append("file", file);

    const {
      data: { url },
    } = await upload(imageUploadUrl("blog"), payload);
    return url;
  };

  const onChange = (getValue: () => string) => props.onChange(getValue());

  return (
    <Field error={error} label={label} caption={caption} autoHide={autoHide}>
      <Editor
        className={css({
          ...borderRadius("1rem"),
          ...border({
            style: "solid",
            width: "2px",
            color: "rgb(238, 238, 238)",
          }),
          ...padding("1rem 1rem 1rem 3rem"),
          ":focus": {
            ...border({
              style: "solid",
              width: "2px",
              color: "rgb(0, 0, 0)",
            }),
          },
        })}
        id={name}
        dictionary={cs}
        placeholder={placeholder || t("form.editor-field.placeholder")}
        defaultValue={props.value || ""}
        onChange={onChange}
        uploadImage={uploadImage}
      />
    </Field>
  );
}
