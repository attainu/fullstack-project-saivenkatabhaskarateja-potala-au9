import React from 'react'
import Rating from './Rating'
import {Link} from 'react-router-dom'

const Product = (props) =>{
    const{product} = props
    return (
      <React.Fragment>
        <div key={product._id} className="card card-boxshadow">
          <Link to={`/product/${product._id}`}>
            <img src={product.image} className="medium" alt={product.name} />
          </Link>

          <div className="card-body">
            <Link to={`/product/${product._id}`}>
              <h2>{product.name}</h2>
            </Link>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <div className="price">
              <i className="fas fa-rupee-sign">{product.price}/-</i>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
}

export default Product
