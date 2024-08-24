// components/ReviewForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface ReviewFormProps {
  productId?: string; // Add this prop to associate with the product
  initialRating?: number;
  initialComment?: string;
  initialImages?: string[];
  onSubmit?: (data: { rating: number; comment: string; images: string[] }) => void;
  onClose?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  initialRating = 0,
  initialComment = "",
  initialImages = [],
  onSubmit,
  onClose,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);
  const [images, setImages] = useState<string[]>(initialImages);

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ rating, comment, images });
    }
    if (onClose) {
      onClose(); // Close the dialog after submission
    }
  };

  return (
    <div>

      <div className="flex items-center mb-4">
        <span className="mr-2 text-lg">Rating:</span>
        {[...Array(5)].map((_, index) => (
          <StarIcon
            key={index}
            className={`h-6 w-6 cursor-pointer ${
              index < rating ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => setRating(index + 1)}
          />
        ))}
      </div>

      <Textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="mb-4"
      />

      <Button onClick={handleSubmit} className="mt-4">
        Submit Review
      </Button>
    </div>
  );
};

export default ReviewForm;
