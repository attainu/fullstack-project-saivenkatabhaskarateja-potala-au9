import React,{useEffect} from 'react'
import{useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import MessageBox from '../components/MessageBox'
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

const CartPage = (props) =>{
    let productId = props.match.params.id;
    console.log("productId in cart page",productId)
    let qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const{cartItems} = cart;


    useEffect(() =>{

        if(productId){
            dispatch(addToCart(productId, qty));
        }

    },[productId,dispatch,qty])

    const removeFromCartHandler = (id) =>{
        //delete action
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () =>{
      props.history.push('/signin?redirect=shipping')
    }

    return (
      <div>
        <div className="row top">
          <div className="col-2">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <MessageBox>
                <Link to="/"> Cart Items are empty.Click to Go Shopping</Link>
              </MessageBox>
            ) : (
              <ul>
                {cartItems.map((item) => {
                  return (
                    <li>
                      <div className="row ">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div className="min-30 ">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          <select
                            value={item.qty}
                            onChange={(e) => {
                              let value = Number(e.target.value);
                              dispatch(addToCart(item.product, value));
                            }}
                          >
                            {[...Array(item.countInStock).keys()].map((key) => {
                              return <option key={key + 1}>{key + 1}</option>;
                            })}
                          </select>
                        </div>
                        <div>
                          <i className="fa fa-rupee-sign">{item.price} /-</i>
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                  <h2>
                    Items {cartItems.reduce((a, c) => a + c.qty, 0)}  :{" "}
                    SubTotal:
                    <i
                      className="fa fa-rupee-sign"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    <span style={{ fontSize: "2rem" }}>
                     {cartItems.reduce((a, c) => a + c.qty * c.price, 0)}/-
                    </span>
                  </h2>
                </li>
                <li>
                  {cartItems.length === 0 ? (
                    <div>
                      <h1>Add Items to checkout</h1>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={checkoutHandler}
                      className="primary block"
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
}

export default CartPage