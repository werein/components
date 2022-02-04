import {
  Modal as BaseModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ROLE,
  SIZE,
} from "baseui/modal";
import * as Icons from "react-feather";
import Button, { ButtonAppearance } from "./button/button";
import { borderRadius, margin } from "./utils/css";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  footer?: React.ReactNode | React.ReactNodeArray;
  fullScreen?: boolean;
}

export default function Modal(props: React.PropsWithChildren<ModalProps>) {
  return (
    <BaseModal
      autoFocus={false}
      onClose={props.onClose}
      closeable
      isOpen={props.isOpen}
      animate
      size={SIZE.auto}
      role={ROLE.dialog}
      overrides={{
        Close: {
          component: () => (
            <Button
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
              }}
              appearance={ButtonAppearance.outline}
              onClick={props.onClose}
            >
              <Icons.X />
            </Button>
          ),
        },
        Dialog: {
          style: {
            ...(props.fullScreen
              ? { ...margin("0"), minHeight: "100vh" }
              : { ...borderRadius("2rem") }),
            boxShadow:
              "rgb(0 0 0 / 10%) 0px 4px 30px 0px, rgb(0 0 0 / 5%) 0px 2px 5px 0px",
            width: "100%",
            maxWidth: "600px",
          },
        },
        Root: {
          style: {
            zIndex: 1,
          },
        },
      }}
    >
      <ModalHeader>{props.header}</ModalHeader>
      <ModalBody>{props.children}</ModalBody>
      {props.footer && <ModalFooter>{props.footer}</ModalFooter>}
    </BaseModal>
  );
}
