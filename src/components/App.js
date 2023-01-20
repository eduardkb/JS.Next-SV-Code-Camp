import Header from "./Header";
import Speakers from "./Speakers";
import Head from "next/head";
import Layout from "./Layout";

function App() {
  // normal way of declaring state and passwing it to children
  // stete now declared in layout component and passed to
  // children with Context
  // const [theme, setTheme] = useState("light");
  return (
    <>
      <Head>
        <title>SV Code Camp</title>
      </Head>
      <Layout startingTheme="light">
        <div>
          {/* lines below where used when passing parameters to each component
        app is now using React Context with the theme parameter */}
          {/* <Header theme={theme} />
        <Speakers theme={theme} setTheme={setTheme} /> */}

          <Header />
          <Speakers />
        </div>
      </Layout>
    </>
  );
}

export default App;
