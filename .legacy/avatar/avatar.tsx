import { captureEvent } from "@sentry/react";
import { Slider } from "baseui/slider";
import { useSnackbar } from "baseui/snackbar";
import { useField, useFormikContext } from "formik";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import * as Icons from "react-feather";
import { useTranslation } from "react-i18next";
import { useStyletron } from "styletron-react";
import { borderRadius } from ".././utils/css";
import Button, { ButtonAppearance } from "../button/button";
import { upload } from "../form/image-uploader-field-form";

const { REACT_APP_API: API = "" } = process.env;
const prefix = process.env.NODE_ENV !== "production" ? "_dev/" : "";

const imageUploadUrl = (scope: string) =>
  `${API}/upload/image?scope=${prefix}${scope}`;

export default function AvatarField(props: { name: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [img, setImg] = useState<any>();
  const { submitForm } = useFormikContext();
  const editor = useRef<AvatarEditor | null>(null);
  const [{ value }, , { setValue }] = useField(props.name);
  const [css] = useStyletron();
  const [scale, setScale] = useState([1]);
  const [t] = useTranslation();
  const { enqueue } = useSnackbar();

  const onSend = async () => {
    try {
      if (editor.current) {
        setSubmitting(true);
        const payload = new FormData();

        const canvas = editor.current.getImage().toDataURL();
        const response = await fetch(canvas);
        const blob = await response.blob();

        payload.append("file", blob);

        const {
          data: { url },
        } = await upload(imageUploadUrl("account"), payload);

        if (url) {
          setValue(url);
          setEditMode(false);
          submitForm();
        } else {
          throw "URL not specified";
        }
      }
    } catch (error: any) {
      setSubmitting(false);
      enqueue({
        startEnhancer: () => <Icons.AlertTriangle />,
        message: t("exp.save.error"),
      });
      captureEvent(error);
    }
  };

  if (editMode) {
    return (
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <div>
          <AvatarEditor
            ref={editor}
            width={180}
            height={180}
            image={img}
            border={20}
            borderRadius={180}
            style={{
              background: "white",
            }}
            scale={scale[0]}
          />
          <Slider
            min={1}
            max={2}
            step={0.05}
            value={scale}
            onChange={({ value: scaleValue }) =>
              scaleValue && setScale(scaleValue)
            }
          />
          <div
            className={css({
              display: "flex",
              gap: "0.5rem",
            })}
          >
            <Button
              onClick={() => setEditMode(false)}
              appearance={ButtonAppearance.secondary}
            >
              {t("exp.cancel")}
            </Button>
            <Button
              isLoading={submitting}
              disabled={submitting}
              onClick={onSend}
              appearance={ButtonAppearance.primary}
              style={{
                flexGrow: 1,
              }}
            >
              {t("exp.submit")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
      })}
    >
      <Dropzone
        multiple={false}
        accept="image/*"
        onDrop={([item]) => {
          setImg(item);
          setEditMode(true);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className={css({
              position: "relative",
              display: "flex",
              border: "black 2px dotted",
              height: "200px",
              width: "200px",
              ...borderRadius("100%"),
            })}
          >
            <input {...getInputProps()} />
            <img
              src={value}
              className={css({
                borderRadius: "100%",
                width: "100%",
                height: "100%",
              })}
            />
            <div
              className={css({
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "0.5rem",
                background: "var(--black-80)",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              })}
            >
              {t("avatar.click-or-drop-to-upload")}
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
}
