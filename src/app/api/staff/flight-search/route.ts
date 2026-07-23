import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = process.env.SERPAPI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "SERPAPI_API_KEY not configured. Set it in .env.local" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const departure_id = searchParams.get("departure_id");
  const arrival_id = searchParams.get("arrival_id");
  const outbound_date = searchParams.get("outbound_date");
  const return_date = searchParams.get("return_date");
  const adults = searchParams.get("adults") || "1";
  const type = searchParams.get("type");

  if (!departure_id || !arrival_id || !outbound_date) {
    return NextResponse.json(
      { error: "Missing required params: departure_id, arrival_id, outbound_date" },
      { status: 400 }
    );
  }

  // Build SerpAPI request
  const serpParams = new URLSearchParams({
    engine: "google_flights",
    api_key: apiKey,
    departure_id: departure_id.toUpperCase(),
    arrival_id: arrival_id.toUpperCase(),
    outbound_date,
    currency: "USD",
    hl: "en",
    adults,
  });

  // Default to one-way unless return_date is provided
  serpParams.set("type", type || (return_date ? "1" : "2"));

  if (return_date) {
    serpParams.set("return_date", return_date);
  }

  try {
    const response = await fetch(
      `https://serpapi.com/search?${serpParams.toString()}`,
      { next: { revalidate: 300 } } // cache for 5 minutes
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SerpAPI error:", response.status, errorText);
      return NextResponse.json(
        { error: `SerpAPI returned ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Check for API errors
    if (data.error) {
      return NextResponse.json(
        { error: data.error },
        { status: 400 }
      );
    }

    // Extract and normalise the data we care about
    const flights = extractFlights(data);

    return NextResponse.json({
      search_metadata: {
        url: data.search_metadata?.google_flights_url,
        created_at: data.search_metadata?.created_at,
      },
      price_insights: data.price_insights || null,
      best_flights: flights.best,
      other_flights: flights.other,
      total_results: flights.best.length + flights.other.length,
      booking_token: data.booking_token || null,
    });
  } catch (error) {
    console.error("Flight search error:", error);
    return NextResponse.json(
      { error: "Failed to search flights" },
      { status: 500 }
    );
  }
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
  often_delayed_by_over_30_min?: boolean;
  overnight?: boolean;
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
  price: number;
  type: string;
  airline_logo: string;
  carbon_emissions?: {
    this_flight: number;
    typical_for_this_route: number;
    difference_percent: number;
  };
  departure_token: string;
  return_flights?: {
    flights: FlightSegment[];
    layovers: Layover[];
    total_duration: number;
  };
}

function extractFlights(data: any): { best: FlightItinerary[]; other: FlightItinerary[] } {
  const normalise = (items: any[]): FlightItinerary[] => {
    if (!items || !Array.isArray(items)) return [];
    return items.map((item) => {
      const normaliseSegments = (segs: any[]) =>
        (segs || []).map((f: any) => ({
          departure_airport: f.departure_airport,
          arrival_airport: f.arrival_airport,
          duration: f.duration,
          airline: f.airline,
          airline_logo: f.airline_logo,
          flight_number: f.flight_number,
          travel_class: f.travel_class,
          extensions: f.extensions,
          airplane: f.airplane,
          legroom: f.legroom,
          often_delayed_by_over_30_min: f.often_delayed_by_over_30_min,
          overnight: f.overnight,
          ticket_also_sold_by: f.ticket_also_sold_by,
        }));

      const outboundFlights = normaliseSegments(item.flights);
      const hasReturn = item.return_flights?.flights?.length > 0;

      return {
        flights: outboundFlights,
        layovers: item.layovers || [],
        total_duration: item.total_duration,
        price: item.price,
        type: item.type,
        airline_logo: item.airline_logo,
        carbon_emissions: item.carbon_emissions,
        departure_token: item.departure_token,
        ...(hasReturn
          ? {
              return_flights: {
                flights: normaliseSegments(item.return_flights.flights),
                layovers: item.return_flights.layovers || [],
                total_duration: item.return_flights.total_duration,
              },
            }
          : {}),
      };
    });
  };

  return {
    best: normalise(data.best_flights),
    other: normalise(data.other_flights),
  };
}
