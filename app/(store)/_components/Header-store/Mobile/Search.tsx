import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Product } from "@prisma/client";
import Link from "next/link";

interface SearchProps {
  allProducts: Product[];
  onSearchOpen: () => void;
  onSearchClose: () => void;
}

const Search = ({ allProducts, onSearchOpen, onSearchClose }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (term: string) => {
    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filteredProducts);
    setShowResults(filteredProducts.length > 0 && term.length > 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setShowResults(false);
      onSearchClose();
    }
  };



  return (
    <div className="relative" ref={searchRef}>
      <Input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring lg:w-96 focus:border-blue-300 w-56 max-sm:w-44"
        showSearchIcon
      />

      {showResults && (
        <div className="absolute top-12 w-full z-50 bg-white border border-gray-300 rounded-3xl shadow-md">
          {searchResults.length === 0 ? (
            <div className="p-4">No results found</div>
          ) : (
            searchResults.map((product) => (
              <Link key={product.id} href={`/product/${product.name}`}>
                <div
                  key={product.id}
                  className="p-4  border-b hover:bg-gray-200 rounded-3xl  border-gray-300"
                >
                  {product.name}
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
