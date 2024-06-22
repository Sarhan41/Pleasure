import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BillboardProps {
  data: {
    imageUrl: string;
  };
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  console.log(data);
  return (
    <div className="p-4 sm:p-6 w-full flex justify-center lg:p-8 mt-8 lg:mt-16 overflow-hidden cursor-pointer">
      <Link href="/collections/new" passHref className="w-full h-full">
        <div
          style={{
            backgroundImage: `url(${data.imageUrl})`,
            backgroundSize: "cover",
          }}
          className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] rounded-xl overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-105 bg-center max-sm:bg-left"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center lg:justify-end items-center lg:items-end text-center lg:text-right text-white space-y-4 lg:space-y-6 p-4 sm:p-6 lg:p-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
              <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                MONSOON ARRIVALS
              </span>
            </h1>
            <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-gray-300">
              Discover the perfect combination of{" "}
              <span className="font-bold uppercase text-pink-400">comfort</span>{" "}
              and{" "}
              <span className="font-bold uppercase text-yellow-400">style</span>
              .
            </p>
            <Button className="mt-4 px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold text-sm sm:text-base rounded-lg shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl">
              SHOP NOW
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Billboard;
