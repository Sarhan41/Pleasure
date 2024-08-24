"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

interface ReviewFormProps {
  productId: string; // Required to ensure the form is associated with a product
  initialRating?: number;
  initialTitle?: string;
  initialComment?: string;
  initialImages?: string[];
  onClose?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  initialRating = 0,
  initialTitle = "",
  initialComment = "",
  initialImages = [],
  onClose,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [title, setTitle] = useState(initialTitle);
  const [comment, setComment] = useState(initialComment);
  const [images, setImages] = useState<string[]>(initialImages);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Title is required and should contain letters.");
      return;
    }

    const data = { rating, title, comment, images, productId };

   

    try {
      await axios.post("/api/dashboard/reviews", data);
      if (onClose) {
        onClose(); // Close the dialog after submission
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
      setError("Failed to submit review. Please try again.");
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-opacity-50"
          placeholder="Title of your review"
        />
      </div>

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

      {/* Image Upload Field or Component would go here */}

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <Button onClick={handleSubmit} className="mt-4">
        Submit Review
      </Button>
    </div>
  );
};

export default ReviewForm;
