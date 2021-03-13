import axios from "axios";
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../actionConstants/userConstants"

export const signin = (email,password) => async(dispatch,getState)=>{
    dispatch({type: USER_SIGNIN_REQUEST, payload:{email,password}})
    try{
        const{data} = await axios.post('/api/users/signin',{email,password})
        console.log('inside sigin action after reciveing the data',data)
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data})
        sessionStorage.setItem("userInfo",JSON.stringify(data))
    }
    catch(error){ 
        dispatch({
          type: USER_SIGNIN_FAIL,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}
export const register = (name,email,password,mobile) => async(dispatch,getState)=>{
    dispatch({type: USER_REGISTER_REQUEST,payload:{name,email,password,mobile}})
    try{
        const{data} = await axios.post('/api/users/register',{name,email,password,mobile})
        console.log('inside sigin action after reciveing the data',data)
        dispatch({type:USER_REGISTER_SUCCESS,payload:data})
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data})
        sessionStorage.setItem("userInfo",JSON.stringify(data))
    }
    catch(error){ 
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const signout = () => (dispatch) =>{
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("cartItems")
    dispatch({
        type:USER_SIGNOUT
    })
}