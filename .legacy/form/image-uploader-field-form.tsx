import { captureEvent } from "@sentry/react";
import { FieldArray, useField } from "formik";
import { isEmpty } from "ramda";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useTranslation } from "react-i18next";
import { useStyletron } from "styletron-react";
import { borderRadius } from "../utils/css";
import Field, { FieldProps } from "./field";

const { REACT_APP_API: API = "" } = process.env;
const prefix = process.env.NODE_ENV !== "production" ? "_dev/" : "";

const imageUploadUrl = (scope: string) =>
  `${API}/upload/image?scope=${prefix}${scope}`;

export function upload(url: string, body: any = {}) {
  const token = localStorage.getItem("idToken");

  const options = {
    body,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    method: "POST",
  };

  try {
    return fetch(url, options).then((result: any) => result.json());
  } catch (error: any) {
    captureEvent(error);
    return {
      data: {
        imageUrl: "",
      },
    };
  }
}

export type ImageUploaderFieldFormProps = {
  name: string;
  scope: string;
} & Omit<FieldProps, "error">;

export default function ImageUploaderFieldForm(
  props: ImageUploaderFieldFormProps
) {
  const [uploading, setUploading] = useState(0);
  const [t] = useTranslation();
  const [{ value }, meta] = useField<string[]>(props.name);
  const [{ value: locationValue }, , { setValue: setLocationValue }] =
    useField<{ latitude?: Number; longitude?: Number } | undefined>("location");

  const [css] = useStyletron();
  const banner = css({
    ...borderRadius("1rem"),
    padding: "1rem",
    justifyContent: "center",
    display: "flex",
    border:
      meta.touched && meta.error
        ? "solid 2px rgb(227, 175, 167)"
        : "solid 2px rgba(0, 0, 0, 0.1)",
    marginBottom: "1rem",
    background:
      meta.touched && meta.error ? "rgb(249, 240, 239)" : "rgba(0, 0, 0, 0)",
  });

  const onSend = (
    acceptedFiles: File[],
    action: (url: string, gps: any) => void
  ) => {
    acceptedFiles.forEach(async (file) => {
      const payload = new FormData();
      payload.append("file", file);

      const {
        data: { url, gps },
      } = await upload(imageUploadUrl(props.scope), payload);
      action(url, gps);
    });
  };

  return (
    <>
      <FieldArray
        name={props.name}
        render={(arrayHelpers) => (
          <div>
            <Field
              error={meta.touched && meta.error}
              label={props.label}
              caption={props.caption}
              autoHide={props.autoHide}
            >
              <Dropzone
                onDrop={(acceptedFiles: File[]) => {
                  setUploading(uploading + acceptedFiles.length);
                  const onUploadDone = (
                    value: string,
                    { latitude, longitude }: any
                  ) => {
                    if (!locationValue || isEmpty(locationValue)) {
                      setLocationValue({ latitude, longitude });
                    }
                    arrayHelpers.push(value);
                    setUploading(uploading - 1);
                  };
                  return onSend(acceptedFiles, onUploadDone);
                }}
              >
                {({ getRootProps, getInputProps, isDragActive }) => {
                  return (
                    <div {...getRootProps()} className={banner}>
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <div>{t("form.image-uploader.drop-here")}</div>
                      ) : (
                        <div>
                          {uploading > 0
                            ? t("form.image-uploader.uploading-files", {
                                count: uploading,
                              })
                            : t("form.image-uploader.click-or-drop-files")}
                        </div>
                      )}
                    </div>
                  );
                }}
              </Dropzone>
            </Field>
          </div>
        )}
      />
    </>
  );
}
