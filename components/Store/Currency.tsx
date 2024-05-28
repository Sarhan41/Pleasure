import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
});

interface CurrencyProps {
  value: string | number;
  discountedValue?: string | number | null;
}

const Currency: React.FC<CurrencyProps> = ({ value, discountedValue }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const formatValue = (val: string | number) => {
    return formatter.format(Number(val));
  };

  return (
    <div className="font-semibold">
      {discountedValue ? (
        <>
          {formatValue(discountedValue)}
          <span className="line-through ml-4 text-gray-500">
            {formatValue(value)}
          </span>
        </>
      ) : (
        formatValue(value)
      )}
    </div>
  );
};

export default Currency;
