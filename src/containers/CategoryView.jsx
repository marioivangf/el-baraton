import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { categories, products } from "../api";
import { ProductsList } from "./ProductsList";
import { SubCategoriesList } from "./SubCategoriesList";
import { addToCart, checkout } from "../actions";

const findCategory = (ids, store, cb) => {
  const nextIds = ids.slice(1);
  const category = store.find(c => c.id === ids[0]);
  if (cb) cb(category);

  // Didn't found
  if (!category) return null;
  // We reached end of route
  if (nextIds.length <= 0) return category;
  // More sublevels to go
  if (category.sublevels) return findCategory(nextIds, category.sublevels, cb);
  // No more sublevels
  return category;
};

const getProducts = catId => products.filter(p => p.sublevel_id === catId);

class CategoryView extends PureComponent {
  render () {
    const { match: { params: { ids } }, ...rest } = this.props;
    const idsArr = ids.split("/").map(Number);
    const breadcrumb = [];
    const cat = findCategory(idsArr, categories, c => breadcrumb.push(c));

    if (!cat) return <div>Not found</div>;

    const content = (cat.sublevels) // If category has sublevels...
      ? <SubCategoriesList ids={idsArr} categories={cat.sublevels} {...rest} /> // render them...
      : <ProductsList ids={idsArr} products={getProducts(cat.id)} {...rest} />; // else products
    return (
      <div>
        <h1>{cat.name}</h1>
        {(breadcrumb.length > 0) && (
          <div>
            {breadcrumb.map((c, i) => <span key={i}>{c.name}</span>) /* eslint-disable-line */}
          </div>
        )}
        <div>
          {content}
        </div>
      </div>
    );
  }
}

export default connect(({ cart }) => ({ cart }), { addToCart, checkout })(CategoryView);
