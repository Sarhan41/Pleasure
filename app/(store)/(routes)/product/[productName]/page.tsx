import Gallery from "@/app/(store)/_components/Gallery";
import InfoSingle from "@/app/(store)/_components/Info/InfoSingle/Info";
import InfoPack from "@/app/(store)/_components/Info/InfoPack/Info"; // Import the new Info component for pack of products
import ProductList from "@/app/(store)/_components/ProductList/ProductList";
import { RelatedProductList } from "@/app/(store)/_components/RelatedItemsList";
import Container from "@/components/Store/container";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        <Link className="text-white font-semibold" href="/">
          Go to Home
        </Link>
      </Button>
    </section>
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

  const isPackOfProduct =
    product.name.includes("Pack ") &&
    product.colors.some((color) => color.value !== "#111");

  return (
    <div className="bg-white lg:mt-14">
      <Container>
        <div className="px-4 lg:py-10 sm:px-6 lg:px-8">
          <div className="xl:grid xl:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product?.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 lg:overflow-y-scroll lg:max-h-[calc(100vh-200px)]">
              {product &&
                (isPackOfProduct ? (
                  <InfoPack data={product} userId={userId} />
                ) : (
                  <InfoSingle data={product} userId={userId} />
                ))}
            </div>
          </div>
          <hr className="my-10" />
          <RelatedProductList userId={userId} items={filteredProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
