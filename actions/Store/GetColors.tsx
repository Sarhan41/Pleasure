import { Color } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

const  GetColors = async (): Promise<Color[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default  GetColors;
