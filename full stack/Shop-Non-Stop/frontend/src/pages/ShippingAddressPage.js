import CheckoutSteps from "../components/CheckoutSteps"
import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react'
import { saveShippingAddress } from "../redux/actions/cartActions"

const ShippingAddressPage = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  console.log("shippingAddress", shippingAddress);
  if (!userInfo) {
    props.history.push("/signin");
  }

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    //save shipping address action

    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );

    props.history.push("/payment");
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full Name"
            onChange={(e) => setFullName(e.target.value)}
            required
            value={fullName}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
            required
            value={address}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter City"
            onChange={(e) => setCity(e.target.value)}
            required
            value={city}
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter Postal Code"
            onChange={(e) => setPostalCode(e.target.value)}
            required
            value={postalCode}
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter Country"
            onChange={(e) => setCountry(e.target.value)}
            required
            value={country}
          />
        </div>
        <div>
          <label htmlFor=""></label>
          <button className="button block" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressPage;