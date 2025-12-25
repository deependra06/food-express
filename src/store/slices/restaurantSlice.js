import { createSlice } from '@reduxjs/toolkit'
import { generateShortId, storage } from '../../storage/data'

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState: {
    list: storage.getRestaurants(),
    currentRestaurant: null,
  },
  reducers: {
    setCurrentRestaurant: (state, action) => {
      state.currentRestaurant = state.list.find(r => r.id === action.payload)
    },
    addRestaurant: (state, action) => {
      const newRestaurant = {
        ...action.payload,
        id: generateShortId(),
        isActive: true,
        menu: [],
        rating: 0,
        deliveryTime: '30-40 min',
        minOrder: 10
      }
      state.list.push(newRestaurant)
      storage.saveRestaurants(state.list)
    },
    updateRestaurant: (state, action) => {
      const index = state.list.findIndex(r => r.id === action.payload.id)
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload }
        storage.saveRestaurants(state.list)
      }
    },
    deleteRestaurant: (state, action) => {
      state.list = state.list.filter(r => r.id !== action.payload)
      storage.saveRestaurants(state.list)
    },
    addMenuItem: (state, action) => {
      const { restaurantId, menuItem } = action.payload
      const restaurant = state.list.find(r => r.id === restaurantId)
      if (restaurant) {
        const newMenuItem = {
          ...menuItem,
          id: generateShortId(),
          isAvailable: true
        }
        restaurant.menu.push(newMenuItem)
        storage.saveRestaurants(state.list)
      }
    },
    updateMenuItem: (state, action) => {
      const { restaurantId, menuItemId, updates } = action.payload
      const restaurant = state.list.find(r => r.id === restaurantId)
      if (restaurant) {
        const menuItem = restaurant.menu.find(m => m.id === menuItemId)
        if (menuItem) {
          Object.assign(menuItem, updates)
          storage.saveRestaurants(state.list)
        }
      }
    },
    deleteMenuItem: (state, action) => {
      const { restaurantId, menuItemId } = action.payload
      const restaurant = state.list.find(r => r.id === restaurantId)
      if (restaurant) {
        restaurant.menu = restaurant.menu.filter(m => m.id !== menuItemId)
        storage.saveRestaurants(state.list)
      }
    }
  },
})

export const { 
  setCurrentRestaurant, 
  addRestaurant, 
  updateRestaurant, 
  deleteRestaurant,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
} = restaurantSlice.actions
export default restaurantSlice.reducer