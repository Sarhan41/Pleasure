import React from "react";
import Gallery from "@/app/(store)/_components/Gallery/Gallery-Page";
import InfoSingle from "@/app/(store)/_components/Info/InfoSingle/Info";
import InfoPack from "@/app/(store)/_components/Info/InfoPack/Info";
import ProductList from "@/app/(store)/_components/ProductList/ProductList";
import { RelatedProductList } from "@/app/(store)/_components/RelatedItemsList";
import Container from "@/components/Store/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getProduct, getSuggestedProducts } from "@/actions/Store/Get-Products";
import { currentUser } from "@/lib/auth";

interface ProductPageProps {
  params: {
    productName: string;
  };
}

export const revalidate = 1800; // 30 minutes

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const User = await currentUser();
  let userId = "";
  if (User) {
    userId = User.id ?? "";
  }

  const decodedProductName = decodeURIComponent(params.productName).replace(
    /-/g,
    " "
  );
  const product = await getProduct(decodedProductName);

  if (!product || product.isArchived) {
    return (
      <section className="h-screen flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="font-bold text-6xl text-gray-900">404</h1>
          <p className="font-semibold text-3xl text-gray-700 my-8">
            Oops! This Product could not be found.
          </p>
        </div>
        <Button>
          <Link area-label="Link" className="text-white font-semibold" href="/">
            Go to Home
          </Link>
        </Button>
      </section>
    );
  }


  const suggestedProducts = await getSuggestedProducts(
    product.categoryId,
    product.id
  );

  const isPackOfProduct =
    product.name.includes("Pack") &&
    product.colors.some((color) => color.value !== "#111");

  return (
    <div className="bg-white lg:mt-14">
      <Container>
        <div className="px-4 lg:py-10 sm:px-6 lg:px-8">
          <div className="xl:grid xl:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 lg:overflow-y-scroll lg:max-h-[calc(100vh-200px)]">
              {isPackOfProduct ? (
                <InfoPack data={product}  userId={userId} />
              ) : (
                <InfoSingle data={product} userId={userId} />
              )}
            </div>
          </div>
          <hr className="my-10" />
          <RelatedProductList userId={userId} items={suggestedProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
