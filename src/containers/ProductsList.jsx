import React, { useState, useMemo } from "react";

import RangeSlider from "../components/RangeSlider";
import Product from "../components/Product";

const getFilters = f => (p) => {
  const [minPrice, maxPrice] = f.priceRange;
  if (f.query && !p.name.includes(f.query)) return false;
  if (f.onlyAvailable && !p.available) return false;
  if (f.priceRange.length > 0 && (p.price < minPrice || p.price > maxPrice)) return false;
  if (f.quantityAbove && p.quantity < f.quantityAbove) return false;
  return true;
};

const getSort = ({ by, direction }) => (a, b) => {
  const values = direction === "asc" ? [a[by], b[by]] : [b[by], a[by]];
  if (typeof values[0] === "string") return values[0].localeCompare(values[1]);
  return values[0] - values[1]; // boolean or number
};

const round = (limit, number, increment) => (Math[limit](number / increment) * increment);

const getRanges = (list, fields) => {
  const limits = {};
  const keys = Object.keys(fields);
  list.forEach((item) => {
    keys.forEach((k) => {
      if (!limits[k]) limits[k] = [Infinity, 0];
      if (item[k] > limits[k][1]) limits[k][1] = item[k];
      if (item[k] < limits[k][0]) limits[k][0] = item[k];
    });
  });
  keys.forEach((k) => {
    const step = fields[k];
    limits[k] = [
      round("floor", limits[k][0], step),
      round("ceil", limits[k][1], step),
    ];
  });
  return limits;
};

const getInitialFilters = ranges => ({
  query: "",
  onlyAvailable: true,
  priceRange: ranges.price,
  quantityAbove: ranges.quantity[0],
  orderBy: ["name", "asc"],
});

const initialOrder = {
  by: "name",
  direction: "asc",
};

const rangeFields = {
  price: 100,
  quantity: 10,
};

export const ProductsList = ({ products, cart, addToCart }) => {
  const ranges = useMemo(() => getRanges(products, rangeFields), [products]);
  const initialFilters = useMemo(() => getInitialFilters(ranges), []);
  const [filters, setFilters] = useState(initialFilters);
  const [order, setOrder] = useState(initialOrder);
  const visibleProducts = useMemo(() => products
    .slice(0)
    .filter(getFilters(filters))
    .sort(getSort(order)),
  [products, filters, order]);
  return (
    <div>
      <br />
      <div>
        <input
          type="text"
          placeholder="Buscar..."
          value={filters.query}
          onKeyUp={e => setFilters({
            ...filters,
            query: e.target.value.trim(),
          })}
          onChange={e => setFilters({
            ...filters,
            query: e.target.value.trim(),
          })}
        />
      </div>
      <label>
        <input
          type="checkbox"
          checked={filters.onlyAvailable}
          onChange={e => setFilters({
            ...filters,
            onlyAvailable: e.target.checked,
          })}
        />
        <span>Only show available products</span>
      </label>
      <RangeSlider
        value={filters.priceRange}
        min={ranges.price[0]}
        max={ranges.price[1]}
        step={100}
        onChange={value => setFilters({
          ...filters,
          priceRange: value,
        })}
      />
      <div>
        <input
          type="range"
          value={filters.quantityAbove}
          min={ranges.quantity[0]}
          max={ranges.quantity[1]}
          step={10}
          onChange={e => setFilters({
            ...filters,
            quantityAbove: e.target.value,
          })}
        />
        <span>Más de </span>
        <span>{filters.quantityAbove}</span>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="orderBy"
            value="name"
            checked={order.by === "name"}
            onChange={e => setOrder({
              ...order,
              by: e.target.value,
            })}
          />
          <span>Nombre</span>
        </label>
        <label>
          <input
            type="radio"
            name="orderBy"
            value="price"
            checked={order.by === "price"}
            onChange={e => setOrder({
              ...order,
              by: e.target.value,
            })}
          />
          <span>Price</span>
        </label>
        <label>
          <input
            type="radio"
            name="orderBy"
            value="quantity"
            checked={order.by === "quantity"}
            onChange={e => setOrder({
              ...order,
              by: e.target.value,
            })}
          />
          <span>Quantity</span>
        </label>
      </div>
      <br />
      {visibleProducts.map(p => <Product key={p.id} product={p} onClick={e => addToCart(p.id)} />)}
    </div>
  );
};
