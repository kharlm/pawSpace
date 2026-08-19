import React, { useEffect } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';

export default function PostVideo({ uri, shouldPlay, style }) {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
    player.muted = true;
  });

  useEffect(() => {
    if (shouldPlay) {
      player.play();
    } else {
      player.pause();
    }
  }, [shouldPlay, player]);

  return (
    <VideoView
      player={player}
      style={style}
      contentFit="cover"
      nativeControls={true}
    />
  );
}
