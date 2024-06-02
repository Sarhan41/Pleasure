"use client";

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

const SizeChart = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Find your Size</h1>
      <Tabs defaultValue="inch">
        <TabsList>
          <TabsTrigger value="inch">Inch</TabsTrigger>
          <TabsTrigger value="cm">CM</TabsTrigger>
        </TabsList>

        <TabsContent value="inch">
          <table className="table-auto w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-2 border border-gray-200">Size</th>
                <th className="p-2 border border-gray-200">Bust (inches)</th>
                <th className="p-2 border border-gray-200">Underbust (inches)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: "S", bust: "30 - 31", underbust: "25 - 26" },
                { size: "M", bust: "32 - 33", underbust: "27 - 28" },
                { size: "L", bust: "34 - 35", underbust: "29 - 30" },
                { size: "XL", bust: "36 - 37", underbust: "31 - 32" },
                { size: "XXL", bust: "38 - 39", underbust: "33 - 34" },
              ].map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 text-center border border-gray-200">{row.size}</td>
                  <td className="p-2 text-center border border-gray-200">{row.bust}</td>
                  <td className="p-2 text-center border border-gray-200">{row.underbust}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>

        <TabsContent value="cm">
          <table className="table-auto w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-2 border border-gray-200">Size</th>
                <th className="p-2 border border-gray-200">Bust (cm)</th>
                <th className="p-2 border border-gray-200">Underbust (cm)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: "S", bust: "75 - 79", underbust: "63 - 66" },
                { size: "M", bust: "81 - 84", underbust: "68 - 71" },
                { size: "L", bust: "86 - 89", underbust: "73 - 76" },
                { size: "XL", bust: "91 - 94", underbust: "78 - 81" },
                { size: "XXL", bust: "96.5 - 99", underbust: "84 - 87" },
              ].map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 text-center border border-gray-200">{row.size}</td>
                  <td className="p-2 text-center border border-gray-200">{row.bust}</td>
                  <td className="p-2 text-center border border-gray-200">{row.underbust}</td>
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