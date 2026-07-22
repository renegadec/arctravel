import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = process.env.SERPAPI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "SERPAPI_API_KEY not configured" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const departure_id = searchParams.get("departure_id");
  const arrival_id = searchParams.get("arrival_id");
  const outbound_date = searchParams.get("outbound_date");
  const return_date = searchParams.get("return_date");
  const type = searchParams.get("type") || "2";
  const adults = searchParams.get("adults") || "1";
  const selectedFlightsJson = searchParams.get("selected_flights_json");

  if (!departure_id || !arrival_id || !outbound_date || !selectedFlightsJson) {
    return NextResponse.json(
      { error: "Missing required params: departure_id, arrival_id, outbound_date, selected_flights_json" },
      { status: 400 }
    );
  }

  // Build SerpAPI request — type=1 (round trip) when return flight is included
  const serpParams: Record<string, string> = {
    engine: "google_flights",
    api_key: apiKey,
    departure_id: departure_id.toUpperCase(),
    arrival_id: arrival_id.toUpperCase(),
    outbound_date,
    type,
    currency: "USD",
    hl: "en",
    adults,
    selected_flights_json: selectedFlightsJson,
  };

  if (return_date && type === "1") {
    serpParams.return_date = return_date;
  }

  try {
    const queryString = new URLSearchParams(serpParams).toString();
    const response = await fetch(
      `https://serpapi.com/search?${queryString}`,
      { next: { revalidate: 600 } }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SerpAPI booking error:", response.status, errorText);
      return NextResponse.json(
        { error: `SerpAPI returned ${response.status}: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    return NextResponse.json({
      booking_options: extractBookingOptions(data),
    });
  } catch (error) {
    console.error("Booking options error:", error);
    return NextResponse.json({ error: "Failed to fetch booking options" }, { status: 500 });
  }
}

function extractBookingOptions(data: any) {
  return (data.booking_options || []).map((opt: any) => {
    const item = opt.together || opt;
    return {
      book_with: item.book_with || "Unknown",
      price: item.price,
      option_title: item.option_title || "Standard",
      extensions: item.extensions || [],
      baggage_prices: item.baggage_prices || [],
      booking_url: item.booking_request?.url || null,
      post_data: item.booking_request?.post_data || null,
      airline: item.airline || false,
      airline_logos: item.airline_logos || [],
    };
  });
}
