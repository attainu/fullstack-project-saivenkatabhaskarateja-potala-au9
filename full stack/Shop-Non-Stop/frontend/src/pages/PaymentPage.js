import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps"
import {savePaymentMethod} from '../redux/actions/cartActions'

const PaymentPage = (props) =>{

    const cart = useSelector(state => state.cart)
    console.log("cart in Shipping address",cart)
    const{shippingAddress} = cart
    if(!shippingAddress.address){
        props.history.push("/shipping")
    }
    const [paymentMethod, setPaymentMethod] = useState("PayPal")
    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeorder')
    }

    return (
      <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <form action="" className="form" onSubmit={submitHandler}>
          <div>
            <h1>Payment Method</h1>
          </div>
          <div>
            <div>
              <input
                type="radio"
                id="PayPal"
                value="PayPal"
                name="paymentMethod"
                checked
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="PayPal">PayPal</label>
            </div>
          </div>
          <div>
            <div>
              <input
                type="radio"
                id="Stripe"
                value="Stripe"
                name="paymentMethod"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="Stripe">Stripe</label>
            </div>
          </div>
          <div>
            <button className="button block" type="submit">
              Continue
            </button>
          </div>
        </form>
      </div>
    );   
}

export default PaymentPage