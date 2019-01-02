import React from "react";
import { Link } from "react-router-dom";

const Category = ({ id, name, sublevels, ids }) => (
  <nav className="category">
    {sublevels
      ? <div className="category-title">{name}</div>
      : <Link className="category-title" to={`/cat/${ids.join("/")}/${id}`}>{name}</Link>
    }
    {sublevels && (
      <nav className="subcategories">
        {sublevels.map(cat => <Category ids={[...ids, id]} {...cat} key={cat.id} />)}
      </nav>
    )}
  </nav>
);

Category.defaultProps = {
  ids: [],
};

export default Category;
