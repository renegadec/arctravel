const stats = [
  { name: "Trips Planned", value: "500+" },
  { name: "Destinations Covered", value: "30+" },
  { name: "Happy Clients", value: "98%" },
  { name: "Travel Support", value: "24/7" },
];

export default function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#001b42] via-[#002a62] to-[#0a2440] py-16 sm:py-20">
      {/* Glow accents */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ff8912]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The Numbers Behind the
            <span className="text-[#ff8912]"> Journeys</span>
          </h2>
          <p className="mt-3 text-white/60">
            Real trips planned, real travellers helped — every day.
          </p>
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="flex flex-col bg-white/5 px-6 py-10 backdrop-blur-sm"
            >
              <dt className="order-last mt-2 text-sm font-medium text-white/50">
                {stat.name}
              </dt>
              <dd className="order-first text-4xl font-bold tracking-tight text-[#ff8912]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
