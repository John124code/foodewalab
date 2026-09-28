import { motion } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Sparkles, Newspaper, Maximize2 } from "lucide-react";
import { useRef, useState } from "react";
import poster from "@/assets/hero-video-poster.jpg";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="group relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-[var(--shadow-lift)]"
      >
        {/* Direct inline autoplaying video */}
        <video
          ref={videoRef}
          src="/food-intro.mp4"
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          className="h-[320px] w-full object-cover sm:h-[420px]"
        />

        {/* Gradient shadow for text readability */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,oklch(0.20_0.05_155/0.85))]" />

        {/* Video Control Bar */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            {/* Play / Pause button */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/75"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5 fill-current" />}
            </button>

            {/* Mute / Unmute button */}
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-black/75"
            >
              {isMuted ? (
                <>
                  <VolumeX size={15} className="text-red-400" />
                  <span>Unmute</span>
                </>
              ) : (
                <>
                  <Volume2 size={15} className="text-green-400" />
                  <span>Sound on</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-black/40 px-3 py-1 text-xs backdrop-blur-sm sm:inline-block">
              FoodĒwà Labs Intro
            </span>
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Fullscreen"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/75"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Floating Badges */}
      <div className="pointer-events-none absolute -left-4 top-10 animate-float rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-primary shadow-[var(--shadow-soft)]">
        <span className="inline-flex items-center gap-2">
          <Sparkles size={14} className="text-accent" /> Nutrition Made Simple
        </span>
      </div>
      <div
        className="pointer-events-none absolute -right-3 bottom-16 animate-float rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-primary shadow-[var(--shadow-soft)]"
        style={{ animationDelay: "1.5s" }}
      >
        <span className="inline-flex items-center gap-2">
          <Newspaper size={14} className="text-accent" /> Industry Insights & News
        </span>
      </div>
    </div>
  );
}
