const stats = [
  { name: "Trips Planned", value: "500+" },
  { name: "Destinations Covered", value: "30+" },
  { name: "Happy Clients", value: "98%" },
  { name: "Travel Support", value: "24/7" },
];

export default function StatsBand() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-12">
          {/* Heading */}
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ff8912]">
              Proven results
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#002a62] sm:text-3xl">
              The Numbers Behind the Journeys
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Real trips planned, real travellers helped — every day.
            </p>
          </div>

          {/* Stats */}
          <dl className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 lg:col-span-3 lg:divide-x lg:divide-slate-100">
            {stats.map((stat, i) => (
              <div
                key={stat.name}
                className={`text-center sm:text-left lg:px-6 ${
                  i === 0 ? "lg:pl-0" : ""
                }`}
              >
                <dd className="text-4xl font-bold tracking-tight text-[#002a62]">
                  {stat.value}
                </dd>
                <dt className="mt-2 text-sm text-slate-500">{stat.name}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
