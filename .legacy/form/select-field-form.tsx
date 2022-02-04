import { FastField, FastFieldProps } from "formik";
import React from "react";
import { StyleObject } from "styletron-react";
import SelectField, { SelectFieldProps } from "./select-field";

type SelectFieldFormProps = { name: string; style?: StyleObject } & Omit<
  SelectFieldProps,
  "onChange" | "onBlur" | "value" | "name" | "error"
>;

export default function SelectFieldForm(props: SelectFieldFormProps) {
  const { name, style, ...input } = props;

  return (
    <FastField name={name}>
      {({
        field,
        form,
        meta,
      }: FastFieldProps<string | string[] | undefined>) => (
        <SelectField
          {...input}
          name={name}
          value={field.value}
          onChange={(v) => form.setFieldValue(name, v)}
          error={(meta.touched && meta.error) ?? meta.error}
          overrides={{
            ControlContainer: {
              style: {
                ...style,
              },
            },
            Root: {
              style: {
                zIndex: 1,
              },
            },
            Placeholder: {
              style: {
                zIndex: 1,
              },
            },
            ValueContainer: {
              style: {
                zIndex: 1,
              },
            },
            SingleValue: {
              style: {
                zIndex: 1,
              },
            },
            MultiValue: {
              style: {
                zIndex: 1,
              },
            },
            Tag: {
              style: {
                zIndex: 1,
              },
            },
            InputContainer: {
              style: {
                zIndex: 1,
              },
            },
            Input: {
              style: {
                zIndex: 1,
              },
            },
            IconsContainer: {
              style: {
                zIndex: 1,
              },
            },
            SelectArrow: {
              style: {
                zIndex: 1,
              },
            },
            ClearIcon: {
              style: {
                zIndex: 1,
              },
            },
            LoadingIndicator: {
              style: {
                zIndex: 1,
              },
            },
            SearchIconContainer: {
              style: {
                zIndex: 1,
              },
            },
            SearchIcon: {
              style: {
                zIndex: 1,
              },
            },
            Popover: {
              style: {
                zIndex: 1,
              },
            },
            DropdownContainer: {
              style: {
                zIndex: 1,
              },
            },
            Dropdown: {
              style: {
                zIndex: 1,
              },
            },
            DropdownOption: {
              style: {
                zIndex: 1,
              },
            },
            DropdownListItem: {
              style: {
                zIndex: 1,
              },
            },
            OptionContent: {
              style: {
                zIndex: 1,
              },
            },
            StatefulMenu: {
              style: {
                zIndex: 1,
              },
            },
            // Root?: Override<any>;
            // ControlContainer?: Override<any>;
            // Placeholder?: Override<any>;
            // ValueContainer?: Override<any>;
            // SingleValue?: Override<any>;
            // MultiValue?: Override<any>;
            // Tag?: Override<any>;
            // InputContainer?: Override<any>;
            // Input?: Override<any>;
            // IconsContainer?: Override<any>;
            // SelectArrow?: Override<any>;
            // ClearIcon?: Override<any>;
            // LoadingIndicator?: Override<any>;
            // SearchIconContainer?: Override<any>;
            // SearchIcon?: Override<any>;
            // Popover?: Override<any>;
            // DropdownContainer?: Override<any>;
            // Dropdown?: Override<any>;
            // DropdownOption?: Override<any>;
            // DropdownListItem?: Override<any>;
            // OptionContent?: Override<any>;
            // StatefulMenu?: Override<any>;
            // ...props.overrides,
          }}
        />
      )}
    </FastField>
  );
}
