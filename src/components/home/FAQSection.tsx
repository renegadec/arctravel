"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { PlusSmallIcon, MinusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "How much does it cost to get a quote?",
    answer:
      "Nothing. Quotes are completely free and there's no obligation to book. Tell us your destination, dates, and preferences and we'll come back with options — including a breakdown so you know exactly what you're paying for.",
  },
  {
    question: "How far in advance should I book my trip?",
    answer:
      "For international flights we recommend 6–10 weeks out for the best fares; regional trips work well 3–6 weeks ahead. That said, we regularly pull together great itineraries at the last minute — send us your dates and we'll work with what we have.",
  },
  {
    question: "Can you help with visas?",
    answer:
      "Yes — visa assistance is one of our core services. We check requirements for your nationality and destination, review your documents before submission, handle the application, and track it through to approval. This is especially useful for multi-country trips.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept EcoCash, bank transfer, and USD cash for local bookings. For international components (airlines, hotels abroad) we'll confirm the payment options available at the time of booking.",
  },
  {
    question: "What happens if my flight changes or gets cancelled?",
    answer:
      "We track your bookings and rebook on your behalf when schedules change. Our support line is available 24/7 during your trip, so if something goes wrong on the road, you call us — not an airline hold line.",
  },
  {
    question: "Do you only handle international travel?",
    answer:
      "Not at all. We book domestic trips across Zimbabwe — Victoria Falls, Hwange, the Eastern Highlands and more — plus regional travel across Southern Africa and long-haul international journeys.",
  },
  {
    question: "Can you plan trips for groups or corporate clients?",
    answer:
      "Yes. We handle group tours, family reunions, corporate travel, events, and incentive trips. For companies we can set up a travel account with consolidated billing and a dedicated contact person.",
  },
  {
    question: "What if I need to change or cancel my booking?",
    answer:
      "We'll walk you through your options — change fees vary by airline and hotel policy, and we'll always check whether rebooking or refund is the better route before you pay anything extra.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
            Good to know
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#002a62] sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            The answers our clients ask for most. Anything else — just ask.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <dl className="divide-y divide-slate-200">
            {faqs.map((faq) => (
              <Disclosure key={faq.question} as="div" className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <DisclosureButton className="group flex w-full cursor-pointer items-start justify-between gap-6 text-left">
                    <span className="text-base font-semibold text-[#002a62] sm:text-lg">
                      {faq.question}
                    </span>
                    <span className="flex h-7 shrink-0 items-center">
                      <PlusSmallIcon className="size-6 text-[#ff8912] transition-transform group-data-open:rotate-45" />
                      <MinusSmallIcon className="hidden size-6 text-[#ff8912]" />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel
                  as="dd"
                  unmount={false}
                  className="mt-3 pr-8 sm:pr-16"
                >
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                    {faq.answer}
                  </p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
