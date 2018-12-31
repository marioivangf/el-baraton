import { ADD_TO_CART, REMOVE_FROM_CART, SET_QUANTITY_IN_CART, CHECKOUT } from "./types";

export const addToCart = productId => ({
  type: ADD_TO_CART,
  productId,
});

export const setQuantityInCart = (productId, quantity) => ({
  type: SET_QUANTITY_IN_CART,
  productId,
  quantity,
});

export const removeFromCart = productId => ({
  type: REMOVE_FROM_CART,
  productId,
});

export const checkout = () => ({
  type: CHECKOUT,
});
