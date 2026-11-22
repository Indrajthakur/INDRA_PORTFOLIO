"use client";

import { useEffect, useState } from "react";

type Day = {
  date: string;
  weekday: number;
  contributionCount: number;
  contributionLevel: string;
};

type Calendar = {
  year: number;
  total: number;
  weeks: { contributionDays: Day[] }[];
};

const COLORS: Record<string, string> = {
  NONE: "#161b22",
  FIRST_QUARTILE: "#0e4429",
  SECOND_QUARTILE: "#006d32",
  THIRD_QUARTILE: "#26a641",
  FOURTH_QUARTILE: "#39d353",
};

export function GitHubHeatmap() {
  const [data, setData] = useState<Calendar | null>(null);
  const [error, setError] = useState(false);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setData)
      .catch(() => setError(true));
  }, []);

  const weeks = data?.weeks.length ?? 0;
  const totalCells = weeks * 7;

  useEffect(() => {
    if (!totalCells) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    const timer = setInterval(() => {
      setStep((prev) =>
        prev >= totalCells + 8 ? -1 : prev + 1
      );
    }, 100);

    return () => clearInterval(timer);
  }, [totalCells]);

  if (error) {
    return (
      <p className="text-sm text-muted">
        Unable to load GitHub contributions.
      </p>
    );
  }

  if (!data) {
    return (
      <p className="animate-pulse text-sm text-muted">
        Loading GitHub activity...
      </p>
    );
  }

  const cell = 11;
  const gap = 3;
  const size = cell + gap;

  return (
    <div>
      <p className="mb-4 text-sm text-head">
        {data.total.toLocaleString()} contributions in {data.year}
      </p>

      <div className="overflow-x-auto pb-2">
        <svg
          viewBox={`0 0 ${weeks * size} 122`}
          className="w-full min-w-[622px]"
          role="img"
          aria-label="Real GitHub contribution heatmap"
        >
          {data.weeks.map((week, x) =>
            week.contributionDays.map((day) => {
              const y = day.weekday;

              const position =
                x * 7 + (x % 2 === 0 ? y : 6 - y);

              const eaten = step >= position;

              return (
                <rect
                  key={day.date}
                  x={x * size}
                  y={y * size + 22}
                  width={cell}
                  height={cell}
                  rx={2}
                  fill={
                    eaten
                      ? COLORS.NONE
                      : COLORS[day.contributionLevel] ??
                        COLORS.NONE
                  }
                >
                  <title>
                    {day.date}: {day.contributionCount} contributions
                  </title>
                </rect>
              );
            })
          )}

          {data.weeks.map((week, x) =>
            week.contributionDays
              .filter((day) => day.date.endsWith("-01"))
              .map((day) => (
                <text
                  key={day.date}
                  x={x * size}
                  y={12}
                  fill="#8b949e"
                  fontSize={10}
                >
                  {new Date(day.date).toLocaleString("en-US", {
                    month: "short",
                    timeZone: "UTC",
                  })}
                </text>
              ))
          )}

          {Array.from({ length: 7 }, (_, i) => {
            const position = step - i;

            if (position < 0 || position >= totalCells)
              return null;

            const x = Math.floor(position / 7);
            const offset = position % 7;
            const y = x % 2 === 0 ? offset : 6 - offset;

            return (
              <rect
                key={i}
                x={x * size}
                y={y * size + 22}
                width={cell}
                height={cell}
                rx={3}
                fill={i === 0 ? "#ffffff" : "#a78bfa"}
                opacity={1 - i * 0.09}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}