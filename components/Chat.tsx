"use client";

import { useEffect, useRef, useState } from "react";
import type { SupabaseClient, User } from "@supabase/supabase-js";

type Profile = {
  id: string;
  display_name: string;
  is_anonymous: boolean;
  is_admin: boolean;
};

type Message = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  deleted_at: string | null;
  profile?: Profile;
};

const MAX_LEN = 1000;

export default function Chat({
  supabase,
  user,
  onSignOut,
}: {
  supabase: SupabaseClient;
  user: User;
  onSignOut: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const myProfile = profiles[user.id];

  // ---- Initial load ----
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("id, user_id, content, created_at, deleted_at")
        .is("deleted_at", null)
        .order("created_at", { ascending: true })
        .limit(100);

      if (cancelled) return;
      if (error) {
        setError(error.message);
        return;
      }
      const msgs = (data || []) as Message[];
      setMessages(msgs);
      await loadProfilesFor(msgs.map((m) => m.user_id));
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Realtime subscription ----
  useEffect(() => {
    const channel = supabase
      .channel("messages-room")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          const m = payload.new as Message;
          if (m.deleted_at) return;
          setMessages((prev) =>
            prev.some((x) => x.id === m.id) ? prev : [...prev, m]
          );
          await loadProfilesFor([m.user_id]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        (payload) => {
          const m = payload.new as Message;
          setMessages((prev) =>
            m.deleted_at
              ? prev.filter((x) => x.id !== m.id)
              : prev.map((x) => (x.id === m.id ? m : x))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Auto-scroll to bottom on new messages ----
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  async function loadProfilesFor(userIds: string[]) {
    const missing = Array.from(new Set(userIds)).filter((id) => !profiles[id]);
    if (missing.length === 0) return;
    const { data } = await supabase
      .from("profiles")
      .select("id, display_name, is_anonymous, is_admin")
      .in("id", missing);
    if (data) {
      setProfiles((prev) => {
        const next = { ...prev };
        (data as Profile[]).forEach((p) => (next[p.id] = p));
        return next;
      });
    }
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const content = draft.trim();
    if (!content || sending) return;
    setSending(true);
    setError(null);
    const { error } = await supabase
      .from("messages")
      .insert({ user_id: user.id, content });
    setSending(false);
    if (error) {
      setError(error.message);
      return;
    }
    setDraft("");
  }

  async function deleteMessage(id: string) {
    await supabase
      .from("messages")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
  }

  return (
    <div className="glass overflow-hidden flex flex-col h-[70vh] max-h-[700px]">
      {/* Header */}
      <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between bg-royal-950/40">
        <div>
          <div className="text-gold-200 font-semibold">Fan Community</div>
          <div className="text-royal-300/70 text-xs">
            Signed in as{" "}
            <span className="text-gold-300">
              {myProfile?.display_name || "…"}
            </span>
            {myProfile?.is_anonymous && (
              <span className="ml-2 text-[10px] uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full">
                guest
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="text-xs text-royal-200 hover:text-gold-300"
        >
          Sign out
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-4 space-y-3"
      >
        {messages.length === 0 && (
          <p className="text-center text-royal-300/60 text-sm py-12">
            No messages yet — be the first to praise. 🙌
          </p>
        )}
        {messages.map((m) => {
          const p = profiles[m.user_id];
          const mine = m.user_id === user.id;
          const canDelete = mine || myProfile?.is_admin;
          return (
            <div
              key={m.id}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                  mine
                    ? "bg-gold-gradient text-royal-950"
                    : "bg-white/[0.06] border border-white/10 text-royal-50"
                }`}
              >
                <div
                  className={`text-xs font-semibold mb-0.5 flex items-center gap-2 ${
                    mine ? "text-royal-900/80" : "text-gold-300"
                  }`}
                >
                  <span>{p?.display_name || "Fan"}</span>
                  {p?.is_admin && (
                    <span className="text-[9px] uppercase tracking-widest bg-royal-950/30 text-gold-200 px-1.5 py-0.5 rounded-full">
                      Team
                    </span>
                  )}
                </div>
                <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                  {m.content}
                </div>
                <div
                  className={`text-[10px] mt-1 flex items-center gap-2 ${
                    mine ? "text-royal-900/60" : "text-royal-300/60"
                  }`}
                >
                  <span>
                    {new Date(m.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {canDelete && (
                    <button
                      onClick={() => deleteMessage(m.id)}
                      className="hover:underline"
                    >
                      delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Composer */}
      <form
        onSubmit={sendMessage}
        className="px-4 py-3 border-t border-white/10 bg-royal-950/40 flex gap-2"
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value.slice(0, MAX_LEN))}
          placeholder="Share a praise, a verse, a prayer…"
          maxLength={MAX_LEN}
          className="flex-1 bg-royal-900/60 border border-white/10 rounded-full px-4 py-2.5 text-royal-50 placeholder:text-royal-300/50 focus:border-gold-400/60 focus:outline-none text-sm"
        />
        <button
          type="submit"
          disabled={!draft.trim() || sending}
          className="btn-gold disabled:opacity-50 px-5 py-2.5"
        >
          Send
        </button>
      </form>
      {error && (
        <p className="text-red-400 text-xs px-4 pb-2">{error}</p>
      )}
    </div>
  );
}
