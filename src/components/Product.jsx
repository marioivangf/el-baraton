import React from "react";

const productClass = available => available ? "product" : "product --unavailable"; // eslint-disable-line

const Product = ({ product, onClick }) => (
  <div className={productClass(product.available)}>
    <div className="product-title">{product.name}</div>
    <div className="product-quantity">{product.quantity} disponibles</div>
    <div className="row --center --wrap">
      <div className="flex1">
        <div className="product-price text-nowrap">$ {product.price.toLocaleString()}</div>
      </div>
      <div>
        <button className="button --normal" type="button" onClick={onClick}>
          Agregar
        </button>
      </div>
    </div>
  </div>
);

export default Product;
