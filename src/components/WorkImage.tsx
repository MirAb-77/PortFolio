import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string | string[];
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const isDualImage = Array.isArray(props.image);

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  if (isDualImage) {
    return (
      <div className="work-image-dual">
        {props.image.map((img, index) => (
          <div className="work-image-dual-item" key={index}>
            <a
              className="work-image-in"
              href={props.link}
              target="_blank"
              data-cursor={"disable"}
            >
              {props.link && (
                <div className="work-link">
                  <MdArrowOutward />
                </div>
              )}
              <img src={img} alt={`${props.alt} - ${index + 1}`} />
            </a>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <img src={props.image as string} alt={props.alt} />
        {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
      </a>
    </div>
  );
};

export default WorkImage;
