export const calculateOrderTotal = (prices: number[], quantities: number[], discount: number) => {
    let total = prices.reduce((sum, price, index) => sum + price * quantities[index], 0);
    total = total - discount; // Apply discount
    const tax = total * 0.05; // 5% tax
    const shipping = total > 500 ? 0 : 50; // Free shipping for orders over 500
    return total + tax + shipping;
  };
  