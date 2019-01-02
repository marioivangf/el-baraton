import React from "react";

import { categories } from "../api";
import Category from "./Category";

const CategoriesView = () => (
  <div className="view-wrapper categories-cont">
    <div className="wrapper--pad">
      <nav className="categories">
        {categories.map(cat => <Category key={cat.id} {...cat} />)}
      </nav>
    </div>
  </div>
);

export default CategoriesView;
