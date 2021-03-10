import Rating from '../components/Rating';
import axios from 'axios'
import{useEffect} from 'react'
import {Link} from 'react-router-dom'
let data = []


const ProductPage = (props) =>{
    useEffect(() => {
      console.log("came here")
      axios
        .get("/api/products")
        .then((response) => {
          data = response;
          console.log("came here",data)
        })
        .catch((err) => console.log(err));
    }, []);
    const product = data.products.find((x) => {
      return(
        x._id === props.match.params.id
      )
    })
    if(!product){
      return <div className="">product does not exist</div>;
    }
    return (
      <>
        <Link to="/">Back to result</Link>
        <div className="row top">
          <div className="col-2">
            <img src={product.image} alt={product.name} className="large"/>
          </div>
          <div className="col-1">
            <ul>
              <li>
                <h1>{product.name}</h1>
              </li>
              <li>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </li>
              <li>
                Price :<i className="fas fa-rupee-sign">{product.price}/-</i>
              </li>
              <li>
                Description:
                <p>{product.description}</p>
              </li>
            </ul>
          </div>
          <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                  <div className="row">
                    <div>Price</div>
                    <div className="price">
                      <i className="fas fa-rupee-sign">{product.price}/-</i>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Status</div>
                    <div>
                      {product.countInStock > 0 ? (
                        <span className="success">In Stock</span>
                      ) : (
                        <span className="danger">Unavailable</span>
                      )}
                    </div>
                  </div>
                </li>
                <li>
                  <button className="primary block">Add to Cart</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
}

export default ProductPage