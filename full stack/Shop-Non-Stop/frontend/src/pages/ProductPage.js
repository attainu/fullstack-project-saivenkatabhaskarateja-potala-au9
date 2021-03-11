import Rating from '../components/Rating';
import {useSelector,useDispatch} from 'react-redux'
import{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {detailsProduct} from '../redux/actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'


const ProductPage = (props) =>{

    const dispatch = useDispatch()
    const productId = props.match.params.id
    const productDetails = useSelector((state) => state.productDetails);
    const{loading,error,product} = productDetails;
    useEffect(() => {
        dispatch(detailsProduct(productId));

    }, [dispatch,productId]);



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
                    <li>
                      <button className="primary block">Add to Cart</button>
                    </li>
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