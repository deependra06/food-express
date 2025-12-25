import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";
import { ShoppingCart, Utensils, LayoutDashboard } from "lucide-react";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { user } = useUser();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-orange-600">
            <Utensils className="h-8 w-8" />
            <span className="text-xl font-bold">FoodExpress</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              to="/restaurants"
              className="text-gray-700 hover:text-orange-600"
            >
              Restaurants
            </Link>

            <SignedIn>
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-orange-600"
                >
                  <LayoutDashboard className="h-5 w-5" />
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-orange-600"
                >
                  Dashboard
                </Link>
              )}

              <Link
                to="/orders"
                className="text-gray-700 hover:text-orange-600"
              >
                Orders
              </Link>

              <Link
                to="/cart"
                className="relative text-gray-700 hover:text-orange-600"
              >
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
