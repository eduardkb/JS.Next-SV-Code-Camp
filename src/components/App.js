import Header from "./Header";
import { useState } from "react";
import Speakers from "./Speakers";
import Head from "next/head";

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <>
      <Head>
        <title>SV Code Camp</title>
      </Head>
      <div
        className={
          theme === "light" ? "container-fluid light" : "container-fluid dark"
        }
      >
        <Header theme={theme} />
        <Speakers theme={theme} setTheme={setTheme} />
      </div>
    </>
  );
}

export default App;
