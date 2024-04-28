import { Product } from "@/types";
import qs from "query-string";


const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryName?: string;
  colorName?: string;
  sizeName?: string;
  isFeatured?: boolean;

}

const GetProducts = async (query: Query): Promise<Product[]> => {

  const url = qs.stringifyUrl({ url: URL, query: {
    colorName: query.colorName,
    sizeName: query.sizeName,
    categoryName: query.categoryName,
    isFeatured: query.isFeatured,
  } });

  const res = await fetch(url);

  return res.json();
}
 
export default GetProducts; 