import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { products } from "../api";
import { addToCart, removeFromCart, setQuantityInCart, checkout } from "../actions";

class Cart extends PureComponent {
  constructor (props) {
    super(props);
    this.state = { collapsed: true };
    this.onClick = this.onClick.bind(this);
  }

  onClick () {
    document.body.classList.toggle("--cart-opened");
    this.setState({
      collapsed: !document.body.classList.contains("--cart-opened"),
    });
  }

  renderContent () {
    const {
      /* eslint-disable no-shadow */
      items,
      removeFromCart,
      checkout,
      setQuantityInCart,
    } = this.props;
    return (
      <div className="wrapper cart-cont">
        <h2>Carrito</h2>
        {items.map(({ product, quantity }) => (
          <div key={product.id}>
            <div>
              {product.name}
            </div>
            <div>
              <input type="number" min="1" max={product.quantity} value={quantity} onChange={e => setQuantityInCart(product.id, e.target.value)} />
            </div>
            <div>
              <button type="button" onClick={() => removeFromCart(product.id)}>Quitar</button>
            </div>
          </div>
        ))}
        <div>
          <button type="button" onClick={checkout}>CHECKOUT</button>
        </div>
      </div>
    );
  }

  render () {
    const { items } = this.props;
    const { collapsed } = this.state;
    const totalItems = items.reduce((a, b) => a + b.quantity, 0);
    let buttonClasses = "button --icon";
    if (!collapsed) buttonClasses += " --active";
    return (
      <div>
        <button type="button" className={buttonClasses} onClick={this.onClick}>
          {(totalItems !== 0) && <span>({ totalItems })</span>}
          <i className="material-icons">shopping_cart</i>
        </button>
        {!collapsed && this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ cart }) => {
  const items = Object.keys(cart).map(id => ({
    quantity: cart[id],
    product: products.find(p => p.id === id),
  }));
  return { items };
};
export default connect(mapStateToProps, { addToCart, removeFromCart, setQuantityInCart, checkout })(Cart);
