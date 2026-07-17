"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services } from "@/lib/constants";
import {
  Plane,
  CheckCircle,
  Check,
  ArrowRight,
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Sparkles,
  Send,
} from "lucide-react";

const formSchema = z.object({
  // Step 1: Service
  service: z.string().min(1, "Select at least one service"),
  // Step 2: Trip details
  destination: z.string().min(2, "Enter your destination"),
  departureDate: z.string().min(1, "Select your departure date"),
  returnDate: z.string().optional(),
  travellers: z.string().min(1, "Enter number of travellers"),
  // Step 3: Preferences
  budget: z.string().min(1, "Select a budget range"),
  accommodation: z.string().optional(),
  extras: z.string().optional(),
  // Step 4: Contact
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(5, "Enter a valid phone number"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const budgetRanges = [
  "Budget (economy, basic accommodation)",
  "Mid-Range (comfortable, good value)",
  "Premium (quality experiences, better hotels)",
  "Luxury (top-end, no compromises)",
];

const accommodationOptions = [
  "No preference",
  "Hotel / Resort",
  "Lodge",
  "Bed & Breakfast / Guesthouse",
  "Self-catering / Apartment",
  "Safari Camp",
];

const steps = [
  { label: "Service", icon: Sparkles },
  { label: "Trip Details", icon: MapPin },
  { label: "Preferences", icon: DollarSign },
  { label: "Contact", icon: Users },
];

interface Step2Fields {
  heading: string;
  destLabel: string;
  destPlaceholder: string;
  date1Label: string;
  date2Label: string | null;
  date2Optional?: boolean;
  date2Field?: "departureDate" | "returnDate";
  peopleLabel: string;
}

const step2Fields: Record<string, Step2Fields> = {
  default: {
    heading: "Tell us about your trip",
    destLabel: "Destination",
    destPlaceholder: "e.g. Victoria Falls, Cape Town, London...",
    date1Label: "Departure Date",
    date2Label: "Return Date",
    date2Optional: true,
    peopleLabel: "Number of Travellers",
  },
  "Flight Booking & Itinerary Curation": {
    heading: "Where are you flying?",
    destLabel: "Route",
    destPlaceholder: "Harare → Cape Town",
    date1Label: "Departure Date",
    date2Label: "Return Date",
    date2Optional: true,
    peopleLabel: "Number of Passengers",
  },
  "Hotel, Lodge & Resort Accommodations": {
    heading: "Where do you want to stay?",
    destLabel: "Location",
    destPlaceholder: "e.g. Victoria Falls, Nyanga, Johannesburg...",
    date1Label: "Check-in Date",
    date2Label: "Check-out Date",
    peopleLabel: "Number of Guests",
  },
  "Ground Transportation": {
    heading: "Where are you going?",
    destLabel: "Route",
    destPlaceholder: "Harare → Bulawayo",
    date1Label: "Travel Date",
    date2Label: "Return Date",
    date2Optional: true,
    peopleLabel: "Number of Passengers",
  },
  "Private Charter Flights": {
    heading: "Plan your charter",
    destLabel: "Route",
    destPlaceholder: "Departure airport → Destination",
    date1Label: "Departure Date",
    date2Label: "Return Date",
    date2Optional: true,
    peopleLabel: "Number of Passengers",
  },
  "Airport Transfers": {
    heading: "Arrange your transfer",
    destLabel: "Drop-off Address",
    destPlaceholder: "Hotel, lodge, or residence address...",
    date1Label: "Arrival Date",
    date2Label: null,
    peopleLabel: "Number of Passengers",
  },
  "Guided Tours": {
    heading: "Where do you want to explore?",
    destLabel: "Tour Destination",
    destPlaceholder: "e.g. Hwange, Great Zimbabwe, Cape Town...",
    date1Label: "Preferred Date",
    date2Label: "End Date",
    date2Optional: true,
    peopleLabel: "Group Size",
  },
  "Travel Insurance": {
    heading: "Cover your trip",
    destLabel: "Destination",
    destPlaceholder: "e.g. Anywhere abroad, Europe, SADC...",
    date1Label: "Departure Date",
    date2Label: "Return Date",
    peopleLabel: "Number of Travellers",
  },
  "Visa Assistance": {
    heading: "Where are you applying for?",
    destLabel: "Destination Country",
    destPlaceholder: "e.g. UK, USA, Schengen...",
    date1Label: "Travel Date",
    date2Label: "Return Date",
    date2Optional: true,
    peopleLabel: "Number of Applicants",
  },
  "Day Trip Packages": {
    heading: "Plan your day out",
    destLabel: "Destination",
    destPlaceholder: "e.g. Vic Falls, Great Zimbabwe, Nyanga...",
    date1Label: "Trip Date",
    date2Label: null,
    peopleLabel: "Number of People",
  },
  "Group Tour Packages": {
    heading: "Tell us about your group",
    destLabel: "Destination",
    destPlaceholder: "e.g. Vic Falls, Zanzibar, Cape Town...",
    date1Label: "Start Date",
    date2Label: "End Date",
    date2Optional: true,
    peopleLabel: "Group Size",
  },
  "Corporate Events": {
    heading: "Plan your corporate event",
    destLabel: "Event Location",
    destPlaceholder: "e.g. Victoria Falls, Harare, Kariba...",
    date1Label: "Start Date",
    date2Label: "End Date",
    date2Optional: true,
    peopleLabel: "Number of Attendees",
  },
  "Cruise Bookings": {
    heading: "Where do you want to cruise?",
    destLabel: "Cruise Region",
    destPlaceholder: "e.g. Mediterranean, Indian Ocean, Zambezi...",
    date1Label: "Preferred Date",
    date2Label: "Return Date",
    date2Optional: true,
    peopleLabel: "Number of Passengers",
  },
  "Car Rentals": {
    heading: "Arrange your vehicle",
    destLabel: "Pick-up Location",
    destPlaceholder: "e.g. Harare, Bulawayo, Airport...",
    date1Label: "Pick-up Date",
    date2Label: "Drop-off Date",
    date2Optional: true,
    peopleLabel: "Driver Age",
  },
};

export default function BookingForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "",
      destination: "",
      departureDate: "",
      returnDate: "",
      travellers: "1",
      budget: "",
      accommodation: "",
      extras: "",
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const watchService = watch("service");
  const watchBudget = watch("budget");
  const watchAccommodation = watch("accommodation");
  const searchParams = useSearchParams();
  const prefilled = useRef(false);

  // Pre-fill from query params (package bookings)
  useEffect(() => {
    if (prefilled.current) return;
    const svc = searchParams.get("service");
    const dest = searchParams.get("destination");
    const budget = searchParams.get("budget");
    const travellers = searchParams.get("travellers");
    const notes = searchParams.get("notes");

    if (svc) {
      setValue("service", svc);
    }
    if (dest) {
      setValue("destination", dest);
    }
    if (budget) {
      setValue("budget", budget);
    }
    if (travellers) {
      setValue("travellers", travellers);
    }
    if (notes) {
      setValue("notes", notes);
    }

    // If we have service + destination, skip to preferences
    if (svc && dest) {
      prefilled.current = true;
      setStep(2);
    }
  }, [searchParams, setValue]);

  async function nextStep() {
    let fields: (keyof FormValues)[] = [];
    if (step === 0) fields = ["service"];
    else if (step === 1) fields = ["destination", "departureDate", "travellers"];
    else if (step === 2) fields = ["budget"];
    else return;

    const valid = await trigger(fields);
    if (valid) setStep((s) => s + 1);
  }

  function prevStep() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function onSubmit(data: FormValues) {
    try {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "Booking Form" }),
      });
    } catch (err) {
      console.error("Failed to send notification:", err);
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold">Booking Request Received!</h2>
        <p className="mt-2 max-w-md text-muted-foreground">
          Thanks, {watch("name").split(" ")[0]}! We&apos;ll review your
          request and get back to you within 24 hours with options and a
          quote.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
          <Link href="/services">
            <Button className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer">
              <Sparkles className="mr-2 h-4 w-4" />
              Explore Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Step indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  i < step
                    ? "bg-green-500 text-white"
                    : i === step
                      ? "border-2 border-green-400 bg-green-50 text-green-600"
                      : "border border-border bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <s.icon className="h-4 w-4" />
                )}
              </div>
              <span
                className={`ml-2 hidden text-sm font-medium sm:inline ${
                  i <= step ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`mx-3 hidden h-px w-12 sm:block ${
                    i < step ? "bg-green-400" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="min-h-[320px]">
        {/* Step 0: Service Selection */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold">What do you need help with?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Select the service that best matches your trip needs
              </p>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {services.map((service) => (
                <button
                  type="button"
                  key={service.href}
                  onClick={() => setValue("service", service.title)}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${
                    watchService === service.title
                      ? "border-green-400 bg-green-50 shadow-sm"
                      : "border-border bg-card hover:border-green-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#002a62]/10 text-[#002a62]">
                    <service.icon className="h-4 w-4" />
                  </div>
                  <span className="flex-1 text-sm font-medium leading-tight">{service.title}</span>
                  {watchService === service.title && (
                    <Check className="h-4 w-4 shrink-0 text-green-600" />
                  )}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setValue("service", "Multiple / Not Sure")}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${
                  watchService === "Multiple / Not Sure"
                    ? "border-green-400 bg-green-50 shadow-sm"
                    : "border-border bg-card hover:border-green-300 hover:shadow-sm"
                }`}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-gray-500">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="flex-1 text-sm font-medium leading-tight">Not sure</span>
                {watchService === "Multiple / Not Sure" && (
                  <Check className="h-4 w-4 shrink-0 text-green-600" />
                )}
              </button>
            </div>
            {errors.service && (
              <p className="text-xs text-destructive">{errors.service.message}</p>
            )}
          </div>
        )}

        {/* Step 1: Trip Details */}
        {step === 1 && (() => {
          const fields = step2Fields[watchService] || step2Fields.default;
          return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold">{fields.heading}</h2>
              <div className="mt-2 flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/[0.02] p-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  {(() => {
                    const svc = services.find((s) => s.title === watchService);
                    if (!svc) return <Sparkles className="h-4 w-4" />;
                    const Icon = svc.icon;
                    return <Icon className="h-4 w-4" />;
                  })()}
                </div>
                <div>
                  <p className="text-sm font-medium">{watchService}</p>
                  <p className="text-xs text-muted-foreground">
                    {services.find((s) => s.title === watchService)?.description ?? ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {fields.destLabel} <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  {...register("destination")}
                  placeholder={fields.destPlaceholder}
                  className="flex h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              {errors.destination && (
                <p className="text-xs text-destructive">{errors.destination.message}</p>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {fields.date1Label} <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="date"
                    {...register("departureDate")}
                    className="flex h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                {errors.departureDate && (
                  <p className="text-xs text-destructive">{errors.departureDate.message}</p>
                )}
              </div>
              {fields.date2Label && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {fields.date2Label} <span className="text-muted-foreground">{fields.date2Optional ? "(optional)" : ""}</span>
                  </label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="date"
                      {...register(fields.date2Field || "returnDate")}
                      className="flex h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {fields.peopleLabel} <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="number"
                  min="1"
                  {...register("travellers")}
                  placeholder="e.g. 2"
                  className="flex h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              {errors.travellers && (
                <p className="text-xs text-destructive">{errors.travellers.message}</p>
              )}
            </div>
          </div>
          );
        })()}

        {/* Step 2: Preferences */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold">Your preferences</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Help us tailor the experience to your style and budget
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Budget Range <span className="text-destructive">*</span>
              </label>
              <div className="grid gap-2">
                {budgetRanges.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setValue("budget", b)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                      watchBudget === b
                        ? "border-green-400 bg-green-50 shadow-sm"
                        : "border-border bg-card hover:border-green-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <DollarSign className={`h-5 w-5 ${watchBudget === b ? "text-green-600" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium">{b}</span>
                    </div>
                    {watchBudget === b && (
                      <Check className="h-5 w-5 shrink-0 text-green-600" />
                    )}
                  </button>
                ))}
              </div>
              {errors.budget && (
                <p className="text-xs text-destructive">{errors.budget.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Accommodation Preference <span className="text-muted-foreground">(optional)</span>
              </label>
              <Select
                value={watchAccommodation}
                onValueChange={(v) => setValue("accommodation", v ?? "")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preference..." />
                </SelectTrigger>
                <SelectContent>
                  {accommodationOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Extras or Special Requests <span className="text-muted-foreground">(optional)</span>
              </label>
              <Textarea
                {...register("extras")}
                placeholder="Dietary requirements, mobility needs, specific activities, celebrations..."
                className="min-h-[80px] resize-y"
              />
            </div>
          </div>
        )}

        {/* Step 3: Contact Info */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold">Your contact details</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We&apos;ll use these to send your quote and options
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <Input
                  {...register("name")}
                  placeholder="Your name"
                  className={errors.name ? "border-destructive/50" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  type="email"
                  {...register("email")}
                  placeholder="you@example.com"
                  className={errors.email ? "border-destructive/50" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Phone Number <span className="text-destructive">*</span>
              </label>
              <Input
                type="tel"
                {...register("phone")}
                placeholder="+263 XXX XXX XXX"
                className={errors.phone ? "border-destructive/50" : ""}
              />
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Additional Notes <span className="text-muted-foreground">(optional)</span>
              </label>
              <Textarea
                {...register("notes")}
                placeholder="Anything else we should know?"
                className="min-h-[80px] resize-y"
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
        <div>
          {step > 0 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
        </div>
        <div className="flex gap-3">
          {step < steps.length - 1 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-[#ff8912] text-white hover:bg-[#e67a00] shadow-lg shadow-[#ff8912]/25 active:scale-[0.97] transition-all cursor-pointer"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/25 active:scale-[0.97] transition-all cursor-pointer"
            >
              <Send className="mr-2 h-4 w-4" />
              Submit Booking Request
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
