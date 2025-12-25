import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../store/slices/orderSlice";
import { clearCart } from "../store/slices/cartSlice";
import { useState } from "react";

const Checkout = () => {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  const handlePlaceOrder = () => {
    const order = {
      items,
      total,
      address,
      restaurant: items[0]?.restaurantId || "unknown",
    };

    dispatch(addOrder(order));
    dispatch(clearCart());
    navigate("/orders");
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between py-2 border-b">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between text-xl font-semibold mt-4">
          <span>Total:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your delivery address"
          className="w-full border rounded-lg p-3 h-24 resize-none"
          required
        />
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={!address.trim()}
        className="w-full bg-orange-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
