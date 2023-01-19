import { useState, useEffect } from "react";
import { data as fileData } from "../../SpeakerData";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

function useRequestDelay(delayTime = 1000) {
  const [data, setData] = useState(fileData);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState("");

  // create delay function
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // introducing a async delay to simulate loading data from an api
  useEffect(() => {
    async function delayFunc() {
      try {
        await delay(delayTime);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
        setData(data);
      } catch (e) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
        setError(e);
      }
    }
    delayFunc();
  }, []);

  function updateRecord(recordUpdated, doneCallback) {
    const newRecords = data.map(function (rec) {
      return rec.id === recordUpdated.id ? recordUpdated : rec;
    });

    async function delayFunction() {
      try {
        await delay(delayTime);
        setData(newRecords);
        if (doneCallback) {
          doneCallback();
        }
      } catch (error) {
        console.log("error thrown inside delayFunction", error);
      }
    }
    delayFunction();
  }

  return { data, requestStatus, error, updateRecord };
}

export default useRequestDelay;
