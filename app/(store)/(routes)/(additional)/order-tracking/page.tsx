import Container from "@/components/Store/container";

const OrderTracking = () => {
  return (
    <div className="bg-white lg:mt-14">
      <Container>
        <div className="px-4 lg:py-10 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Order Tracking</h1>
          <p className="mt-4">Enter your order number to track your order:</p>
          <form className="mt-4">
            <input type="text" className="border p-2 rounded" placeholder="Order Number" />
            <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded">Track</button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default OrderTracking;
