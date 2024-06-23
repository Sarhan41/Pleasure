import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface BestSellerBillboardProps {
  data: {
    imageUrl: string;
    name: string;
  };
}

const BestSellerBillboard: React.FC<BestSellerBillboardProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 mt-8 lg:mt-16 overflow-hidden">
      <Link href={`/collections/${data.name}`} passHref className="w-full block">
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105 bg-center">
          <Image
            src={data.imageUrl}
            alt=""
            layout="fill"
            objectFit="contain"
            className="rounded-xl"
          />
        </div>
      </Link>
      <div className="text-center mt-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-gray-900">
          {data.name}
        </h2>
        <Link href="/collections/new" passHref>
          <Button className="mt-2 px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold text-sm sm:text-base rounded-lg shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl font-mono">
            SHOP NOW
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BestSellerBillboard;
