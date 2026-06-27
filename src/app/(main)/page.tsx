import Image from "next/image";
import TypingEffect from "@/components/TypingEffect";

export default function HomePage() {
  return (
    <main>
      <div>
        <Image
          width={1920}
          height={1080}
          src="/images/home/Earth.jpg"
          alt="Earth"
          className="absolute top-0 left-0 w-full h-screen object-cover opacity-60 z-0 object-top"
        />
        <div className="relative max-w-full overflow-hidden">
          <div className="flex pt-20 justify-center items-center flex-col min-h-[80vh] max-lg:h-[40vh] px-20 max-lg:px-5 pb-12 max-lg:pb-5">
            <div className="flex flex-row justify-center items-center">
              <h1 className="text-7xl font-bold leading-tight">
                <TypingEffect
                  speed={150}
                  hideCursorOnComplete={true}
                  cursorClassName="h-8 w-1 ml-1 bg-blue-600"
                />
              </h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
