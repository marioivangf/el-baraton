import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { products } from "../api";
import { addToCart, removeFromCart, setQuantityInCart, checkout } from "../actions";

class Cart extends PureComponent {
  render () {
    return (
      <div>
        <h2>Carrito</h2>
        {this.props.items.map(({ product, quantity }) => (
          <div key={product.id}>
            <div>
              {product.name}
            </div>
            <div>
              <input type="number" min="1" max={product.quantity} value={quantity} onChange={e => this.props.setQuantityInCart(product.id, e.target.value)} />
            </div>
            <div>
              <button type="button" onClick={e => this.props.removeFromCart(product.id)}>Quitar</button>
            </div>
          </div>
        ))}
        <div>
          <button type="button" onClick={e => this.props.checkout()}>CHECKOUT</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cart: { ids, quantityById } }) => {
  const items = ids.map(id => ({
    quantity: quantityById[id],
    product: products.find(p => p.id === id),
  }));
  return { items };
};
export default connect(mapStateToProps, { addToCart, removeFromCart, setQuantityInCart, checkout })(Cart);
