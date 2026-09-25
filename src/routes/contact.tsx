import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Join — FoodĒwà Labs" },
      {
        name: "description",
        content:
          "Reach the FoodĒwà Labs team or join the WhatsApp community for webinars, opportunities and peer support.",
      },
      { property: "og:title", content: "Contact & Join — FoodĒwà Labs" },
      {
        property: "og:description",
        content: "Send us a message or join the FoodĒwà WhatsApp community.",
      },
    ],
  }),
  component: ContactPage,
});

const perks = [
  "Early access to every free webinar and replay",
  "Weekly Mindset Monday prompts and career roadmaps",
  "Job, internship and research opportunity drops",
  "Peer review on CVs, projects and lab reports",
];

const empty = { name: "", email: "", discipline: "", message: "" };

function ContactPage() {
  const [form, setForm] = useState(empty);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Contact"
          green="Say hello,"
          orange="or come right in."
          description="Questions, speaking requests, partnerships — or simply join the community and start learning this week."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <form
              className="surface-card space-y-4 p-7"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Message sent — we reply within two working days.");
                setForm(empty);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Full name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                />
              </div>
              <Field
                label="Discipline / Institution"
                value={form.discipline}
                onChange={(v) => setForm({ ...form, discipline: v })}
              />
              <label className="block text-sm">
                <span className="font-medium text-primary">Message</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full gradient-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Send size={16} /> Send message
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="surface-card h-full bg-primary p-7 text-primary-foreground">
              <h3 className="font-display text-2xl font-extrabold">
                Join our WhatsApp Community
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
                Where the sessions, roadmaps and opportunities actually land first.
              </p>
              <ul className="mt-6 space-y-3">
                {perks.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-primary-foreground/90">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href="https://chat.whatsapp.com/"
                className="mt-7 inline-flex items-center gap-2 rounded-full gradient-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle size={16} /> Join the community
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-primary">{label}</span>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
      />
    </label>
  );
}
