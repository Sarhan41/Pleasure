
interface AdditionalInfoProps {
    info: string | null | undefined;
    }


const AdditionalInfo = ({ info }: AdditionalInfoProps) => {
  if (!info) {
    return <p>No additional information available.</p>;
  }

  // Process additional info if necessary
  const infoItems = info
    .split("   ")
    .map((item) => item.trim())
    .filter((item) => item);

  return (
    <div>
      <ul className="list-disc list-inside">
        {infoItems.map((item, index) => (
          <li key={index} className="mb-1">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdditionalInfo;
