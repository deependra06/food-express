import { useSelector } from "react-redux";
import RestaurantCard from "../components/RestaurantCard";

const Restaurants = () => {
  const restaurants = useSelector((state) => state.restaurants.list);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Restaurants</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
