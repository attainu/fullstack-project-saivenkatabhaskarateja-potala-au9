import Rating from '../components/Rating';
import {useSelector,useDispatch} from 'react-redux'
import{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {detailsProduct} from '../redux/actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'


const ProductPage = (props) =>{

    const dispatch = useDispatch()
    const productId = props.match.params.id
    const productDetails = useSelector((state) => state.productDetails);
    const{loading,error,product} = productDetails;
    const[qty,setQty] = useState(1)
    useEffect(() => {
        dispatch(detailsProduct(productId));

    }, [dispatch,productId]);

    const changeHandler = (value) => {
      let newValue = Number(value)
      setQty(newValue);
    };

    const cartHandler = () =>{
      props.history.push(`/cart/${productId}?qty=${qty}`);
    }
    return (
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <>
            <Link to="/">Back to result</Link>
            <div className="row top">
              <div className="col-2">
                <img src={product.image} alt={product.name} className="large" />
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
                    Price :
                    <i className="fas fa-rupee-sign">{product.price}/-</i>
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
                    <>
                    {product.countInStock>0 
                    ? <>
                        <li>
                      <div className="row">
                        <div>Qty</div>
                        <div>
                          <select value={qty} onChange={(e) => changeHandler(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map((key) =>{
                              return <option key={key+1}>{key+1}</option>
                            })}
                          </select>
                        </div>
                      </div>
                    </li>
                    <li>
                      <button onClick={cartHandler} className="primary block">Add to Cart</button>
                    </li>
                      </>
                      : <div></div>
                      }
                    
                    </>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
}

export default ProductPage