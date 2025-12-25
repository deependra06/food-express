import { useSelector } from "react-redux";
import { Package, CheckCircle, Clock, Truck, User } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const UserDashboard = () => {
  const { user } = useUser();
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {user?.firstName || user?.username}!
            </h1>
            <p className="text-gray-600">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Package className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Completed</h3>
          <p className="text-3xl font-bold text-gray-900">
            {orders.filter((o) => o.status === "delivered").length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Active Orders</h3>
          <p className="text-3xl font-bold text-gray-900">
            {orders.filter((o) => o.status !== "delivered").length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        {orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-gray-600 text-sm">
                    {new Date(order.date).toLocaleDateString()} • $
                    {order.total.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className="capitalize">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
