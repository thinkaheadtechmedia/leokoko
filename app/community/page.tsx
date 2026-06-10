"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import AuthGate from "@/components/AuthGate";
import Chat from "@/components/Chat";

export default function CommunityPage() {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <div className="container-prose py-12">
      <header className="mb-10 text-center">
        <h1 className="section-title">Community</h1>
        <div className="h-1 w-20 bg-gold-gradient rounded-full mb-4 mx-auto" />
        <p className="section-sub mx-auto">
          A space for fans to gather, share testimonies, and lift each other up
          in real time.
        </p>
      </header>

      {!supabase && (
        <div className="glass p-8 max-w-xl mx-auto border-gold-400/30">
          <h2 className="text-gold-300 text-xl mb-2">
            💬 Community not yet connected
          </h2>
          <p className="text-royal-100/80 text-sm leading-relaxed">
            Add{" "}
            <code className="text-gold-200">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="text-gold-200">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
            to your <code className="text-gold-200">.env.local</code> file, then
            run the SQL in <code className="text-gold-200">supabase/schema.sql</code>{" "}
            inside your Supabase project. Full instructions in the README.
          </p>
        </div>
      )}

      {supabase && ready && !user && (
        <AuthGate supabase={supabase} onSignedIn={setUser} />
      )}

      {supabase && user && (
        <Chat supabase={supabase} user={user} onSignOut={signOut} />
      )}
    </div>
  );
}
