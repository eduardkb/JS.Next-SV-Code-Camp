import Header from "./Header";
import { createContext, useState } from "react";
import Speakers from "./Speakers";
import Head from "next/head";

// create the context for the theme state
// and it is exported because it needs to be available in other components
export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <>
      <Head>
        <title>SV Code Camp</title>
      </Head>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <div
          className={
            theme === "light" ? "container-fluid light" : "container-fluid dark"
          }
        >
          {/* lines below where used when passing parameters to each component
        app is now using React Context with the theme parameter */}
          {/* <Header theme={theme} />
        <Speakers theme={theme} setTheme={setTheme} /> */}

          <Header />
          <Speakers />
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
