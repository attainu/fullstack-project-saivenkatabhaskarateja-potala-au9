import Product from '../components/Product'
import axios from 'axios'
import {useState,useEffect} from 'react'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'


const HomePage = () => {

  const [products,setProducts] = useState([])
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(false)


    

  const display = (products) =>{
     if (loading) {
       console.log("came inside loading");
       return <LoadingBox />;
     } 
     else if (error) {
       console.log("came inside error")
       return <MessageBox variant="danger">{error}</MessageBox>;
     } 
     else {
       console.log("came inside render")
       return (
         <div className="row center">
           {products.map((product) => {
             return <Product key={product._id} product={product} />;
           })}
         </div>
       );
     }
  }
  useEffect(() => {
    
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
    
    const fetch = async() =>{
      try
      { 
        setLoading(true);
        const { data } = await axios.get("/api/products");
        setLoading(false);
        setProducts(data);} 
        
        catch(err){
        setError(err.message)
        setLoading(false)  
      } 


      
    }
    fetch()
    
    
  },[])

    return (
      <div>
        {display(products)}
      </div>
    );
};

export default HomePage;
