import { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';

interface UseHlsVideoOptions {
  src: string;
  autoPlay?: boolean;
}

export function useHlsVideo({ src, autoPlay = true }: UseHlsVideoOptions) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = useCallback(async () => {
    if (!videoRef.current) return;
    try {
      await videoRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    const handleLoadedMetadata = () => {
      setIsLoaded(true);
      if (autoPlay) {
        playVideo();
      }
    };

    const handleNativeError = () => {
      setHasError(true);
    };

    if (Hls.isSupported()) {
      hls = new Hls({
        capLevelToPlayerSize: true,
        maxBufferLength: 30,
        startLevel: 0, // Force start at lowest level for instant TTFB
        enableWorker: true,
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoaded(true);
        if (autoPlay) {
          playVideo();
        }
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError();
              break;
            default:
              setHasError(true);
              hls?.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      // Catch native playback errors (e.g., iOS Low Power Mode blocking autoplay)
      video.addEventListener('error', handleNativeError);
    } else {
      setHasError(true);
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleNativeError);
    };
  }, [src, autoPlay, playVideo]);

  return { videoRef, isLoaded, hasError, isPlaying, playVideo };
}
