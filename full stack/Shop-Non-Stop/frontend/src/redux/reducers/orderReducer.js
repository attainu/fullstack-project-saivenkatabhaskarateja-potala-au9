import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SCUCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../actionConstants/orderConstants";

export const orderCreateReducer = (state = {},action) =>{
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return {
                loading : true
            }
        
        case ORDER_CREATE_SCUCESS:
            return{
                loading:false,
                success : true,
                order : action.payload
            }    
        
        case ORDER_CREATE_FAIL:
            return{
                loading:false,
                error:action.payload
            }

        case ORDER_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const orderDetailsReducer = (
  state = { loading: true},
  action
) => {
    console.log("Camer here to details reducer")
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS: {
      console.log("came to switch orderDetails reqduer");
      return { loading: false, order: action.payload };
    }
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};