"use client";
import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import React, { useRef, useState } from "react";
import { FullScreenControl } from "./full-screen-control";

interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoEl = useRef<HTMLVideoElement>(null);
  const playerEl = useRef<HTMLDivElement>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const toogleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else if (playerEl?.current) {
      playerEl.current.requestFullscreen();
      setIsFullScreen(true);
    }
  };
  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoEl.current) {
        track.publication.track?.attach(videoEl.current);
      }
    });
  return (
    <div className=" relative h-full flex" ref={playerEl}>
      <video width="100%" ref={videoEl} />
      <div className=" absolute bottom-0 h-14 w-full flex items-center justify-end opacity-0 hover:opacity-100 hover:transition-all bg-gradient-to-r from-neutral-900 px-4">
        <FullScreenControl
          isFullScreen={isFullScreen}
          onToogle={toogleFullScreen}
        />
      </div>
    </div>
  );
};
