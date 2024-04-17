import { Product } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const GetProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default GetProduct;
