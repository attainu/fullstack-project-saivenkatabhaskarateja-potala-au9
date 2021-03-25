import {BrowserRouter,Route,Link} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import SinginPage from './pages/SigninPage'
import CartPage from './pages/CartPage';
import {signout} from './redux/actions/userActions'
import ShippingAddressPage from "./pages/ShippingAddressPage";
import RegisterPage from './pages/RegisterPage'
import "./index.css";
import { useSelector , useDispatch } from 'react-redux';
import PaymentPage from './pages/PaymentPage.';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import orderHistoryPage from './pages/OrderHistoryPage'
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';

const Routing = () =>{
    const cart = useSelector(state => state.cart)
    const{cartItems} = cart
    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo } = userSignin;
    const dispatch = useDispatch()

    const signoutHandler = () => {
        dispatch(signout());
    }
    return (
      <BrowserRouter>
        <div className="grid-container">
          <header className="row">
            <div>
              <Link className="brand" to="index.html">
                Shop-Non-Stop<i className="fas fa-shopping-basket"></i>
              </Link>
            </div>
            <div className="cart">
              <Link to="/cart">
                Cart
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>
              {userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    Welcome {userInfo.name} <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">User Profile</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">Order History</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">Admin {' '} <i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="/productlist">
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link to="/orderlist">
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link to="/userlist">
                        Users
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </header>
          <main>
            <Route path="/" exact component={HomePage} />
            <Route path="/product/:id" exact component={ProductPage} />
            <Route path="/product/:id/edit" exact component={ProductEditPage} />
            <Route path="/cart/:id?" component={CartPage} />
            <Route path="/signin" component={SinginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/shipping" component={ShippingAddressPage} />
            <Route path="/payment" component={PaymentPage} />
            <Route path="/placeorder" component={PlaceOrderPage} />
            <Route path="/order/:id" exact component={OrderPage} />
            <Route path="/orderhistory" component={orderHistoryPage}></Route>
            <PrivateRoute path="/profile" component={ProfilePage} />
            <AdminRoute path="/productlist" component={ProductListPage}/>
            <AdminRoute path="/orderlist" component={OrderListPage}/>
          </main>
          <footer className="row center">
            <i className="fas fa-copyright copyright"></i>All rights reserved
          </footer>
        </div>
      </BrowserRouter>
    );
}

export default Routing