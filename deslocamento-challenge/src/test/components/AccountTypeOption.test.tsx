import { render, screen, fireEvent } from "@testing-library/react";
import AccountTypeOption from "../../components/AccountTypeOptions";
import "@testing-library/jest-dom";
import { GlobalContextProvider } from "../../helpers/GlobalContext";
import { ACCOUNT_TYPE_COMMAND, USER_TYPE } from "../../helpers/contants";
import {
  ReactPortal,
  PromiseLikeOfReactNode,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
} from "react";

describe("Account Type", () => {
  const userTypeProps = {
    userType: USER_TYPE.DRIVER,
  };

  const customRender = (
    ui:
      | string
      | number
      | boolean
      | ReactPortal
      | PromiseLikeOfReactNode
      | ReactElement<any, string | JSXElementConstructor<any>>
      | Iterable<ReactNode>
      | null
      | undefined,
    { providerProps, ...renderOptions }: any
  ) => {
    return render(
      <GlobalContextProvider {...providerProps}>{ui}</GlobalContextProvider>,
      renderOptions
    );
  };
  customRender(<AccountTypeOption />, { userTypeProps });
  it("should render the command", () => {
    const command = screen.getByText(ACCOUNT_TYPE_COMMAND);

    expect(command).toBeInTheDocument();
  });
  it("account type should be rider when click on riders button", async () => {
  });
  it("account type should be driver when click on drivers button", () => {});
});
