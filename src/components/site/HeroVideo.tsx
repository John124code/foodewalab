import { motion } from "motion/react";
import { Play, Sparkles, Newspaper } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import poster from "@/assets/hero-video-poster.jpg";

export function HeroVideo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-[var(--shadow-lift)]"
      >
        <img
          src={poster}
          alt="FoodĒwà food scientists analysing fresh produce in the lab"
          width={1280}
          height={960}
          className="h-[320px] w-full object-cover sm:h-[420px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,oklch(0.24_0.05_155/0.72))]" />

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play the 30-second FoodĒwà intro"
          className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full gradient-accent text-accent-foreground transition-transform duration-300 hover:scale-105"
        >
          <span className="absolute inset-0 animate-ripple rounded-full bg-accent" />
          <span
            className="absolute inset-0 animate-ripple rounded-full bg-accent"
            style={{ animationDelay: "1.2s" }}
          />
          <Play size={28} className="relative ml-1 fill-current" />
        </button>

        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-primary-foreground">
          <p className="font-display text-sm font-semibold">30-second company intro</p>
          <span className="rounded-full bg-background/20 px-3 py-1 text-xs backdrop-blur-sm">
            0:30
          </span>
        </div>
      </motion.div>

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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl overflow-hidden p-0">
          <DialogTitle className="sr-only">FoodĒwà Labs intro video</DialogTitle>
          <div className="relative aspect-video w-full bg-primary">
            <img
              src={poster}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-35"
            />
            <div className="relative flex h-full flex-col items-center justify-center gap-3 px-8 text-center text-primary-foreground">
              <span className="flex h-14 w-14 items-center justify-center rounded-full gradient-accent">
                <Play size={22} className="ml-1 fill-current text-accent-foreground" />
              </span>
              <p className="font-display text-xl font-bold">
                Reimagining Nutrition. Empowering People.
              </p>
              <p className="max-w-md text-sm text-primary-foreground/80">
                Our 30-second intro film is being finalised. Share your final video file and it will
                play right here.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
