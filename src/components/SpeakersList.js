import { data } from "../../SpeakerData";
import Speaker from "./Speaker";
import { useState, useEffect } from "react";
import ReactPlaceholder from "react-placeholder/lib";

function SpeakersList({ showSessions }) {
  const [speakerData, setSpeakerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);
  const [error, seetError] = useState("");

  // create delay function
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // introducing a async delay to simulate loading data from an api
  useEffect(() => {
    async function delayFunc() {
      try {
        await delay(2000);
        setIsLoading(false);
        setSpeakerData(data);
      } catch (e) {
        setIsLoading(false);
        setHasErrored(true);
        seetError(e);
      }
    }
    delayFunc();
  }, []);

  function onFavoriteToggle(id) {
    // search for the correct speaker to be changed
    const speakerRecPrevious = speakerData.find(function (rec) {
      return rec.id === id;
    });

    // change the value spreading all values and updating only favorie attribute
    const speakerRecUpdated = {
      ...speakerRecPrevious,
      favorite: !speakerRecPrevious.favorite,
    };

    // speakersDataNew contains the entry for the regitry updated
    // below this one regitry is modified inside the array of registries
    const speakersDataNew = speakerData.map(function (rec) {
      return rec.id === id ? speakerRecUpdated : rec;
    });

    // the array of registries is written to the state variable
    setSpeakerData(speakersDataNew);
  }

  if (hasErrored === true) {
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
        ready={isLoading === false}
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
