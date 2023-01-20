import React, { useContext } from "react";
import { ThemeContext, ThemeProvider } from "../contexts/ThemeContext";

function Layout({ startingTheme, children }) {
  return (
    <ThemeProvider startingTheme={startingTheme}>
      <LayoutThemeProvider>{children}</LayoutThemeProvider>
    </ThemeProvider>
  );
}

function LayoutThemeProvider({ startingTheme, children }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={
        theme === "light" ? "container-fluid light" : "container-fluid dark"
      }
    >
      {/* // children is a standart param for all components
        // it renders all the components that
        // this component wraps */}
      {children}
    </div>
  );
}

export default Layout;
