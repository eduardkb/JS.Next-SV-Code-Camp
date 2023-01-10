import Speaker from "./Speaker";
import ReactPlaceholder from "react-placeholder/lib";
import useRequestSpeakers, {
  REQUEST_STATUS,
} from "../hooks/userRequestSpeakers";

function SpeakersList({ showSessions }) {
  // hooks below are declared normally (without custom hooks with are groupings of hooks)
  // const [speakerData, setSpeakerData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [hasErrored, setHasErrored] = useState(false);
  // const [error, seetError] = useState("");

  // creating a custom hook with all hooks above on separate hooks script file
  // line below is destructuring all getters from the hooks on the function
  const { speakerData, requestStatus, error, onFavoriteToggle } =
    useRequestSpeakers(2000);

  if (requestStatus === REQUEST_STATUS.FAILURE) {
    return (
      <div className="text-danger">
        ERROR: <b>Loading speaker data failed: {error}</b>
      </div>
    );
  }

  // line below not needed anymore. dony by PlaceHolder on return below
  //if (isLoading === true) return <div>Loading...</div>;

  return (
    <div className="container speakers-list">
      <ReactPlaceholder
        type="media"
        rows={15}
        className="speakerslist-placeholder"
        ready={requestStatus === REQUEST_STATUS.SUCCESS}
      >
        <div className="row">
          {speakerData.map(function (speaker) {
            return (
              <Speaker
                key={speaker.id}
                speaker={speaker}
                showSessions={showSessions}
                onFavoriteToggle={() => {
                  onFavoriteToggle(speaker.id);
                }}
              />
            );
          })}
        </div>
      </ReactPlaceholder>
    </div>
  );
}

export default SpeakersList;
