import { createContext, useReducer } from "react";

export const InventoryContext = createContext();

export const inventoryReducer = (state, action) => {
  switch (action.type) {
    case "SET_INVENTORY":
      return {
        inventory: action.payload,
      };
    case "CREATE_INVENTORY":
      return {
        inventory: [action.payload, ...state.inventory],
      };
    case "DELETE_INVENTORY":
      return {
        inventory: state.inventory.filter(
          (invt) => invt._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const InventoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, {
    inventory: null,
  });

  return (
    <InventoryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
};
