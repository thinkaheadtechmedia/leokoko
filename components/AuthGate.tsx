"use client";

import { useState } from "react";
import type { SupabaseClient, User } from "@supabase/supabase-js";

type Mode = "signin" | "signup" | "anon";

export default function AuthGate({
  supabase,
  onSignedIn,
}: {
  supabase: SupabaseClient;
  onSignedIn: (user: User) => void;
}) {
  const [mode, setMode] = useState<Mode>("anon");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: displayName || email.split("@")[0],
            },
          },
        });
        if (error) throw error;
        if (data.user && data.session) {
          onSignedIn(data.user);
        } else {
          setInfo("Check your email to confirm your account, then sign in.");
        }
      } else if (mode === "signin") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) onSignedIn(data.user);
      } else {
        // Anonymous chat — requires Anonymous sign-ins enabled in Supabase
        const { data, error } = await supabase.auth.signInAnonymously({
          options: {
            data: {
              display_name: displayName || "Fan",
              is_anonymous: true,
            },
          },
        });
        if (error) throw error;
        if (data.user) onSignedIn(data.user);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass p-8 max-w-md mx-auto">
      <div className="flex gap-2 mb-6 text-xs">
        {(["anon", "signin", "signup"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError(null);
              setInfo(null);
            }}
            className={`px-3 py-2 rounded-full font-medium uppercase tracking-widest transition ${
              mode === m
                ? "bg-gold-gradient text-royal-950"
                : "bg-white/5 text-royal-200 hover:bg-white/10"
            }`}
          >
            {m === "anon" ? "Guest" : m === "signin" ? "Sign In" : "Sign Up"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {(mode === "signup" || mode === "anon") && (
          <input
            type="text"
            placeholder="Display name (shown in chat)"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full bg-royal-900/60 border border-white/10 rounded-lg px-4 py-3 text-royal-50 placeholder:text-royal-300/50 focus:border-gold-400/60 focus:outline-none"
            maxLength={40}
          />
        )}

        {mode !== "anon" && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-royal-900/60 border border-white/10 rounded-lg px-4 py-3 text-royal-50 placeholder:text-royal-300/50 focus:border-gold-400/60 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password (min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-royal-900/60 border border-white/10 rounded-lg px-4 py-3 text-royal-50 placeholder:text-royal-300/50 focus:border-gold-400/60 focus:outline-none"
            />
          </>
        )}

        {error && (
          <p className="text-red-400 text-sm bg-red-900/20 border border-red-500/30 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        {info && (
          <p className="text-gold-300 text-sm bg-gold-500/10 border border-gold-500/30 rounded-lg px-3 py-2">
            {info}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-gold w-full justify-center disabled:opacity-50"
        >
          {loading
            ? "..."
            : mode === "anon"
            ? "Join as Guest"
            : mode === "signin"
            ? "Sign In"
            : "Create Account"}
        </button>
      </form>

      <p className="text-royal-300/60 text-xs text-center mt-6">
        Be kind. This is a worship space. 💛
      </p>
    </div>
  );
}
