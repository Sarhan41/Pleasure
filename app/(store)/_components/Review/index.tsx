// components/ProductReviews.tsx
"use client";

import { useState } from "react";
import { Review } from "@/types";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import ReviewForm from "./components/ReviewForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"; // Import your dialog components

interface ProductReviewsProps {
  reviews?: Review[];
  currentUserId: string | null | undefined;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews,
  currentUserId,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
  const reviewsPerPage = 5;

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const paginatedReviews = reviews?.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
        Customer Reviews
      </h2>

      <div className="mb-6">
        <Button onClick={openDialog}>Create Review</Button>
      </div>

      <div>
        {paginatedReviews?.map((review) => (
          <div key={review.id} className="mb-6 border-b pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {review.user.name || "Anonymous"}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`h-5 w-5 ${
                      index < review.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-4 text-gray-800">{review.comment}</p>
            {review.images.length > 0 && (
              <div className="mt-4 flex space-x-4">
                {review.images.map((image) => (
                  <Image
                    key={image.id}
                    src={image.url}
                    alt="Review Image"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="secondary"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {Math.ceil((reviews?.length || 0) / reviewsPerPage)}
          </span>
          <Button
            variant="secondary"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil((reviews?.length || 0) / reviewsPerPage))
              )
            }
            disabled={currentPage === Math.ceil((reviews?.length || 0) / reviewsPerPage)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Dialog for creating a review */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write Review</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <ReviewForm onClose={closeDialog} /> {/* You can pass necessary props */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductReviews;
