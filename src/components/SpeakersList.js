import { data } from "../../SpeakerData";
import Speaker from "./Speaker";
import { useState } from "react";

function SpeakersList({ showSessions }) {
  const [speakerData, setSpeakerData] = useState(data);

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
    const speakersDataNew = speakerData.map(function (rec) {
      return rec.id === id ? speakerRecUpdated : rec;
    });
    setSpeakerData(speakersDataNew);
  }

  return (
    <div className="container speakers-list">
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
    </div>
  );
}

export default SpeakersList;
