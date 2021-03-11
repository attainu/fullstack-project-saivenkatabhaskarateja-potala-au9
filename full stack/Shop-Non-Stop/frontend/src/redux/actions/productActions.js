import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL } from '../actionConstants/productConstants'

import axios from 'axios'


export const listProducts = () => async (dispatch) =>{
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    
    axios
      .get("/api/products")
      .then(({data}) => {
          
        dispatch({
          type: PRODUCT_LIST_SUCCESS,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_LIST_FAIL,
          payload: error.message,
        });
      });
    
    
    // try{
    //     const { data } = await axios.get("/api/products");
    //     dispatch({
    //       type: PRODUCT_LIST_SUCCESS,
    //       payload:data
    //     });
    // }
    // catch(error){
    //     dispatch({ 
    //         type: PRODUCT_LIST_FAIL ,
    //         payload:error.message
    //     });
    // }
    
}

export const detailsProduct = (productId) => async(dispatch) =>{

    dispatch({
      type : PRODUCT_DETAILS_REQUEST,
    });

    try{

        const{data} = await axios.get(`/api/products/${productId}`)
        dispatch({
          type: PRODUCT_DETAILS_SUCCESS,
          payload:data
        });

    }
    catch(error){
        console.dir(error)
        dispatch({
          type: PRODUCT_DETAILS_FAIL,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }

}















// import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS ,PRODUCT_LIST_FAIL} from '../actionConstants/productConstants'
// import axios from 'axios'

// export const listProducts = () =>  {
//     return(
//          async (dispatch) => {
//             dispatch({
//                 type:PRODUCT_LIST_REQUEST
//             })
//             try{
//                 const{data} = await axios.get('/api/products')
//                 dispatch({ type: PRODUCT_LIST_SUCCESS });
//             }
//             catch(error){   
//                 dispatch({ type: PRODUCT_LIST_FAIL , payload: error.message});
//             }
            
//         }
//     )
// }