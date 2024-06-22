"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import { Color, Size } from "@/types";
import { cn } from "@/lib/utils";
import Button from "./Button";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}

const Filter: React.FC<FilterProps> = ({ data, valueKey, name }) => {
  const searchParams = useSearchParams();
  console.log(searchParams);
  const router = useRouter();

  const selectedValues = searchParams.getAll(valueKey);

  const onClick = (name: string) => {
    const current = qs.parse(searchParams.toString());

    let updatedValues: string[];

    if (selectedValues.includes(name)) {
      updatedValues = selectedValues.filter((value) => value !== name);
    } else {
      updatedValues = [...selectedValues, name];
    }

    const query = {
      ...current,
      [valueKey]: updatedValues,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    // router.push(url);
    router.push(url, { scroll: false });
  };

  return (
    <div className="mb-8 ">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          // @ts-ignore
          <div key={filter.id} className="flex items-center ">
            <Button
              className={cn(
                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                selectedValues.includes(filter.name ?? "") &&
                  "bg-black text-white"
              )}
              onClick={() => onClick(filter.name || "")}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
