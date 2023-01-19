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
    const originalRecords = [...data];
    const newRecords = data.map(function (rec) {
      return rec.id === recordUpdated.id ? recordUpdated : rec;
    });

    async function delayFunction() {
      try {
        //optimisticUI - update value on interface and then start action on backend
        setData(newRecords);
        await delay(delayTime);
        if (doneCallback) {
          doneCallback();
        }
      } catch (error) {
        console.log("error thrown inside delayFunction", error);
        if (doneCallback) {
          doneCallback();
        }
        // if update falis after the optimistic UI update revert data to old value
        setData(originalRecords);
      }
    }
    delayFunction();
  }

  return { data, requestStatus, error, updateRecord };
}

export default useRequestDelay;
