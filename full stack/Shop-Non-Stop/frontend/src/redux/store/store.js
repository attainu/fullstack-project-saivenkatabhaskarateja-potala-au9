import {createStore,compose,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from '../reducers/cartReducer';
import { productDetailsReducer , productListReducer} from '../reducers/productReducer';
import { userRegisterReducer, userSigininReducer } from '../reducers/userReducer';


const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigininReducer,
  userRegister:userRegisterReducer
});


const initalState = {
  userSignin: {
    userInfo: sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: sessionStorage.getItem("cartItems")
      ? JSON.parse(sessionStorage.getItem("cartItems"))
      : [],
  },
};


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initalState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store

