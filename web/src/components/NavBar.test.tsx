import { render, screen } from "../test/setup";
import NavBar from "./NavBar";

describe("NavBar Component", () => {
  describe("Layout", () => {
    it("has id", () => {
      render(<NavBar />);
      const component = screen.queryByTestId("nav-bar");
      expect(component).toBeInTheDocument();
    });
  });
});
