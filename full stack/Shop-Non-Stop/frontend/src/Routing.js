import {BrowserRouter,Route,Link} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage';
import "./index.css";
import { useSelector } from 'react-redux';

const Routing = () =>{
    const cart = useSelector(state => state.cart)
    const{cartItems} = cart
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
              <Link to="cart.html">Cart
              {
                cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )
              }
              </Link>
              <Link to="signin.html">Sign In</Link>
            </div>
          </header>
          <main>
            <Route path="/" exact component={HomePage} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/cart/:id?" component={CartPage} />
          </main>
          <footer className="row center">
            <i className="fas fa-copyright copyright"></i>All rights reserved
          </footer>
        </div>
      </BrowserRouter>
    );
}

export default Routing