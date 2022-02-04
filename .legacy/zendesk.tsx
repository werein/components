import { Fragment, useEffect, useState } from "react";
import * as Icons from "react-feather";
import Button from "./button/button";

function Widget(props: { delay?: number }) {
  const [zendesk, showZendesk] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://static.zdassets.com/ekr/snippet.js?key=703c4b9b-7bbd-4480-b230-b4b6bd3391aa";
    script.async = true;
    script.id = "ze-snippet";
    script.onload = () => {
      showZendesk(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (zendesk) {
    return (
      <Button
        onClick={() => {
          if ((window as any).zE) {
            (window as any).zE("webWidget", "open");
          }
        }}
        icon={<Icons.MessageCircle size={12} />}
        style={{
          position: "fixed",
          zIndex: 1,
          bottom: "1.5rem",
          right: "1.5rem",
          backgroundColor: "var(--dark-blue)",
          ":hover": {
            backgroundColor: "var(--blue)",
          },
        }}
      >
        Chat
      </Button>
    );
  }
  return <Fragment />;
}

export default function Zendesk() {
  const [zendesk, showZendesk] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => showZendesk(true), 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (zendesk) {
    return <Widget />;
  }

  return <Fragment />;
}
