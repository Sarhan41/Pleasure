import Gallery from "@/app/(store)/_components/Gallery";
import Info from "@/app/(store)/_components/Info/Info";
import ProductList from "@/app/(store)/_components/ProductList/ProductList";
import Container from "@/components/Store/container";
import { db } from "@/lib/db";

interface ProductPageProps {
  params: {
    productName: string;
  };
}
const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const decodedProductName = decodeURIComponent(params.productName);

  const productNameWithSpaces = decodedProductName.replace(/-/g, " ");

  const product = await db.product.findFirst({
    where: {
      name: productNameWithSpaces,
    },
    include: {
      category: true,
      images: { select: { url: true, id: true } },
      colors: { select: { name: true, value: true, toLink: true } },
      sizes: { select: { name: true, value: true , quantity: true}}
    },
  });

  if (!product) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        Loading...
      </div>
    ); // or display an error message
  }

  // Log the product object to inspect its structure

  const suggestedProducts = await db.product.findMany({
    where: {
      categoryId: product?.categoryId,
    },
    include: {
      category: true,
      images: true,
      colors: { select: { name: true, value: true, toLink: true } },
    },
  });

  const filteredProducts = suggestedProducts.filter(
    (suggestedProduct) => suggestedProduct.id !== product?.id
  );

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8 ">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 ">
            <Gallery images={product?.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              {product && <Info data={product} />}
            </div>
          </div>
          <hr className="my-10" />
          <ProductList title="Related Items" items={filteredProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
