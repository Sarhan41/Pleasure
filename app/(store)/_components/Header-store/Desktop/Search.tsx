import { useState, useEffect, useRef } from "react";
import { Product } from "@prisma/client";
import Link from "next/link";
import { SearchIcon, XIcon } from "lucide-react";

interface SearchProps {
  allProducts: Product[];
}

const Search = ({ allProducts }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
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
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="cursor-pointer" onClick={() => setIsSearchOpen(true)}>
        <SearchIcon size={24} />
      </div>

      {isSearchOpen && (
        <div className="fixed h-screen inset-0 bg-white z-50 flex flex-col p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Search</h2>
            <button className="p-2" onClick={() => setIsSearchOpen(false)}>
              <XIcon size={24} />
            </button>
          </div>
          <div className="relative mt-4" ref={searchRef}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-300"
            />
            {showResults && (
              <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-xl shadow-md z-50">
                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No results found
                  </div>
                ) : (
                  searchResults.map((product) => (
                    <Link key={product.id} href={`/product/${product.name}`}>
                      <div className="p-4 border-b hover:bg-gray-200 border-gray-300">
                        {product.name}
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
