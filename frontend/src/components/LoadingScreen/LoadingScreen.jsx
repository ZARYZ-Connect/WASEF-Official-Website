import { useEffect, useRef, useState } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen({ onFinish }) {
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const dismiss = () => {
    if (fadeOut) return;
    setFadeOut(true);
    setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, 700); // match CSS transition duration
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Safety timeout: if video is blocked or hangs, dismiss after 8 seconds
    const safetyTimer = setTimeout(() => {
      dismiss();
    }, 8000);

    // Try playing programmatically
    video.play().catch(() => {
      // If autoplay is blocked by browser policy, do not dismiss immediately.
      // The user can tap skip, or the browser might play it upon first interaction.
    });

    const handleEnded = () => dismiss();
    video.addEventListener('ended', handleEnded);
    return () => {
      clearTimeout(safetyTimer);
      video.removeEventListener('ended', handleEnded);
    };
  }, []); // eslint-disable-line

  if (!visible) return null;

  return (
    <div className={`loading-screen${fadeOut ? ' loading-screen--fade' : ''}`} aria-label="Loading">
      <video
        ref={videoRef}
        src="/loading-video.mp4"
        className="loading-screen__video"
        muted
        playsInline
        autoPlay
        preload="auto"
      />
      {/* Skip button – appears after 1 s */}
      <button
        className="loading-screen__skip"
        onClick={dismiss}
        aria-label="Skip intro"
      >
        Skip <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}
