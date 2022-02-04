import { arrayMoveImmutable } from "array-move";
import { FieldArray, useField } from "formik";
import React, { PropsWithChildren, useState } from "react";
import * as Icon from "react-feather";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { useStyletron } from "styletron-react";
import { border, borderRadius } from "../utils/css";
import { imageUrl } from "../utils/image";
import { FieldProps } from "./field";

const SortableItem = SortableElement(({ children }: PropsWithChildren<{}>) => (
  <div>{children}</div>
));

const SortableList = SortableContainer(
  ({ children }: PropsWithChildren<{}>) => <>{children}</>
);

export type ImageFieldFormProps = {
  name: string;
} & Omit<FieldProps, "error">;

export default function ImageFieldForm(props: ImageFieldFormProps) {
  const [deletable, setDeletable] = useState(true);
  const [{ value }, meta, { setValue }] = useField<string[]>(props.name);

  const [css] = useStyletron();
  return (
    <>
      <FieldArray
        name={props.name}
        render={(arrayHelpers) => (
          <SortableList
            axis="xy"
            onSortEnd={({ oldIndex, newIndex }) => {
              setValue(arrayMoveImmutable(value, oldIndex, newIndex));
              setDeletable(true);
            }}
            onSortStart={() => {
              setDeletable(false);
            }}
          >
            <div
              className={css({
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridGap: "1rem",
              })}
            >
              {value.map((img, index) => {
                const remove = () => arrayHelpers.remove(index);
                return (
                  <div
                    key={`item-${img}-${index}`}
                    className={css({
                      position: "relative",
                    })}
                  >
                    {deletable && (
                      <button
                        type="button"
                        onClick={remove}
                        className={css({
                          backgroundColor: "white",
                          position: "absolute",
                          right: 0,
                          top: 0,
                          ...border(),
                          padding: "0.5rem",
                          ...borderRadius("0 1rem 0 1rem"),
                          ":hover": {
                            backgroundColor: "rgb(242, 242, 242)",
                            cursor: "pointer",
                          },
                        })}
                      >
                        <Icon.XCircle />
                      </button>
                    )}
                    <SortableItem index={index}>
                      <img
                        src={imageUrl(img, 300, 200)}
                        className={css({
                          cursor: "grab",
                          width: "100%",
                          height: "100%",
                          ...borderRadius("1rem"),
                        })}
                      />
                    </SortableItem>
                  </div>
                );
              })}
            </div>
          </SortableList>
        )}
      />
    </>
  );
}
