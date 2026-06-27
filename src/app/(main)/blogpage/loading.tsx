const cardSkeletons = ["first", "second", "third"];

export default function BlogLoading() {
  return (
    <main className="min-h-screen px-5 pb-20 pt-10 sm:px-8 lg:px-16">
      <section className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 h-8 w-36 border border-white/10 bg-white/10" />
            <div className="h-12 w-48 bg-white/10 sm:h-14" />
          </div>
          <div className="space-y-3 sm:w-96">
            <div className="h-4 bg-white/10" />
            <div className="h-4 w-4/5 bg-white/10 sm:ml-auto" />
          </div>
        </div>

        <div className="grid overflow-hidden border border-white/15 bg-black/80 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="min-h-72 bg-white/10" />
          <div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
            <div>
              <div className="mb-5 flex gap-3">
                <div className="h-7 w-24 bg-white/10" />
                <div className="h-7 w-32 bg-white/10" />
              </div>
              <div className="h-10 w-4/5 bg-white/10" />
              <div className="mt-4 h-10 w-3/5 bg-white/10" />
              <div className="mt-6 space-y-3">
                <div className="h-4 bg-white/10" />
                <div className="h-4 w-5/6 bg-white/10" />
              </div>
            </div>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="h-6 w-40 bg-white/10" />
              <div className="flex gap-3">
                <div className="h-9 w-20 border border-white/10 bg-white/10" />
                <div className="h-9 w-20 border border-white/10 bg-white/10" />
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {cardSkeletons.map((card) => (
            <div
              key={card}
              className="overflow-hidden border border-white/15 bg-black/75"
            >
              <div className="aspect-[16/10] bg-white/10" />
              <div className="flex min-h-72 flex-col justify-between gap-6 p-5">
                <div>
                  <div className="mb-4 flex gap-3">
                    <div className="h-6 w-20 bg-white/10" />
                    <div className="h-6 w-24 bg-white/10" />
                  </div>
                  <div className="h-7 w-5/6 bg-white/10" />
                  <div className="mt-4 space-y-3">
                    <div className="h-4 bg-white/10" />
                    <div className="h-4 w-4/5 bg-white/10" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="h-5 w-36 bg-white/10" />
                  <div className="flex gap-3">
                    <div className="h-9 w-20 border border-white/10 bg-white/10" />
                    <div className="h-9 w-20 border border-white/10 bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
