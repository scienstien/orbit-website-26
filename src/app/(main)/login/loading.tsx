export default function LoginLoading() {
  return (
    <main className="min-h-screen px-5 pb-20 pt-12 font-mono sm:px-8 lg:px-16">
      <section className="mx-auto flex min-h-[72vh] max-w-4xl flex-col items-center justify-center gap-8">
        <div className="flex w-full max-w-2xl flex-col items-center space-y-4">
          <div className="h-14 w-11/12 max-w-xl animate-pulse bg-white/10 sm:h-16" />
          <div className="h-14 w-4/5 max-w-lg animate-pulse bg-white/10 sm:h-16" />
          <div className="h-5 w-3/4 max-w-md animate-pulse bg-white/10" />
          <div className="h-5 w-2/3 max-w-sm animate-pulse bg-white/10" />
        </div>

        <div className="w-full max-w-xl border border-white/15 bg-black/80 p-5 sm:p-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="h-9 w-28 animate-pulse bg-white/10" />
              <div className="h-4 w-56 animate-pulse bg-white/10" />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-4 w-16 animate-pulse bg-white/10" />
                <div className="h-12 animate-pulse border border-white/10 bg-white/10" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-20 animate-pulse bg-white/10" />
                <div className="h-12 animate-pulse border border-white/10 bg-white/10" />
              </div>
            </div>

            <div className="h-12 animate-pulse bg-white/20" />
            <div className="h-px animate-pulse bg-white/15" />
            <div className="h-12 animate-pulse bg-white/20" />
            <div className="h-12 animate-pulse border border-white/10 bg-white/10" />
          </div>
        </div>
      </section>
    </main>
  );
}
