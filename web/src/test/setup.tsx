import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../store/";

interface ProviderProps {
  children?: NonNullable<React.ReactNode>;
}

const TheProvider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: TheProvider, ...options });

export * from "@testing-library/react";

export { customRender as render };
