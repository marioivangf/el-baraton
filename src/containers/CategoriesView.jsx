import React from "react";
import { Link } from "react-router-dom";

import { categories } from "../api";

const CategoriesView = () => (
  <div>
    {categories.map(cat => (
      <div key={cat.id}>
        <Link to={`/categories/${cat.id}`}>{cat.name}</Link>
      </div>
    ))}
  </div>
);

export default CategoriesView;
