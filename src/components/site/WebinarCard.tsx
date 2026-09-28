import { ArrowUpRight, PlayCircle, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { dateParts, formatEventDate, type Webinar } from "@/lib/site-store";

export function WebinarCard({ webinar }: { webinar: Webinar }) {
  const { day, month } = dateParts(webinar.date);
  const isUpcoming = webinar.status === "upcoming";
  const [showFlyer, setShowFlyer] = useState(false);

  return (
    <article className="surface-card flex h-full flex-col gap-5 p-6 sm:flex-row sm:items-start">
      <div className="flex sm:flex-col items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl gradient-green text-primary-foreground shadow-sm">
          <span className="font-display text-xl font-extrabold leading-none">{day}</span>
          <span className="mt-1 text-[0.6rem] font-bold tracking-[0.14em]">{month}</span>
        </div>

        {webinar.flyerImage && (
          <button
            type="button"
            onClick={() => setShowFlyer(true)}
            className="group relative w-20 h-28 sm:w-24 sm:h-32 shrink-0 overflow-hidden rounded-2xl border border-border shadow-md transition-all hover:scale-[1.03] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
            title="Click to view full flyer"
          >
            <img
              src={webinar.flyerImage}
              alt={webinar.title}
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 text-white p-1 text-center">
              <ImageIcon size={20} className="mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">View Flyer</span>
            </div>
            <div className="absolute bottom-1 right-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[9px] font-semibold text-white backdrop-blur-xs">
              Flyer
            </div>
          </button>
        )}
      </div>

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Live on Google Meet
          </span>
          <span className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
            Free to Attend
          </span>
        </div>

        <h3 className="mt-3 font-display text-xl font-bold text-primary sm:text-2xl leading-snug">
          {webinar.title}
        </h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          {formatEventDate(webinar.date)} · {webinar.time}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{webinar.summary}</p>

        {/* Speakers List */}
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-border/70 bg-card p-3">
            <p className="text-xs font-semibold text-accent uppercase tracking-wider">Speaker</p>
            <p className="font-display font-bold text-primary text-sm mt-0.5">Mohd Safiyan</p>
            <p className="text-xs text-muted-foreground">Food Technologist</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card p-3">
            <p className="text-xs font-semibold text-accent uppercase tracking-wider">Speaker</p>
            <p className="font-display font-bold text-primary text-sm mt-0.5">Innocent Etobenume</p>
            <p className="text-xs text-muted-foreground">Food Scientist & Impact Advocate</p>
          </div>
        </div>

        <div className="mt-3 text-xs text-muted-foreground">
          For more enquiries: <span className="font-semibold text-foreground">+234 708 923 9827</span>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {isUpcoming ? (
            <>
              <a
                href={webinar.zoomLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full gradient-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Register for Free (Google Form) <ArrowUpRight size={16} />
              </a>
              {webinar.flyerImage && (
                <button
                  type="button"
                  onClick={() => setShowFlyer(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
                >
                  <ImageIcon size={16} /> View Official Flyer
                </button>
              )}
            </>
          ) : (
            <a
              href={webinar.zoomLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
            >
              <PlayCircle size={16} /> Watch replay & slides
            </a>
          )}
        </div>
      </div>

      {webinar.flyerImage && (
        <Dialog open={showFlyer} onOpenChange={setShowFlyer}>
          <DialogContent className="max-w-lg max-h-[94vh] w-[95vw] flex flex-col p-4 bg-card border-border overflow-hidden gap-3">
            <DialogTitle className="sr-only">{webinar.title} Flyer</DialogTitle>
            
            {/* Fully scalable container that preserves all flyer details */}
            <div className="flex-1 min-h-0 flex items-center justify-center overflow-auto rounded-xl bg-black/5 p-1">
              <img
                src={webinar.flyerImage}
                alt={webinar.title}
                className="max-h-[calc(90vh-95px)] w-auto max-w-full object-contain rounded-lg shadow-sm"
              />
            </div>

            {/* Modal actions */}
            <div className="shrink-0 flex flex-wrap items-center justify-center gap-3 pt-1">
              <a
                href={webinar.zoomLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full gradient-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
              >
                Register on Google Form <ArrowUpRight size={15} />
              </a>
              <a
                href={webinar.flyerImage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-xs font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
              >
                Open Original Image
              </a>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </article>
  );
}
