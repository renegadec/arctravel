"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
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
  Baby,
  Calendar,
  Shuffle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE_URL } from "@/lib/constants";
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

interface BookingOption {
  book_with: string;
  price?: number;
  option_title: string;
  extensions: string[];
  baggage_prices: string[];
  booking_url: string | null;
  post_data: string | null;
  airline?: unknown;
  airline_logos: string[];
}

interface SelectedFlightLeg {
  departure_id: string;
  arrival_id: string;
  flight_number: string;
  date: string;
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

// ─── Tiered markup ───────────────────────────────────
// Higher fares carry thinner margin, so the rate steps down as price goes up.
function getMarkupRate(basePrice: number): number {
  if (basePrice < 1000) return 20;
  if (basePrice < 2500) return 15;
  if (basePrice < 4000) return 10;
  return 6.5;
}

// ─── Main Component ──────────────────────────────────────

export default function FlightPricingTool() {
  // Search state
  const [departureCode, setDepartureCode] = useState("HRE");
  const [arrivalCode, setArrivalCode] = useState("JNB");
  const [outboundDate, setOutboundDate] = useState(getNextWeekISO());
  const [returnDate, setReturnDate] = useState(getNextWeekISO());
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [tripType, setTripType] = useState<"round" | "oneway">("round");

  // Flight search results (one leg for one-way, two legs for round trip)
  const [legs, setLegs] = useState<LegResults[]>([
    { label: "Departure", departureCode: "HRE", arrivalCode: "JNB", date: getNextWeekISO(), best: [], other: [], loading: false, error: null },
  ]);
  const [totalLoading, setTotalLoading] = useState(false);

  // Selected itineraries
  const [selectedOutbound, setSelectedOutbound] = useState<FlightItinerary | null>(null);

  // Return flights for the selected outbound (fetched via its departure_token)
  const [returnResults, setReturnResults] = useState<FlightItinerary[] | null>(null);
  const [returnLoading, setReturnLoading] = useState(false);
  const [returnError, setReturnError] = useState<string | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<FlightItinerary | null>(null);

  // Expanded cards
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [copiedQuote, setCopiedQuote] = useState(false);

  // ─── Search ──────────────────────────────────────────

  const handleSearch = useCallback(async () => {
    if (!departureCode.trim() || !arrivalCode.trim() || !outboundDate) return;
    if (tripType === "round" && !returnDate) return;

    setTotalLoading(true);
    setSelectedOutbound(null);
    setReturnResults(null);
    setSelectedReturn(null);
    setCopiedQuote(false);

    const from = departureCode.trim().toUpperCase();
    const to = arrivalCode.trim().toUpperCase();

    // Round trip = ONE combined search (type=1): SerpAPI returns each
    // itinerary with outbound + return legs and a combined fare. This is
    // half the API cost of two one-way searches, and Google only offers
    // combined round-trip fares from a single round-trip query.
    const searches: {
      label: string;
      from: string;
      to: string;
      date: string;
      returnDate?: string;
    }[] = [
      {
        label: `${from} → ${to}`,
        from,
        to,
        date: outboundDate,
        returnDate: tripType === "round" ? returnDate : undefined,
      },
    ];

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

    // Fetch all legs in parallel (single combined search for round trips)
    const results = await Promise.all(
      searches.map(async (search, i) => {
        const params = new URLSearchParams({
          departure_id: search.from,
          arrival_id: search.to,
          outbound_date: search.date,
          type: tripType === "round" ? "1" : "2",
          currency: "USD",
          hl: "en",
          adults,
        });
        if (search.returnDate) {
          params.set("return_date", search.returnDate);
        }
        if (children && children !== "0") {
          params.set("children", children);
        }

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
  }, [departureCode, arrivalCode, outboundDate, returnDate, adults, children, tripType]);

  // ─── Premium calc ────────────────────────────────────

  const calcFinalPrice = useCallback(
    (basePrice: number): { premium: number; total: number; rate: number } => {
      const rate = getMarkupRate(basePrice);
      const premium = (basePrice * rate) / 100;
      return { premium, total: basePrice + premium, rate };
    },
    []
  );

  // Round trip: the return option's price is the full combined fare for that
  // outbound + return pairing. Before a return is picked, show the outbound's
  // combined fare as the estimate.
  const selectedBasePrice =
    tripType === "round"
      ? (selectedReturn?.price ?? selectedOutbound?.price ?? 0)
      : (selectedOutbound?.price ?? 0);
  const combinedFinal = calcFinalPrice(selectedBasePrice);

  // ─── Select outbound (round trip: also fetch matching return flights) ──

  const selectOutbound = useCallback(
    async (itinerary: FlightItinerary) => {
      setSelectedOutbound(itinerary);
      setSelectedReturn(null);
      setReturnResults(null);
      setReturnError(null);

      if (tripType !== "round" || !itinerary.departure_token) return;

      setReturnLoading(true);
      try {
        const params = new URLSearchParams({
          departure_id: itinerary.flights[0]?.departure_airport.id || "",
          arrival_id:
            itinerary.flights[itinerary.flights.length - 1]?.arrival_airport.id || "",
          outbound_date:
            itinerary.flights[0]?.departure_airport.time?.split(" ")[0] || "",
          type: "1",
          currency: "USD",
          hl: "en",
          adults,
        });
        if (returnDate) params.set("return_date", returnDate);
        if (children && children !== "0") {
          params.set("children", children);
        }
        params.set("departure_token", itinerary.departure_token);

        const res = await fetch(`/api/staff/flight-search?${params.toString()}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to load return flights");
        }
        setReturnResults([
          ...(data.best_flights || []),
          ...(data.other_flights || []),
        ]);
      } catch (e) {
        setReturnError(e instanceof Error ? e.message : "Failed to load return flights");
      } finally {
        setReturnLoading(false);
      }
    },
    [adults, children, returnDate, tripType]
  );

  // ─── Copy quote ──────────────────────────────────────

  const copyCombinedQuote = useCallback(() => {
    let text = `✈️ ArcTravel — Flight Quote\n`;
    text += `${departureCode.toUpperCase()} → ${arrivalCode.toUpperCase()} · ${outboundDate}`;
    if (tripType === "round") {
      text += ` → ${returnDate}`;
    }
    text += ` · ${adults} adult${adults !== "1" ? "s" : ""}`;
    if (children && children !== "0") {
      text += ` + ${children} child${children !== "1" ? "ren" : ""}`;
    }
    text += `\n\n`;

    const addItinerary = (
      itinerary: { flights: FlightSegment[]; layovers: Layover[] },
      title: string
    ) => {
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

    if (tripType === "round") {
      if (selectedOutbound) {
        addItinerary(selectedOutbound, "DEPARTURE");
      }
      if (selectedReturn) {
        addItinerary(selectedReturn, "RETURN");
      } else {
        text += `RETURN: (no return flight selected yet)\n\n`;
      }
    } else if (selectedOutbound) {
      addItinerary(selectedOutbound, "FLIGHT");
    }

    text += `---\n`;
    text += `Price:  US$${combinedFinal.total.toFixed(2)}\n`;
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
    departureCode,
    arrivalCode,
    outboundDate,
    returnDate,
    adults,
    children,
    tripType,
  ]);

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
      <div className="sticky top-20 z-40 border-b border-primary/10 bg-gradient-to-r from-primary to-[#003d7a] shadow-md md:top-[116px] lg:top-[132px]">
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
              href={SITE_URL}
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
          {/* Trip Type - segmented control */}
          <div className="mb-4 inline-flex rounded-xl bg-gray-100 p-0.5">
            <button
              onClick={() => setTripType("round")}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
                tripType === "round"
                  ? "bg-white text-primary shadow-sm ring-1 ring-gray-200"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Round Trip
            </button>
            <button
              onClick={() => setTripType("oneway")}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
                tripType === "oneway"
                  ? "bg-white text-primary shadow-sm ring-1 ring-gray-200"
                  : "text-gray-500 hover:text-gray-900"
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
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                  <PlaneTakeoff className="mr-1 inline h-3.5 w-3.5 text-gray-400" />
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
                className="flex h-10 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-primary shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 active:scale-95 lg:h-10 lg:w-10"
                title="Swap airports"
              >
                <ArrowRight className="h-4 w-4 rotate-90 lg:rotate-0 shrink-0" />
              </button>
              <div className="flex-1">
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                  <PlaneLanding className="mr-1 inline h-3.5 w-3.5 text-gray-400" />
                  To
                </label>
                <AirportInput value={arrivalCode} onChange={setArrivalCode} />
              </div>
            </div>

            {/* Dates row on mobile, inline on desktop */}
            <div className="flex items-end gap-2 w-full md:flex-1">
              <div className="flex-1">
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                  <Calendar className="mr-1 inline h-3.5 w-3.5 text-gray-400" />
                  Depart
                </label>
                <Input
                  type="date"
                  value={outboundDate}
                  min={getTodayISO()}
                  onChange={(e) => setOutboundDate(e.target.value)}
                  className="h-10 rounded-xl border-gray-300 bg-white shadow-sm hover:border-gray-400 focus:border-primary transition-colors"
                />
              </div>
              {tripType === "round" && (
                <div className="flex-1">
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    <Calendar className="mr-1 inline h-3.5 w-3.5 text-gray-400" />
                    Return
                  </label>
                  <Input
                    type="date"
                    value={returnDate}
                    min={outboundDate || getTodayISO()}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="h-10 rounded-xl border-gray-300 bg-white shadow-sm hover:border-gray-400 focus:border-primary transition-colors"
                  />
                </div>
              )}
            </div>

            {/* Passengers + Search row */}
            <div className="flex items-end gap-2 w-full md:w-auto">
              <div className="w-24 md:w-20 lg:w-24">
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                  <Users className="mr-1 inline h-3.5 w-3.5 text-gray-400" />
                  Adults
                </label>
                <Select value={adults} onValueChange={(v) => v && setAdults(v)}>
                  <SelectTrigger className="h-10 rounded-xl border-gray-300 bg-white shadow-sm">
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
              <div className="w-24 md:w-20 lg:w-24">
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                  <Baby className="mr-1 inline h-3.5 w-3.5 text-gray-400" />
                  Children
                </label>
                <Select value={children} onValueChange={(v) => v && setChildren(v)}>
                  <SelectTrigger className="h-10 rounded-xl border-gray-300 bg-white shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
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
            <span className="mr-1 text-xs font-medium text-gray-500">Quick routes:</span>
            {[["HRE", "JNB"], ["HRE", "DXB"], ["HRE", "CPT"], ["HRE", "NBO"], ["HRE", "LHR"], ["JNB", "DXB"], ["HRE", "VFA"], ["HRE", "ADD"]].map(
              ([from, to]) => (
                <button
                  key={`${from}-${to}`}
                  onClick={() => {
                    setDepartureCode(from);
                    setArrivalCode(to);
                  }}
                  className="rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-600 shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary active:scale-95"
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
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-3 py-2 sm:px-6 sm:gap-3 lg:px-8">
          <div className="flex items-center gap-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gray-100 ring-1 ring-gray-200 sm:h-6 sm:w-6">
              <Percent className="h-3 w-3 text-gray-600 sm:h-3.5 sm:w-3.5" />
            </div>
            <span className="text-xs font-medium text-gray-700 sm:text-sm">Markup</span>
          </div>

          {/* Tiered markup — rate for the selected fare; hover for the tier legend */}
          <span
            className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200"
            title="Under $1,000: 20% · $1,000-2,499: 15% · $2,500-3,999: 10% · $4,000+: 6.5%"
          >
            {selectedOutbound ? (
              <span className="font-semibold text-accent">{combinedFinal.rate}%</span>
            ) : (
              <span>Markup by fare</span>
            )}
          </span>

          {/* Selected summary */}
          {selectedOutbound && (
            <span className="ml-auto hidden text-xs text-muted-foreground sm:inline">
              {tripType === "round" ? "Round trip" : "Flight"} selected ✅
              <span className="mx-1.5 text-border">|</span>
              Base: <span className="font-medium text-foreground">US${selectedBasePrice.toFixed(0)}</span>
              <span className="mx-1.5 text-border">|</span>
              <span className="text-accent">+{combinedFinal.rate}%</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        {/* Errors */}
        {allErrors && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <div className="flex items-start gap-2">
              <Shuffle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              <div>
                <p className="text-xs font-semibold text-red-800">Search Errors</p>
                {legs.map((leg, i) =>
                  leg.error ? <p key={i} className="mt-0.5 text-xs text-red-700">{leg.label}: {leg.error}</p> : null
                )}
              </div>
            </div>
          </div>
        )}

        {/* Partial errors */}
        {legs.map((leg, i) =>
          leg.error && !allErrors ? (
            <div key={i} className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <div className="flex items-start gap-2">
                <Shuffle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <div>
                  <p className="text-xs font-semibold text-amber-800">{leg.label}</p>
                  <p className="mt-0.5 text-xs text-amber-700">{leg.error}</p>
                </div>
              </div>
            </div>
          ) : null
        )}

        {/* Loading skeleton */}
        {anyLoading && !hasResults && (
          <div className="py-6">
            <div className="mb-4 flex items-center gap-2 text-sm">
              <RefreshCw className="h-4 w-4 animate-spin text-primary" />
              <span className="font-medium text-gray-700">Searching live fares</span>
              <span className="text-gray-400">
                {tripType === "round" ? "· combined round trip" : "· one way"}
              </span>
            </div>
            <div className="grid gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-lg bg-gray-200" />
                      <div>
                        <div className="h-4 w-36 rounded bg-gray-200" />
                        <div className="mt-2 h-3 w-52 rounded bg-gray-100" />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="ml-auto h-3 w-14 rounded bg-gray-100" />
                      <div className="mt-2 ml-auto h-5 w-20 rounded bg-gray-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!anyLoading && !hasResults && !allErrors && (
          <div className="py-16">
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 ring-1 ring-gray-200">
                <Plane className="h-7 w-7 text-gray-400" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-gray-900">Flight Pricing Tool</h2>
              <p className="mt-1 text-sm leading-relaxed text-gray-500">
                Search live fares, compare itineraries, add ArcTravel&apos;s markup, and generate client-ready quotes.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
                  <div className="mx-auto mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                    <Search className="h-4.5 w-4.5 text-gray-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">1. Search</p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">Enter route and dates</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
                  <div className="mx-auto mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                    <DollarSign className="h-4.5 w-4.5 text-gray-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">2. Select &amp; Mark Up</p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">Pick flights, apply premium</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
                  <div className="mx-auto mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                    <Copy className="h-4.5 w-4.5 text-gray-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">3. Quote</p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">Copy &amp; share with client</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results per leg — two columns only when multiple legs exist */}
        {hasResults && (
          <div className={`grid gap-4 sm:gap-6 ${legs.length > 1 ? "lg:grid-cols-2" : ""}`}>
            {legs.map((leg, legIndex) => (
              <div key={legIndex}>
                {/* Leg header */}
                <div className="mb-4 flex items-center gap-3">
                  <div className={`flex h-8 items-center rounded-lg px-3 text-xs font-bold text-white shadow-sm ${
                    legIndex === 0 ? "bg-primary" : "bg-gradient-to-br from-secondary to-amber-600"
                  }`}>
                    {legIndex === 0 ? (tripType === "round" ? "Round Trip" : "Departure") : "Return"}
                  </div>
                  <h2 className="text-sm font-semibold text-gray-900">{leg.label}</h2>
                  <span className="text-xs text-gray-500">· {leg.date}{tripType === "round" && legIndex === 0 ? ` → ${returnDate}` : ""}</span>
                  {leg.loading && (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin text-primary" />
                  )}
                  {!leg.loading && (
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                      {leg.best.length + leg.other.length} flight{leg.best.length + leg.other.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                {/* Loading skeleton for this leg */}
                {leg.loading && (
                  <div className="grid gap-3">
                    {[0, 1].map((i) => (
                      <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="h-11 w-11 rounded-lg bg-gray-200" />
                            <div>
                              <div className="h-4 w-32 rounded bg-gray-200" />
                              <div className="mt-2 h-3 w-44 rounded bg-gray-100" />
                            </div>
                          </div>
                          <div className="h-5 w-20 rounded bg-gray-200" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* No results */}
                {!leg.loading && leg.best.length === 0 && leg.other.length === 0 && (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <Shuffle className="h-5 w-5 text-gray-400" />
                    </div>
                    <p className="mt-3 text-sm text-gray-500">No flights found</p>
                  </div>
                )}

                {/* Best flights */}
                {!leg.loading && leg.best.length > 0 && (
                  <>
                    {leg.best.length > 0 && (
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-3 w-0.5 rounded-full bg-primary/40" />
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          {tripType === "oneway" ? "Flights" : "Best flights"}
                        </p>
                      </div>
                    )}
                    <div className="mb-4 grid gap-3">
                      {leg.best.map((itinerary, i) => {
                        const key = `${legIndex}-best-${i}`;
                        const selected = selectedOutbound === itinerary;
                        return (
                          <FlightCard
                            key={key}
                            itinerary={itinerary}
                            expanded={expandedCards.has(key)}
                            onToggle={() => toggleExpand(key)}
                            calcFinalPrice={calcFinalPrice}
                            selected={selected}
                            onSelect={() => selectOutbound(itinerary)}
                            tripType={tripType}
                          adults={adults}
                          childCount={children}
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
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Other flights</p>
                    </div>
                    <div className="grid gap-3">
                      {leg.other.map((itinerary, i) => {
                        const key = `${legIndex}-other-${i}`;
                        const selected = selectedOutbound === itinerary;
                        return (
                          <FlightCard
                            key={key}
                            itinerary={itinerary}
                            expanded={expandedCards.has(key)}
                            onToggle={() => toggleExpand(key)}
                            calcFinalPrice={calcFinalPrice}
                            selected={selected}
                            onSelect={() => selectOutbound(itinerary)}
                            tripType={tripType}
                          adults={adults}
                          childCount={children}
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

        {/* Return flights for selected outbound (round trips — fetched via departure_token) */}
        {tripType === "round" && selectedOutbound && (
          <div className="mt-6">
            {/* Return header */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 items-center rounded-lg bg-gradient-to-br from-secondary to-amber-600 px-3 text-xs font-bold text-white shadow-sm">
                Return
              </div>
              <h2 className="text-sm font-semibold text-gray-900">
                {selectedOutbound.flights[selectedOutbound.flights.length - 1]?.arrival_airport.id} → {selectedOutbound.flights[0]?.departure_airport.id}
              </h2>
              <span className="text-xs text-gray-500">· {returnDate}</span>
              {returnLoading && <RefreshCw className="h-3.5 w-3.5 animate-spin text-primary" />}
              {!returnLoading && returnResults && (
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                  {returnResults.length} return flight{returnResults.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* Return loading */}
            {returnLoading && (
              <div className="grid gap-3">
                {[0, 1].map((i) => (
                  <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-lg bg-gray-200" />
                        <div>
                          <div className="h-4 w-32 rounded bg-gray-200" />
                          <div className="mt-2 h-3 w-44 rounded bg-gray-100" />
                        </div>
                      </div>
                      <div className="h-5 w-20 rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Return error */}
            {returnError && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <p className="text-xs font-semibold text-amber-800">Return flights unavailable</p>
                <p className="mt-0.5 text-xs text-amber-700">{returnError}</p>
              </div>
            )}

            {/* Return results */}
            {!returnLoading && returnResults && returnResults.length > 0 && (
              <div className="grid gap-3">
                {returnResults.map((itinerary, i) => {
                  const key = `return-${i}`;
                  const selected = selectedReturn === itinerary;
                  return (
                    <FlightCard
                      key={key}
                      itinerary={itinerary}
                      expanded={expandedCards.has(key)}
                      onToggle={() => toggleExpand(key)}
                      calcFinalPrice={calcFinalPrice}
                      selected={selected}
                      onSelect={() => setSelectedReturn(itinerary)}
                      tripType="round"
                    adults={adults}
                    childCount={children}
                    />
                  );
                })}
              </div>
            )}

            {/* Return empty */}
            {!returnLoading && returnResults && returnResults.length === 0 && !returnError && (
              <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <Shuffle className="h-5 w-5 text-gray-400" />
                </div>
                <p className="mt-3 text-sm text-gray-500">No return flights found for this outbound</p>
              </div>
            )}
          </div>
        )}

        {/* Combined pricing + copy */}
        {hasResults && selectedOutbound && (
          <div className="sticky bottom-0 mt-4 sm:mt-6 rounded-xl border border-gray-200 bg-white/95 p-3 sm:p-5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Price breakdown */}
              <div>
                <p className="text-xs font-medium text-gray-500">
                  {tripType === "round" ? "Round trip, combined fare" : "Selected flight"}
                </p>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                    US${combinedFinal.total.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-muted-foreground line-through sm:text-sm">
                    US${selectedBasePrice.toFixed(2)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-1.5 py-0.5 text-[10px] font-medium text-accent sm:px-2.5 sm:py-0.5 sm:text-xs">
                    +{combinedFinal.rate}%
                  </span>
                </div>
                {tripType === "round" && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {selectedOutbound.flights[0]?.departure_airport.id} → {selectedOutbound.flights[selectedOutbound.flights.length - 1]?.arrival_airport.id} → {selectedOutbound.flights[0]?.departure_airport.id}
                    <span className="mx-1.5 text-border">·</span>
                    Out {outboundDate}
                    <span className="mx-1.5 text-border">·</span>
                    Ret {returnDate}
                    <span className="mx-1.5 text-border">·</span>
                    Combined fare
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 flex-wrap">
                {tripType === "round" && !selectedReturn && (
                  <p className="text-xs text-amber-600 font-medium">
                    Select a return flight to complete the round trip
                  </p>
                )}
                <Button
                  onClick={copyCombinedQuote}
                  disabled={tripType === "round" ? !selectedReturn : !selectedOutbound}
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

            {/* Booking options — round trip: combined here; one-way: inline in card */}
            {tripType === "round" && selectedOutbound && selectedReturn && (
              <CombinedBookingOptions outbound={selectedOutbound} returnFlight={selectedReturn} adults={adults} childCount={children} />
            )}
            {tripType === "oneway" && selectedOutbound && (
              <div className="mt-3">
                <BookingOptionsInline itinerary={selectedOutbound} tripType="oneway" adults={adults} childCount={children} />
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
        value={focused ? inputValue : value}
        onChange={(e) => {
          setInputValue(e.target.value.toUpperCase());
          onChange(e.target.value.toUpperCase());
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
        placeholder="e.g. HRE"
        className="h-10 rounded-xl border-gray-300 bg-white shadow-sm hover:border-gray-400 focus:border-primary transition-colors"
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
  selected,
  onSelect,
  tripType,
  adults,
  childCount,
}: {
  itinerary: FlightItinerary;
  expanded: boolean;
  onToggle: () => void;
  calcFinalPrice: (base: number) => { premium: number; total: number; rate: number };
  selected: boolean;
  onSelect: () => void;
  tripType?: "round" | "oneway";
  adults: string;
  childCount: string;
}) {
  const basePrice = itinerary.price ?? 0;
  const final = calcFinalPrice(basePrice);
  const firstFlight = itinerary.flights[0];
  const lastFlight = itinerary.flights[itinerary.flights.length - 1];

  // Identify layovers between consecutive flights
  const routeDescription = itinerary.flights.map((f) => f.departure_airport.id).join(" → ") + " → " + lastFlight?.arrival_airport.id;

  return (
    <div
      className={`rounded-xl border bg-white shadow-sm transition-shadow duration-200 ${
        selected
          ? "border-primary ring-2 ring-primary/20 shadow-md"
          : "border-gray-200 hover:shadow-md"
      }`}
    >
      <div className="p-4 sm:p-5">
        {/* Main row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Route summary */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Airline logo */}
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-100 p-1.5 ring-1 ring-gray-200">
              {itinerary.flights[0]?.airline_logo ? (
                <Image
                  src={itinerary.flights[0].airline_logo}
                  alt={itinerary.flights[0].airline}
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              ) : (
                <Plane className="h-6 w-6 text-muted-foreground" />
              )}
            </div>

            <div className="min-w-0">
              {/* Route codes */}
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-gray-900">
                  {firstFlight?.departure_airport.id || "---"}
                </span>
                <div className="flex items-center gap-1">
                  <div className="h-px w-5 bg-gray-200" />
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/5">
                    <Plane className="h-2.5 w-2.5 rotate-90 text-primary/60 shrink-0" />
                  </div>
                  <div className="h-px w-5 bg-gray-200" />
                  {itinerary.layovers.length > 0 && (
                    <span className="ml-1 rounded-full bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-600">
                      {itinerary.flights.length - 1} stop{itinerary.flights.length - 1 > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <span className="text-base font-bold text-gray-900">
                  {lastFlight?.arrival_airport.id || "---"}
                </span>
              </div>

              {/* Flight info */}
              <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
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
                <span className="font-semibold text-gray-900">
                  {formatTime(firstFlight?.departure_airport.time)}
                </span>
                <span className="inline-flex items-center gap-1 text-gray-500">
                  <Clock className="h-3 w-3" />
                  {formatDuration(itinerary.total_duration)}
                </span>
                <span className="font-semibold text-gray-900">
                  {formatTime(lastFlight?.arrival_airport.time)}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing + actions */}
          <div className="flex items-center justify-between gap-3 sm:shrink-0 sm:gap-4 sm:flex-col">
            <div className="flex items-center gap-3 sm:flex-col sm:text-right">
              <div className="sm:text-right">
                <p className="text-xs text-gray-400 line-through">US${basePrice.toFixed(2)}</p>
                <p className="text-xl font-bold tracking-tight text-primary sm:text-2xl">US${final.total.toFixed(0)}</p>
                <p className="text-xs text-gray-500">
                  <span className="font-medium text-accent">+US${final.premium.toFixed(2)}</span> <span className="hidden sm:inline">{final.rate}%</span>
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
                className="inline-flex items-center gap-0.5 text-xs text-gray-500 hover:text-primary underline underline-offset-2 transition-colors sm:gap-1"
              >
                <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                Google
              </a>
              <button
                onClick={onToggle}
                className="inline-flex items-center gap-0.5 rounded-md px-1 py-0.5 text-xs text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:px-1.5"
              >
                {expanded ? "Less" : "More"}
                {expanded ? (
                  <ChevronUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-200" />
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
          <div className="mt-4 border-t border-gray-100 pt-4 overflow-hidden">
            {/* Route chain */}
            <div className="mb-3 flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
              <Shuffle className="h-3 w-3 text-muted-foreground shrink-0" />
              <p className="text-xs text-muted-foreground">
                Route: <span className="font-medium text-foreground">{routeDescription}</span>
              </p>
            </div>

            <SegmentList flights={itinerary.flights} layovers={itinerary.layovers} />

            {/* Return leg (round trips — comes combined from the search) */}
            {itinerary.return_flights && itinerary.return_flights.flights.length > 0 && (
              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2 rounded-lg bg-secondary/10 px-3 py-2">
                  <Shuffle className="h-3 w-3 text-secondary shrink-0" />
                  <p className="text-xs font-bold uppercase tracking-wide text-secondary">
                    Return — {itinerary.return_flights.flights[0].departure_airport.id} → {itinerary.return_flights.flights[itinerary.return_flights.flights.length - 1].arrival_airport.id}
                  </p>
                  <span className="ml-auto text-[10px] text-muted-foreground">
                    {formatDuration(itinerary.return_flights.total_duration)}
                  </span>
                </div>
                <SegmentList
                  flights={itinerary.return_flights.flights}
                  layovers={itinerary.return_flights.layovers}
                />
              </div>
            )}

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

            {/* Booking Options (one-way only — round trips use the combined options below) */}
            {tripType === "oneway" && (
              <BookingOptionsInline itinerary={itinerary} tripType="oneway" adults={adults} childCount={childCount} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Segment List (shared: outbound + return legs) ───────

function SegmentList({
  flights,
  layovers,
}: {
  flights: FlightSegment[];
  layovers: Layover[];
}) {
  return (
    <>
      {flights.map((segment, si) => (
        <div key={si} className="mb-3 last:mb-0">
          <div className="flex items-start gap-3">
            {/* Timeline dot */}
            <div className="flex flex-col items-center">
              <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${si === 0 ? "bg-primary" : "bg-border"}`} />
              {si < flights.length - 1 && <div className="mt-0.5 h-full min-h-[3rem] w-px bg-gradient-to-b from-primary/30 to-border" />}
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
          {si < flights.length - 1 && layovers[si] && (
            <div className="ml-3 mt-1.5 flex items-center gap-2.5 rounded-xl border border-amber-200/60 bg-gradient-to-r from-amber-50 to-amber-50/50 px-4 py-2.5 shadow-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100">
                <Clock className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              </div>
              <div>
                <p className="text-xs font-medium text-amber-800">
                  Layover at {layovers[si].name}
                </p>
                <p className="text-[11px] text-amber-600">
                  {formatDuration(layovers[si].duration)}
                  {layovers[si].overnight ? " · Overnight layover" : ""}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

// ─── Booking Options Section ────────────────────────────

function BookingOptionsInline({ itinerary, tripType, adults, childCount }: { itinerary: FlightItinerary; tripType?: "round" | "oneway"; adults: string; childCount: string }) {
  const [options, setOptions] = useState<BookingOption[] | null>(null);
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

    let selectedFlights: { outbound: SelectedFlightLeg[] };
    let params: URLSearchParams;

    if (isRoundTrip) {
      // SerpAPI's type=1 doesn't return return flight data — only the combined price.
      // Fall back to one-way booking options for the outbound flight.
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
        adults,
        selected_flights_json: JSON.stringify(selectedFlights),
      });
    } else {
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
        adults,
        selected_flights_json: JSON.stringify(selectedFlights),
      });
    }

    if (childCount && childCount !== "0") {
      params.set("children", childCount);
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
  }, [itinerary, firstFlight, lastFlight, isRoundTrip, adults, childCount, options, show]);

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
                      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted p-1">
                        <Image
                          src={opt.airline_logos[0]}
                          alt={opt.book_with}
                          fill
                          sizes="32px"
                          className="object-contain"
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
                💼 Baggage: {options.find((o) => o.baggage_prices?.length > 0)?.baggage_prices.join(" · ")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Combined Booking Options (round trip) ────────────────

function CombinedBookingOptions({ outbound, returnFlight, adults, childCount }: { outbound: FlightItinerary; returnFlight: FlightItinerary; adults: string; childCount: string }) {
  const [options, setOptions] = useState<BookingOption[] | null>(null);
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
      // SerpAPI validates: top-level arrival_id must match the outbound's
      // final arrival (the destination), not the return's final arrival.
      arrival_id: outbound.flights[outbound.flights.length - 1]?.arrival_airport.id || "",
      outbound_date: outbound.flights[0]?.departure_airport.time?.split(" ")[0] || "",
      return_date: returnFlight.flights[0]?.departure_airport.time?.split(" ")[0] || "",
      type: "1",
      currency: "USD",
      hl: "en",
      adults,
      selected_flights_json: JSON.stringify(selectedFlights),
    });

    if (childCount && childCount !== "0") {
      params.set("children", childCount);
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
  }, [outbound, returnFlight, adults, childCount, options, show]);

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
                      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted p-1">
                        <Image
                          src={opt.airline_logos[0]}
                          alt={opt.book_with}
                          fill
                          sizes="32px"
                          className="object-contain"
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
                💼 Baggage: {options.find((o) => o.baggage_prices?.length > 0)?.baggage_prices.join(" · ")}
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
