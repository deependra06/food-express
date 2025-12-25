import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem, setRestaurant } from "../store/slices/cartSlice";

const MenuItem = ({ item, restaurantId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(setRestaurant(restaurantId));
    dispatch(addItem(item));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 flex justify-between items-start">
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
        <p className="text-orange-600 font-semibold mt-2">₹{item.price}</p>
      </div>
      <div className="ml-4 flex flex-col items-end">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <button
          onClick={handleAddToCart}
          className="mt-2 bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
