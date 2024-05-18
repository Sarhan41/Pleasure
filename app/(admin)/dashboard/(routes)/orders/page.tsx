import { format } from "date-fns";

import { db } from "@/lib/db";
import { formatter } from "@/lib/utils";

import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";

const OrdersPage = async () => {
  const orders = await db.order.findMany({
   
    include: {
      orderItems: {
        include: {
          product: true,
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((orderItem)=> orderItem.product.name).join(", "),
    totalPrice: formatter.format(item.orderItems.reduce((total,item)=>{
      return total + Number(item.product.price)
    },0)),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }));

  return (
    <div className="  flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
      <div></div>
    </div>
  );
};
        
export default OrdersPage;



// // 
// model Product {
//   id              String      @id @default(uuid())
//   categoryId      String
//   category        Category    @relation("CategoryToProduct", fields: [categoryId], references: [id])
//   name            String
//   price           Int
//   discountedPrice Int?
//   isFeatured      Boolean     @default(false)
//   isArchived      Boolean     @default(false)
//   images          Image[]
//   colors          Color[]
//   sizes           Size[]
//   orderItems      orderItem[]
//   createdAt       DateTime    @default(now())
//   updatedAt       DateTime    @updatedAt
//   Wishlist        Wishlist[]
//   CartItems       CartItems[]
//   reviews         Review[]
//   description     String?

//   @@index([categoryId])
// }

// model Color {
//   id        String   @id @default(uuid())
//   productId String
//   product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
//   value     String
//   name      String
//   toLink    String?
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   @@index([productId])
// }

// model Size {
//   id        String   @id @default(uuid())
//   productId String
//   product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
//   value     String?
//   name      String?
//   quantity  Int
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   @@index([productId])
// }

// model Image {
//   id        String   @id @default(uuid())
//   productId String
//   product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
//   url       String
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   @@index([productId])
// }

// model Wishlist {
//   id        String  @id @default(uuid())
//   userId    String
//   user      User    @relation(fields: [userId], references: [id])
//   productId String
//   product   Product @relation(fields: [productId], references: [id])

//   @@index([userId])
//   @@index([productId])
// }

// model CartItems {
//   id        String  @id @default(uuid())
//   userId    String
//   user      User    @relation(fields: [userId], references: [id])
//   productId String
//   product   Product @relation(fields: [productId], references: [id])
//   quantity  Int     @default(1)
//   size      String
//   color     String?
//   price     Int

//   @@index([userId])
//   @@index([productId])
// }

// model Order {
//   id         String      @id @default(uuid())
//   orderItems orderItem[] 
//   total      Int
//   status     String
//   isPaid     Boolean     @default(false)
//   AddressId  String
//   Address    Address     @relation(fields: [AddressId], references: [id])
//   createdAt  DateTime    @default(now())
//   updatedAt  DateTime    @updatedAt
//   userId     String
//   user       User        @relation(fields: [userId], references: [id])
// }

// model orderItem {
//   id        String  @id @default(uuid())
//   name      String
//   Price     Int
//   quantity  Int
//   size      String
//   color     String?
//   orderId   String
//   order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
//   productId String
//   product   Product @relation(fields: [productId], references: [id])

//   @@index([orderId])
//   @@index([productId])
// }
// this is our latest order thign , I was fetchign al the data before but was norma now it is more complex in my dashbaord 


// export async function GET(req: Request) {
//   const user = await currentUser();

//   if (!user) {
//     return new NextResponse("Unauthenticated", { status: 401 });
//   }

//   try {
//     const MyOrders = await db.order.findMany({
//       where: {
//         id: user?.id,
//       },
//       include: {
//         orderItems: {
//           include: {
//             product: {
//               include: {
//                 images: {
//                   select: {
//                     url: true,
//                   },
//                 },
//                 category: {
//                   select: {
//                     name: true,
//                   },
//                 },
//                 sizes: {
//                   select: {
//                     name: true,
//                   },
//                 },
//                 colors: {
//                   select: {
//                     name: true,
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },

//       orderBy: {
//         createdAt: "desc",
//       },
//     });

// import { format } from "date-fns";

// import { db } from "@/lib/db";
// import { formatter } from "@/lib/utils";

// import { OrderClient } from "./components/client";
// import { OrderColumn } from "./components/columns";

// const OrdersPage = async () => {
//   const orders = await db.order.findMany({
   
//     include: {
//       orderItems: {
//         include: {
//           product: true,
//         }
//       }
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   const formattedOrders: OrderColumn[] = orders.map((item) => ({
//     id: item.id,
//     phone: item.phone,
//     address: item.address,
//     products: item.orderItems.map((orderItem)=> orderItem.product.name).join(", "),
//     totalPrice: formatter.format(item.orderItems.reduce((total,item)=>{
//       return total + Number(item.product.price)
//     },0)),
//     isPaid: item.isPaid,
//     createdAt: format(item.createdAt, "MMM do, yyyy"),
//   }));

//   return (
//     <div className="  flex-col">
//       <div className="flex-1 space-y-4 p-8 pt-6">
//         <OrderClient data={formattedOrders} />
//       </div>
//       <div></div>
//     </div>
//   );
// };
        
// export default OrdersPage;

// import { Heading } from "@/components/ui/Heading";
// import { Separator } from "@/components/ui/separator";
// import { DataTable } from "@/components/ui/data-table";

// import { OrderColumn, columns } from "./columns";

// interface BillboardClientProps {
//   data: OrderColumn[];
// }

// export const OrderClient: React.FC<BillboardClientProps> = ({ data }) => {
//   return (
//     <>
//       <Heading
//         title={`Orders (${data.length})`}
//         description="Manage Orders for your store"
//       />

//       <Separator />

//       <DataTable columns={columns} data={data} searchKey="products" />
//     </>
//   );
// };
// "use client";

// import { ColumnDef } from "@tanstack/react-table";

// export type OrderColumn = {
//   id: string;
//   phone: string;
//   address: string;
//   isPaid: boolean;
//   totalPrice: string;
//   products: string;
//   createdAt: string;
// };

// export const columns: ColumnDef<OrderColumn>[] = [
//   {
//     accessorKey: "products",
//     header: "Products",
//   },
//   {
//     accessorKey: "phone",
//     header: "Phone",
//   },
//   {
//     accessorKey: "address",
//     header: "Address",
//   },
//   {
//     accessorKey: "totalPrice",
//     header: "Total Price",
//   },
//   {
//     accessorKey: "isPaid",
//     header: "Paid",
//   },
// ];

// adjust this whole order folder accordingle and now i think the just normal datable is not enough fo this complex order, please do something like owner can see product name price quantity size color who did order it and what is their selected address and phone but i dont think thismuch info would get settled in datatable ? if so do it or find some other way, see i am building big ecommerce we are expectign 40-50 orders a day owner must need info and page should not be too big to, do your best my bro 
