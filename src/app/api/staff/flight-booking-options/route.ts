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
  const adults = searchParams.get("adults") || "1";
  const selectedFlightsJson = searchParams.get("selected_flights_json");

  if (!departure_id || !arrival_id || !outbound_date || !selectedFlightsJson) {
    return NextResponse.json(
      { error: "Missing required params: departure_id, arrival_id, outbound_date, selected_flights_json" },
      { status: 400 }
    );
  }

  // Use the same google_flights engine with selected_flights_json to get booking options
  const serpParams = new URLSearchParams({
    engine: "google_flights",
    api_key: apiKey,
    departure_id: departure_id.toUpperCase(),
    arrival_id: arrival_id.toUpperCase(),
    outbound_date,
    type: "2",
    currency: "USD",
    hl: "en",
    adults,
    selected_flights_json: selectedFlightsJson,
  });

  try {
    const response = await fetch(
      `https://serpapi.com/search?${serpParams.toString()}`,
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
      airline: item.airline || false,
      airline_logos: item.airline_logos || [],
    };
  });
}
