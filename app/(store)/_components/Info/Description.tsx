import React from 'react';

const Description = ({ data }: { data: string | undefined | null }) => {
    if (!data) {
        return (
            <p>No description available.</p>
        );
    }

    // Split the data into individual specifications
    const specifications = data.split('     ').map(spec => spec.trim()).filter(spec => spec);

    return (
        <div className="text-sm text-gray-700">
            <ul className="list-disc list-inside">
                {specifications.map((spec, index) => (
                    <li key={index} className="mb-1">{spec}</li>
                ))}
            </ul>
        </div>
    );
};

export default Description;
