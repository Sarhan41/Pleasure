"use client";

import { useState } from "react";
import { Review } from "@/types";
import { Button } from "@/components/ui/button";
import { StarIcon, MoreHorizontal, Trash } from "lucide-react";
import Image from "next/image";
import ReviewForm from "./components/ReviewForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

interface ProductReviewsProps {
  reviews?: Review[];
  currentUserId: string | null | undefined;
  productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews,
  currentUserId,
  productId,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const reviewsPerPage = 5;

  const router = useRouter();

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const pathname = window.location;
    

  const handleDelete = async (reviewId: string) => {
    try {
      await axios.delete(`/api/dashboard/reviews/${reviewId}`);
      router.refresh();
  
      // Manually construct the new URL with reload parameter
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('reload', Date.now().toString());
  
      // Use router.replace to update the URL without adding a new history entry
      router.replace(currentUrl.toString());
      
      toast.success("Review deleted successfully.");
    
    } catch (error) {
      toast.error("Failed to delete the review. Please try again.");
    }
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
              {currentUserId === review.userId && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleDelete(review.id)}>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
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

        {/* Conditional Pagination Controls */}
        {reviews && reviews.length > reviewsPerPage && (
          <div className="flex justify-between items-center mt-6">
            <span>
              Showing {paginatedReviews?.length} of {reviews.length} reviews
            </span>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil((reviews.length || 0) / reviewsPerPage)
                    )
                  )
                }
                disabled={
                  currentPage ===
                  Math.ceil((reviews.length || 0) / reviewsPerPage)
                }
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Dialog for creating a review */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write Review</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <ReviewForm productId={productId} onClose={closeDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductReviews;
