export default function Aerostructures() {
  return (
    <div className="flex flex-col items-center justify-start my-25 max-lg:my-10 max-lg:mt-20">
      <h2 className="text-center text-6xl font-bold bg-linear-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent mb-10 max-lg:text-4xl max-lg:mb-5">
        AEROSTRUCTURES
      </h2>
      <div className="flex justify-center items-center max-lg:flex-col-reverse">
        <div className="tracking-wide max-sm:p-2 border rounded-2xl shadow-[10px_10px_0px_0px_rgba(244,255,217)] transition duration-300 cursor-pointer hover:shadow-[0px_0px_0px_0px_rgba(244,255,217)] px-5 py-10 text-center leading-12 w-[50%] max-lg:w-[70%] max-sm:w-[85%] max-sm:text-sm">
          <p className="text-3xl max-lg:text-xl">
            The Aerostructures team designs, simulates, and manufactures the
            rocket’s airframe. We handle composite structures, internal
            components, and aerodynamic parts like fins and nosecones, ensuring
            strength, stability, and performance through structural and CFD
            simulations.
          </p>
        </div>
      </div>
    </div>
  );
}
