import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_QUANTITY_IN_CART,
  CHECKOUT,
} from "../actions/types";

const initialState = {
  ids: [],
  quantityById: {},
};

const ids = (state = initialState.ids, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) return state; // Already added
      return [...state, action.productId];
    case REMOVE_FROM_CART:
      if (state.indexOf(action.productId) < 0) return state; // Not in
      return state.filter(id => id !== action.productId);
    default:
      return state;
  }
};

const quantityById = (state = initialState.quantityById, action) => {
  const { productId, quantity } = action;
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        [productId]: (state[productId] || 0) + 1,
      };
    case SET_QUANTITY_IN_CART:
      return {
        ...state,
        [productId]: quantity,
      };
    case REMOVE_FROM_CART: {
      const { [productId]: deleted, ...newState } = state;
      return newState;
    }
    default:
      return state;
  }
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case CHECKOUT:
      return initialState;
    case ADD_TO_CART:
    case REMOVE_FROM_CART:
    case SET_QUANTITY_IN_CART:
      return {
        ids: ids(state.ids, action),
        quantityById: quantityById(state.quantityById, action),
      };
    default:
      return state;
  }
};
