import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BillboardProps {
  data: {
    imageUrl: string;
  } 
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  console.log(data);
  return (
    <div className="p-4 sm:p-6 w-full flex justify-center lg:p-8 mt-8 lg:mt-16 overflow-hidden cursor-pointer">
      <Link
        href={`/New-Arrivals`}
        passHref
        className="w-full h-full"
      >
        <div
          style={{
            backgroundImage: `url(${data.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] rounded-xl overflow-hidden shadow-xl"
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end items-end text-end text-white space-y-4 lg:space-y-6 p-6 lg:p-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
              <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                MONSOON ARRIVALS
              </span>
            </h1>
            <p className="mt-2 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-lg text-gray-300">
              Discover the perfect combination of{" "}
              <span className="font-semibold text-pink-400">comfort</span> and{" "}
              <span className="font-semibold text-yellow-400">style</span>.
            </p>
            <Button className="mt-4 px-8 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold text-lg rounded-lg shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl mr-4">
              SHOP NOW
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Billboard;
