import React from 'react'
import Rating from './Rating'

const Product = (props) =>{
    const{product} = props
    return (
      <React.Fragment>
        <div key={product._id} className="card">
          <a href={`/product/${product._id}`}>
            <img src={product.image} className="medium" alt={product.name} />
          </a>

          <div className="card-body">
            <a href={`/product/${product._id}`}>
              <h2>{product.name}</h2>
            </a>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <div className="price">
              <i className="fas fa-rupee-sign">{product.price}</i>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
}

export default Product
