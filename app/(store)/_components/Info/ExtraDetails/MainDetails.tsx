import React, { useState } from "react";
import AdditionalInfo from "./Additional-Information";
import Description from "./Description";

interface MainExtraDetailsProps {
  description: string | null | undefined;
  additionalInfo: string | null | undefined;
  SKU: string | undefined;
}

const MainExtraDetails = ({
  description,
  additionalInfo,
  SKU,
}: MainExtraDetailsProps) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-8">
      <div className="flex mb-4">
        <h3
          className={` text-lg md:text-xl border-b-2 p-2 mb-4 cursor-pointer ${
            activeTab === "description"
              ? "text-black font-bold  border-primary"
              : "text-gray-500 font-semibold border-transparent"
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </h3>
        <h3
          className={` text-lg md:text-xl  border-b-2 p-2 mb-4 ml-4 cursor-pointer ${
            activeTab === "additionalInfo"
              ? "text-black font-bold border-primary"
              : "text-gray-500 font-semibold border-transparent"
          }`}
          onClick={() => setActiveTab("additionalInfo")}
        >
          Additional Info
        </h3>
      </div>
      <div className="text-sm text-gray-700 min-h-[200px]">
        {activeTab === "description" && (
          <Description description={description} SKU={SKU} />
        )}
        {activeTab === "additionalInfo" && (
          <AdditionalInfo info={additionalInfo} />
        )}
      </div>
    </div>
  );
};

export default MainExtraDetails;
