import Speaker from "./Speaker";
import useRequestDelay, { REQUEST_STATUS } from "../hooks/useRequestDelay";
import { data } from "../../SpeakerData";
import { CButton, CSpinner } from "@coreui/react";

function SpeakersList({ showSessions }) {
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
  } = useRequestDelay(2000, data);

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
      <div className="speakerslist-placeholder d-flex justify-content-center">
        <CButton disabled>
          <CSpinner
            component="span"
            size="sm"
            aria-hidden="true"
            visuallyHiddenLabel
          />
          {"  "}
          Content is Loading...
        </CButton>
      </div>
    );
  }

  return (
    <div className="container speakers-list">
      {/* 
        // OLD PLACEHOLDER. ONLY ACCEPTS NODE v.16
        <ReactPlaceholder
        type="media"
        rows={15}
        className="speakerslist-placeholder"
        ready={requestStatus === REQUEST_STATUS.SUCCESS}
      > */}
      <div className="row">
        {speakerData.map(function (speaker) {
          return (
            <Speaker
              key={speaker.id}
              speaker={speaker}
              showSessions={showSessions}
              onFavoriteToggle={() => {
                updateRecord({
                  ...speaker,
                  favorite: !speaker.favorite,
                });
              }}
            />
          );
        })}
      </div>
      {/* </ReactPlaceholder> */}
    </div>
  );
}

export default SpeakersList;
