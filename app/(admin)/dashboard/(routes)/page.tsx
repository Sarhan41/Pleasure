
import { Heading } from "@/components/ui/Heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
// import { getTotalRevenue } from "@/actions/GetTotalRevenue";
// import { getSalesCount } from "@/actions/GetSalesCount";
// import { getStockCount } from "@/actions/GetStockCount";
// import { Overview } from "@/components/Overview/OverView";
// import { getGraphRevenue } from "@/actions/GetGraphRevenue";
import { FaCreditCard, FaRupeeSign } from "react-icons/fa";


const DashboardPage = async () => {
  // const totalRevenue = await getTotalRevenue(params.storeId);
  // const salesCount = await getSalesCount(params.storeId);
  // const stockCount = await getStockCount(params.storeId);
  // const graphRevenue = await getGraphRevenue(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="OverView of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <FaRupeeSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {/* {formatter.format(totalRevenue)/ */}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <FaCreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {/* <div className="text-2xl font-bold">{salesCount}</div> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>
              {/* <Package className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              {/* <div className="text-2xl font-bold">{stockCount}</div> */}
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4" >
          <CardHeader>
            <CardTitle>OverView</CardTitle>
          </CardHeader>
          <CardContent className="pt-2" >
            {/* <Overview data={graphRevenue} /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;