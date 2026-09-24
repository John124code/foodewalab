import { ArrowUpRight, PlayCircle, UserRound } from "lucide-react";
import { dateParts, formatEventDate, type Webinar } from "@/lib/site-store";
import { RsvpDialog } from "./RsvpDialog";

export function WebinarCard({ webinar }: { webinar: Webinar }) {
  const { day, month } = dateParts(webinar.date);
  const isUpcoming = webinar.status === "upcoming";

  return (
    <article className="surface-card flex h-full flex-col gap-4 p-6 sm:flex-row sm:items-start">
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl gradient-green text-primary-foreground">
        <span className="font-display text-xl font-extrabold leading-none">{day}</span>
        <span className="mt-1 text-[0.6rem] font-bold tracking-[0.14em]">{month}</span>
      </div>

      <div className="flex-1">
        <h3 className="font-display text-lg font-bold text-primary">{webinar.title}</h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-accent">
          {formatEventDate(webinar.date)} · {webinar.time}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{webinar.summary}</p>
        <p className="mt-3 flex items-center gap-2 text-sm text-foreground/80">
          <UserRound size={15} className="text-primary" />
          <span className="font-semibold">{webinar.speaker}</span>
          <span className="text-muted-foreground">· {webinar.credentials}</span>
        </p>

        <div className="mt-5">
          {isUpcoming ? (
            <RsvpDialog
              webinar={webinar}
              trigger={
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full gradient-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  RSVP for Free <ArrowUpRight size={15} />
                </button>
              }
            />
          ) : (
            <a
              href={webinar.zoomLink}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
            >
              <PlayCircle size={16} /> Watch replay & slides
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
