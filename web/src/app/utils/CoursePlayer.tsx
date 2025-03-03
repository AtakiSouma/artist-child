import axios from "axios";
import { useEffect, useState } from "react";
import { RiArrowLeftCircleLine } from "react-icons/ri";
type Props = {
  videoUrl: string;
  title: string;
};
const CoursePlayer: React.FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post("http://localhost:8888/api/v1/course/generate-url", {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data.data);
      });
  }, [videoUrl]);
  console.log(videoData)
  return (
    <div style={{ paddingTop: "41%", position: "relative" }}>
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=8l7lB5Rx9exMGCjB`}
          style={{
            border: 0,
            width: "90%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allow="encrypted-media"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
