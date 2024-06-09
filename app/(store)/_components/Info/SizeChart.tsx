import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={`inline-flex h-12 items-center justify-center rounded-lg bg-blue-500 p-1 text-white ${className}`}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-blue-500 data-[state=active]:shadow ${className}`}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={`mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${className}`}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Define types for the size chart data
type PantiesSizeChart = { category: "Panties"; size: string; waist: string; hip: string };
type CamisoleSizeChart = { category: "Camisole"; size: string; bust: string; underbust: string };
type SportBraSizeChart = { category: "Sport Bra"; size: string; bust: string; underbust: string };
type ShortsPyjamaSizeChart = { category: "Shorts" | "Pyjama"; size: string; waist: string; hip: string };

type SizeChartData = PantiesSizeChart | CamisoleSizeChart | SportBraSizeChart | ShortsPyjamaSizeChart;

// Create a mapping object for size chart data
const sizeChartMapping: Record<string, { inch: SizeChartData[]; cm: SizeChartData[] }> = {
  Panties: {
    inch: [
      { category: "Panties", size: "M", waist: "29 - 31", hip: "34 - 36" },
      { category: "Panties", size: "L", waist: "32 - 34", hip: "37 - 39" },
      { category: "Panties", size: "XL", waist: "35 - 37", hip: "40 - 42" },
      { category: "Panties", size: "XXL", waist: "38 - 40", hip: "43 - 45" },
      { category: "Panties", size: "3XL", waist: "41 - 43", hip: "46 - 48" },
    ],
    cm: [
      { category: "Panties", size: "M", waist: "73.5 - 79", hip: "86 - 91.5" },
      { category: "Panties", size: "L", waist: "81 - 86", hip: "94 - 99" },
      { category: "Panties", size: "XL", waist: "89 - 94", hip: "101.5 - 106.5" },
      { category: "Panties", size: "XXL", waist: "96.5 - 101.5", hip: "109 - 110.4" },
      { category: "Panties", size: "3XL", waist: "104 - 109", hip: "117 - 112" },
    ],
  },
  Camisole: {
    inch: [
      { category: "Camisole", size: "S", bust: "28 - 30", underbust: "22 - 24" },
      { category: "Camisole", size: "M", bust: "31 - 33", underbust: "25 - 27" },
      { category: "Camisole", size: "L", bust: "34 - 36", underbust: "28 - 30" },
      { category: "Camisole", size: "XL", bust: "37 - 39", underbust: "31 - 33" },
      { category: "Camisole", size: "XXL", bust: "40 - 42", underbust: "34 - 36" },
    ],
    cm: [
      { category: "Camisole", size: "S", bust: "71 - 76", underbust: "56 - 61" },
      { category: "Camisole", size: "M", bust: "79 - 84", underbust: "63.5 - 68.5" },
      { category: "Camisole", size: "L", bust: "86 - 91.5", underbust: "71 - 76" },
      { category: "Camisole", size: "XL", bust: "94 - 99", underbust: "79 - 84" },
      { category: "Camisole", size: "XXL", bust: "101.5 - 106.5", underbust: "86.5 - 91.5" },
    ],
  },
  "Sport Bra": {
    inch: [
      { category: "Sport Bra", size: "S", bust: "30 - 31", underbust: "25 - 26" },
      { category: "Sport Bra", size: "M", bust: "32 - 33", underbust: "27 - 28" },
      { category: "Sport Bra", size: "L", bust: "34 - 35", underbust: "29 - 30" },
      { category: "Sport Bra", size: "XL", bust: "36 - 37", underbust: "31 - 32" },
      { category: "Sport Bra", size: "XXL", bust: "38 - 39", underbust: "33 - 34" },
    ],
    cm: [
      { category: "Sport Bra", size: "S", bust: "75 - 79", underbust: "63 - 66" },
      { category: "Sport Bra", size: "M", bust: "81 - 84", underbust: "68 - 71" },
      { category: "Sport Bra", size: "L", bust: "86 - 89", underbust: "73 - 76" },
      { category: "Sport Bra", size: "XL", bust: "91 - 94", underbust: "78 - 81" },
      { category: "Sport Bra", size: "XXL", bust: "96.5 - 99", underbust: "84 - 87" },
    ],
  },
  Shorts: {
    inch: [
      { category: "Shorts", size: "S", waist: "26 - 28", hip: "36 - 38" },
      { category: "Shorts", size: "M", waist: "29 - 31", hip: "39 - 41" },
      { category: "Shorts", size: "L", waist: "32 - 34", hip: "42 - 44" },
      { category: "Shorts", size: "XL", waist: "35 - 37", hip: "45 - 47" },
      { category: "Shorts", size: "XXL", waist: "38 - 40", hip: "48 - 50" },
    ],
    cm: [
      { category: "Shorts", size: "S", waist: "66 - 71", hip: "91 - 96" },
      { category: "Shorts", size: "M", waist: "73.5 - 79", hip: "99 - 104" },
      { category: "Shorts", size: "L", waist: "81 - 86", hip: "107 - 112" },
      { category: "Shorts", size: "XL", waist: "89 - 94", hip: "114 - 119" },
      { category: "Shorts", size: "XXL", waist: "96.5 - 101.5", hip: "122 - 127" },
    ],
  },
  Pyjama: {
    inch: [
      { category: "Pyjama", size: "S", waist: "26 - 28", hip: "36 - 38" },
      { category: "Pyjama", size: "M", waist: "29 - 31", hip: "39 - 41" },
      { category: "Pyjama", size: "L", waist: "32 - 34", hip: "42 - 44" },
      { category: "Pyjama", size: "XL", waist: "35 - 37", hip: "45 - 47" },
      { category: "Pyjama", size: "XXL", waist: "38 - 40", hip: "48 - 50" },
    ],
    cm: [
      { category: "Pyjama", size: "S", waist: "66 - 71", hip: "91 - 96" },
      { category: "Pyjama", size: "M", waist: "73.5 - 79", hip: "99 - 104" },
      { category: "Pyjama", size: "L", waist: "81 - 86", hip: "107 - 112" },
      { category: "Pyjama", size: "XL", waist: "89 - 94", hip: "114 - 119" },
      { category: "Pyjama", size: "XXL", waist: "96.5 - 101.5", hip: "122 - 127" },
    ],
  },
};

type SizeChartProps = {
  categoryName: string;
};

const SizeChart: React.FC<SizeChartProps> = ({ categoryName }) => {
  const sizeChartData = sizeChartMapping[categoryName];

  if (!sizeChartData) {
    return <div>No size chart available for this category.</div>;
  }

  // Type guards to ensure correct type
  const isPantiesOrShortsOrPyjama = (
    row: SizeChartData
  ): row is PantiesSizeChart | ShortsPyjamaSizeChart => {
    return row.category === "Panties" || row.category === "Shorts" || row.category === "Pyjama";
  };

  const isCamisoleOrSportBra = (
    row: SizeChartData
  ): row is CamisoleSizeChart | SportBraSizeChart => {
    return row.category === "Camisole" || row.category === "Sport Bra";
  };

  const renderRow = (row: SizeChartData) => {
    if (isPantiesOrShortsOrPyjama(row)) {
      return (
        <>
          <td className="p-2 text-center border border-gray-200">{row.size}</td>
          <td className="p-2 text-center border border-gray-200">{row.waist}</td>
          <td className="p-2 text-center border border-gray-200">{row.hip}</td>
        </>
      );
    } else if (isCamisoleOrSportBra(row)) {
      return (
        <>
          <td className="p-2 text-center border border-gray-200">{row.size}</td>
          <td className="p-2 text-center border border-gray-200">{row.bust}</td>
          <td className="p-2 text-center border border-gray-200">{row.underbust}</td>
        </>
      );
    }
  };

  return (
    <div>
      <Tabs defaultValue="inch">
        <TabsList>
          <TabsTrigger value="inch">Inches</TabsTrigger>
          <TabsTrigger value="cm">CM</TabsTrigger>
        </TabsList>

        <TabsContent value="inch">
          <table className="table-auto w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                {categoryName === "Panties" || categoryName === "Shorts" || categoryName === "Pyjama" ? (
                  <>
                    <th className="p-2 border border-gray-200">Size</th>
                    <th className="p-2 border border-gray-200">Waist (inch)</th>
                    <th className="p-2 border border-gray-200">Hip (inch)</th>
                  </>
                ) : (
                  <>
                    <th className="p-2 border border-gray-200">Size</th>
                    <th className="p-2 border border-gray-200">Bust (inch)</th>
                    <th className="p-2 border border-gray-200">Underbust (inch)</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {sizeChartData.inch.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  {renderRow(row)}
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>

        <TabsContent value="cm">
          <table className="table-auto w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                {categoryName === "Panties" || categoryName === "Shorts" || categoryName === "Pyjama" ? (
                  <>
                    <th className="p-2 border border-gray-200">Size</th>
                    <th className="p-2 border border-gray-200">Waist (cm)</th>
                    <th className="p-2 border border-gray-200">Hip (cm)</th>
                  </>
                ) : (
                  <>
                    <th className="p-2 border border-gray-200">Size</th>
                    <th className="p-2 border border-gray-200">Bust (cm)</th>
                    <th className="p-2 border border-gray-200">Underbust (cm)</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {sizeChartData.cm.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  {renderRow(row)}
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SizeChart;
