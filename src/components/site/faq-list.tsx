"use client";

import { useState } from "react";
import { Icon } from "@/components/site/icons";
import { cn } from "@/lib/utils";

export function FaqList({ items }: { items: { id: string; question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-2xl border transition-colors",
              open ? "border-brand-300 bg-white" : "border-slate-200 bg-white"
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-semibold text-brand-900">{item.question}</span>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                  open ? "bg-brand-900 text-gold-400" : "bg-slate-100 text-slate-500"
                )}
              >
                <Icon name={open ? "x" : "plus"} className="h-4 w-4" />
              </span>
            </button>
            {open && (
              <div className="border-t border-slate-100 px-6 py-5 text-sm leading-relaxed text-slate-600">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
