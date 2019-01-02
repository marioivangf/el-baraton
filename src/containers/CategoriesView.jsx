import React from "react";

import { categories } from "../api";
import Category from "./Category";

const CategoriesView = () => (
  <div className="categories-cont">
    <nav className="categories">
      {categories.map(cat => <Category key={cat.id} {...cat} />)}
    </nav>
  </div>
);

export default CategoriesView;
