import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../actionConstants/productConstants";


export const productListReducer = (state = {products: [],loading:true,error:false},action) =>{
    console.log("came to producListReducer");
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true}
        case PRODUCT_LIST_SUCCESS:
            return {loading:false,products : action.payload,error:false}    
        case PRODUCT_LIST_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const productDetailsReducer = (state={product:{},loading:true},action) =>{

    console.log("came to producDetailsReducer");
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST :
            return { loading: true };
        case PRODUCT_DETAILS_SUCCESS :
            return {loading:false,product:action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }

}
