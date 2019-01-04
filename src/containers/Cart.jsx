import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { products } from "../api";
import { addToCart, removeFromCart, setQuantityInCart, checkout } from "../actions";

class Cart extends PureComponent {
  renderContent () {
    const {
      /* eslint-disable no-shadow */
      items,
      removeFromCart,
      setQuantityInCart,
    } = this.props;
    if (items.length === 0) {
      return (
        <div className="col full --center-center">
          <div>
            <p className="txt-light">Aún no agregas nada a tu carrito.</p>
          </div>
        </div>
      );
    }
    const rows = items.map(({ product, quantity }) => (
      <tr key={product.id}>
        <td>
          {product.name}
        </td>
        <td style={{ textAlign: "center" }}>
          <input className="input" type="number" min="1" max={product.quantity} value={quantity} onChange={e => setQuantityInCart(product.id, e.target.value)} />
        </td>
        <td style={{ textAlign: "center" }}>
          $ {(product.price).toLocaleString()}
        </td>
        <td style={{ width: "auto", textAlign: "right" }}>
          <button type="button" className="button --icon" onClick={() => removeFromCart(product.id)}>
            <i className="material-icons">close</i>
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="wrapper">
        <table className="cart-table">
          <tr>
            <th style={{ textAlign: "left" }}>Ítem</th>
            <th>Cant</th>
            <th>Precio</th>
          </tr>
          {rows}
        </table>
      </div>
    );
  }

  render () {
    const { hidden, checkout, items } = this.props;
    const total = items.reduce((a, { product, quantity }) => (a + (product.price * quantity)), 0);
    return (
      <CSSTransition in={!hidden} classNames="cart-anim" timeout={250} mountOnEnter unmountOnExit>
        <Fragment>
          <div className="cart-cont col">
            <div className="wrapper cart-header">
              Tu Carrito
            </div>
            <div className="scrollable">
              {this.renderContent()}
            </div>
            {total !== 0 && (
              <div className="wrapper cart-footer">
                <div className="cart-total">
                  Total $ {total.toLocaleString()}
                </div>
                <div className="flex1 text-right">
                  <button type="button" className="button --normal" onClick={checkout}>Checkout</button>
                </div>
              </div>
            )}
          </div>
        </Fragment>
      </CSSTransition>
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
