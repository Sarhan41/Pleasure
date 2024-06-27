export const calculateDiscountPercentage = (
    originalPrice: string,
    discountedPrice: string | null
  ): string => {
    const originalPriceNum = parseFloat(originalPrice);
    if (discountedPrice) {
      const discountedPriceNum = parseFloat(discountedPrice);
      if (
        isNaN(originalPriceNum) ||
        isNaN(discountedPriceNum) ||
        originalPriceNum <= 0 ||
        discountedPriceNum < 0
      ) {
        throw new Error("Prices should be valid positive numbers");
      }
  
      const discount = originalPriceNum - discountedPriceNum;
      const discountPercentage = (discount / originalPriceNum) * 100;
      return Math.round(discountPercentage).toString(); // Returning rounded to nearest whole number
    }
    return "0"; // Return 0 if discountedPrice is null
  };
  