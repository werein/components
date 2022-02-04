import { captureEvent } from "@sentry/react";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useTranslation } from "react-i18next";
import { useStyletron } from "styletron-react";
import { border, padding } from "../utils/css";
import Field, { FieldProps } from "./field";

const { REACT_APP_API: API = "" } = process.env;
const prefix = process.env.NODE_ENV !== "production" ? "_dev/" : "";

const uploadUrl = (scope: string) =>
  `${API}/upload/private?scope=${prefix}${scope}`;

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

export type PrivateFileUploaderFieldProps = {
  scope: string;
  name: string;
  onUploadSuccess?: (documents: Array<{ name: string; url: string }>) => void;
} & Omit<FieldProps, "error">;

export default function PrivateFileUploaderField(
  props: PrivateFileUploaderFieldProps
) {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<
    Array<{ name: string; url: string }>
  >([]);
  const [t] = useTranslation();

  const [css] = useStyletron();
  const banner = css({
    ...padding("1rem"),
    justifyContent: "center",
    display: "flex",
    ...border({ style: "solid", width: "2px", color: "rgba(0, 0, 0, 0.1)" }),
  });

  const onSend = async (
    acceptedFiles: File[],
    action?: (p: { url: string; name: string }) => void
  ) => {
    return await Promise.all(
      acceptedFiles.map(async (file) => {
        const payload = new FormData();
        payload.append("file", file);

        const {
          data: { url, name },
        } = await upload(uploadUrl(props.scope), payload);
        action && action({ url, name });
        return { url, name };
      })
    );
  };

  const onDrop = async (acceptedFiles: File[]) => {
    setUploading(true);
    const result = await onSend(acceptedFiles);
    setUploaded(result);
    setUploading(false);
    props.onUploadSuccess && props.onUploadSuccess(result);
  };

  return (
    <>
      <Field
        label={props.label}
        caption={props.caption}
        autoHide={props.autoHide}
      >
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div {...getRootProps()} className={banner}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <div>{t("form.private-file-uploader.drop-here")}</div>
                ) : (
                  <div>
                    {uploading
                      ? t("form.private-file-uploader.uploading-files")
                      : t("form.private-file-uploader.click-or-drop-files")}
                  </div>
                )}
              </div>
            );
          }}
        </Dropzone>
      </Field>
      <div
        className={css({
          display: "grid",
          gridGap: "1rem",
        })}
      >
        {uploaded.map((file, index) => {
          return (
            <div
              key={index}
              className={css({
                position: "relative",
              })}
            >
              {file.name}
            </div>
          );
        })}
      </div>
    </>
  );
}
