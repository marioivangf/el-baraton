import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_QUANTITY_IN_CART,
  CHECKOUT,
} from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { productId, quantity = 1 } = action;
      return {
        ...state,
        [productId]: (state[productId] || 0) + Number(quantity),
      };
    }
    case SET_QUANTITY_IN_CART: {
      const { productId, quantity } = action;
      return {
        ...state,
        [productId]: Number(quantity),
      };
    }
    case REMOVE_FROM_CART: {
      const { [action.productId]: deleted, ...newState } = state;
      return newState;
    }
    case CHECKOUT:
      return initialState;
    default:
      return state;
  }
};
