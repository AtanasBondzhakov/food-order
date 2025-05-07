import { useReducer } from "react";

const { createContext } = require("react");

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { }
});

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity += 1
            };

            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: updatedItems };
    }

}

export function CartContextProvider({ children }) {
    useReducer(cartReducer, {});

    return <CartContext.Provider>{children}</CartContext.Provider>
};