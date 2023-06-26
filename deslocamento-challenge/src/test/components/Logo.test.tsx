import { render, screen } from "@testing-library/react";
import Logo from "../../components/Logo";
import "@testing-library/jest-dom";
import { APP_NAME } from "../../helpers/contants";

describe("Logo", () => {
  it("renders app name", () => {
    render(<Logo />);

    const heading = screen.getByText(APP_NAME);

    expect(heading).toBeInTheDocument();
  });
});
