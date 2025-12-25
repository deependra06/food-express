import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Plus, Trash2, Edit3, Utensils } from "lucide-react";
import {
  deleteRestaurant,
  deleteMenuItem,
} from "../store/slices/restaurantSlice";
import AdminRestaurantForm from "../components/AdminRestaurantForm";
import AdminMenuItemForm from "../components/AdminMenuItemForm";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurants.list);
  const [showRestaurantForm, setShowRestaurantForm] = useState(false);
  const [showMenuItemForm, setShowMenuItemForm] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleDeleteRestaurant = (restaurantId) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      dispatch(deleteRestaurant(restaurantId));
    }
  };

  const handleDeleteMenuItem = (restaurantId, menuItemId) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      dispatch(deleteMenuItem({ restaurantId, menuItemId }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setShowRestaurantForm(true)}
          className="flex items-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Restaurant
        </button>
      </div>

      <div className="grid gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                  <p className="text-gray-600">
                    {restaurant.cuisine.join(", ")}
                  </p>
                  <p className="text-sm text-gray-500">ID: {restaurant.id}</p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteRestaurant(restaurant.id)}
                className="text-red-600 hover:text-red-700 p-2"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold">Menu Items</h4>
              <button
                onClick={() => {
                  setSelectedRestaurant(restaurant.id);
                  setShowMenuItemForm(true);
                }}
                className="flex items-center text-orange-600 hover:text-orange-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Menu Item
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {restaurant.menu.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <h5 className="font-medium">{item.name}</h5>
                      <p className="text-sm text-gray-600">₹{item.price}</p>
                      <p className="text-xs text-gray-500">ID: {item.id}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteMenuItem(restaurant.id, item.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {restaurant.menu.length === 0 && (
                <div className="col-span-2 text-center py-4 text-gray-500">
                  <Utensils className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  No menu items yet
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showRestaurantForm && (
        <AdminRestaurantForm onClose={() => setShowRestaurantForm(false)} />
      )}

      {showMenuItemForm && selectedRestaurant && (
        <AdminMenuItemForm
          restaurantId={selectedRestaurant}
          onClose={() => {
            setShowMenuItemForm(false);
            setSelectedRestaurant(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;