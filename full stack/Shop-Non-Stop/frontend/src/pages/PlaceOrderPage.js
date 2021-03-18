import CheckoutSteps from '../components/CheckoutSteps'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { createOrder } from '../redux/actions/orderActions';
import { useEffect } from 'react';
import { ORDER_CREATE_RESET } from '../redux/actionConstants/orderConstants';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'


const PlaceOrderPage = (props) =>{

    const cart = useSelector((state) => state.cart);
    const orderCreate = useSelector((state) => state.orderCreate)
    const{loading,error,success,order} = orderCreate

    console.log("cart is ",cart)
    if (!cart.paymentMethod){
        props.history.push("/payment")
    }

    const dispatch = useDispatch()
    const toPrice = (num) => {
       return Number(num.toFixed(2));
    }
    
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a,c) => {
       return a + c.qty * c.price;},0))

    cart.shippingPrice = cart.itemsPrice > 1000 ? toPrice(0) : toPrice(150)
    cart.taxPrice = toPrice(0.15* cart.itemsPrice)
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

    const placeOrderHandler = () =>{
      console.log({ ...cart, orderItems: cart.cartItems });
        dispatch(createOrder({...cart,orderItems:cart.cartItems}))
    }

    useEffect(()=>{
      if(success){
        props.history.push(`/order/${order._id}`)
        dispatch({type:ORDER_CREATE_RESET})
      }
    },[dispatch, order, props.history, success])
      return (
        <div>
          <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
          <div className="row top">
            <div className="col-2">
              <ul>
                <li>
                  <div className="card card-body">
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name:</strong>
                      {cart.shippingAddress.fullName}
                      <br />
                      <strong> Address:</strong>
                      {cart.shippingAddress.address},{cart.shippingAddress.city}
                      ,{cart.shippingAddress.postalCode},
                      {cart.shippingAddress.country}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Payment</h2>
                    <p>
                      <strong>Method:</strong>
                      {cart.paymentMethod}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Order Items</h2>
                    <ul>
                      {cart.cartItems.map((item) => {
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
                                {item.qty} x{" "}
                                <i className="fa fa-rupee-sign">{item.price}</i>{" "}
                                {"="}{" "}
                                <i className="fa fa-rupee-sign">
                                  {item.qty * item.price} /-{" "}
                                </i>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <h2>Order Summary</h2>
                  </li>
                  <li>
                    <div className="row">
                      <div>Items</div>
                      <div>
                        <div className="fa fa-rupee-sign">
                          {cart.itemsPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Shipping</div>
                      <div>
                        <div className="fa fa-rupee-sign">
                          {cart.shippingPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Tax</div>
                      <div>
                        <div className="fa fa-rupee-sign">
                          {cart.taxPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>
                        <strong>Order Total</strong>
                      </div>
                      <div>
                        <div className="fa fa-rupee-sign">
                          <strong>{cart.totalPrice.toFixed(2)}</strong>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    {cart.cartItems.length === 0 ? (
                      <h1>No items to PlaceOrder</h1>
                    ) : (
                      <button
                        className="button block"
                        onClick={placeOrderHandler}
                        disabled={cart.cartItems.length === 0}
                      >
                        Place Order
                      </button>
                    )}
                  </li>
                  {
                    loading && <LoadingBox></LoadingBox>
                  }
                  {
                    error && <MessageBox variant="danger">{error}</MessageBox>
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
}

export default PlaceOrderPage