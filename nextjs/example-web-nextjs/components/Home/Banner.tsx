import React from "react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { bannerService } from "services/banner.service";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
export default function VideoContent() {
  const [video, setVideo] = useState();
  const [index, setIndex] = useState(0);
  const [asset, setAsset] = useState([]);
  const get = async () => {
    bannerService
      .get()
      .then((resp: any) => {
        const allVideo = resp.data.map((item: any) => {
          return item.video;
        });
        setAsset(allVideo);
        setVideo(allVideo[index]);
      })
      .catch(() => {});
  };
  useEffect(() => {
    get();
  }, []);
  const setPlayingIndex = () => {
    if (index === asset.length - 1) {
      setVideo(asset[0]);
      setIndex(0);
    } else {
      setVideo(asset[index + 1]);
      setIndex(index + 1);
    }
  };

  return (
    <div className="w-full">
      <ReactPlayer
        playing={true}
        controls={true}
        muted
        className="react-player"
        url={video}
        onEnded={() => setPlayingIndex()}
        width={"100%"}
        height={"100%"}
        // playbackRate={16}
      />
    </div>
  );
}
