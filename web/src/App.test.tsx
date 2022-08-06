import { render, screen } from "./test/setup";
import App from "./App";

describe("Routing", () => {
  it.each`
    path           | pageTestId
    ${"/login"}    | ${"login-page"}
    ${"/register"} | ${"register-page"}
  `("display $pageTestId when path is $path ", ({ path, pageTestId }) => {
    window.history.pushState({}, "", path);
    render(<App />);
    const page = screen.queryByTestId(pageTestId);
    expect(page).toBeInTheDocument();
  });

  it.each`
    path           | pageTestId
    ${"/login"}    | ${"register-page"}
    ${"/register"} | ${"login-page"}
  `(
    "does not display $pageTestId when path is $path ",
    ({ path, pageTestId }) => {
      window.history.pushState({}, "", path);
      render(<App />);
      const page = screen.queryByTestId(pageTestId);
      expect(page).not.toBeInTheDocument();
    }
  );
});
