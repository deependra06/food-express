import { useSelector } from "react-redux";
import { Package, CheckCircle, Clock, Truck } from "lucide-react";

const Orders = () => {
  const orders = useSelector((state) => state.orders.list);

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "preparing":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "delivered":
        return <Package className="h-5 w-5 text-blue-500" />;
      default:
        return <Truck className="h-5 w-5 text-gray-500" />;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
        <p className="text-gray-600">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">
                  Order #{order.id.slice(-6)}
                </h3>
                <p className="text-gray-600 text-sm">
                  {new Date(order.date).toLocaleDateString()} at{" "}
                  {new Date(order.date).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(order.status)}
                <span className="capitalize">{order.status}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between py-1">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold text-lg border-t mt-2 pt-2">
                <span>Total:</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
