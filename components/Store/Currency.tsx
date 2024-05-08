import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
});

interface CurrencyProps {
  value?: string | number;
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

  return (
    <div className="font-semibold">
      {discountedValue ? (
        <>
          {formatter.format(Number(discountedValue))}
          <span className="line-through ml-4 text-gray-500">
            {formatter.format(Number(value))}
          </span>
        </>
      ) : (
        formatter.format(Number(value))
      )}
    </div>
  );
};

export default Currency;
