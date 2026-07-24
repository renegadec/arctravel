"use client";

import { useState, useCallback, useRef } from "react";
import {
  Plane,
  Search,
  ArrowRight,
  Clock,
  PlaneTakeoff,
  PlaneLanding,
  Luggage,
  Wifi,
  Usb,
  Tv,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Percent,
  DollarSign,
  RefreshCw,
  Building2,
  Users,
  Calendar,
  Shuffle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ─── Types ───────────────────────────────────────────────

interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

interface FlightSegment {
  departure_airport: { name: string; id: string; time: string };
  arrival_airport: { name: string; id: string; time: string };
  duration: number;
  airline: string;
  airline_logo: string;
  flight_number: string;
  travel_class: string;
  extensions?: string[];
  airplane?: string;
  legroom?: string;
  overnight?: boolean;
  often_delayed_by_over_30_min?: boolean;
  ticket_also_sold_by?: string[];
}

interface Layover {
  duration: number;
  name: string;
  id: string;
  overnight?: boolean;
}

interface FlightItinerary {
  flights: FlightSegment[];
  layovers: Layover[];
  total_duration: number;
  price?: number;
  type: string;
  airline_logo: string;
  departure_token?: string;
  carbon_emissions?: {
    this_flight: number;
    typical_for_this_route: number;
    difference_percent: number;
  };
  return_flights?: {
    flights: FlightSegment[];
    layovers: Layover[];
    total_duration: number;
  };
}

interface LegResults {
  label: string;
  departureCode: string;
  arrivalCode: string;
  date: string;
  best: FlightItinerary[];
  other: FlightItinerary[];
  loading: boolean;
  error: string | null;
  booking_token?: string | null;
}

// ─── Common Airports ─────────────────────────────────────

const COMMON_AIRPORTS: Airport[] = [
  { code: "HRE", name: "Robert Gabriel Mugabe International", city: "Harare", country: "Zimbabwe" },
  { code: "VFA", name: "Victoria Falls International", city: "Victoria Falls", country: "Zimbabwe" },
  { code: "BUQ", name: "Joshua Mqabuko Nkomo International", city: "Bulawayo", country: "Zimbabwe" },
  { code: "JNB", name: "O.R. Tambo International", city: "Johannesburg", country: "South Africa" },
  { code: "CPT", name: "Cape Town International", city: "Cape Town", country: "South Africa" },
  { code: "DUR", name: "King Shaka International", city: "Durban", country: "South Africa" },
  { code: "NBO", name: "Jomo Kenyatta International", city: "Nairobi", country: "Kenya" },
  { code: "DAR", name: "Julius Nyerere International", city: "Dar es Salaam", country: "Tanzania" },
  { code: "ZNZ", name: "Abeid Amani Karume International", city: "Zanzibar", country: "Tanzania" },
  { code: "ADD", name: "Bole International", city: "Addis Ababa", country: "Ethiopia" },
  { code: "LUN", name: "Kenneth Kaunda International", city: "Lusaka", country: "Zambia" },
  { code: "GBE", name: "Sir Seretse Khama International", city: "Gaborone", country: "Botswana" },
  { code: "MBA", name: "Moi International", city: "Mombasa", country: "Kenya" },
  { code: "MRU", name: "Sir Seewoosagur Ramgoolam International", city: "Mauritius", country: "Mauritius" },
  { code: "SEZ", name: "Seychelles International", city: "Mahe", country: "Seychelles" },
  { code: "DXB", name: "Dubai International", city: "Dubai", country: "UAE" },
  { code: "DOH", name: "Hamad International", city: "Doha", country: "Qatar" },
  { code: "AUH", name: "Zayed International", city: "Abu Dhabi", country: "UAE" },
  { code: "LHR", name: "Heathrow", city: "London", country: "United Kingdom" },
  { code: "LGW", name: "Gatwick", city: "London", country: "United Kingdom" },
  { code: "CDG", name: "Charles de Gaulle", city: "Paris", country: "France" },
  { code: "AMS", name: "Schiphol", city: "Amsterdam", country: "Netherlands" },
  { code: "FRA", name: "Frankfurt am Main", city: "Frankfurt", country: "Germany" },
  { code: "IST", name: "Istanbul", city: "Istanbul", country: "Turkey" },
  { code: "BKK", name: "Suvarnabhumi", city: "Bangkok", country: "Thailand" },
  { code: "SIN", name: "Changi", city: "Singapore", country: "Singapore" },
  { code: "HKG", name: "Hong Kong International", city: "Hong Kong", country: "China" },
  { code: "PEK", name: "Beijing Capital International", city: "Beijing", country: "China" },
  { code: "NRT", name: "Narita International", city: "Tokyo", country: "Japan" },
  { code: "ICN", name: "Incheon International", city: "Seoul", country: "South Korea" },
  { code: "SYD", name: "Kingsford Smith", city: "Sydney", country: "Australia" },
  { code: "JFK", name: "John F. Kennedy International", city: "New York", country: "United States" },
  { code: "ATL", name: "Hartsfield-Jackson Atlanta", city: "Atlanta", country: "United States" },
];

// ─── Helpers ─────────────────────────────────────────────

function formatDuration(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m`;
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  } catch {
    return iso;
  }
}

function getTodayISO(): string {
  return new Date().toISOString().split("T")[0];
}

function getNextWeekISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split("T")[0];
}

function getExtIcon(ext: string) {
  const lower = ext.toLowerCase();
  if (lower.includes("wifi") || lower.includes("wi-fi")) return <Wifi className="h-3 w-3" />;
  if (lower.includes("power") || lower.includes("usb")) return <Usb className="h-3 w-3" />;
  if (lower.includes("video") || lower.includes("tv") || lower.includes("stream") || lower.includes("entertainment"))
    return <Tv className="h-3 w-3" />;
  if (lower.includes("legroom")) return <Luggage className="h-3 w-3" />;
  return null;
}

function googleFlightsUrl(itinerary: FlightItinerary): string {
  const from = itinerary.flights[0]?.departure_airport.id || "";
  const to = itinerary.flights[itinerary.flights.length - 1]?.arrival_airport.id || "";
  const date = itinerary.flights[0]?.departure_airport.time?.split(" ")[0] || "";
  const q = encodeURIComponent(`Flights from ${from} to ${to} on ${date}`);
  return `https://www.google.com/travel/flights?hl=en&q=${q}`;
}

// ─── Main Component ──────────────────────────────────────

export default function FlightPricingTool() {
  // Search state
  const [departureCode, setDepartureCode] = useState("HRE");
  const [arrivalCode, setArrivalCode] = useState("JNB");
  const [outboundDate, setOutboundDate] = useState(getNextWeekISO());
  const [returnDate, setReturnDate] = useState(getNextWeekISO());
  const [adults, setAdults] = useState("1");
  const [tripType, setTripType] = useState<"round" | "oneway">("round");

  // Flight search results (one leg for one-way, two legs for round trip)
  const [legs, setLegs] = useState<LegResults[]>([
    { label: "Departure", departureCode: "HRE", arrivalCode: "JNB", date: getNextWeekISO(), best: [], other: [], loading: false, error: null },
  ]);
  const [totalLoading, setTotalLoading] = useState(false);

  // Selected itineraries
  const [selectedOutbound, setSelectedOutbound] = useState<FlightItinerary | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<FlightItinerary | null>(null);

  // Premium state
  const premiumType = "percent" as const;
  const [premiumValue, setPremiumValue] = useState("20");

  // Expanded cards
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [copiedQuote, setCopiedQuote] = useState(false);

  // ─── Search ──────────────────────────────────────────

  const handleSearch = useCallback(async () => {
    if (!departureCode.trim() || !arrivalCode.trim() || !outboundDate) return;
    if (tripType === "round" && !returnDate) return;

    setTotalLoading(true);
    setSelectedOutbound(null);
    setSelectedReturn(null);
    setCopiedQuote(false);

    const from = departureCode.trim().toUpperCase();
    const to = arrivalCode.trim().toUpperCase();

    // Build searches: outbound + (return if round trip)
    const searches: { label: string; from: string; to: string; date: string }[] = [
      { label: `${from} → ${to}`, from, to, date: outboundDate },
    ];
    if (tripType === "round") {
      searches.push({
        label: `${to} → ${from}`,
        from: to,
        to: from,
        date: returnDate,
      });
    }

    const initialLegs: LegResults[] = searches.map((s) => ({
      label: s.label,
      departureCode: s.from,
      arrivalCode: s.to,
      date: s.date,
      best: [],
      other: [],
      loading: true,
      error: null,
    }));
    setLegs(initialLegs);

    // Fetch all legs in parallel
    const results = await Promise.all(
      searches.map(async (search, i) => {
        const params = new URLSearchParams({
          departure_id: search.from,
          arrival_id: search.to,
          outbound_date: search.date,
          type: "2",
          currency: "USD",
          hl: "en",
          adults,
        });

        try {
          const res = await fetch(`/api/staff/flight-search?${params.toString()}`);
          const data = await res.json();
          if (!res.ok) {
            return { ...initialLegs[i], loading: false, error: data.error || "Search failed" };
          }
          return {
            ...initialLegs[i],
            loading: false,
            best: data.best_flights || [],
            other: data.other_flights || [],
            error: null,
            booking_token: data.booking_token || null,
          };
        } catch {
          return { ...initialLegs[i], loading: false, error: "Network error — check your connection" };
        }
      })
    );

    setLegs(results);

    setTotalLoading(false);
    setExpandedCards(new Set());
  }, [departureCode, arrivalCode, outboundDate, returnDate, adults, tripType]);

  // ─── Premium calc ────────────────────────────────────

  const calcFinalPrice = useCallback(
    (basePrice: number): { premium: number; total: number } => {
      const val = parseFloat(premiumValue) || 0;
      if (premiumType === "percent") {
        const premium = (basePrice * val) / 100;
        return { premium, total: basePrice + premium };
      } else {
        return { premium: val, total: basePrice + val };
      }
    },
    [premiumType, premiumValue]
  );

  const selectedBasePrice =
    (selectedOutbound?.price ?? 0) + (selectedReturn?.price ?? 0);
  const combinedFinal = calcFinalPrice(selectedBasePrice);

  // ─── Copy quote ──────────────────────────────────────

  const copyCombinedQuote = useCallback(() => {
    let text = `✈️ ArcTravel — Flight Quote\n`;
    text += `${departureCode.toUpperCase()} → ${arrivalCode.toUpperCase()} · ${outboundDate}`;
    if (tripType === "round") {
      text += ` → ${returnDate}`;
    }
    text += ` · ${adults} traveller${adults !== "1" ? "s" : ""}\n\n`;

    const addItinerary = (itinerary: FlightItinerary, title: string) => {
      text += `── ${title} ──\n`;
      itinerary.flights.forEach((seg, i) => {
        text += `  ${seg.departure_airport.id} ${formatTime(seg.departure_airport.time)} → ${seg.arrival_airport.id} ${formatTime(seg.arrival_airport.time)}`;
        text += `  (${formatDuration(seg.duration)})\n`;
        text += `  ${seg.airline} ${seg.flight_number} · ${seg.travel_class}\n`;
        if (i < itinerary.flights.length - 1) {
          const layover = itinerary.layovers[i];
          if (layover) {
            text += `  ⏱️ Layover in ${layover.name} — ${formatDuration(layover.duration)}${layover.overnight ? " (overnight)" : ""}\n`;
          }
        }
      });
      text += `\n`;
    };

    if (selectedOutbound) {
      addItinerary(selectedOutbound, "DEPARTURE");
    }
    if (selectedReturn) {
      addItinerary(selectedReturn, "RETURN");
    }

    text += `---\n`;
    if (tripType === "round" && selectedOutbound && selectedReturn) {
      text += `Departure:  US$${calcFinalPrice(selectedOutbound.price ?? 0).total.toFixed(2)}\n`;
      text += `Return:     US$${calcFinalPrice(selectedReturn.price ?? 0).total.toFixed(2)}\n`;
      text += `Total:      US$${combinedFinal.total.toFixed(2)}\n`;
    } else {
      text += `Price:  US$${combinedFinal.total.toFixed(2)}\n`;
    }
    text += `\nArcTravel — trusted travel since 2025`;
    text += `\n📞 ${contactInfo.phone}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 2000);
    });
  }, [
    selectedOutbound,
    selectedReturn,
    combinedFinal,
    calcFinalPrice,
    premiumValue,
    departureCode,
    arrivalCode,
    outboundDate,
    returnDate,
    adults,
    tripType,
  ]);

  // ─── Search params label ──────────────────────────────────
  const searchParamsLabel = `${departureCode.toUpperCase()} → ${arrivalCode.toUpperCase()} · ${outboundDate}${tripType === "round" ? ` → ${returnDate}` : ""} · ${adults} ${adults === "1" ? "adult" : "adults"}`;

  // ─── Has results? ────────────────────────────────────────
  const hasResults = legs.some((leg) => leg.best.length > 0 || leg.other.length > 0);
  const allErrors = legs.every((leg) => leg.error && !leg.loading);
  const anyLoading = legs.some((leg) => leg.loading) || totalLoading;

  // ─── Toggle card expand ─────────────────────────────────

  const toggleExpand = (key: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // ─── Render ──────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      {/* Header */}
      <div className="sticky top-16 z-40 border-b border-primary/10 bg-gradient-to-r from-primary to-[#003d7a] shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-6 sm:py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-xs font-bold text-white shadow-sm backdrop-blur-sm ring-1 ring-white/20">
              AT
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white">Flight Pricing Tool</h1>
              <p className="text-xs text-white/70">ArcTravel Internal</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-accent/20 px-3 py-0.5 text-xs font-medium text-accent ring-1 ring-accent/30 sm:inline-block">
              Staff Only
            </span>
            <a
              href="/"
              className="inline-flex h-7 items-center justify-center gap-1 rounded-lg border border-white/20 bg-white/10 px-2.5 text-[0.8rem] font-medium whitespace-nowrap text-white/90 transition-all hover:bg-white/20"
            >
              Back to Site
            </a>
          </div>
        </div>
      </div>

      {/* Search Panel */}
      <div className="border-b border-border bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 lg:px-8">
          {/* Trip Type - full width on mobile, compact on desktop */}
          <div className="mb-3 flex rounded-xl bg-muted p-1 sm:mb-4 lg:w-auto lg:mb-0">
            <button
              onClick={() => setTripType("round")}
              className={`flex-1 rounded-lg px-5 py-1.5 text-sm font-medium transition-all ${
                tripType === "round"
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Round Trip
            </button>
            <button
              onClick={() => setTripType("oneway")}
              className={`flex-1 rounded-lg px-5 py-1.5 text-sm font-medium transition-all ${
                tripType === "oneway"
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              One Way
            </button>
          </div>

          {/* Search fields - responsive grid */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-3">
            {/* From + Swap + To row on mobile, inline on desktop */}
            <div className="flex items-end gap-2 w-full lg:flex-1">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  <PlaneTakeoff className="mr-0.5 inline h-3 w-3" />
                  From
                </label>
                <AirportInput value={departureCode} onChange={setDepartureCode} />
              </div>
              <button
                onClick={() => {
                  const tmp = departureCode;
                  setDepartureCode(arrivalCode);
                  setArrivalCode(tmp);
                }}
                className="flex h-10 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary transition-all hover:bg-primary/15 active:scale-95 lg:h-10 lg:w-10"
                title="Swap airports"
              >
                <ArrowRight className="h-4 w-4 rotate-90 lg:rotate-0 shrink-0" />
              </button>
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  <PlaneLanding className="mr-0.5 inline h-3 w-3" />
                  To
                </label>
                <AirportInput value={arrivalCode} onChange={setArrivalCode} />
              </div>
            </div>

            {/* Dates row on mobile, inline on desktop */}
            <div className="flex items-end gap-2 w-full md:flex-1">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  <Calendar className="mr-0.5 inline h-3 w-3" />
                  Depart
                </label>
                <Input
                  type="date"
                  value={outboundDate}
                  min={getTodayISO()}
                  onChange={(e) => setOutboundDate(e.target.value)}
                  className="h-10 rounded-xl border-border/70 bg-background hover:border-primary/40 focus:border-primary transition-colors"
                />
              </div>
              {tripType === "round" && (
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">
                    <Calendar className="mr-0.5 inline h-3 w-3" />
                    Return
                  </label>
                  <Input
                    type="date"
                    value={returnDate}
                    min={outboundDate || getTodayISO()}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="h-10 rounded-xl border-border/70 bg-background hover:border-primary/40 focus:border-primary transition-colors"
                  />
                </div>
              )}
            </div>

            {/* Passengers + Search row */}
            <div className="flex items-end gap-2 w-full md:w-auto">
              <div className="w-24 md:w-20 lg:w-24">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  <Users className="mr-0.5 inline h-3 w-3" />
                  Adults
                </label>
                <Select value={adults} onValueChange={(v) => v && setAdults(v)}>
                  <SelectTrigger className="h-10 rounded-xl border-border/70">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleSearch}
                disabled={anyLoading || !departureCode.trim() || !arrivalCode.trim() || !outboundDate || (tripType === "round" && !returnDate)}
                className="flex-1 h-10 rounded-xl bg-gradient-to-r from-primary to-[#003d7a] text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all lg:w-auto lg:flex-none"
              >
                {anyLoading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                {anyLoading ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>

          {/* Quick airport swaps row */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-medium text-muted-foreground">Quick routes:</span>
            {[["HRE", "JNB"], ["HRE", "DXB"], ["HRE", "CPT"], ["HRE", "NBO"], ["HRE", "LHR"], ["JNB", "DXB"], ["HRE", "VFA"], ["HRE", "ADD"]].map(
              ([from, to]) => (
                <button
                  key={`${from}-${to}`}
                  onClick={() => {
                    setDepartureCode(from);
                    setArrivalCode(to);
                  }}
                  className="rounded-lg border border-border/60 bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary active:scale-95"
                >
                  <Plane className="-ml-0.5 mr-1 inline h-2.5 w-2.5" />
                  {from} → {to}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Premium Settings Bar */}
      <div className="border-b border-border bg-gradient-to-r from-white via-white to-accent/[0.02]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-3 py-2 sm:px-6 sm:gap-3 lg:px-8">
          <div className="flex items-center gap-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-accent/10 sm:h-6 sm:w-6">
              <Percent className="h-3 w-3 text-accent sm:h-3.5 sm:w-3.5" />
            </div>
            <span className="text-xs font-medium text-foreground sm:text-sm">Markup</span>
          </div>

          <div className="relative w-20 sm:w-28">
            <div className="relative">
              <Input
                type="number"
                value={premiumValue}
                onChange={(e) => setPremiumValue(e.target.value)}
                className="h-7 rounded-lg border-border/70 pr-5 text-xs sm:h-8 sm:pr-6 sm:text-sm"
                placeholder="20"
                min={0}
                max={100}
              />
              <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground sm:right-2.5 sm:text-xs">
                %
              </span>
            </div>
          </div>

          {/* Selected summary */}
          {(selectedOutbound || (tripType === "oneway" && selectedOutbound)) && (
            <span className="ml-auto hidden text-xs text-muted-foreground sm:inline">
              {tripType === "oneway" ? (
                <>
                  Base fare: <span className="font-medium text-foreground">US${(selectedOutbound?.price ?? 0).toFixed(0)}</span>
                </>
              ) : (
                <>
                  Outbound{selectedOutbound ? " ✅" : " ☐"}
                  <span className="mx-1.5 text-border">|</span>
                  Return{selectedReturn ? " ✅" : " ☐"}
                  <span className="mx-1.5 text-border">|</span>
                  Base: <span className="font-medium text-foreground">US${selectedBasePrice.toFixed(0)}</span>
                </>
              )}
              <span className="mx-1.5 text-border">|</span>
              <span className="text-accent">+{premiumValue}%</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        {/* Errors */}
        {allErrors && (
          <div className="mb-4 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-red-50/80 px-4 py-3 text-sm text-red-700 shadow-sm">
            <div className="flex items-start gap-2">
              <Shuffle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              <div>
                <p className="text-xs font-semibold">Search Errors</p>
                {legs.map((leg, i) =>
                  leg.error ? <p key={i} className="mt-0.5 text-xs">{leg.label}: {leg.error}</p> : null
                )}
              </div>
            </div>
          </div>
        )}

        {/* Partial errors */}
        {legs.map((leg, i) =>
          leg.error && !allErrors ? (
            <div key={i} className="mb-4 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-amber-50/80 px-4 py-3 text-sm text-amber-700 shadow-sm">
              <div className="flex items-start gap-2">
                <Shuffle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <div>
                  <p className="text-xs font-semibold">{leg.label}</p>
                  <p className="mt-0.5 text-xs">{leg.error}</p>
                </div>
              </div>
            </div>
          ) : null
        )}

        {/* Loading skeleton */}
        {anyLoading && !hasResults && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              </div>
            </div>
            <p className="text-sm font-medium text-foreground">Searching the skies...</p>
            <p className="mt-1 text-xs text-muted-foreground">Checking live fares for your route</p>
            {tripType === "round" && (
              <p className="mt-2 text-xs text-muted-foreground">
                Searching combined outbound + return
              </p>
            )}
          </div>
        )}

        {/* Empty state */}
        {!anyLoading && !hasResults && !allErrors && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/[0.08] to-accent/[0.08] ring-1 ring-primary/5">
              <Plane className="h-9 w-9 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-foreground">Flight Pricing Tool</h2>
            <p className="mb-8 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
              Search live fares, compare itineraries, add ArcTravel&apos;s markup, and generate client-ready quotes.
            </p>
            <div className="grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-white p-5 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground">1. Search</p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">Enter route and dates</p>
              </div>
              <div className="rounded-xl border border-border bg-white p-5 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <DollarSign className="h-5 w-5 text-accent" />
                </div>
                <p className="text-sm font-semibold text-foreground">2. Select &amp; Mark Up</p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">Pick flights, apply premium</p>
              </div>
              <div className="rounded-xl border border-border bg-white p-5 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Copy className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground">3. Quote</p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">Copy &amp; share with client</p>
              </div>
            </div>
          </div>
        )}

        {/* Results per leg — two columns for round trips */}
        {hasResults && (
          <div className={`grid gap-4 sm:gap-6 ${tripType === "round" ? "lg:grid-cols-2" : ""}`}>
            {legs.map((leg, legIndex) => (
              <div key={legIndex}>
                {/* Leg header */}
                <div className="mb-4 flex items-center gap-3">
                  <div className={`flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-bold text-white shadow-sm ${
                    legIndex === 0 ? "bg-primary" : "bg-gradient-to-br from-secondary to-amber-600"
                  }`}>
                    {legIndex === 0 ? "Departure" : "Return"}
                  </div>
                  <h2 className="text-sm font-semibold text-foreground">{leg.label}</h2>
                  <span className="text-xs text-muted-foreground">· {leg.date}</span>
                  {leg.loading && (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin text-primary" />
                  )}
                  {!leg.loading && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {leg.best.length + leg.other.length} flight{leg.best.length + leg.other.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                {/* Loading skeleton for this leg */}
                {leg.loading && (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-white py-14 shadow-sm">
                    <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
                    <p className="mt-3 text-xs text-muted-foreground">Loading flights...</p>
                  </div>
                )}

                {/* No results */}
                {!leg.loading && leg.best.length === 0 && leg.other.length === 0 && (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-white py-14 shadow-sm">
                    <Shuffle className="mb-2 h-5 w-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No flights found</p>
                  </div>
                )}

                {/* Best flights */}
                {!leg.loading && leg.best.length > 0 && (
                  <>
                    {leg.best.length > 0 && (
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-3 w-0.5 rounded-full bg-primary/40" />
                        <p className="text-xs font-medium text-muted-foreground">
                          {tripType === "oneway" ? "Flights" : "Best flights"}
                        </p>
                      </div>
                    )}
                    <div className="mb-4 grid gap-3">
                      {leg.best.map((itinerary, i) => {
                        const key = `${legIndex}-best-${i}`;
                        const selected =
                          legIndex === 0
                            ? selectedOutbound === itinerary
                            : selectedReturn === itinerary;
                        return (
                          <FlightCard
                            key={key}
                            itinerary={itinerary}
                            expanded={expandedCards.has(key)}
                            onToggle={() => toggleExpand(key)}
                            calcFinalPrice={calcFinalPrice}
                            premiumType={premiumType}
                            premiumValue={premiumValue}
                            selected={selected}
                            onSelect={() => {
                              if (legIndex === 0) setSelectedOutbound(itinerary);
                              else setSelectedReturn(itinerary);
                            }}
                            tripType={tripType}
                          />
                        );
                      })}
                    </div>
                  </>
                )}

                {/* Other flights */}
                {!leg.loading && leg.other.length > 0 && (
                  <>
                    <div className="mb-2 flex items-center gap-2">
                      <div className="h-3 w-0.5 rounded-full bg-border" />
                      <p className="text-xs font-medium text-muted-foreground">Other flights</p>
                    </div>
                    <div className="grid gap-3">
                      {leg.other.map((itinerary, i) => {
                        const key = `${legIndex}-other-${i}`;
                        const selected =
                          legIndex === 0
                            ? selectedOutbound === itinerary
                            : selectedReturn === itinerary;
                        return (
                          <FlightCard
                            key={key}
                            itinerary={itinerary}
                            expanded={expandedCards.has(key)}
                            onToggle={() => toggleExpand(key)}
                            calcFinalPrice={calcFinalPrice}
                            premiumType={premiumType}
                            premiumValue={premiumValue}
                            selected={selected}
                            onSelect={() => {
                              if (legIndex === 0) setSelectedOutbound(itinerary);
                              else setSelectedReturn(itinerary);
                            }}
                            tripType={tripType}
                          />
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Combined pricing + copy */}
        {hasResults && (selectedOutbound || (tripType === "oneway" && selectedOutbound)) && (
          <div className="sticky bottom-0 mt-4 sm:mt-6 rounded-xl border border-primary/10 bg-gradient-to-r from-white via-white to-accent/[0.02] p-3 sm:p-5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Price breakdown */}
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {tripType === "round" ? "Outbound + Return" : "Selected flight"}
                </p>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                    US${combinedFinal.total.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-muted-foreground line-through sm:text-sm">
                    US${selectedBasePrice.toFixed(2)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-1.5 py-0.5 text-[10px] font-medium text-accent sm:px-2.5 sm:py-0.5 sm:text-xs">
                    +{premiumValue}%
                  </span>
                </div>
                {tripType === "round" && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Departure</span>
                    {selectedOutbound ? ` US$${(selectedOutbound.price ?? 0).toFixed(0)}` : " —"}
                    <span className="mx-1.5 text-border">·</span>
                    <span className="font-medium text-foreground">Return</span>
                    {selectedReturn ? ` US$${(selectedReturn.price ?? 0).toFixed(0)}` : " —"}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 flex-wrap">
                {tripType === "round" && (!selectedOutbound || !selectedReturn) && (
                  <p className="text-xs text-amber-600 font-medium">
                    Select {!selectedOutbound ? "departure" : ""}
                    {!selectedOutbound && !selectedReturn ? " and " : ""}
                    {!selectedReturn ? "return" : ""} flights
                  </p>
                )}
                <Button
                  onClick={copyCombinedQuote}
                  disabled={tripType === "round" && (!selectedOutbound || !selectedReturn)}
                  size="lg"
                  className="whitespace-nowrap rounded-xl bg-gradient-to-r from-primary to-[#003d7a] text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all"
                >
                  {copiedQuote ? (
                    <>
                      <Check className="mr-2 h-4 w-4 text-green-200" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Quote
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Combined Booking Options */}
            {tripType === "round" && selectedOutbound && selectedReturn && (
              <CombinedBookingOptions outbound={selectedOutbound} returnFlight={selectedReturn} />
            )}
            {tripType === "oneway" && selectedOutbound && (
              <div className="mt-3">
                <BookingOptionsInline itinerary={selectedOutbound} tripType="oneway" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Airport Input (autocomplete) ────────────────────────

function AirportInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = focused
    ? COMMON_AIRPORTS.filter(
        (a) =>
          a.code.toLowerCase().includes(inputValue.toLowerCase()) ||
          a.city.toLowerCase().includes(inputValue.toLowerCase()) ||
          a.name.toLowerCase().includes(inputValue.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <div ref={containerRef} className="relative">
      <Input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value.toUpperCase());
          onChange(e.target.value.toUpperCase());
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
        placeholder="e.g. HRE"
        className="h-10 rounded-xl border-border/70 bg-background hover:border-primary/40 focus:border-primary transition-colors"
      />
      {filtered.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-visible rounded-xl border border-border/70 bg-white shadow-xl min-w-[320px] w-auto">
          {filtered.map((airport) => (
            <button
              key={airport.code}
              type="button"
              onMouseDown={() => {
                setInputValue(airport.code);
                onChange(airport.code);
              }}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-primary/5"
            >
              <span className="flex h-8 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                {airport.code}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{airport.city}</p>
                <p className="text-xs text-muted-foreground">{airport.name}</p>
              </div>
              <span className="ml-3 shrink-0 text-xs text-muted-foreground">{airport.country}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Flight Card ─────────────────────────────────────────

function FlightCard({
  itinerary,
  expanded,
  onToggle,
  calcFinalPrice,
  premiumType,
  premiumValue,
  selected,
  onSelect,
  tripType,
}: {
  itinerary: FlightItinerary;
  expanded: boolean;
  onToggle: () => void;
  calcFinalPrice: (base: number) => { premium: number; total: number };
  premiumType: string;
  premiumValue: string;
  selected: boolean;
  onSelect: () => void;
  tripType?: "round" | "oneway";
}) {
  const basePrice = itinerary.price ?? 0;
  const final = calcFinalPrice(basePrice);
  const firstFlight = itinerary.flights[0];
  const lastFlight = itinerary.flights[itinerary.flights.length - 1];

  // Identify layovers between consecutive flights
  const routeDescription = itinerary.flights.map((f) => f.departure_airport.id).join(" → ") + " → " + lastFlight?.arrival_airport.id;

  return (
    <div
      className={`rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
        selected
          ? "border-primary ring-2 ring-primary/20 shadow-md"
          : "border-border"
      } ${expanded ? "shadow-md" : ""}`}
    >
      <div className="p-3 sm:p-5">
        {/* Main row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Route summary */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Airline logo */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-muted to-muted/70 p-1.5 shadow-sm">
              {itinerary.flights[0]?.airline_logo ? (
                <img
                  src={itinerary.flights[0].airline_logo}
                  alt={itinerary.flights[0].airline}
                  className="h-full w-full object-contain"
                />
              ) : (
                <Plane className="h-6 w-6 text-muted-foreground" />
              )}
            </div>

            <div className="min-w-0">
              {/* Route codes */}
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-foreground">
                  {firstFlight?.departure_airport.id || "---"}
                </span>
                <div className="flex items-center gap-1">
                  <div className="h-px w-5 bg-border" />
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/5">
                    <Plane className="h-2.5 w-2.5 rotate-90 text-primary/60 shrink-0" />
                  </div>
                  <div className="h-px w-5 bg-border" />
                  {itinerary.layovers.length > 0 && (
                    <span className="ml-1 rounded-full bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-600">
                      {itinerary.flights.length - 1} stop{itinerary.flights.length - 1 > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <span className="text-base font-bold text-foreground">
                  {lastFlight?.arrival_airport.id || "---"}
                </span>
              </div>

              {/* Flight info */}
              <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                <span className="truncate max-w-[120px]">{itinerary.flights[0]?.airline || "Unknown"}</span>
                <span className="text-[10px] text-border">•</span>
                <span>{itinerary.flights[0]?.flight_number || ""}</span>
                <span className="text-[10px] text-border">•</span>
                <span>{itinerary.flights[0]?.travel_class || "Economy"}</span>
                {itinerary.flights.length > 1 && (
                  <>
                    <span className="text-[10px] text-border">•</span>
                    <span className="text-amber-600 font-medium">
                      {itinerary.flights.length - 1} stop{itinerary.flights.length - 1 > 1 ? "s" : ""}
                      {itinerary.layovers.some((l) => l.overnight) && " (overnight)"}
                    </span>
                  </>
                )}
              </div>

              {/* Depart/Arrive times */}
              <div className="mt-1.5 flex items-center gap-2 text-xs">
                <span className="font-semibold text-foreground">
                  {formatTime(firstFlight?.departure_airport.time)}
                </span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatDuration(itinerary.total_duration)}
                </span>
                <span className="font-semibold text-foreground">
                  {formatTime(lastFlight?.arrival_airport.time)}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing + actions */}
          <div className="flex items-center justify-between gap-3 sm:shrink-0 sm:gap-4 sm:flex-col">
            <div className="flex items-center gap-3 sm:flex-col sm:text-right">
              <div className="sm:text-right">
                <p className="text-[10px] text-muted-foreground line-through sm:text-[11px]">US${basePrice.toFixed(2)}</p>
                <p className="text-xl font-bold tracking-tight text-primary sm:text-2xl">US${final.total.toFixed(0)}</p>
                <p className="text-[10px] text-muted-foreground sm:text-[11px]">
                  <span className="text-accent">+US${final.premium.toFixed(2)}</span> <span className="hidden sm:inline">{premiumType === "percent" ? `(${premiumValue}%)` : "markup"}</span>
                </p>
              </div>
              <Button
                size="sm"
                variant={selected ? "default" : "outline"}
                onClick={onSelect}
                className={`whitespace-nowrap min-w-[80px] rounded-xl transition-all active:scale-95 text-xs sm:min-w-[95px] sm:text-sm ${
                  selected
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:border-primary/40 hover:text-primary"
                }`}
              >
                {selected ? (
                  <>
                    <Check className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span className="hidden sm:inline">Selected</span>
                    <span className="sm:hidden">Sel</span>
                  </>
                ) : (
                  <span className="hidden sm:inline">Select Flight</span>
                )}
                {!selected && <span className="sm:hidden">Select</span>}
              </Button>
            </div>
            <div className="flex items-center gap-1.5 sm:flex-col sm:gap-1">
              <a
                href={googleFlightsUrl(itinerary)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-[10px] text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors sm:text-xs sm:gap-1"
              >
                <ExternalLink className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                Google
              </a>
              <button
                onClick={onToggle}
                className="inline-flex items-center gap-0.5 rounded-md px-1 py-0.5 text-[10px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:text-xs sm:px-1.5"
              >
                {expanded ? "Less" : "More"}
                {expanded ? (
                  <ChevronUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 transition-transform duration-200" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Layover summary (always visible) */}
        {itinerary.layovers.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {itinerary.layovers.map((layover, li) => (
              <span
                key={li}
                className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-medium shadow-sm ${
                  layover.overnight
                    ? "border-amber-200 bg-amber-50 text-amber-700"
                    : "border-blue-100 bg-blue-50 text-blue-700"
                }`}
              >
                <Clock className="h-2.5 w-2.5" />
                {formatDuration(layover.duration)} in {layover.id}
                {layover.overnight ? " 🌙" : ""}
              </span>
            ))}
          </div>
        )}

        {/* Expanded details */}
        {expanded && (
          <div className="mt-4 border-t border-border pt-4 overflow-hidden">
            {/* Route chain */}
            <div className="mb-3 flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
              <Shuffle className="h-3 w-3 text-muted-foreground shrink-0" />
              <p className="text-xs text-muted-foreground">
                Route: <span className="font-medium text-foreground">{routeDescription}</span>
              </p>
            </div>

            {itinerary.flights.map((segment, si) => (
              <div key={si} className="mb-3 last:mb-0">
                <div className="flex items-start gap-3">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center">
                    <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${si === 0 ? "bg-primary" : "bg-border"}`} />
                    {si < itinerary.flights.length - 1 && <div className="mt-0.5 h-full min-h-[3rem] w-px bg-gradient-to-b from-primary/30 to-border" />}
                  </div>

                  {/* Segment details */}
                  <div className="flex-1 min-w-0 pb-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">
                        {segment.airline} {segment.flight_number}
                      </p>
                      {segment.airplane && (
                        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                          {segment.airplane}
                        </span>
                      )}
                    </div>
                    <div className="mt-1.5 grid grid-cols-2 gap-2 rounded-lg bg-muted/30 p-2.5 text-xs">
                      <div className="flex items-center gap-1.5">
                        <PlaneTakeoff className="h-3 w-3 text-muted-foreground shrink-0" />
                        <span>
                          <span className="font-semibold text-foreground">{segment.departure_airport.id}</span>
                          <span className="text-muted-foreground"> {formatTime(segment.departure_airport.time)}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <PlaneLanding className="h-3 w-3 text-muted-foreground shrink-0" />
                        <span>
                          <span className="font-semibold text-foreground">{segment.arrival_airport.id}</span>
                          <span className="text-muted-foreground"> {formatTime(segment.arrival_airport.time)}</span>
                        </span>
                      </div>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDuration(segment.duration)}
                      </span>
                      <span>{segment.travel_class}</span>
                      {segment.legroom && <span>{segment.legroom} legroom</span>}
                    </div>

                    {/* Flight amenities */}
                    {segment.extensions && segment.extensions.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {segment.extensions.map((ext, ei) => {
                          const icon = getExtIcon(ext);
                          return (
                            <span
                              key={ei}
                              className="inline-flex items-center gap-0.5 rounded-md border border-border/60 bg-white px-1.5 py-0.5 text-[10px] text-muted-foreground shadow-sm"
                              title={ext}
                            >
                              {icon && <span className="mr-0.5">{icon}</span>}
                              {ext.split(":")[0].trim()}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Flags */}
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {segment.overnight && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-amber-50 to-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700 shadow-sm">
                          🌙 Red-eye / Overnight
                        </span>
                      )}
                      {segment.often_delayed_by_over_30_min && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-red-50 to-red-100 px-2 py-0.5 text-[10px] font-medium text-red-700 shadow-sm">
                          ⚠️ Often delayed
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Layover between this segment and next */}
                {si < itinerary.flights.length - 1 && itinerary.layovers[si] && (
                  <div className="ml-3 mt-1.5 flex items-center gap-2.5 rounded-xl border border-amber-200/60 bg-gradient-to-r from-amber-50 to-amber-50/50 px-4 py-2.5 shadow-sm">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100">
                      <Clock className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-amber-800">
                        Layover at {itinerary.layovers[si].name}
                      </p>
                      <p className="text-[11px] text-amber-600">
                        {formatDuration(itinerary.layovers[si].duration)}
                        {itinerary.layovers[si].overnight ? " · Overnight layover" : ""}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Carbon info */}
            {itinerary.carbon_emissions && (
              <div className="mt-4 rounded-xl border border-green-200/60 bg-gradient-to-r from-green-50 to-green-50/50 px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-green-100">
                    <span className="text-xs">🌱</span>
                  </div>
                  <p className="text-xs text-green-700">
                    <span className="font-medium">{(itinerary.carbon_emissions.this_flight / 1000).toFixed(0)} kg CO₂</span>
                    {itinerary.carbon_emissions.difference_percent !== 0 && (
                      <span>
                        {" · "}
                        {itinerary.carbon_emissions.difference_percent > 0 ? "+" : ""}
                        {itinerary.carbon_emissions.difference_percent}% vs typical
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Booking Options */}
            <BookingOptionsInline itinerary={itinerary} tripType={tripType} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Booking Options Section ────────────────────────────

function BookingOptionsInline({ itinerary, tripType }: { itinerary: FlightItinerary; tripType?: "round" | "oneway" }) {
  const [options, setOptions] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const firstFlight = itinerary.flights[0];
  const lastFlight = itinerary.flights[itinerary.flights.length - 1];
  const isRoundTrip = tripType === "round";

  const fetchOptions = useCallback(async () => {
    if (options) {
      setShow(!show);
      return;
    }

    setLoading(true);
    setError(null);

    const segs = itinerary.flights;
    const from = firstFlight?.departure_airport.id || "";
    const to = lastFlight?.arrival_airport.id || "";
    const outDate = firstFlight?.departure_airport.time?.split(" ")[0] || "";

    let type: string;
    let selectedFlights: any;
    let params: URLSearchParams;

    if (isRoundTrip) {
      // SerpAPI's type=1 doesn't return return flight data — only the combined price.
      // Fall back to one-way booking options for the outbound flight.
      type = "2";
      selectedFlights = {
        outbound: segs.map((f) => ({
          departure_id: f.departure_airport.id,
          arrival_id: f.arrival_airport.id,
          flight_number: f.flight_number.replace(/\s/g, ""),
          date: f.departure_airport.time.split(" ")[0],
        })),
      };
      params = new URLSearchParams({
        departure_id: from,
        arrival_id: to,
        outbound_date: outDate,
        type: "2",
        currency: "USD",
        hl: "en",
        adults: "1",
        selected_flights_json: JSON.stringify(selectedFlights),
      });
    } else {
      type = "2";
      selectedFlights = {
        outbound: segs.map((f) => ({
          departure_id: f.departure_airport.id,
          arrival_id: f.arrival_airport.id,
          flight_number: f.flight_number.replace(/\s/g, ""),
          date: f.departure_airport.time.split(" ")[0],
        })),
      };
      params = new URLSearchParams({
        departure_id: from,
        arrival_id: to,
        outbound_date: outDate,
        type: "2",
        currency: "USD",
        hl: "en",
        adults: "1",
        selected_flights_json: JSON.stringify(selectedFlights),
      });
    }

    try {
      const res = await fetch(`/api/staff/flight-booking-options?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to load booking options");
        setShow(true);
        return;
      }

      setOptions(data.booking_options || []);
      setShow(true);
    } catch {
      setError("Network error");
      setShow(true);
    } finally {
      setLoading(false);
    }
  }, [itinerary, firstFlight, lastFlight, options, show]);

  return (
    <div className="mt-3">
      <button
        onClick={fetchOptions}
        disabled={loading}
        className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-white px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-all hover:border-primary/20 hover:bg-primary/[0.02] hover:shadow disabled:opacity-50 active:scale-[0.97]"
      >
        {loading ? (
          <><RefreshCw className="h-3 w-3 animate-spin" /> Loading...</>
        ) : show ? (
          <><ChevronUp className="h-3 w-3" /> Hide booking options</>
        ) : (
          <><Building2 className="h-3 w-3" /> Show booking options</>
        )}
      </button>

      {show && (
        <div className="mt-2">
          {error && (
            <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">{error}</div>
          )}

          {options && options.length === 0 && !error && (
            <div className="rounded-lg border border-dashed border-border/60 px-3 py-3 text-xs text-center text-muted-foreground">
              No booking options found.
            </div>
          )}

          {options && options.length > 0 && (
            <div className="grid gap-2">
              {options.map((opt, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-white px-3.5 py-2.5 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {opt.airline_logos?.[0] && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted p-1">
                        <img
                          src={opt.airline_logos[0]}
                          alt={opt.book_with}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {opt.book_with}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {opt.option_title}
                        {opt.extensions?.length > 0 && ` · ${opt.extensions[0]}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-bold text-primary">
                      US${(opt.price || 0).toFixed(2)}
                    </span>
                    {opt.booking_url && (
                      <a
                        href={opt.booking_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-primary to-[#003d7a] px-2.5 py-1.5 text-[10px] font-medium text-white shadow-sm transition-all hover:shadow-md active:scale-95"
                      >
                        Book <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Baggage info */}
          {options?.some((o) => o.baggage_prices?.length > 0) && (
            <div className="mt-1.5 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-blue-50/50 px-3 py-2">
              <p className="text-[10px] text-blue-700 font-medium">
                💼 Baggage: {options.find((o) => o.baggage_prices?.length > 0).baggage_prices.join(" · ")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Combined Booking Options (round trip) ────────────────

function CombinedBookingOptions({ outbound, returnFlight }: { outbound: FlightItinerary; returnFlight: FlightItinerary }) {
  const [options, setOptions] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const fetchCombinedOptions = useCallback(async () => {
    if (options) {
      setShow(!show);
      return;
    }

    setLoading(true);
    setError(null);

    const selectedFlights = {
      outbound: outbound.flights.map((f) => ({
        departure_id: f.departure_airport.id,
        arrival_id: f.arrival_airport.id,
        flight_number: f.flight_number.replace(/\s/g, ""),
        date: f.departure_airport.time.split(" ")[0],
      })),
      return: returnFlight.flights.map((f) => ({
        departure_id: f.departure_airport.id,
        arrival_id: f.arrival_airport.id,
        flight_number: f.flight_number.replace(/\s/g, ""),
        date: f.departure_airport.time.split(" ")[0],
      })),
    };

    const params = new URLSearchParams({
      departure_id: outbound.flights[0]?.departure_airport.id || "",
      arrival_id: outbound.flights[outbound.flights.length - 1]?.arrival_airport.id || "",
      outbound_date: outbound.flights[0]?.departure_airport.time?.split(" ")[0] || "",
      return_date: returnFlight.flights[0]?.departure_airport.time?.split(" ")[0] || "",
      type: "1",
      currency: "USD",
      hl: "en",
      adults: "1",
      selected_flights_json: JSON.stringify(selectedFlights),
    });

    try {
      const res = await fetch(`/api/staff/flight-booking-options?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to load booking options");
        setShow(true);
        return;
      }

      setOptions(data.booking_options || []);
      setShow(true);
    } catch {
      setError("Network error");
      setShow(true);
    } finally {
      setLoading(false);
    }
  }, [outbound, returnFlight, options, show]);

  return (
    <div className="mt-4 border-t border-border/60 pt-4">
      <button
        onClick={fetchCombinedOptions}
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/[0.03] to-accent/[0.03] px-4 py-2.5 text-sm font-medium text-primary transition-all hover:border-primary/50 hover:bg-primary/[0.06] hover:shadow-sm disabled:opacity-50 active:scale-[0.99]"
      >
        {loading ? (
          <><RefreshCw className="h-4 w-4 animate-spin" /> Loading round-trip booking options...</>
        ) : show ? (
          <><ChevronUp className="h-4 w-4" /> Hide combined booking options</>
        ) : (
          <><Building2 className="h-4 w-4" /> Show combined booking options</>
        )}
      </button>

      {show && (
        <div className="mt-3">
          {error && (
            <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">{error}</div>
          )}

          {options && options.length === 0 && !error && (
            <div className="rounded-lg border border-dashed border-border/60 px-3 py-3 text-xs text-center text-muted-foreground">
              No combined booking options found.
            </div>
          )}

          {options && options.length > 0 && (
            <div className="grid gap-2">
              {options.map((opt, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-white px-3.5 py-2.5 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {opt.airline_logos?.[0] && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted p-1">
                        <img
                          src={opt.airline_logos[0]}
                          alt={opt.book_with}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {opt.book_with}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {opt.option_title}
                        {opt.extensions?.length > 0 && ` · ${opt.extensions[0]}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-bold text-primary">
                      US${(opt.price || 0).toFixed(2)}
                    </span>
                    {opt.booking_url && (
                      <BookingButton url={opt.booking_url} postData={opt.post_data} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Baggage info */}
          {options?.some((o) => o.baggage_prices?.length > 0) && (
            <div className="mt-1.5 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-blue-50/50 px-3 py-2">
              <p className="text-[10px] text-blue-700 font-medium">
                💼 Baggage: {options.find((o) => o.baggage_prices?.length > 0).baggage_prices.join(" · ")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Booking Button ──────────────────────────────────────

function BookingButton({ url, postData }: { url: string; postData?: string | null }) {
  const handleClick = () => {
    if (!postData) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    // Google clk/f URLs need the post data submitted as a form POST
    // to trigger the redirect chain. Opening directly gets stuck at the clk/f page.
    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;
    form.target = "_blank";
    form.style.display = "none";

    try {
      const params = new URLSearchParams(postData);
      for (const [key, value] of params) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }
    } catch {
      // If parsing fails, just send raw postData
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "data";
      input.value = postData;
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-gradient-to-r from-primary to-[#003d7a] px-2.5 py-1.5 text-[10px] font-medium text-white shadow-sm transition-all hover:shadow-md active:scale-95"
    >
      <ExternalLink className="h-2.5 w-2.5" /> Book
    </button>
  );
}

// ─── Contact info (for quote template) ───────────────────

const contactInfo = {
  phone: "078 657 7594",
};
