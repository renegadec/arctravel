import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { url, postData } = await request.json();

  if (!url || !postData) {
    return NextResponse.json({ error: "Missing url or postData" }, { status: 400 });
  }

  try {
    // POST to Google's click tracker — let fetch follow redirects naturally
    const response = await fetch(url, {
      method: "POST",
      body: postData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow",
    });

    // After following all redirects, response.url is the final destination
    const finalUrl = response.url;

    // If it landed back on google clk or a meta-refresh page, extract from HTML
    if (finalUrl.includes("clk/f") || finalUrl.includes("google.com")) {
      const html = await response.text();
      const urlMatch = html.match(/url\s*=\s*['"]([^'"]+)['"]/i);
      if (urlMatch && urlMatch[1]) {
        let decoded = urlMatch[1].replace(/&amp;/g, "&");
        decoded = decoded.replace(/^(https?:\/)([^\/])/, "$1/$2");
        return NextResponse.json({ url: decoded });
      }
    }

    return NextResponse.json({ url: finalUrl });
  } catch (error) {
    console.error("Resolve booking error:", error);
    return NextResponse.json({ url }, { status: 500 });
  }
}
