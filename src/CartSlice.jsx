import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const payload = action.payload;
      const basePrice = +(payload.cost.replace('$', ''))
      state.items.push({...payload, basePrice, quantity : 1})
    },
    removeItem: (state, action) => {
      const name = action.payload.name;
      state.items = state.items.filter(item => item.name !== name)
    },
    updateQuantity: (state, action) => {
      const { isInc , name} = action.payload
      const item = state.items.find(item => item.name === name)
      item.quantity+= isInc ? 1 : -1
      if(item.quantity <= 0){
        state.items = state.items.filter(item => item.name !== name)
      }
    },
    resetCart:(state, action) =>{
      state.items = []
    }
  },
});

export const { addItem, removeItem, updateQuantity, resetCart } = CartSlice.actions;

export default CartSlice.reducer;
