import Gallery from "@/app/(store)/_components/Gallery";
import Info from "@/app/(store)/_components/Info/Info";
import ProductList from "@/app/(store)/_components/ProductList/ProductList";
import {  RelatedProductList } from "@/app/(store)/_components/RelatedItemsList";
import Container from "@/components/Store/container";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

interface ProductPageProps {
  params: {
    productName: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const User = await currentUser();
  let userId = "";
  if (User) {
    userId = User.id ?? "";
  }

  const decodedProductName = decodeURIComponent(params.productName);
  const productNameWithSpaces = decodedProductName.replace(/-/g, " ");

  const product = await db.product.findFirst({
    where: {
      name: productNameWithSpaces,
    },
    include: {
      category: true,
      images: { select: { url: true, id: true, productId: true } },
      colors: { select: { name: true, value: true, toLink: true } },
      sizes: {
        select: {
          name: true,
          SKUvalue: true,
          price: true,
          quantity: true,
          discountedprice: true,
          id: true,
        },
      },
    },
  });

  if (!product) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const suggestedProducts = await db.product.findMany({
    where: {
      categoryId: product?.categoryId,
    },
    include: {
      category: true,
      images: { select: { url: true, id: true, productId: true } },
      colors: { select: { name: true, value: true, toLink: true } },
      sizes: true,
    },
  });

  const filteredProducts = suggestedProducts.filter(
    (suggestedProduct) => suggestedProduct.id !== product?.id
  );

  return (
    <div className="bg-white mt-14">
      <Container>
        <div className="px-4 py-10 sm:px-6  lg:px-8 ">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 ">
            <Gallery images={product?.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 lg:overflow-y-scroll lg:max-h-[calc(100vh-200px)]">
              {product && <Info data={product} userId={userId} />}
            </div>
          </div>
          <hr className="my-10" />
          <RelatedProductList userId={userId} items={filteredProducts}  />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
