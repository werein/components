import { captureException } from "@sentry/react";

export default function gtag(...params: any[]) {
  try {
    (window as any).dataLayer.push(...params);
  } catch (error) {
    captureException(error);
  }
}
