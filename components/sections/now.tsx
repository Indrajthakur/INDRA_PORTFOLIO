"use client";

import { useEffect, useState } from "react";
import {
  Code,
  Play,
  Music2,
  Pencil,
  ChevronUp,
  X,
} from "lucide-react";
import { Card, Divider } from "../layout-bits";
import { Item, Stagger } from "../reveal";
import { currentFocus } from "@/lib/data";

const DEFAULT_URL =
  "https://open.spotify.com/playlist/5AHH67GYsljwoB1q6UGvWg";

const STORAGE_KEY = "portfolio-spotify-music";

function parseSpotifyUrl(value: string) {
  try {
    const url = new URL(value.trim());

    if (
      url.protocol !== "https:" ||
      url.hostname !== "open.spotify.com"
    ) {
      return null;
    }

    const match = url.pathname.match(
      /^\/(?:embed\/)?(track|playlist)\/([A-Za-z0-9]+)\/?$/
    );

    if (!match) return null;

    return {
      url: `https://open.spotify.com/${match[1]}/${match[2]}`,
      embed: `https://open.spotify.com/embed/${match[1]}/${match[2]}`,
      type: match[1],
    };
  } catch {
    return null;
  }
}

export function Now() {
  const [trackUrl, setTrackUrl] = useState(DEFAULT_URL);
  const [title, setTitle] = useState("My Spotify Playlist");
  const [artwork, setArtwork] = useState<string | null>(null);

  const [showPlayer, setShowPlayer] = useState(false);
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const track = parseSpotifyUrl(trackUrl);

  // RESTORE SAVED MUSIC

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved && parseSpotifyUrl(saved)) {
        setTrackUrl(saved);
      }
    } catch {}
  }, []);

  // FETCH MUSIC DETAILS

  useEffect(() => {
    const controller = new AbortController();

    setArtwork(null);

    setTitle(
      trackUrl === DEFAULT_URL
        ? "My Spotify Playlist"
        : "Spotify Music"
    );

    fetch(
      `/api/spotify?url=${encodeURIComponent(trackUrl)}`,
      { signal: controller.signal }
    )
      .then((response) => {
        if (!response.ok) throw new Error();

        return response.json();
      })
      .then((data) => {
        setTitle(data.title || "Spotify Music");
        setArtwork(data.artwork || null);
      })
      .catch(() => {
        // Keep the fallback title and artwork.
      });

    return () => controller.abort();
  }, [trackUrl]);

  // CHANGE MUSIC

  function changeMusic(event: React.FormEvent) {
    event.preventDefault();

    const parsed = parseSpotifyUrl(input);

    if (!parsed) {
      setError("Please enter a valid Spotify song or playlist link.");
      return;
    }

    setTrackUrl(parsed.url);
    setEditing(false);
    setShowPlayer(false);
    setInput("");
    setError("");

    try {
      localStorage.setItem(STORAGE_KEY, parsed.url);
    } catch {}
  }

  // RESET TO DEFAULT PLAYLIST

  function resetMusic() {
    setTrackUrl(DEFAULT_URL);
    setEditing(false);
    setShowPlayer(false);
    setInput("");
    setError("");

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  return (
    <>
      <Divider />

      <section
        id="now"
        aria-label="Now"
        className="scroll-mt-20"
      >
        <Stagger className="mx-auto w-full max-w-[680px] space-y-4 px-5 py-6 min-[1100px]:px-6">

          {/* MUSIC CARD */}

          <Item>
            <Card className="overflow-hidden">

              <div className="flex items-center gap-3 p-4">

                {/* PLAYLIST ARTWORK */}

                <a
                  href={trackUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Spotify"
                  className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-emerald-950 to-black"
                >
                  {artwork ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={artwork}
                      alt="Spotify cover"
                      className="size-full object-cover"
                    />
                  ) : (
                    <Music2
                      size={20}
                      className="text-[#1DB954]"
                    />
                  )}
                </a>

                {/* MUSIC DETAILS */}

                <div className="min-w-0 flex-1 space-y-1">

                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#1DB954]" />

                    <span className="text-[10px] font-medium uppercase text-muted">
                      On Repeat
                    </span>
                  </div>

                  <p className="truncate text-sm font-semibold text-head">
                    {title}
                  </p>

                  <p className="truncate text-xs text-muted">
                    {track?.type === "playlist"
                      ? "Spotify Playlist"
                      : "Spotify Track"}
                  </p>

                </div>

                {/* ROTATING RECORD */}

                <div
                  aria-hidden
                  className="relative hidden size-10 shrink-0 animate-spin-slow rounded-full border border-dashed border-muted bg-[repeating-radial-gradient(circle,#222_0_2px,#111_2px_4px)] motion-reduce:animate-none sm:block"
                >
                  <span className="absolute inset-[35%] rounded-full bg-[#1DB954]" />
                  <span className="absolute inset-[46%] rounded-full bg-black" />
                </div>

                {/* CHANGE MUSIC BUTTON */}

                <button
                  type="button"
                  title="Change Music"
                  aria-label="Change Music"
                  aria-expanded={editing}
                  onClick={() => {
                    setEditing((previous) => !previous);
                    setError("");
                  }}
                  className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {editing ? (
                    <X size={14} />
                  ) : (
                    <Pencil size={13} />
                  )}

                  <span className="hidden sm:inline">
                    {editing ? "Close" : "Change"}
                  </span>
                </button>

                {/* PLAY BUTTON */}

                <button
                  type="button"
                  aria-label="Toggle Spotify player"
                  aria-expanded={showPlayer}
                  onClick={() =>
                    setShowPlayer((previous) => !previous)
                  }
                  className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:text-head"
                >
                  {showPlayer ? (
                    <ChevronUp size={18} />
                  ) : (
                    <Play size={17} />
                  )}
                </button>

              </div>

              {/* CHANGE MUSIC PANEL */}

              {editing && (
                <form
                  onSubmit={changeMusic}
                  className="space-y-3 border-t border-line p-4"
                >
                  <label
                    htmlFor="spotify-url"
                    className="text-sm font-medium text-head"
                  >
                    Change Your Music
                  </label>

                  <input
                    id="spotify-url"
                    type="url"
                    required
                    value={input}
                    onChange={(e) =>
                      setInput(e.target.value)
                    }
                    placeholder="Paste Spotify song or playlist link..."
                    className="w-full rounded-xl border border-line bg-bg px-3 py-3 text-sm text-head placeholder:text-muted"
                  />

                  {error && (
                    <p role="alert" className="text-xs text-red-400">
                      {error}
                    </p>
                  )}

                  <div className="flex gap-2">

                    <button
                      type="submit"
                      className="rounded-lg bg-[#1DB954] px-4 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-80"
                    >
                      Save Music
                    </button>

                    <button
                      type="button"
                      onClick={resetMusic}
                      className="rounded-lg border border-line px-4 py-2 text-xs text-muted hover:text-head"
                    >
                      Reset
                    </button>

                  </div>

                </form>
              )}

              {/* SPOTIFY EMBED */}

              {showPlayer && track && (
                <div className="space-y-3 border-t border-line p-3">

                  <iframe
                    key={track.embed}
                    title="Spotify Music Player"
                    src={track.embed}
                    width="100%"
                    height={
                      track.type === "playlist" ? 352 : 152
                    }
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="rounded-xl border-0"
                  />

                  <a
                    href={trackUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center text-xs text-muted hover:text-head"
                  >
                    Open in Spotify ↗
                  </a>

                </div>
              )}

            </Card>
          </Item>

          {/* CURRENT FOCUS */}

          <Item>
            <Card className="flex items-center gap-3 p-4">

              <span className="relative flex size-2 shrink-0">
                <span className="absolute size-full animate-ping rounded-full bg-live/60 motion-reduce:animate-none" />
                <span className="relative size-2 rounded-full bg-live" />
              </span>

              <div className="min-w-0 flex-1 space-y-1">

                <p className="text-[10px] font-semibold uppercase text-head">
                  Current Focus
                </p>

                <p className="text-xs font-medium text-body sm:text-sm">
                  {currentFocus.emoji} {currentFocus.text}
                </p>

              </div>

              <Code size={18} className="shrink-0 text-muted" />

            </Card>
          </Item>

        </Stagger>
      </section>
    </>
  );
}