"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCurrentRole } from "@/hooks/auth/use-current-role";

interface ReviewFormProps {
  productId: string;
  initialRating?: number;
  initialTitle?: string;
  initialComment?: string;
  initialImages?: string[];
  initialName?: string;
  onClose?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  initialRating = 0,
  initialTitle = "",
  initialComment = "",
  initialImages = [],
  initialName = "",
  onClose,
}) => {
  const router = useRouter();
  const [rating, setRating] = useState(initialRating);
  const [title, setTitle] = useState(initialTitle);
  const [name, setName] = useState(initialName);
  const [comment, setComment] = useState(initialComment);
  const [images, setImages] = useState<string[]>(initialImages);
  const [error, setError] = useState<string | null>(null);

  const role = useCurrentRole();

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Title is required and should contain letters.");
      return;
    }

    const data: any = { name, rating, title, comment, images, productId };

    if (role === "ADMIN" && name.trim()) {
      data.username = name;
    }

    try {
      await axios.post("/api/dashboard/reviews", data);

      if (onClose) {
        onClose();
      }

      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("reload", Date.now().toString());
      router.push(currentUrl.toString());

      toast.success("Review posted successfully.");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(
          error.response.data || "Failed to submit review. Please try again."
        );
      } else {
        console.error("Failed to submit review:", error);
        setError("Failed to submit review. Please try again.");
      }
    }
  };

  return (
    <div>
      {role === "ADMIN" && (
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-opacity-50"
            placeholder="Name of User of review"
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">
          Title:
        </label>
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
              index < rating ? "text-yellow-300 fill-current" : "text-gray-300"
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

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <Button
        onClick={handleSubmit}
        className=" bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mt-4"
      >
        Submit Review
      </Button>
    </div>
  );
};

export default ReviewForm;
