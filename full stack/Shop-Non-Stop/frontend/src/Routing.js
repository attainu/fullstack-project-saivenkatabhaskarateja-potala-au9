import {BrowserRouter,Route,Link} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import SinginPage from './pages/SigninPage'
import CartPage from './pages/CartPage';
import {signout} from './redux/actions/userActions'
import RegisterPage from './pages/RegisterPage'
import "./index.css";
import { useSelector , useDispatch } from 'react-redux';

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
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
            </div>
          </header>
          <main>
            <Route path="/" exact component={HomePage} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/cart/:id?" component={CartPage} />
            <Route path="/signin" component={SinginPage} />
            <Route path="/register" component={RegisterPage} />
          </main>
          <footer className="row center">
            <i className="fas fa-copyright copyright"></i>All rights reserved
          </footer>
        </div>
      </BrowserRouter>
    );
}

export default Routing