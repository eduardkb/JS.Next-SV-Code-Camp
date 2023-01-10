import { data } from "../../SpeakerData";
import { useState, useEffect } from "react";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

function useRequestSpeakers(delayTimeout = 1000) {
  const [speakerData, setSpeakerData] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, seetError] = useState("");

  // create delay function
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // introducing a async delay to simulate loading data from an api
  useEffect(() => {
    async function delayFunc() {
      try {
        await delay(delayTimeout);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
        setSpeakerData(data);
      } catch (e) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
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

  return { speakerData, requestStatus, error, onFavoriteToggle };
}

export default useRequestSpeakers;