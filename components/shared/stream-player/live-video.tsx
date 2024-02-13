"use client";
import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FullScreenControl } from "./full-screen-control";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volume-control";
interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoEl = useRef<HTMLVideoElement>(null);
  const playerEl = useRef<HTMLDivElement>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(0);

  const toogleFullScreen = useCallback(() => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else if (playerEl?.current) {
      playerEl.current.requestFullscreen();
    }
  }, [isFullScreen]);

  const onVolumeChange = useCallback((value: number) => {
    setVolume(+value);
    if (videoEl?.current) {
      videoEl.current.muted = value === 0;
      videoEl.current.volume = value * 0.01;
    }
  }, []);

  const onToggleMute = () => {
    const isMuted = volume === 0;
    setVolume(isMuted ? 50 : 0);
    if (videoEl?.current) {
      videoEl.current.muted = !isMuted;
      videoEl.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFullScreenChange = () => {
    const isCurrentlyFullScreen = document.fullscreenElement !== null;
    setIsFullScreen(isCurrentlyFullScreen);
  };

  useEventListener("fullscreenchange", handleFullScreenChange, playerEl);
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
      <div className=" absolute bottom-0 h-14 w-full flex items-center justify-end opacity-0 hover:opacity-100 hover:transition-all bg-gradient-to-r from-neutral-900 px-4 gap-x-2">
        <VolumeControl
          value={volume}
          onChange={onVolumeChange}
          onToggle={onToggleMute}
        />
        <FullScreenControl
          isFullScreen={isFullScreen}
          onToogle={toogleFullScreen}
        />
      </div>
    </div>
  );
};
