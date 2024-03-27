import { ReactElement, Reducer, createContext, useReducer } from 'react';
import { Cart, CartType } from '../types/CartType';
import { UserInfo } from '../types/UserInfo';

type AppState = {
  mode: string;
  cart: Cart;
  userInfo?: UserInfo;
};

const initialState: AppState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,

  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode')!
    : window.matchMedia &&
      window.matchMedia('(prefers-color-schema): dark').matches
    ? 'dark'
    : 'light',

  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems')!)
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress')!)
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')!
      : 'Paypal',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
};

type Action =
  | { type: 'SWITCH_MODE' }
  | { type: 'CART_ADD_ITEM'; payload: CartType }
  | { type: 'CART_REMOVE_ITEM'; payload: CartType }
  | { type: 'USER_SIGNIN'; payload: UserInfo }
  | { type: 'USER_SIGNOUT' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SWITCH_MODE':
      return { ...state, mode: state.mode === 'dark' ? 'light' : 'dark' };

    case 'CART_ADD_ITEM':
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: CartType) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item: CartType) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    case 'CART_REMOVE_ITEM':
      const updatedCart = state.cart.cartItems.filter(
        (item: CartType) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return { ...state, cart: { ...state.cart, cartItems: updatedCart } };

    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };

    case 'USER_SIGNOUT':
      return {
        ...state,
        // mode:
        //   window.matchMedia &&
        //   window.matchMedia('(prefers-color-scheme: dark)').matches
        //     ? 'dark'
        //     : 'light',
        // cart: {
        //   cartItems: [],
        //   paymentMethod: 'PayPal',
        //   shippingAddress: {
        //     fullName: '',
        //     address: '',
        //     postalCode: '',
        //     city: '',
        //     country: '',
        //   },
        //   itemsPrice: 0,
        //   shippingPrice: 0,
        //   taxPrice: 0,
        //   totalPrice: 0,
        // },
      };

    default:
      return state;
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState;

const Store = createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

type childrenProps = {
  children: ReactElement | ReactElement[];
};

function StoreProvider({ children }: childrenProps) {
  const [state, dispatch] = useReducer<Reducer<AppState, Action>>(
    reducer,
    initialState
  );

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}

export { Store, StoreProvider };
