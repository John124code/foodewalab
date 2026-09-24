import { Check, Copy, Quote as QuoteIcon, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Quote } from "@/lib/site-store";

export function QuoteCard({ quote, featured = false }: { quote: Quote; featured?: boolean }) {
  const [copied, setCopied] = useState(false);
  const full = `"${quote.text}" — ${quote.author}, FoodĒwà Labs`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
      toast.success("Quote copied — ready to paste anywhere.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy is blocked in this browser.");
    }
  }

  async function share() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: "FoodĒwà Mindset", text: full });
        return;
      } catch {
        /* user cancelled */
      }
    }
    void copy();
  }

  return (
    <article
      className={`surface-card flex h-full flex-col p-6 ${featured ? "bg-primary text-primary-foreground" : ""}`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] ${
            featured ? "bg-accent text-accent-foreground" : "bg-accent-soft text-accent"
          }`}
        >
          {quote.theme}
        </span>
        <QuoteIcon
          size={22}
          className={featured ? "text-primary-foreground/50" : "text-primary/25"}
        />
      </div>

      <p
        className={`mt-5 flex-1 font-display text-xl font-semibold leading-snug ${
          featured ? "text-primary-foreground" : "text-primary"
        }`}
      >
        {quote.text}
      </p>

      <p
        className={`mt-4 text-sm ${featured ? "text-primary-foreground/75" : "text-muted-foreground"}`}
      >
        — {quote.author}
      </p>

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={copy}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 ${
            featured
              ? "bg-accent text-accent-foreground"
              : "border border-border bg-background text-primary hover:border-accent"
          }`}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Copied" : "Copy Quote"}
        </button>
        <button
          type="button"
          onClick={share}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 ${
            featured
              ? "border border-primary-foreground/30 text-primary-foreground"
              : "border border-border bg-background text-primary hover:border-accent"
          }`}
        >
          <Share2 size={15} /> Share
        </button>
      </div>
    </article>
  );
}
