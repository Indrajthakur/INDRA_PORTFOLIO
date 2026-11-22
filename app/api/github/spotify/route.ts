import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "Spotify URL is required" },
      { status: 400 }
    );
  }

  try {
    const parsed = new URL(url);

    if (
      parsed.protocol !== "https:" ||
      parsed.hostname !== "open.spotify.com" ||
      !/^\/(track|playlist)\/[A-Za-z0-9]+\/?$/.test(
        parsed.pathname
      )
    ) {
      return NextResponse.json(
        { error: "Invalid Spotify URL" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`,
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Could not find Spotify content" },
        { status: 404 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      title: data.title,
      artwork: data.thumbnail_url ?? null,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not load Spotify content" },
      { status: 500 }
    );
  }
}