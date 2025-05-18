import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import { BASE_URL } from "../utils/apiURL";

const fetchFromLocalStorage = () => {
    let cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(localStorage.getItem('cart'));
    } else {
        return [];
    }
}

const storeInLocalStorage = (data) => {
    localStorage.setItem('cart', JSON.stringify(data));
}

const initialState = {
    carts: fetchFromLocalStorage(),
    itemsCount: 0,
    totalAmount: 0,
    isCartMessageOn: false,
    orders: [],
    orderStatus: STATUS.IDLE,
    orderStatusMessage: '',
}



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setOrderStatusOff: (state) => {
            state.orderStatus = STATUS.IDLE;
            state.orderStatusMessage = ''
        },

        addToCart: (state, action) => {
            const isItemInCart = state.carts.find(item => item._id === action.payload._id);


            if (isItemInCart) {
                const tempCart = state.carts.map(item => {
                    if (item._id === action.payload._id) {
                        let tempQty = item.quantity + action.payload.quantity;

                        let tempTotalPrice = tempQty * item.price;

                        return {
                            ...item, quantity: tempQty, totalPrice: tempTotalPrice
                        }
                    } else {
                        return item;
                    }
                });

                state.carts = tempCart;
                storeInLocalStorage(state.carts);
            } else {
                state.carts.push(action.payload);
                storeInLocalStorage(state.carts);
            }
        },

        removeFromCart: (state, action) => {
            const tempCart = state.carts.filter(item => item._id !== action.payload);
            state.carts = tempCart;
            storeInLocalStorage(state.carts);
        },

        clearCart: (state) => {
            state.carts = [];
            storeInLocalStorage(state.carts);
        },

        getCartTotal: (state) => {
            state.totalAmount = state.carts.reduce((cartTotal, cartItem) => {
                return cartTotal += cartItem.totalPrice
            }, 0);

            state.itemsCount = state.carts.length;
        },

        toggleCartQty: (state, action) => {
            const tempCart = state.carts.map(item => {

                if (item._id === action.payload._id) {
                    let tempQty = item.quantity;
                    let tempTotalPrice = item.totalPrice;

                    if (action.payload.type === "INC") {
                        tempQty++;
                        if (tempQty === item.stock) tempQty = item.stock;
                        tempTotalPrice = tempQty * item.discountedPrice;
                    }

                    if (action.payload.type === "DEC") {
                        tempQty--;
                        if (tempQty < 1) tempQty = 1;
                        tempTotalPrice = tempQty * item.discountedPrice;
                    }

                    return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
                } else {
                    return item;
                }
            });

            state.carts = tempCart;
            storeInLocalStorage(state.carts);
        },

        setCartMessageOn: (state) => {
            state.isCartMessageOn = true;
        },

        setCartMessageOff: (state) => {
            state.isCartMessageOn = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderAsync.pending, (state, action) => {
                state.orderStatus = STATUS.LOADING;
            })

            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.orderStatus = STATUS.SUCCEEDED;
                state.orderStatusMessage = 'order created successfully';
            
                // Clear cart after successful order
                state.carts = [];
                localStorage.setItem('cart', JSON.stringify([]));
            })
            

            .addCase(createOrderAsync.rejected, (state, action) => {
                state.orderStatus = STATUS.FAILED
                state.orderStatusMessage = action.payload
                state.orderStatusMessage = 'order could not be sent'
            })


            .addCase(fetchOrderAsync.pending, (state, action) => {
                state.orderStatus = STATUS.LOADING;
            })

            .addCase(fetchOrderAsync.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.orderStatus = STATUS.SUCCEEDED;
            })

            .addCase(fetchOrderAsync.rejected, (state, action) => {
                state.orderStatus = STATUS.FAILED
            })
    },
});


// for getting the products list with limited numbers
export const createOrderAsync = createAsyncThunk('orders/create', async (orderInfo, { rejectWithValue }) => {

    try {
        const response = await fetch(`${BASE_URL}orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderInfo),
        });
        const data = await response.json();

        console.log(data)
        return data.response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});




export const fetchOrderAsync = createAsyncThunk('orders/fetch', async (userInfo, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}orders-fetch`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo),
        });
        const data = await response.json();
        return data.response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});



export const { addToCart, setCartMessageOff, setCartMessageOn, getCartTotal, toggleCartQty, clearCart, removeFromCart, setOrderStatusOff } = cartSlice.actions;
export const getAllCarts = (state) => state.cart.carts;
export const getCartItemsCount = (state) => state.cart.itemsCount;
export const getCartMessageStatus = (state) => state.cart.isCartMessageOn;
export const getOrderStatus = (state) => state.cart.orderStatus;
export const getOrders = (state) => state.cart.orders;
export const getOrderStatusMessage = (state) => state.cart.orderStatusMessage;


export default cartSlice.reducer;