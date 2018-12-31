import React from "react";

const Product = ({ product, onClick }) => (
  <div style={{ marginBottom: "1rem" }}>
    <div>{product.name}</div>
    <div>{product.quantity}</div>
    <div>{product.price}</div>
    <div>{product.available ? "Available" : "Not Available"}</div>
    <div>
      <button onClick={onClick}>Añadir</button>
    </div>
  </div>
);

export default Product;
