"use client";
import { useCallback, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Trash2 } from "lucide-react";
import { Card, Section } from "../layout-bits";
import { Item } from "../reveal";
import { BrandIcon } from "../brand-icon";
import { Button } from "../ui/button";
import { getSupabase } from "@/lib/supabase";

type Entry = { id: string; user_id?: string; name: string; avatar_url?: string | null; message: string; created_at: string };

const fmt = (iso: string) => {
  const d = new Date(iso);
  return isNaN(+d) ? iso : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

function Face({ e, i }: { e: Entry; i: number }) {
  if (e.avatar_url)
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={e.avatar_url} alt="" referrerPolicy="no-referrer" className="size-9 shrink-0 rounded-full object-cover" />;
  return (
    <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full font-mono text-xs text-white/80" style={{ background: `linear-gradient(135deg, hsl(${i * 90 + 30} 45% 30%), hsl(${i * 90 + 70} 40% 12%))` }}>
      {e.name.replace(/[\[\]]/g, "").slice(0, 1)}
    </span>
  );
}

export function Guestbook() {
  const sb = getSupabase();
  const [user, setUser] = useState<User | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!sb) return;
    const { data, error } = await sb.from("guestbook").select("id,user_id,name,avatar_url,message,created_at").order("created_at", { ascending: false }).limit(50);
    if (error) setError("Couldn't load messages. Try refreshing.");
    else setEntries(data as Entry[]);
  }, [sb]);

  useEffect(() => {
    if (!sb) return;
    sb.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    load();
    return () => sub.subscription.unsubscribe();
  }, [sb, load]);

   const signIn = async () => {
  if (!sb) return;

  const { error } = await sb.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/`,
    },
  });

  if (error) setError(error.message);
};

  const post = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const message = text.trim();
    if (!sb || !user || !message) return;
    setBusy(true); setError(null);
    const meta = user.user_metadata ?? {};
    const { error } = await sb.from("guestbook").insert({
      user_id: user.id,
      name: (meta.full_name ?? meta.name ?? user.email?.split("@")[0] ?? "Visitor").slice(0, 80),
      avatar_url: meta.avatar_url ?? meta.picture ?? null,
      message,
    });
    setBusy(false);
    if (error) return setError("Couldn't post your message. Please try again.");
    setText(""); load();
  };

  const remove = async (id: string) => {
    if (!sb) return;
    const { error } = await sb.from("guestbook").delete().eq("id", id);
    if (error) setError("Couldn't delete that message."); else load();
  };

  return (
    <Section id="guestbook" eyebrow="Guestbook" title="Leave a message">
      <div className="space-y-6">
        <Item>
          <Card className="p-5">
            {!user ? (
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p className="text-sm text-body">Sign in to leave a comment on my guestbook!</p>
                <Button variant="outline" onClick={signIn} disabled={!sb}><BrandIcon name="google" size={16} mono /> Sign in with Google</Button>
              </div>
            ) : (
              <form onSubmit={post} className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-body">Signed in as <span className="text-head">{user.user_metadata?.full_name ?? user.email}</span></p>
                  <button type="button" onClick={() => sb?.auth.signOut()} className="min-h-11 text-[13px] text-muted hover:text-head">Sign out</button>
                </div>
                <label htmlFor="gb-msg" className="sr-only">Your message</label>
                <textarea id="gb-msg" value={text} onChange={(e) => setText(e.target.value)} maxLength={280} rows={3} placeholder="Say hi…" className="w-full resize-none rounded-xl border border-line bg-bg p-3 text-sm text-head placeholder:text-dim focus-visible:outline-accent" />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-label">{text.length}/280</span>
                  <Button type="submit" variant="default" disabled={busy || !text.trim()}>{busy ? "Posting…" : "Post message"}</Button>
                </div>
              </form>
            )}
            {!sb && <p className="mt-3 text-[12px] text-label">Demo mode: add your Supabase keys in <code className="font-mono">.env.local</code> to turn on sign-in and posting.</p>}
            {error && <p role="alert" className="mt-3 text-[13px] text-red-400">{error}</p>}
          </Card>
        </Item>
        <ul className="space-y-5">
          {entries.map((g, i) => (
            <li key={g.id} className="flex gap-3">
              <Item>
                <Face e={g} i={i} />
                <div className="min-w-0 flex-1">
                  <p className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-head">{g.name}</span>
                    <span className="font-mono text-[11px] text-label">{fmt(g.created_at)}</span>
                    {user && g.user_id === user.id && (
                      <button onClick={() => remove(g.id)} aria-label="Delete your message" className="ml-auto grid size-8 place-items-center rounded-md text-muted hover:text-red-400"><Trash2 size={14} /></button>
                    )}
                  </p>
                  <p className="mt-2 break-words rounded-2xl rounded-tl-md border border-line px-4 py-3 text-sm leading-6 text-body">{g.message}</p>
                </div>
              </Item>
              </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
