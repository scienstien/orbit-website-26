export default function ContactUsPage() {
  return (
    <main>
      <div className="px-5 sm:px-10 md:px-16 lg:px-20 xl:px-24 2xl:px-32 my-auto mt-8 sm:mt-10 md:mt-12 lg:mt-14 mx-5 sm:mx-10 md:mx-16 lg:mx-24 xl:mx-32 2xl:mx-40">
        <div className="border rounded-2xl bg-black p-8 sm:p-10">
          <h2 className="text-4xl sm:text-5xl font-bold">Let's connect</h2>
          <p className="mt-4 max-w-2xl text-white/80 text-lg sm:text-xl">
            The EmailJS contact flow is deferred in this migration phase. This
            route is kept in place so the Next.js app preserves the current
            navigation surface while the contact tooling is replaced.
          </p>
        </div>
      </div>
    </main>
  );
}
