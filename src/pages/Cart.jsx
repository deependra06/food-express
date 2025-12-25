import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../store/slices/cartSlice";
import CartItem from "../components/CartItem";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600 mb-8">Your cart is empty</p>
        <Link
          to="/restaurants"
          className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <button
          onClick={() => dispatch(clearCart())}
          className="flex items-center text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Clear Cart
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center text-xl font-semibold">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <SignedIn>
        <Link
          to="/checkout"
          className="block w-full bg-orange-600 text-white text-center py-4 rounded-lg text-lg font-semibold hover:bg-orange-700"
        >
          Proceed to Checkout
        </Link>
      </SignedIn>

      <SignedOut>
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please sign in to checkout</p>
          <Link
            to="/sign-in"
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
          >
            Sign In
          </Link>
        </div>
      </SignedOut>
    </div>
  );
};

export default Cart;
