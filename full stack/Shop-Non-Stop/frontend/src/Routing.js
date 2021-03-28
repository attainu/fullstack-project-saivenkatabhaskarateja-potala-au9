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
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import orderHistoryPage from './pages/OrderHistoryPage'
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import SellerRoute from './components/SellerRoute';
import SellerPage from './pages/SellerPage';
import { USER_DETAILS_RESET } from './redux/actionConstants/userConstants';
import SearchBox from './components/SearchBox';
import SearchPage from './pages/SearchPage';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import { useEffect, useState } from 'react';
import { listProductCategories } from './redux/actions/productActions';

const Routing = () =>{
    const cart = useSelector(state => state.cart)
    const{cartItems} = cart
    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo } = userSignin;
     const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const dispatch = useDispatch()

    const signoutHandler = () => {
        dispatch(signout());
        dispatch({ type: USER_DETAILS_RESET });
    }
    const productCategoryList = useSelector(
      (state) => state.productCategoryList
    );
    const {
      loading: loadingCategories,
      error: errorCategories,
      categories,
    } = productCategoryList;
    useEffect(() => {
      dispatch(listProductCategories());
    }, [dispatch]);
    return (
      <BrowserRouter>
        <div className="grid-container">
          <header className="row">
            <div>
              <button
                type="button"
                className="open-sidebar"
                onClick={() => setSidebarIsOpen(true)}
              >
                <i className="fa fa-bars"></i>
              </button>
              <Link className="brand" to="/">
                Shop-Non-Stop<i className="fas fa-shopping-basket"></i>
              </Link>
            </div>
            <div>
              <Route
                render={({ history }) => (
                  <SearchBox history={history}></SearchBox>
                )}
              ></Route>
            </div>
            <div className="cart">
              <Link to="/cart">
                Cart
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>
              {userInfo && userInfo.isSeller && (
                <div className="dropdown">
                  <Link to="#admin">
                    Seller <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/productlist/seller">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist/seller">Orders</Link>
                    </li>
                  </ul>
                </div>
              )}
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
                      <Link to="/" onClick={signoutHandler}>
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
                  <Link to="#admin">
                    Admin <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/productlist">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Orders</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Users</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </header>
          <aside className={sidebarIsOpen ? "open" : ""}>
            <ul className="categories">
              <li>
                <strong>Categories</strong>
                <button
                  onClick={() => setSidebarIsOpen(false)}
                  className="close-sidebar"
                  type="button"
                >
                  <i className="fa fa-close"></i>
                </button>
              </li>
              {loadingCategories ? (
                <LoadingBox></LoadingBox>
              ) : errorCategories ? (
                <MessageBox variant="danger">{errorCategories}</MessageBox>
              ) : (
                categories.map((c) => (
                  <li key={c}>
                    <Link
                      to={`/search/category/${c}`}
                      onClick={() => setSidebarIsOpen(false)}
                    >
                      {c}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </aside>
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
            <Route
              path="/search/name/:name?"
              component={SearchPage}
              exact
            ></Route>
            <Route
              path="/search/category/:category"
              component={SearchPage}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name"
              component={SearchPage}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
              component={SearchPage}
              exact
            ></Route>
            <PrivateRoute path="/profile" component={ProfilePage} />
            <AdminRoute path="/productlist" component={ProductListPage} exact />
            <AdminRoute path="/orderlist" component={OrderListPage} exact />
            <AdminRoute path="/userlist" component={UserListPage} />
            <AdminRoute
              path="/user/:id/edit"
              component={UserEditPage}
            ></AdminRoute>
            <SellerRoute
              path="/productlist/seller"
              component={ProductListPage}
            ></SellerRoute>
            <SellerRoute
              path="/orderlist/seller"
              component={OrderListPage}
            ></SellerRoute>
            <Route path="/seller/:id" component={SellerPage}></Route>
          </main>
          <footer className="row center">
            <i className="fas fa-copyright copyright"></i>All rights reserved
          </footer>
        </div>
      </BrowserRouter>
    );
}

export default Routing