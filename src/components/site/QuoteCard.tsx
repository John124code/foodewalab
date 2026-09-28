import { Check, Copy, Download, Maximize2, Quote as QuoteIcon, Share2, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Quote } from "@/lib/site-store";

export function QuoteCard({ quote, featured = false }: { quote: Quote; featured?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const full = quote.caption
    ? `"${quote.text}"\n\n${quote.caption}\n\n— ${quote.author}`
    : `"${quote.text}"\n\n— ${quote.author}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
      toast.success("Quote & message copied — ready to paste anywhere.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy is blocked in this browser.");
    }
  }

  async function share() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: quote.theme, text: full });
        return;
      } catch {
        /* user cancelled */
      }
    }
    void copy();
  }

  return (
    <article
      className={`surface-card flex h-full flex-col overflow-hidden p-6 ${featured ? "bg-primary text-primary-foreground" : ""}`}
    >
      {/* Flyer Image Preview if available */}
      {quote.image && (
        <div className="group relative -mx-6 -mt-6 mb-5 overflow-hidden border-b border-border bg-black/5">
          <img
            src={quote.image}
            alt={quote.text}
            className="w-full aspect-[4/3] sm:aspect-square object-cover object-top transition-transform duration-500 group-hover:scale-105 cursor-pointer"
            onClick={() => setShowImage(true)}
          />
          <button
            type="button"
            onClick={() => setShowImage(true)}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xs transition-colors hover:bg-black/90"
            title="Expand Flyer"
          >
            <Maximize2 size={12} /> View Flyer
          </button>
        </div>
      )}

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
        className={`mt-4 font-display text-lg font-bold leading-snug ${
          featured ? "text-primary-foreground" : "text-primary"
        }`}
      >
        {quote.text}
      </p>

      {quote.caption && (
        <p
          className={`mt-3 text-sm leading-relaxed whitespace-pre-line ${
            featured ? "text-primary-foreground/80" : "text-muted-foreground"
          }`}
        >
          {quote.caption}
        </p>
      )}

      <p
        className={`mt-4 text-xs font-semibold uppercase tracking-wider ${
          featured ? "text-primary-foreground/70" : "text-muted-foreground"
        }`}
      >
        — {quote.author}
      </p>

      <div className="mt-6 flex flex-wrap gap-2 pt-2 border-t border-border/50">
        <button
          type="button"
          onClick={copy}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-transform duration-300 hover:-translate-y-0.5 ${
            featured
              ? "bg-accent text-accent-foreground"
              : "border border-border bg-background text-primary hover:border-accent"
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy Quote"}
        </button>
        <button
          type="button"
          onClick={share}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-transform duration-300 hover:-translate-y-0.5 ${
            featured
              ? "border border-primary-foreground/30 text-primary-foreground"
              : "border border-border bg-background text-primary hover:border-accent"
          }`}
        >
          <Share2 size={14} /> Share
        </button>
        {quote.image && (
          <button
            type="button"
            onClick={() => setShowImage(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
          >
            <ImageIcon size={14} /> Flyer
          </button>
        )}
      </div>

      {quote.image && (
        <Dialog open={showImage} onOpenChange={setShowImage}>
          <DialogContent className="max-w-md max-h-[92vh] w-[95vw] flex flex-col p-4 bg-card border-border overflow-hidden gap-3">
            <DialogTitle className="sr-only">{quote.theme} Flyer</DialogTitle>
            <div className="flex-1 min-h-0 flex items-center justify-center overflow-auto rounded-xl bg-black/5 p-1">
              <img
                src={quote.image}
                alt={quote.text}
                className="max-h-[calc(90vh-90px)] w-auto max-w-full object-contain rounded-lg shadow-sm"
              />
            </div>
            <div className="shrink-0 flex flex-wrap items-center justify-center gap-2 pt-1">
              <a
                href={quote.image}
                download
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
              >
                <Download size={13} /> Save Flyer
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(full)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/30 px-3.5 py-2 text-xs font-semibold transition-colors"
                title="Share on WhatsApp"
              >
                <Share2 size={13} /> WhatsApp
              </a>
              <a
                href={quote.image}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full gradient-accent px-4 py-2 text-xs font-semibold text-accent-foreground shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Open Full
              </a>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </article>
  );
}
