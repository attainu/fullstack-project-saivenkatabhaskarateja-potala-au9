import {createStore,compose,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from '../reducers/cartReducer';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
  orderDeleteReducer,
  orderDeliverReducer,
} from '../reducers/orderReducer';
import { productCategoryListReducer, productCreateReducer, productDeleteReducer, productDetailsReducer , productListReducer, productUpdateReducer} from '../reducers/productReducer';
import {
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigininReducer,
  userUpdateProfileReducer,
  userDeleteReducer,
  userUpdateReducer,
 } from "../reducers/userReducer";


const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigininReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  productCategoryList: productCategoryListReducer,
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
    shippingAddress: sessionStorage.getItem("shippingAddress")
      ? JSON.parse(sessionStorage.getItem("shippingAddress"))
      : {},
      paymentMethod:"PayPal"
  },
};


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initalState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store

