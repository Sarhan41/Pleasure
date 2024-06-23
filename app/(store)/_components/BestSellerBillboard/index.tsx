import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/constant/MotionElements";
import { slideIn } from "@/constant/motion";
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
      variants={slideIn("left", "easeOut", index*0.01, 0.5)} // Adjusted animation variant for immediate entrance
      initial="hidden"
      animate="show"
      className="sm:w-1/2 lg:w-1/3 p-4 flex flex-col items-center justify-center w-full min-h-[300px] mt-8 lg:mt-16 overflow-hidden rounded-3xl shadow-xl transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl border-4 border-transparent hover:border-pink-500"
    >
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-3xl shadow-lg transform transition-transform duration-500 hover:scale-105">
        <Link href={`/collections/${data.name.replace(/\s+/g, "-")}`} passHref>
          <Image
            src={data.imageUrl}
            alt={data.name}
            layout="fill"
            objectFit="cover"
            className="rounded-3xl shadow-lg transform transition-transform duration-500 hover:scale-105"
          />
        </Link>
      </div>
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
