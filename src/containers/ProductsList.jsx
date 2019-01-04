import React, { useState, useMemo } from "react";

import RangeSlider from "../components/RangeSlider";
import Slider from "../components/Slider";
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

export const ProductsList = ({ products, addToCart }) => {
  const ranges = useMemo(() => getRanges(products, rangeFields), [products]);
  const initialFilters = useMemo(() => getInitialFilters(ranges), []);
  const [filtersVisible, setFiltersVisibility] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [order, setOrder] = useState(initialOrder);
  let filterButtonClasses = "button --icon";
  if (filtersVisible) filterButtonClasses += " --active";
  const visibleProducts = useMemo(() => products
    .slice(0)
    .filter(getFilters(filters))
    .sort(getSort(order)),
  [products, filters, order]);
  const setFilter = newFilters => setFilters({ ...filters, ...newFilters });
  return (
    <div>
      <div className="cart-filters">
        <div className="cart-filters-left">
          <input
            type="text"
            placeholder="Buscar..."
            className="input --expand"
            value={filters.query}
            onKeyUp={e => setFilter({ query: e.target.value.trim() })}
            onChange={e => setFilter({ query: e.target.value.trim() })}
          />
        </div>
        <div>
          <button type="button" className={filterButtonClasses} onClick={() => setFiltersVisibility(!filtersVisible)}>
            <i className="material-icons">filter_list</i>
          </button>
        </div>
      </div>
      {filtersVisible && (
        <div className="cart-filters-extra">
          <label className="form-row">
            <span className="form-label">Precio entre</span>
            <RangeSlider
              value={filters.priceRange}
              min={ranges.price[0]}
              max={ranges.price[1]}
              step={100}
              onChange={value => setFilter({ priceRange: value })}
            />
            <div className="row">
              <div className="flex1">
                <span className="badge-span">$ {filters.priceRange[0].toLocaleString()}</span>
              </div>
              <div>
                <span className="badge-span">$ {filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </label>
          <label className="form-row">
            <span className="form-label">Cantidad mayor a</span>
            <Slider
              value={filters.quantityAbove}
              min={ranges.quantity[0]}
              max={ranges.quantity[1]}
              step={10}
              onChange={e => setFilter({ quantityAbove: e.target.value })}
            />
            <span className="badge-span">{filters.quantityAbove}</span>
          </label>
          <div className="form-row">
            <div className="form-label">Ordenar por</div>
            <label className="hidden-box">
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
              <i className="material-icons">
                {order.by === "name" ? "radio_button_checked" : "radio_button_unchecked"}
              </i>
              <span>Nombre</span>
            </label>
            <label className="hidden-box">
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
              <i className="material-icons">
                {order.by === "price" ? "radio_button_checked" : "radio_button_unchecked"}
              </i>
              <span>Price</span>
            </label>
            <label className="hidden-box">
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
              <i className="material-icons">
                {order.by === "quantity" ? "radio_button_checked" : "radio_button_unchecked"}
              </i>
              <span>Quantity</span>
            </label>
          </div>
          <label className="form-row hidden-box">
            <input
              type="checkbox"
              checked={filters.onlyAvailable}
              onChange={e => setFilter({ onlyAvailable: e.target.checked })}
            />
            <i className="material-icons">
              {filters.onlyAvailable ? "check_box" : "check_box_outline_blank"}
            </i>
            <span>Mostar sólo productos disponibles</span>
          </label>
        </div>
      )}
      {visibleProducts.length === 0 && (
        <div className="col full --center-center">
          <div>
            <p className="txt-light">No se encontraron productos, intenta ajustar los filtros.</p>
          </div>
        </div>
      )}
      {visibleProducts.length > 0 && (
        <div className="products-cont">
          {visibleProducts.map(p => (
            <Product
              key={p.id}
              product={p}
              onClick={() => addToCart(p.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
