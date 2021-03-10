import {BrowserRouter,Route} from 'react-router-dom'
import data from './data'
import Product from './components/Product'
import './index.css'

const Routing = () =>{

    return (
      <BrowserRouter>
        <div className="grid-container">
          <header className="row">
            <div>
              <a className="brand" href="index.html">
                Shop-N-Stop<i className="fas fa-shopping-basket"></i>
              </a>
            </div>
            <div className="cart">
              <a href="cart.html">Cart</a>
              <a href="signin.html">Sign In</a>
            </div>
          </header>
          <main>
            <div className="row center">
              {data.products.map((product) => {
                return (
                 <Product key={product._id} product={product}/>
                );
              })}
            </div>
          </main>
          <footer className="row center">
            <i className="fas fa-copyright copyright"></i>All rights reserved
          </footer>
        </div>
      </BrowserRouter>
    );
}

export default Routing