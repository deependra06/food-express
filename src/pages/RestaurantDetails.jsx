import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCurrentRestaurant } from "../store/slices/restaurantSlice";
import MenuItem from "../components/MenuItem";
import { Star, Clock, IndianRupee } from "lucide-react";

const RestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const restaurant = useSelector(
    (state) => state.restaurants.currentRestaurant
  );

  useEffect(() => {
    dispatch(setCurrentRestaurant(id));
  }, [id, dispatch]);

  if (!restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">Restaurant not found</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
          <p className="text-gray-600 mb-4">{restaurant.cuisine.join(", ")}</p>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-5 w-5 text-gray-500" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <IndianRupee className="h-5 w-5 text-gray-500" />
              <span>Min order: ₹{restaurant.minOrder}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        {restaurant.menu.map((item) => (
          <MenuItem key={item.id} item={item} restaurantId={restaurant.id} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetails;
