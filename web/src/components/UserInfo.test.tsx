import { render, screen } from "../test/setup";
import UserInfo from "./UserInfo";

describe("UserInfo Component", () => {
  describe("Layout", () => {
    it("has id", () => {
      render(
        <UserInfo
          userInfo={{
            email: "test.mail.com",
            id: "abc",
          }}
        />
      );
      const component = screen.queryByTestId("user-info");
      expect(component).toBeInTheDocument();
    });
  });
});
