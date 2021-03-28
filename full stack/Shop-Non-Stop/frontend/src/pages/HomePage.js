import Product from '../components/Product'
import {useSelector,useDispatch} from 'react-redux'
import {useEffect} from 'react'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import {listProducts} from "../redux/actions/productActions";
import React from "react";
import ImageSlider from '../components/ImageSlider'
import { SliderData } from "../utils";


const HomePage = () => {
  

  const productList =  useSelector(state => {
    return state.productList;
  })
  console.log("came to re-render,productslist",productList)
  const { products, loading, error } = productList;
 
  const dispatch = useDispatch()
    

  const display = (products) =>{
     if (loading) {
       return <LoadingBox />;
     } 
     else if (error) {
       return <MessageBox variant="danger">{error}</MessageBox>;
     } 
     else {
       return (
         <>
           <div>
             <ImageSlider slides={SliderData}></ImageSlider>
           </div>
           <div className="row center">
             {products.map((product) => {
               return <Product key={product._id} product={product} />;
             })}
           </div>
         </>
       );
     }
  }
  useEffect(() => {
    dispatch(listProducts({}));

    // console.log("came before set loading",loading)
    // setLoading(true)
    // console.log("came after set loading",loading);
    // axios
    //   .get("/api/products")
    //   .then((response) => {
    //     const { data } = response;
    //     setProducts(data);
    //     setLoading(false)
    //     console.log("Came inside axios")
    //   })
    //   .catch((err) => {
    //     setError(err.message);

    //   });
    //   console.log("came after axios");

    // const fetch = async() =>{
    //   try
    //   {
    //     setLoading(true);
    //     const { data } = await axios.get("/api/products");
    //     setLoading(false);
    //     setProducts(data);}

    //     catch(err){
    //     setError(err.message)
    //     setLoading(false)
    //   }

    // }
    // fetch()
  }, [dispatch]);

    return (
      <div>
        {display(products)}
      </div>
    );
};

export default HomePage;
