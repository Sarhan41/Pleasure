import React from "react";

const Description = ({
  description,
  SKU,
}: {
  description: string | undefined | null;
  SKU: string | undefined | null;
}) => {
  if (!description) {
    return <p>No description available.</p>;
  }

  // Split the data into individual specifications
  const specifications = description
    .split(/\s*\n\s*|\s{3,}/) // Splits on newlines or three or more spaces
    .map((spec) => spec.trim())
    .filter((spec) => spec);

  return (
    <div className="text-sm text-gray-700">
      <ul className="list-disc list-inside">
        {specifications.map((spec, index) => (
          <li key={index} className="mb-1">
            {spec}
          </li>
        ))}
      </ul>
      {typeof SKU === "string" && SKU != "." && (
        <ul className="list-disc list-inside">
          <li className="mb-1">SKU: {SKU}</li>
        </ul>
      )}
    </div>
  );
};

export default Description;
