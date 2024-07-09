import { useState, useEffect, useRef } from "react";
import { Product } from "@prisma/client";
import Link from "next/link";
import { SearchIcon, XIcon, FlameIcon } from "lucide-react";

interface SearchProps {
  allProducts: Product[];
}

const popularSearches = [
  {
    name: "Hot Sport Bra",
    link: "/Hot Pink White Skin Black Red Maroon Grey Cotton Spandex Stretchable Womens Sports Bra (Pack of 3) Buy Any 3 Pcs",
  },
  {
    name: "Hipster Mid Waist Panties",
    link: "/Hipster Mid Waist Flower Print Panties In Multicolor (Pack Of 3) 100 Cotton SERVIN",
  },
  {
    name: "Hipster Cotton Spandex Panties",
    link: "/Hipster Cotton Spandex Skin Dark Pink Baby Pink Panties (Pack of 3) CHARVI",
  },
  {
    name: "Low Rise Bikini Polka Dot Panties",
    link: "/Low Rise Bikini Polka Dot Panties In Multicolor (Pack Of 3) 100 Cotton SARA",
  },
];

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

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSearchOpen]);

  return (
    <>
      <div className="hidden lg:block relative" ref={searchRef}>
        <div className="w-72 flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring focus-within:border-blue-300">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleChange}
            className="w-full focus:outline-none"
            onClick={() => setIsSearchOpen(true)}
          />
          <SearchIcon
            size={24}
            className="cursor-pointer text-gray-500"
            onClick={() => setIsSearchOpen(true)}
          />
        </div>

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
      <SearchIcon
        size={24}
        className="cursor-pointer text-gray-500 lg:hidden"
        onClick={() => setIsSearchOpen(true)}
      />
      {isSearchOpen && (
        <div className="fixed h-screen inset-0 bg-white z-50 flex flex-col p-4 overflow-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Search</h2>
            <button className="p-2" onClick={() => setIsSearchOpen(false)}>
              <XIcon size={24} />
            </button>
          </div>
          <div className="relative mt-4 flex-grow" ref={searchRef}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleChange}
              className="w-full lg:w-48 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-300"
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
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <FlameIcon size={20} className="mr-2" /> Popular Searches
            </h3>
            <div className="space-y-2 flex flex-col overflow-auto max-lg:min-h-96 lg:text-lg lg:py-4 lg:px-6 lg:space-y-4">
              {" "}
              {/* Updated this line */}
              {popularSearches.map((item) => (
                <Link
                  key={item.name}
                  href={`/product/${item.link.replace(/\s+/g, "-")}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="flex flex-wrap w-full"
                >
                  <div className="p-2 mb-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-all duration-300 text-primary border-primary hover:text-black hover:border-black bg-gradient-to-r from-pink-500 to-yellow-500 text-white lg:text-xl lg:py-3 w-fit lg:px-5">
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
