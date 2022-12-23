import { data } from "../../SpeakerData";
import Header from "./Header";
import SpeakersList from "./SpeakersList";
import SpeakersToolbar from "./SpeakersToolbar";

function Speakers() {
  return (
    <div className="container-fluid">
      <Header />
      <SpeakersToolbar />
      <SpeakersList data={data} />
    </div>
  );
}

export default Speakers;
