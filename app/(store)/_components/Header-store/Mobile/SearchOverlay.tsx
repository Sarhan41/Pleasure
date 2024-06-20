import { Product } from "@prisma/client";
import Search from "./Search";

interface SearchOverlayProps {
  show: boolean;
  onClose: () => void;
  allProducts: Product[];
}

const SearchOverlay = ({ show, onClose, allProducts }: SearchOverlayProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-black text-lg">Close</button>
      </div>
      <div className="p-4">
        <Search allProducts={allProducts} onSearchOpen={() => {}} onSearchClose={onClose} />
      </div>
    </div>
  );
};

export default SearchOverlay;
