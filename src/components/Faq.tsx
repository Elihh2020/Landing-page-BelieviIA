"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import { FAQ_ITEMS } from "@/lib/faqData";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-believi-dark-deeper py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-heading text-2xl font-bold leading-tight text-believi-white sm:text-3xl">
            Perguntas <span className="text-believi-cyan">frequentes</span>
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-believi-white/10 border-y border-believi-white/10">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-button-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left font-heading text-base font-semibold text-believi-white sm:text-lg"
                  >
                    {item.question}
                    <ChevronDown
                      size={20}
                      aria-hidden
                      className={`flex-none text-believi-cyan transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  hidden={!isOpen}
                  className="pb-5"
                >
                  <p className="font-body text-sm leading-relaxed text-believi-gray sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
