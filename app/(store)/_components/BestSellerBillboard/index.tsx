import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/constant/MotionElements";
import { fadeIn } from "@/constant/motion";
import Image from "next/image";
import Link from "next/link";

interface BestSellerBillboardProps {
  data: {
    imageUrl: string;
    name: string;
  };
  index: number;
}

const BestSellerBillboard: React.FC<BestSellerBillboardProps> = ({
  data,
  index,
}) => {
  return (
    <MotionDiv
      // @ts-ignore
      variants={fadeIn("right", "spring", index * 0.2)}
      className="sm:w-1/2 lg:w-1/3 p-4 flex flex-col items-center justify-center w-full mt-8 lg:mt-16 overflow-hidden rounded-3xl shadow-xl transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl border-4 border-transparent hover:border-pink-500"
    >
      <Link href={`/collections/${data.name.replace(/\s+/g, "-")}`} passHref>
        <div className="relative w-full h-80 sm:h-96 md:h-[60vh] lg:h-[70vh] rounded-3xl shadow-lg transform transition-transform duration-500 hover:scale-105">
          <Image
            src={data.imageUrl}
            alt={data.name}
            layout="fill"
            className="rounded-3xl object-cover"
          />
        </div>
      </Link>
      <div className="text-center mt-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-transparent bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text">
          {data.name}
        </h2>
        <Link href={`/collections/${data.name.replace(/\s+/g, "-")}`} passHref>
          <Button className="mt-4 px-8 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-lg font-semibold rounded-xl shadow-lg transform transition-transform hover:scale-110 hover:shadow-2xl">
            SHOP NOW
          </Button>
        </Link>
      </div>
    </MotionDiv>
  );
};

export default BestSellerBillboard;
