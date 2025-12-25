import { Link } from "react-router-dom";
import { Star, Clock, IndianRupee } from "lucide-react";

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{restaurant.name}</h3>
          <p className="text-gray-600 text-sm mb-3">
            {restaurant.cuisine.join(", ")}
          </p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <IndianRupee className="h-4 w-4 text-gray-500" />
              <span>Min: ₹{restaurant.minOrder}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
