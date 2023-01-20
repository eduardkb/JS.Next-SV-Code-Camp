import React, { createContext, useState } from "react";

// create the context for the theme state
// and it is exported because it needs to be available in other components
export const ThemeContext = createContext();

function Layout({ startingTheme, children }) {
  const [theme, setTheme] = useState(startingTheme);
  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
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
    </ThemeContext.Provider>
  );
}

export default Layout;
