import Speaker from "../src/components/Speaker";
import { data } from "../SpeakerData";

const IndexPage = () => {
  return (
    <div className="container speakers-list">
      <div className="row">
        {data.map(function (speaker) {
          return <Speaker key={speaker.id} speaker={speaker} />;
        })}
      </div>
    </div>
  );
};

export default IndexPage;
