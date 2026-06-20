export default function Avionics() {
  return (
    <div className="flex flex-col items-center justify-start">
      <h2 className="text-center text-6xl font-bold bg-linear-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent max-lg:text-4xl max-lg:mb-2">
        AVIONICS
      </h2>
      <div className="flex justify-center items-center max-lg:flex-col-reverse mt-10 max-lg:mt-0">
        <div className="tracking-wide max-sm:p-2 border rounded-2xl shadow-[10px_10px_0px_0px_rgba(244,255,217)] transition duration-300 cursor-pointer max-sm:w-[85%] hover:shadow-[0px_0px_0px_0px_rgba(244,255,217)] px-5 py-10 text-center leading-12 w-[50%] max-lg:w-[70%] max-sm:text-sm">
          <p className="text-3xl max-lg:text-xl">
            The Avionics team develops and integrates all electronic systems
            onboard. We design flight control, navigation, telemetry, and data
            acquisition systems, ensuring every component works seamlessly to
            monitor and control the rocket during flight.
          </p>
        </div>
      </div>
    </div>
  );
}
