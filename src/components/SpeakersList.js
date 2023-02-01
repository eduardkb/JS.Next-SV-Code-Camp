import { useContext } from "react";
import Speaker from "./Speaker";

import useRequestRest, { REQUEST_STATUS } from "../hooks/useRequestRest";
// import { data } from "../../SpeakerData";
import { CButton, CSpinner } from "@coreui/react";
// import "rsuite/dist/rsuite.min.css";
// import { Placeholder } from "rsuite";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";
import SpeakerAdd from "./SpeakerAdd";

function SpeakersList() {
  // hooks below are declared normally (without custom hooks with are groupings of hooks)
  // const [speakerData, setSpeakerData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [hasErrored, setHasErrored] = useState(false);
  // const [error, seetError] = useState("");

  // creating a custom hook with all hooks above on separate hooks script file
  // line below is destructuring all getters from the hooks on the function
  const {
    data: speakerData,
    requestStatus,
    error,
    updateRecord,
    insertRecord,
    deleteRecord,
  } = useRequestRest();

  const { searchQuery, eventYear } = useContext(SpeakerFilterContext);

  if (requestStatus === REQUEST_STATUS.FAILURE) {
    return (
      <div className="text-danger">
        ERROR: <b>Loading speaker data failed: {error}</b>
      </div>
    );
  }

  // if status is loading, displays a loading message
  if (requestStatus === REQUEST_STATUS.LOADING) {
    return (
      // component below is from library "coreui"
      <>
        <div className="d-flex justify-content-center">
          <CButton disabled>
            <CSpinner
              component="span"
              size="sm"
              aria-hidden="true"
              visuallyHiddenLabel=""
            />
            {"  "}
            Content is Loading...
          </CButton>
        </div>

        <br />
        <br />
        <br />

        {/* // placeholder below from library "rsuite" */}
        {/* // DOES NOT WORK OK. ERROR IN BROWSER CONSOLE */}
        {/* <div className="pl-5 pr-5 container speakers-list">
          <Placeholder.Paragraph style={{ marginTop: 30 }} rows={5} active /> */}
        {/* <Placeholder.Grid rows={5} columns={6} active /> */}
        {/* </div> */}
      </>
    );
  }

  return (
    <div className="container speakers-list">
      {/* 
        // OLD PLACEHOLDER. ONLY ACCEPTS NODE v.16 (from library react-placeholder)
        <ReactPlaceholder
        type="media"
        rows={15}
        className="speakerslist-placeholder"
        ready={requestStatus === REQUEST_STATUS.SUCCESS}
      > */}
      <SpeakerAdd eventYear={eventYear} insertRecord={insertRecord} />
      <div className="row">
        {speakerData
          .filter(function (speaker) {
            return (
              speaker.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
              speaker.last.toLowerCase().includes(searchQuery.toLowerCase())
            );
          })
          .filter(function (speaker) {
            return speaker.sessions.find((session) => {
              return session.eventYear === eventYear;
            });
          })
          .map(function (speaker) {
            return (
              <Speaker
                key={speaker.id}
                speaker={speaker}
                updateRecord={updateRecord}
                insertRecord={insertRecord}
                deleteRecord={deleteRecord}
              />
            );
          })}
      </div>
      {/* </ReactPlaceholder> */}
    </div>
  );
}

export default SpeakersList;
