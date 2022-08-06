import { render, screen } from "../test/setup";
import LoginPage from "./LoginPage";

describe("Home Page", () => {
  describe("Layout", () => {
    it("has id", () => {
      render(<LoginPage />);
      const page = screen.queryByTestId("login-page");
      expect(page).toBeInTheDocument();
    });
  });
});
