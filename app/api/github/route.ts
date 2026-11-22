import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GitHub token is missing" },
      { status: 500 }
    );
  }

  const now = new Date();
  const year = now.getUTCFullYear();

  const query = `
    query ($from: DateTime!, $to: DateTime!) {
      user(login: "Indrajthakur") {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                weekday
                contributionCount
                contributionLevel
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(
      "https://api.github.com/graphql",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: {
            from: new Date(Date.UTC(year, 0, 1)).toISOString(),
            to: now.toISOString(),
          },
        }),
        next: { revalidate: 3600 },
      }
    );

    const result = await response.json();

    const calendar =
      result.data?.user?.contributionsCollection
        ?.contributionCalendar;

    if (!response.ok || result.errors || !calendar) {
      return NextResponse.json(
        { error: "Unable to fetch GitHub contributions" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      year,
      total: calendar.totalContributions,
      weeks: calendar.weeks,
    });
  } catch {
    return NextResponse.json(
      { error: "GitHub API request failed" },
      { status: 500 }
    );
  }
}