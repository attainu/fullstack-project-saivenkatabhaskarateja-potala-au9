import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actionConstants/cartConstants";



export const addToCart = (productId,qty) => {
    console.log("type of qty",typeof(qty))
    return(
    async(dispatch , getState) =>{
    console.log("get state",getState())
    const {data} = await axios(`/api/products/${productId}`);
    dispatch({
        type:CART_ADD_ITEM,
        payload:{
            name : data.name,
            image : data.image,
            price : data.price,
            countInStock:data.countInStock,
            product:data._id,
            qty
            
        }
    })
    
    sessionStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
}
)

} 

export const removeFromCart = (productId) => (dispatch,getState) =>{
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:productId
                })

    sessionStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}