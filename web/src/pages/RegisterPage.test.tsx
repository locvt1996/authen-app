import { render, screen } from "../test/setup";
import RegisterPage from "./RegisterPage";

describe("Home Page", () => {
  describe("Layout", () => {
    it("has id", () => {
      render(<RegisterPage />);
      const page = screen.queryByTestId("register-page");
      expect(page).toBeInTheDocument();
    });
  });
});
