import { CalendarDays, Clock, UserRound, Video } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatEventDate, type Webinar } from "@/lib/site-store";

export function RsvpDialog({ webinar, trigger }: { webinar: Webinar; trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary">{webinar.title}</DialogTitle>
          <DialogDescription>
            Reserve a free seat. We will email the Zoom link before the session.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-xl bg-warm p-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <CalendarDays size={15} className="text-accent" /> {formatEventDate(webinar.date)}
          </p>
          <p className="mt-2 flex items-center gap-2">
            <Clock size={15} className="text-accent" /> {webinar.time}
          </p>
          <p className="mt-2 flex items-center gap-2">
            <UserRound size={15} className="text-accent" /> {webinar.speaker} ·{" "}
            {webinar.credentials}
          </p>
        </div>

        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success(`Seat reserved, ${name.split(" ")[0] || "friend"}! Check your inbox.`);
            setOpen(false);
            setName("");
            setEmail("");
          }}
        >
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full gradient-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Video size={16} /> Confirm free RSVP
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
