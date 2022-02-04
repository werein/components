import { render, screen } from "@testing-library/react";
import Button from "./button";

describe("Button", () => {
  test("existence", () => {
    render(<Button>Hello world</Button>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });
});
