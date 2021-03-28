import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { deliverOrder, detailsOrder, payOrder } from '../redux/actions/orderActions';
import {useEffect,useState} from 'react'
import {PayPalButton} from 'react-paypal-button-v2'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../redux/actionConstants/orderConstants';


const OrderPage = (props) =>{

    const orderId = props.match.params.id
    const orderDetails = useSelector((state) => state.orderDetails);
    const{loading,error,order} = orderDetails
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin;


    const orderPay = useSelector((state) => state.orderPay);
    const {loading : loadingPay,error: errorPay, success: successPay} = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const {
      loading: loadingDeliver,
      error: errorDeliver,
      success: successDeliver,
    } = orderDeliver;

    
    const dispatch = useDispatch()  
    const[sdkReady,setSdkReady] = useState(false)

    const deliverHandler = () =>{
        dispatch(deliverOrder(order._id))
    }
    
    useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || successDeliver ||(order._id !== orderId)) {
      dispatch({type : ORDER_PAY_RESET})
      dispatch({type : ORDER_DELIVER_RESET})
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successDeliver, successPay])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order,paymentResult))
  };

      return loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <h1>Order {order._id}</h1>
          <div className="row top">
            <div className="col-2">
              <ul>
                <li>
                  <div className="card card-body">
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name:</strong>
                      {order.shippingAddress.fullName}
                      <br />
                      <strong> Address:</strong>
                      {order.shippingAddress.address},
                      {order.shippingAddress.city},
                      {order.shippingAddress.postalCode},
                      {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                      <MessageBox variant="success">
                        Delivered at {order.deliveredAt}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">Not delivered</MessageBox>
                    )}
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Payment</h2>
                    <p>
                      <strong>Method:</strong>
                      {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <MessageBox variant="success">
                        paid at {order.paidAt}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">Not Paid</MessageBox>
                    )}
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Order Items</h2>
                    <ul>
                      {order.orderItems.map((item) => {
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
                          {order.itemsPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Shipping</div>
                      <div>
                        <div className="fa fa-rupee-sign">
                          {order.shippingPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Tax</div>
                      <div>
                        <div className="fa fa-rupee-sign">
                          {order.taxPrice.toFixed(2)}
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
                          <strong>{order.totalPrice.toFixed(2)}</strong>
                        </div>
                      </div>
                    </div>
                  </li>
                  {!order.isPaid && (
                    <li>
                      <>
                        {errorPay && (
                          <MessageBox variant="danger">{errorPay}</MessageBox>
                        )}
                        {loadingPay && <LoadingBox></LoadingBox>}
                        {!sdkReady ? (
                          <LoadingBox></LoadingBox>
                        ) : (
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          ></PayPalButton>
                        )}
                      </>
                    </li>
                  )}
                  {(userInfo.isAdmin||userInfo.isSeller) && order.isPaid && !order.isDelivered && (
                    <li>
                      {loadingDeliver && <LoadingBox></LoadingBox>}
                      {errorDeliver && <MessageBox variant="danger">{errorDeliver}</MessageBox>}
                      <button
                        className="block"
                        type="button"
                        onClick={deliverHandler}
                      >
                        Deliver Order
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
}

export default OrderPage;