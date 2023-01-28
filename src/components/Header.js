import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

function Header() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="padT4 padB4">
      <div className="container mobile-container">
        <div className="d-flex justify-content-between">
          <div>
            <img alt="SVCC Home Page" src={"/images/SVCClogo.png"} />
          </div>
          <div className="light">
            <u
              className={
                theme === "light" ? "header-title" : "header-title text-info "
              }
            >
              <h2>Silicon Valley Code Camp</h2>
            </u>
          </div>
          <div className={theme === "light" ? "" : "text-info"}>
            Hello Mr. Smith &nbsp;&nbsp;
            <span>
              <a href="#">sign-out</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
