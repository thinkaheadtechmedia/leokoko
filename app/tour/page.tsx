export const metadata = { title: "Tour — LEOKOKO" };

// TODO: in the future, pull these from a CMS or Supabase table.
const events: {
  date: string;
  city: string;
  venue: string;
  ticketsUrl?: string;
}[] = [
  // Example placeholder — replace with real dates
  // { date: "2026-08-15", city: "Nairobi, KE", venue: "Kasarani Stadium", ticketsUrl: "#" },
];

export default function TourPage() {
  return (
    <div className="container-prose py-12">
      <header className="mb-12">
        <h1 className="section-title">Tour</h1>
        <div className="h-1 w-20 bg-gold-gradient rounded-full mb-4" />
        <p className="section-sub">
          Catch LEOKOKO live in worship. Upcoming dates listed below.
        </p>
      </header>

      {events.length === 0 ? (
        <div className="glass p-10 text-center">
          <p className="text-gold-200 text-xl font-display mb-2">
            No dates announced yet
          </p>
          <p className="text-royal-200/80 text-sm">
            New tour dates are coming. Follow on social media to be the first
            to know.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {events.map((ev, i) => {
            const d = new Date(ev.date);
            return (
              <li
                key={i}
                className="glass p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.07] transition"
              >
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-gold-300 font-display text-3xl leading-none">
                      {d.getDate()}
                    </div>
                    <div className="text-royal-200 text-xs uppercase tracking-widest mt-1">
                      {d.toLocaleString("en-US", { month: "short" })}{" "}
                      {d.getFullYear()}
                    </div>
                  </div>
                  <div>
                    <div className="text-gold-100 font-semibold text-lg">
                      {ev.city}
                    </div>
                    <div className="text-royal-200/70 text-sm">{ev.venue}</div>
                  </div>
                </div>
                {ev.ticketsUrl && (
                  <a
                    href={ev.ticketsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                  >
                    Tickets
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
