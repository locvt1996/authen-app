import { render, screen } from "../test/setup";
import AuthenForm from "./AuthenForm";

describe("AuthenForm Component", () => {
  describe("Layout", () => {
    it("has email input", () => {
      render(<AuthenForm />);
      const element = screen.getByPlaceholderText("Email");
      expect(element).toBeInTheDocument();
    });
    it("has password input", () => {
      render(<AuthenForm />);
      const element = screen.getByPlaceholderText("Password");
      expect(element).toBeInTheDocument();
    });
  });
});
