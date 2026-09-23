"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipForward,
  SkipBack,
  Settings,
} from "lucide-react";

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1).split("?")[0] || null;
    if (parsed.hostname === "www.youtube.com" || parsed.hostname === "youtube.com")
      return parsed.searchParams.get("v");
    if (parsed.pathname.startsWith("/embed/"))
      return parsed.pathname.split("/embed/")[1].split("?")[0] || null;
  } catch {}
  return null;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  onEnded?: () => void;
}

const YouTubePlayer: React.FC<{ videoId: string; title?: string }> = ({ videoId, title }) => (
  <div className="relative w-full overflow-hidden rounded-xl bg-black" style={{ aspectRatio: "16/9" }}>
    <iframe
      key={videoId}
      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
      title={title ?? "Course video"}
      className="absolute inset-0 h-full w-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  </div>
);

const NativePlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, onEnded }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [showSpeed, setShowSpeed] = useState(false);
  const [buffered, setBuffered] = useState(0);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.paused ? v.play() : v.pause();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as Element)?.tagName)) return;
      if (e.key === " " || e.key === "k") { e.preventDefault(); togglePlay(); }
      if (e.key === "ArrowRight") videoRef.current && (videoRef.current.currentTime += 10);
      if (e.key === "ArrowLeft") videoRef.current && (videoRef.current.currentTime -= 10);
      if (e.key === "m") setMuted((p) => !p);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [togglePlay]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTimeUpdate = () => setCurrentTime(v.currentTime);
    const onDurationChange = () => setDuration(v.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded_ = () => { setPlaying(false); onEnded?.(); };
    const onProgress = () => {
      if (v.buffered.length > 0 && v.duration)
        setBuffered((v.buffered.end(v.buffered.length - 1) / v.duration) * 100);
    };
    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("durationchange", onDurationChange);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded_);
    v.addEventListener("progress", onProgress);
    return () => {
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("durationchange", onDurationChange);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded_);
      v.removeEventListener("progress", onProgress);
    };
  }, [onEnded]);

  useEffect(() => { setPlaying(false); setCurrentTime(0); setBuffered(0); }, [videoUrl]);

  useEffect(() => {
    const onChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => { if (playing) setShowControls(false); }, 3000);
  }, [playing]);

  useEffect(() => {
    resetHideTimer();
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, [playing, resetHideTimer]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    if (!bar || !videoRef.current) return;
    const rect = bar.getBoundingClientRect();
    videoRef.current.currentTime =
      Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * duration;
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (videoRef.current) videoRef.current.volume = v;
    setMuted(v === 0);
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  };

  const setPlaybackSpeed = (s: number) => {
    setSpeed(s);
    if (videoRef.current) videoRef.current.playbackRate = s;
    setShowSpeed(false);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen();
    else document.exitFullscreen();
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="group relative w-full overflow-hidden rounded-xl bg-black"
      style={{ aspectRatio: "16/9" }}
      onMouseMove={resetHideTimer}
      onMouseLeave={() => playing && setShowControls(false)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="h-full w-full object-contain"
        muted={muted}
        preload="metadata"
        onClick={(e) => e.stopPropagation()}
      />

      {!playing && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
            <Play className="h-7 w-7 fill-white text-white" />
          </div>
        </div>
      )}

      {title && (
        <div className={`absolute left-0 right-0 top-0 bg-gradient-to-b from-black/70 to-transparent px-4 py-3 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}>
          <p className="truncate text-sm font-medium text-white">{title}</p>
        </div>
      )}

      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={progressRef}
          className="relative mb-3 h-1 w-full cursor-pointer rounded-full bg-white/20"
          onClick={handleSeek}
        >
          <div className="absolute inset-y-0 left-0 rounded-full bg-white/30" style={{ width: `${buffered}%` }} />
          <div className="absolute inset-y-0 left-0 rounded-full bg-[#39c1f3]" style={{ width: `${progress}%` }} />
          <div
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#39c1f3] shadow-md transition-transform group-hover:scale-125"
            style={{ left: `calc(${progress}% - 6px)` }}
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="text-white/80 transition hover:text-white" onClick={() => videoRef.current && (videoRef.current.currentTime -= 10)}>
            <SkipBack className="h-4 w-4" />
          </button>
          <button className="text-white transition hover:text-[#39c1f3]" onClick={togglePlay}>
            {playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
          </button>
          <button className="text-white/80 transition hover:text-white" onClick={() => videoRef.current && (videoRef.current.currentTime += 10)}>
            <SkipForward className="h-4 w-4" />
          </button>
          <span className="text-xs tabular-nums text-white/70">{formatTime(currentTime)} / {formatTime(duration)}</span>
          <div className="flex-1" />
          <div className="flex items-center gap-1">
            <button className="text-white/80 transition hover:text-white" onClick={toggleMute}>
              {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <input type="range" min={0} max={1} step={0.05} value={muted ? 0 : volume} onChange={handleVolume} className="h-1 w-16 cursor-pointer accent-[#39c1f3]" />
          </div>
          <div className="relative">
            <button className="flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white" onClick={() => setShowSpeed((p) => !p)}>
              <Settings className="h-3.5 w-3.5" />
              {speed}×
            </button>
            {showSpeed && (
              <div className="absolute bottom-8 right-0 z-50 overflow-hidden rounded-lg border border-white/10 bg-[#1a1d2e] shadow-xl">
                {SPEEDS.map((s) => (
                  <button key={s} onClick={() => setPlaybackSpeed(s)} className={`block w-full px-4 py-1.5 text-left text-xs transition hover:bg-white/10 ${s === speed ? "bg-[#39c1f3]/20 font-semibold text-[#39c1f3]" : "text-white/80"}`}>
                    {s}×
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="text-white/80 transition hover:text-white" onClick={handleFullscreen}>
            {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, onEnded }) => {
  const youtubeId = extractYouTubeId(videoUrl);
  if (youtubeId) return <YouTubePlayer videoId={youtubeId} title={title} />;
  return <NativePlayer videoUrl={videoUrl} title={title} onEnded={onEnded} />;
};

export default VideoPlayer;
