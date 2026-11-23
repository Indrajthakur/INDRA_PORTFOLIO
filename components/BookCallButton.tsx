
"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export default function BookCallButton() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({
        namespace: "portfolio-call",
      });

      cal("ui", {
        theme: "dark",
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <button
      type="button"
      data-cal-namespace="portfolio-call"
      data-cal-link="indraraj-thakur/30min"
      data-cal-config='{"layout":"month_view"}'
      className="rounded-xl border border-gray-700 bg-neutral-900 px-5 py-3 text-white transition hover:bg-neutral-800"
    >
      📅 Book a Call
    </button>
  );
}
