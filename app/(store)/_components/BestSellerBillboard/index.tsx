import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BestSellerBillboardProps {
  data: {
    imageUrl: string;
    name: string;
  };
}

const BestSellerBillboard: React.FC<BestSellerBillboardProps> = ({ data }) => {
  return (
    <div className="p-4 sm:p-6 w-full flex justify-center lg:p-8 mt-8 lg:mt-16 overflow-hidden cursor-pointer">
      <Link href="/collections/new" passHref className="w-full h-full">
        <div
          style={{ backgroundImage: `url(${data.imageUrl})`, backgroundSize: "cover" }}
          className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] rounded-xl overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-105 bg-center max-sm:bg-left"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center lg:justify-end items-center lg:items-end text-center lg:text-right text-white space-y-4 lg:space-y-6 p-4 sm:p-6 lg:p-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg">
              {data.name}
            </h2>
            <Link href="/collections/new" passHref>
            <Button className="mt-4 px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold text-sm sm:text-base rounded-lg shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl">
                
              SHOP NOW
            </Button>
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BestSellerBillboard;
