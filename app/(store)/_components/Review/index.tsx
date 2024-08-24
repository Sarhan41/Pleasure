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

  const handleDelete = async (reviewId: string) => {
    try {
      await axios.delete(`/api/dashboard/reviews/${reviewId}`);
      router.refresh();

      // Manually construct the new URL with reload parameter
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("reload", Date.now().toString());

      // Use router.replace to update the URL without adding a new history entry
      router.push(currentUrl.toString());

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
    <div className="bg-white p-10 rounded-lg shadow-2xl max-w-5xl mx-auto">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">Customer Reviews</h2>
  
      <div className="text-center mb-12">
        <Button
          onClick={openDialog}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Create Review
        </Button>
      </div>
  
      <div className="space-y-10">
        {paginatedReviews?.map((review) => (
          <div
            key={review.id}
            className="p-8 border border-gray-200 rounded-xl shadow-lg transition duration-300 hover:shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {review.user.image ? (
                  <img
                    src={review.user.image}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                    <span className="text-gray-600 text-lg font-semibold">
                      {review.name?.charAt(0) || review.user.name?.charAt(0) || "A"}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {review.name || review.user.name || "Anonymous"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`h-6 w-6 ${
                      index < review.rating ? "text-yellow-400" : "text-gray-300"
                    } fill-current`}
                  />
                ))}
              </div>
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-gray-900">{review.title}</h1>
            <p className="mt-2 text-gray-700 leading-relaxed">{review.comment}</p>
            {review.images.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4">
                {review.images.map((image) => (
                  <Image
                    key={image.id}
                    src={image.url}
                    alt="Review Image"
                    className="w-full h-48 object-cover rounded-lg transition duration-300 transform hover:scale-105"
                  />
                ))}
              </div>
            )}
            {currentUserId === review.userId && (
              <div className="flex justify-end mt-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                    <DropdownMenuItem
                      onClick={() => handleDelete(review.id)}
                      className="flex items-center space-x-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        ))}
  
        {/* Conditional Pagination Controls */}
        {reviews && reviews.length > reviewsPerPage && (
          <div className="flex justify-between items-center mt-12">
            <span className="text-gray-600">
              Showing {paginatedReviews?.length} of {reviews.length} reviews
            </span>
            <div className="flex space-x-4">
              <Button
                variant="secondary"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition duration-300"
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
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition duration-300"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
  
      {/* Dialog for creating a review */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white p-8 rounded-xl shadow-xl max-w-lg mx-auto">
          <DialogHeader className="text-center mb-6">
            <DialogTitle className="text-2xl font-semibold text-gray-900">Write Review</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <ReviewForm productId={productId} onClose={closeDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductReviews;
