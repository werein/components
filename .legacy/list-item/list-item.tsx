import { ListItem as BaseListItem, ListItemLabel } from "baseui/list";
import React, { PropsWithChildren, ReactNode } from "react";
import * as Icons from "react-feather";
import { useHistory, useLocation } from "react-router";
import { StyleObject, useStyletron } from "styletron-react";

interface ListItemProps {
  onClick?: () => void;
  to?: string;
  target?: "_blank";
  artwork?: ReactNode;
  endEnhancer?: ReactNode;
  description?: string | null;
  sublist?: boolean;
  disabled?: boolean;
}

export default function ListItem(props: PropsWithChildren<ListItemProps>) {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const [css] = useStyletron();
  const { disabled } = props;
  const navigate = () => {
    if (!disabled) {
      if (props.to) {
        if (props.target) {
          window.open(props.to, props.target);
        } else {
          push(props.to);
        }
      }
    }
  };
  const onClick = props.onClick || navigate;
  const style: StyleObject =
    props.onClick || props.to
      ? {
          fontWeight: "bold",
          backgroundColor: "var(--black-02)",
          cursor: "pointer",
          ":hover": {
            backgroundColor: "var(--black-10)",
          },
          ...(props.to && pathname === props.to
            ? {
                backgroundColor: "var(--blue)",
                cursor: "pointer",
                color: "white",
                ":hover": {
                  backgroundColor: "var(--dark-blue)",
                },
              }
            : {}),
        }
      : {};

  return (
    <div onClick={onClick}>
      <BaseListItem
        sublist={props.sublist}
        artwork={
          disabled
            ? () => <Icons.Lock />
            : props.artwork
            ? () => props.artwork
            : undefined
        }
        endEnhancer={props.endEnhancer ? () => props.endEnhancer : undefined}
        overrides={{
          Root: {
            style,
          },
          EndEnhancerContainer: {
            style: {
              fontWeight: "bold",
            },
          },
        }}
      >
        <ListItemLabel description={props.description} sublist={props.sublist}>
          <div
            className={css({
              // fontWeight: "bold",
              ...(props.to && pathname === props.to
                ? {
                    color: "white",
                  }
                : {}),
            })}
          >
            {props.children}
          </div>
        </ListItemLabel>
      </BaseListItem>
    </div>
  );
}
