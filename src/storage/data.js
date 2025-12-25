import { v4 as uuidv4 } from 'uuid';

const generateShortId = () => {
  return uuidv4().slice(0, 6);
};

export const initialData = {
  restaurants: [
    {
      id: generateShortId(),
      name: 'Burger Palace',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400',
      cuisine: ['Burgers', 'American'],
      rating: 4.5,
      deliveryTime: '20-30 min',
      minOrder: 15,
      isActive: true,
      menu: [
        {
          id: generateShortId(),
          name: 'Classic Cheeseburger',
          description: 'Chicken patty with cheese, lettuce, and special sauce',
          price: 12.99,
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
          category: 'Burgers',
          isAvailable: true
        },
        {
          id: generateShortId(),
          name: 'Crispy Chicken Burger',
          description: 'Crispy fried chicken with mayo and coleslaw',
          price: 11.99,
          image: 'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=300',
          category: 'Burgers',
          isAvailable: true
        }
      ]
    },
    {
      id: generateShortId(),
      name: 'Pizza Heaven',
      image: 'https://res.cloudinary.com/daxopysz5/image/upload/v1766514319/alan-hardman-SU1LFoeEUkk-unsplash_qopmhu.jpg?w=300',
      cuisine: ['Pizza', 'Italian'],
      rating: 4.3,
      deliveryTime: '25-35 min',
      minOrder: 20,
      isActive: true,
      menu: [
        {
          id: generateShortId(),
          name: 'Margherita Pizza',
          description: 'Classic pizza with tomato sauce and mozzarella',
          price: 16.99,
          image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300',
          category: 'Pizza',
          isAvailable: true
        }
      ]
    }
  ],
  orders: [],
  users: []
};

export const storage = {
  getRestaurants: () => {
    const data = localStorage.getItem('foodApp_data');
    return data ? JSON.parse(data).restaurants : initialData.restaurants;
  },

  saveRestaurants: (restaurants) => {
    const data = localStorage.getItem('foodApp_data');
    const currentData = data ? JSON.parse(data) : initialData;
    currentData.restaurants = restaurants;
    localStorage.setItem('foodApp_data', JSON.stringify(currentData));
  },

  getOrders: () => {
    const data = localStorage.getItem('foodApp_data');
    return data ? JSON.parse(data).orders : initialData.orders;
  },

  saveOrders: (orders) => {
    const data = localStorage.getItem('foodApp_data');
    const currentData = data ? JSON.parse(data) : initialData;
    currentData.orders = orders;
    localStorage.setItem('foodApp_data', JSON.stringify(currentData));
  },

  initializeData: () => {
    if (!localStorage.getItem('foodApp_data')) {
      localStorage.setItem('foodApp_data', JSON.stringify(initialData));
    }
  }
};

storage.initializeData();
export { generateShortId };