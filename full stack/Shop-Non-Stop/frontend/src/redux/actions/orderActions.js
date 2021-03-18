import axios from 'axios'
import { CART_EMPTY } from '../actionConstants/cartConstants'

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SCUCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS
} from "../actionConstants/orderConstants";

export const createOrder = (order) => async(dispatch,getState) =>{


        const state = getState(state => state)
        const userSignin = state.userSignin
        const {userInfo} = userSignin
        console.log("this is user info", userInfo);
        dispatch({
          type: ORDER_CREATE_REQUEST,
        });
        try{
            const { data } = await axios.post("/api/orders", order, {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            });

            dispatch({type: ORDER_CREATE_SCUCESS,
            payload:data.order})
            dispatch({type:CART_EMPTY})
            sessionStorage.removeItem('cartItems')
        }
        catch(error){
            dispatch({
                type:ORDER_CREATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message :
                error.message
            })
        }
}

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log("Data from api",data)
    console.log("camer after api call details order")
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    console.log("camer after dispatch call details order");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};