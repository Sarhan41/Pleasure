import { Size } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

const GetSizes = async (): Promise<Size[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default GetSizes;
