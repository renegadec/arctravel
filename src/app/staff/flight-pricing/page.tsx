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

  // Leg results (round trip = two legs, one-way = one leg)
  const [legs, setLegs] = useState<LegResults[]>([
    { label: "Outbound", departureCode: "HRE", arrivalCode: "JNB", date: getNextWeekISO(), best: [], other: [], loading: false, error: null },
  ]);
  const [totalLoading, setTotalLoading] = useState(false);

  // Selected itineraries for round trip combination
  const [selectedOutbound, setSelectedOutbound] = useState<FlightItinerary | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<FlightItinerary | null>(null);

  // Premium state
  const [premiumType, setPremiumType] = useState<"percent" | "fixed">("percent");
  const [premiumValue, setPremiumValue] = useState("15");

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

    const searches: { label: string; from: string; to: string; date: string }[] = [];

    // Outbound leg
    searches.push({
      label: `${departureCode.toUpperCase()} → ${arrivalCode.toUpperCase()}`,
      from: departureCode.trim().toUpperCase(),
      to: arrivalCode.trim().toUpperCase(),
      date: outboundDate,
    });

    // Return leg (round trip only)
    if (tripType === "round") {
      searches.push({
        label: `${arrivalCode.toUpperCase()} → ${departureCode.toUpperCase()}`,
        from: arrivalCode.trim().toUpperCase(),
        to: departureCode.trim().toUpperCase(),
        date: returnDate,
      });
    }

    // Initialise legs
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
          type: "2", // one-way for each leg
          currency: "USD",
          hl: "en",
          adults,
        });

        try {
          const res = await fetch(`/api/staff/flight-search?${params.toString()}`);
          const data = await res.json();

          if (!res.ok) {
            return {
              ...initialLegs[i],
              loading: false,
              error: data.error || "Search failed",
            };
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
          return {
            ...initialLegs[i],
            loading: false,
            error: "Network error — check your connection",
          };
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

  const combinedBasePrice =
    (selectedOutbound?.price ?? 0) + (selectedReturn?.price ?? 0);
  const combinedFinal = calcFinalPrice(combinedBasePrice);

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

    addItinerary(selectedOutbound!, "OUTBOUND");
    if (selectedReturn) {
      addItinerary(selectedReturn, "RETURN");
    }

    text += `---\n`;
    if (selectedOutbound) {
      text += `Outbound fare:  US$${(selectedOutbound.price ?? 0).toFixed(2)}\n`;
    }
    if (selectedReturn) {
      text += `Return fare:    US$${(selectedReturn.price ?? 0).toFixed(2)}\n`;
    }
    text += `Base total:     US$${combinedBasePrice.toFixed(2)}\n`;
    if (premiumType === "percent") {
      text += `ArcTravel markup (${premiumValue}%): US$${combinedFinal.premium.toFixed(2)}\n`;
    } else {
      text += `ArcTravel markup: US$${combinedFinal.premium.toFixed(2)}\n`;
    }
    text += `Client price:   US$${combinedFinal.total.toFixed(2)}\n`;
    text += `\nArcTravel — trusted travel since 2025`;
    text += `\n📞 ${contactInfo.phone}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 2000);
    });
  }, [
    selectedOutbound,
    selectedReturn,
    combinedBasePrice,
    combinedFinal,
    premiumType,
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
      <div className="sticky top-16 z-40 border-b border-border bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
              AT
            </div>
            <div>
              <h1 className="text-sm font-semibold text-foreground">Flight Pricing Tool</h1>
              <p className="text-xs text-muted-foreground">ArcTravel Internal</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 sm:inline-block">
              Staff Only
            </span>
            <a
              href="/"
              className="inline-flex h-7 items-center justify-center gap-1 rounded-[min(var(--radius-md),12px)] border border-border bg-background px-2.5 text-[0.8rem] font-medium whitespace-nowrap text-foreground transition-all hover:bg-muted"
            >
              Back to Site
            </a>
          </div>
        </div>
      </div>

      {/* Search Panel */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-3">
            {/* Trip Type */}
            <div className="flex w-full gap-2 lg:w-auto">
              <button
                onClick={() => setTripType("round")}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors lg:flex-none ${
                  tripType === "round"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Round Trip
              </button>
              <button
                onClick={() => setTripType("oneway")}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors lg:flex-none ${
                  tripType === "oneway"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                One Way
              </button>
            </div>

            {/* From */}
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                <PlaneTakeoff className="mr-1 inline h-3 w-3" />
                From
              </label>
              <AirportInput value={departureCode} onChange={setDepartureCode} />
            </div>

            {/* Swap button */}
            <button
              onClick={() => {
                const tmp = departureCode;
                setDepartureCode(arrivalCode);
                setArrivalCode(tmp);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-muted/80"
              title="Swap airports"
            >
              <ArrowRight className="h-4 w-4 rotate-90 lg:rotate-0" />
            </button>

            {/* To */}
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                <PlaneLanding className="mr-1 inline h-3 w-3" />
                To
              </label>
              <AirportInput value={arrivalCode} onChange={setArrivalCode} />
            </div>

            {/* Outbound Date */}
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                <Calendar className="mr-1 inline h-3 w-3" />
                Depart
              </label>
              <Input
                type="date"
                value={outboundDate}
                min={getTodayISO()}
                onChange={(e) => setOutboundDate(e.target.value)}
                className="h-10"
              />
            </div>

            {/* Return Date */}
            {tripType === "round" && (
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  <Calendar className="mr-1 inline h-3 w-3" />
                  Return
                </label>
                <Input
                  type="date"
                  value={returnDate}
                  min={outboundDate || getTodayISO()}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="h-10"
                />
              </div>
            )}

            {/* Passengers */}
            <div className="w-full lg:w-24">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                <Users className="mr-1 inline h-3 w-3" />
                Adults
              </label>
              <Select value={adults} onValueChange={(v) => v && setAdults(v)}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} {n === 1 ? "Adult" : "Adults"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search button */}
            <Button
              onClick={handleSearch}
              disabled={anyLoading || !departureCode.trim() || !arrivalCode.trim() || !outboundDate || (tripType === "round" && !returnDate)}
              className="h-10 w-full lg:w-auto"
            >
              {anyLoading ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              {anyLoading ? "Searching..." : "Search Flights"}
            </Button>
          </div>

          {/* Quick airport swaps row */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="text-xs text-muted-foreground">Quick routes:</span>
            {[["HRE", "JNB"], ["HRE", "DXB"], ["HRE", "CPT"], ["HRE", "NBO"], ["HRE", "LHR"], ["JNB", "DXB"], ["HRE", "VFA"], ["HRE", "ADD"]].map(
              ([from, to]) => (
                <button
                  key={`${from}-${to}`}
                  onClick={() => {
                    setDepartureCode(from);
                    setArrivalCode(to);
                  }}
                  className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  {from} → {to}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Premium Settings Bar */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Markup:</span>

          <div className="flex overflow-hidden rounded-lg border border-border">
            <button
              onClick={() => setPremiumType("percent")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                premiumType === "percent"
                  ? "bg-primary text-primary-foreground"
                  : "bg-white text-muted-foreground hover:bg-muted"
              }`}
            >
              <Percent className="h-3 w-3" />
              Percentage
            </button>
            <button
              onClick={() => setPremiumType("fixed")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                premiumType === "fixed"
                  ? "bg-primary text-primary-foreground"
                  : "bg-white text-muted-foreground hover:bg-muted"
              }`}
            >
              <DollarSign className="h-3 w-3" />
              Fixed Amount
            </button>
          </div>

          <div className="relative w-28">
            {premiumType === "percent" ? (
              <div className="relative">
                <Input
                  type="number"
                  value={premiumValue}
                  onChange={(e) => setPremiumValue(e.target.value)}
                  className="h-8 pr-6 text-sm"
                  placeholder="15"
                  min={0}
                  max={100}
                />
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  %
                </span>
              </div>
            ) : (
              <div className="relative">
                <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  value={premiumValue}
                  onChange={(e) => setPremiumValue(e.target.value)}
                  className="h-8 pl-5 text-sm"
                  placeholder="50"
                  min={0}
                />
              </div>
            )}
          </div>

          {/* Selected summary */}
          {(selectedOutbound || (tripType === "oneway" && hasResults)) && (
            <span className="ml-auto text-xs text-muted-foreground">
              {tripType === "oneway" ? (
                <>
                  Base: US${(selectedOutbound?.price ?? 0).toFixed(0)}
                </>
              ) : (
                <>
                  Selected: out{selectedOutbound ? " ✅" : " —"} / return{selectedReturn ? " ✅" : " —"} · Base: US${combinedBasePrice.toFixed(0)}
                </>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Errors */}
        {allErrors && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {legs.map((leg, i) =>
              leg.error ? <p key={i}>{leg.label}: {leg.error}</p> : null
            )}
          </div>
        )}

        {/* Partial errors */}
        {legs.map((leg, i) =>
          leg.error && !allErrors ? (
            <div key={i} className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              {leg.label}: {leg.error}
            </div>
          ) : null
        )}

        {/* Loading state */}
        {anyLoading && !hasResults && (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="mb-4 h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Searching flights...</p>
            {tripType === "round" && (
              <p className="mt-1 text-xs text-muted-foreground">
                Searching outbound and return flights in parallel
              </p>
            )}
          </div>
        )}

        {/* Empty state */}
        {!anyLoading && !hasResults && !allErrors && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Plane className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Flight Pricing Tool</h2>
            <p className="mb-6 max-w-md text-center text-sm text-muted-foreground">
              Search flights, see live fares with all leg details including layovers, add ArcTravel&apos;s markup, and generate quotes for your clients.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-white p-4 text-center">
                <Search className="mx-auto mb-2 h-5 w-5 text-primary" />
                <p className="text-xs font-medium text-foreground">1. Search</p>
                <p className="text-xs text-muted-foreground">Enter route and dates</p>
              </div>
              <div className="rounded-lg border border-border bg-white p-4 text-center">
                <DollarSign className="mx-auto mb-2 h-5 w-5 text-primary" />
                <p className="text-xs font-medium text-foreground">2. Select Flights</p>
                <p className="text-xs text-muted-foreground">Pick each leg and apply ArcTravel premium</p>
              </div>
              <div className="rounded-lg border border-border bg-white p-4 text-center">
                <Copy className="mx-auto mb-2 h-5 w-5 text-primary" />
                <p className="text-xs font-medium text-foreground">3. Copy Quote</p>
                <p className="text-xs text-muted-foreground">Share with your client</p>
              </div>
            </div>
          </div>
        )}

        {/* Results per leg */}
        {hasResults && (
          <div className={`grid gap-6 ${tripType === "round" ? "lg:grid-cols-2" : ""}`}>
            {legs.map((leg, legIndex) => (
              <div key={legIndex}>
                {/* Leg header */}
                <div className="mb-3 flex items-center gap-2">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white ${
                    legIndex === 0 ? "bg-primary" : "bg-secondary"
                  }`}>
                    {legIndex === 0 ? "OUT" : "RET"}
                  </div>
                  <h2 className="text-sm font-semibold text-foreground">{leg.label}</h2>
                  <span className="text-xs text-muted-foreground">· {leg.date}</span>
                  {leg.loading && (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin text-primary" />
                  )}
                  {!leg.loading && (
                    <span className="text-xs text-muted-foreground">
                      ({leg.best.length + leg.other.length} flight{leg.best.length + leg.other.length !== 1 ? "s" : ""})
                    </span>
                  )}
                </div>

                {/* Loading for this leg */}
                {leg.loading && (
                  <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-white py-12">
                    <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                )}

                {/* No results */}
                {!leg.loading && leg.best.length === 0 && leg.other.length === 0 && (
                  <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-white py-12">
                    <p className="text-sm text-muted-foreground">No flights found</p>
                  </div>
                )}

                {/* Best flights */}
                {!leg.loading && leg.best.length > 0 && (
                  <>
                    {leg.best.length > 0 && (
                      <p className="mb-2 text-xs font-medium text-muted-foreground">
                        {tripType === "oneway" ? "Flights" : "Best flights"}
                      </p>
                    )}
                    <div className="mb-4 grid gap-2.5">
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
                          />
                        );
                      })}
                    </div>
                  </>
                )}

                {/* Other flights */}
                {!leg.loading && leg.other.length > 0 && (
                  <>
                    <p className="mb-2 text-xs font-medium text-muted-foreground">Other flights</p>
                    <div className="grid gap-2.5">
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
          <div className="sticky bottom-0 mt-6 rounded-xl border border-border bg-white p-4 shadow-lg">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Price breakdown */}
              <div>
                <p className="text-xs text-muted-foreground">
                  {tripType === "round" ? "Outbound + Return" : "Selected flight"}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">
                    US${combinedFinal.total.toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    US${combinedBasePrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    +US${combinedFinal.premium.toFixed(2)} {premiumType === "percent" ? `(${premiumValue}%)` : "markup"}
                  </span>
                </div>
                {tripType === "round" && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Outbound{selectedOutbound ? ` US$${(selectedOutbound.price ?? 0).toFixed(0)}` : " —"}
                    {" · "}
                    Return{selectedReturn ? ` US$${(selectedReturn.price ?? 0).toFixed(0)}` : " —"}
                  </p>
                )}
              </div>

              {/* Copy button */}
              <div className="flex items-center gap-2">
                {tripType === "round" && (!selectedOutbound || !selectedReturn) && (
                  <p className="text-xs text-amber-600">
                    Select {!selectedOutbound ? "outbound" : ""}
                    {!selectedOutbound && !selectedReturn ? " and " : ""}
                    {!selectedReturn ? "return" : ""} flights above
                  </p>
                )}
                <Button
                  onClick={copyCombinedQuote}
                  disabled={tripType === "round" && (!selectedOutbound || !selectedReturn)}
                  size="lg"
                  className="whitespace-nowrap"
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
        className="h-10"
      />
      {filtered.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-border bg-white shadow-lg">
          {filtered.map((airport) => (
            <button
              key={airport.code}
              type="button"
              onMouseDown={() => {
                setInputValue(airport.code);
                onChange(airport.code);
              }}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted"
            >
              <span className="flex h-7 w-10 items-center justify-center rounded bg-primary/10 text-xs font-bold text-primary">
                {airport.code}
              </span>
              <div>
                <p className="text-xs font-medium text-foreground">{airport.city}</p>
                <p className="text-xs text-muted-foreground">{airport.name}</p>
              </div>
              <span className="ml-auto text-xs text-muted-foreground">{airport.country}</span>
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
}: {
  itinerary: FlightItinerary;
  expanded: boolean;
  onToggle: () => void;
  calcFinalPrice: (base: number) => { premium: number; total: number };
  premiumType: string;
  premiumValue: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const basePrice = itinerary.price ?? 0;
  const final = calcFinalPrice(basePrice);
  const firstFlight = itinerary.flights[0];
  const lastFlight = itinerary.flights[itinerary.flights.length - 1];

  // Identify layovers between consecutive flights
  const routeDescription = itinerary.flights.map((f) => f.departure_airport.id).join(" → ") + " → " + lastFlight?.arrival_airport.id;

  return (
    <div
      className={`rounded-xl border bg-white shadow-sm transition-all hover:shadow-md ${
        selected
          ? "border-primary ring-2 ring-primary/20"
          : "border-border"
      }`}
    >
      <div className="p-4">
        {/* Main row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Route summary */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Airline logo */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted p-1.5">
              {itinerary.flights[0]?.airline_logo ? (
                <img
                  src={itinerary.flights[0].airline_logo}
                  alt={itinerary.flights[0].airline}
                  className="h-full w-full object-contain"
                />
              ) : (
                <Plane className="h-5 w-5 text-muted-foreground" />
              )}
            </div>

            <div className="min-w-0">
              {/* Route codes */}
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-foreground">
                  {firstFlight?.departure_airport.id || "---"}
                </span>
                <div className="flex items-center gap-0.5">
                  <div className="h-px w-6 bg-border" />
                  <Plane className="h-3 w-3 rotate-90 text-muted-foreground shrink-0" />
                  <div className="h-px w-6 bg-border" />
                  {itinerary.layovers.length > 0 && (
                    <span className="text-[10px] font-medium text-muted-foreground ml-1">
                      {itinerary.flights.length - 1} stop{itinerary.flights.length - 1 > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <span className="text-base font-bold text-foreground">
                  {lastFlight?.arrival_airport.id || "---"}
                </span>
              </div>

              {/* Flight info */}
              <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                <span className="truncate max-w-[120px]">{itinerary.flights[0]?.airline || "Unknown"}</span>
                <span>·</span>
                <span>{itinerary.flights[0]?.flight_number || ""}</span>
                <span>·</span>
                <span>{itinerary.flights[0]?.travel_class || "Economy"}</span>
                {itinerary.flights.length > 1 && (
                  <>
                    <span>·</span>
                    <span className="text-amber-600">
                      {itinerary.flights.length - 1} stop{itinerary.flights.length - 1 > 1 ? "s" : ""}
                      {itinerary.layovers.some((l) => l.overnight) && " (overnight)"}
                    </span>
                  </>
                )}
              </div>

              {/* Depart/Arrive times */}
              <div className="mt-1 flex items-center gap-2 text-xs">
                <span className="font-medium text-foreground">
                  {formatTime(firstFlight?.departure_airport.time)}
                </span>
                <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">{formatDuration(itinerary.total_duration)}</span>
                <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
                <span className="font-medium text-foreground">
                  {formatTime(lastFlight?.arrival_airport.time)}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing + actions */}
          <div className="flex shrink-0 items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground line-through">US${basePrice.toFixed(2)}</p>
              <p className="text-xl font-bold text-primary">US${final.total.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">
                +US${final.premium.toFixed(2)} {premiumType === "percent" ? `(${premiumValue}%)` : "markup"}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <Button
                size="sm"
                variant={selected ? "default" : "outline"}
                onClick={onSelect}
                className="whitespace-nowrap min-w-[90px]"
              >
                {selected ? (
                  <>
                    <Check className="mr-1 h-3.5 w-3.5" />
                    Selected
                  </>
                ) : (
                  "Select"
                )}
              </Button>
              <div className="flex items-center gap-1.5">
                <a
                  href={googleFlightsUrl(itinerary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 underline underline-offset-2"
                >
                  <ExternalLink className="h-3 w-3" />
                  View on Google
                </a>
                <button
                  onClick={onToggle}
                  className="flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  {expanded ? "Less" : "More"}
                  {expanded ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Layover summary (always visible) */}
        {itinerary.layovers.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {itinerary.layovers.map((layover, li) => (
              <span
                key={li}
                className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-medium ${
                  layover.overnight
                    ? "bg-amber-100 text-amber-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                <Clock className="h-2.5 w-2.5" />
                {formatDuration(layover.duration)} in {layover.id}
                {layover.overnight ? " (overnight)" : ""}
              </span>
            ))}
          </div>
        )}

        {/* Expanded details */}
        {expanded && (
          <div className="mt-3 border-t border-border pt-3">
            {/* Route chain */}
            <p className="mb-2 text-xs text-muted-foreground">
              Route: <span className="font-medium text-foreground">{routeDescription}</span>
            </p>

            {itinerary.flights.map((segment, si) => (
              <div key={si} className="mb-2.5 last:mb-0">
                <div className="flex items-start gap-3">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center">
                    <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                    {si < itinerary.flights.length - 1 && <div className="mt-0.5 h-14 w-px bg-border" />}
                  </div>

                  {/* Segment details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">
                      {segment.airline} {segment.flight_number}
                    </p>
                    {segment.airplane && (
                      <p className="text-xs text-muted-foreground">{segment.airplane}</p>
                    )}
                    <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium text-foreground">
                          {segment.departure_airport.id}
                        </span>{" "}
                        {formatTime(segment.departure_airport.time)}
                      </div>
                      <div>
                        <span className="font-medium text-foreground">
                          {segment.arrival_airport.id}
                        </span>{" "}
                        {formatTime(segment.arrival_airport.time)}
                      </div>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Duration: {formatDuration(segment.duration)} · {segment.travel_class}
                      {segment.legroom ? ` · ${segment.legroom} legroom` : ""}
                    </p>

                    {/* Flight amenities */}
                    {segment.extensions && segment.extensions.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {segment.extensions.map((ext, ei) => {
                          const icon = getExtIcon(ext);
                          return (
                            <span
                              key={ei}
                              className="inline-flex items-center gap-0.5 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
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
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {segment.overnight && (
                        <span className="inline-block rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                          Red-eye / Overnight
                        </span>
                      )}
                      {segment.often_delayed_by_over_30_min && (
                        <span className="inline-block rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-700">
                          Often delayed
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Layover between this segment and next */}
                {si < itinerary.flights.length - 1 && itinerary.layovers[si] && (
                  <div className="ml-3 mt-0.5 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-1.5">
                    <Clock className="h-3 w-3 text-amber-600 shrink-0" />
                    <span className="text-xs text-amber-800">
                      Layover at <strong>{itinerary.layovers[si].name}</strong> — {formatDuration(itinerary.layovers[si].duration)}
                      {itinerary.layovers[si].overnight ? " (overnight)" : ""}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {/* Carbon info */}
            {itinerary.carbon_emissions && (
              <div className="mt-3 rounded-lg bg-green-50 px-3 py-2">
                <p className="text-xs text-green-700">
                  Carbon: {(itinerary.carbon_emissions.this_flight / 1000).toFixed(0)} kg CO₂
                  {itinerary.carbon_emissions.difference_percent !== 0 && (
                    <span>
                      {" "}
                      ({itinerary.carbon_emissions.difference_percent > 0 ? "+" : ""}
                      {itinerary.carbon_emissions.difference_percent}% vs typical)
                    </span>
                  )}
                </p>
              </div>
            )}

            {/* Booking Options */}
            <BookingOptionsSection itinerary={itinerary} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Booking Options Section ────────────────────────────

function BookingOptionsSection({ itinerary }: { itinerary: FlightItinerary }) {
  const [options, setOptions] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const firstFlight = itinerary.flights[0];
  const lastFlight = itinerary.flights[itinerary.flights.length - 1];

  const fetchOptions = useCallback(async () => {
    if (options) {
      setShow(!show);
      return;
    }

    setLoading(true);
    setError(null);

    // Build selected_flights_json — flat fields: departure_id, arrival_id, flight_number, date
    const selectedFlights = {
      outbound: itinerary.flights.map((f) => ({
        departure_id: f.departure_airport.id,
        arrival_id: f.arrival_airport.id,
        flight_number: f.flight_number.replace(/\s/g, ""),
        date: f.departure_airport.time.split(" ")[0],
      })),
    };

    const params = new URLSearchParams({
      departure_id: firstFlight?.departure_airport.id || "",
      arrival_id: lastFlight?.arrival_airport.id || "",
      outbound_date: firstFlight?.departure_airport.time?.split(" ")[0] || "",
      type: "2",
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
  }, [itinerary, firstFlight, lastFlight, options, show]);

  return (
    <div className="mt-3">
      <button
        onClick={fetchOptions}
        disabled={loading}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50"
      >
        {loading ? (
          <><RefreshCw className="h-3 w-3 animate-spin" /> Loading...</>
        ) : show ? (
          <><ChevronUp className="h-3 w-3" /> Hide booking options</>
        ) : (
          <><ExternalLink className="h-3 w-3" /> Show booking options</>
        )}
      </button>

      {show && (
        <div className="mt-2">
          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}

          {options && options.length === 0 && !error && (
            <p className="text-xs text-muted-foreground">No booking options found.</p>
          )}

          {options && options.length > 0 && (
            <div className="grid gap-1.5">
              {options.map((opt, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border bg-gray-50 px-3 py-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {opt.airline_logos?.[0] && (
                      <img
                        src={opt.airline_logos[0]}
                        alt={opt.book_with}
                        className="h-5 w-5 object-contain"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">
                        {opt.book_with}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {opt.option_title}
                        {opt.extensions?.length > 0 && ` · ${opt.extensions[0]}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-bold text-foreground">
                      US${(opt.price || 0).toFixed(2)}
                    </span>
                    {opt.booking_url && (
                      <a
                        href={opt.booking_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded bg-primary px-2 py-1 text-[10px] font-medium text-primary-foreground transition-colors hover:bg-primary/80"
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
            <div className="mt-1.5 rounded bg-blue-50 px-2 py-1">
              <p className="text-[10px] text-blue-700 font-medium">
                Baggage: {options.find((o) => o.baggage_prices?.length > 0).baggage_prices.join(" · ")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Contact info (for quote template) ───────────────────

const contactInfo = {
  phone: "078 657 7594",
};
