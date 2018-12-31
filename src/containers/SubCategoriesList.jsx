import React from "react";
import { Link } from "react-router-dom";

const categoryLink = (baseIds, id) => `/categories/${baseIds.join("/")}/${id}`;

export const SubCategoriesList = ({ categories, ids }) => (
  <div>
    {categories.map(cat => (
      <div key={cat.id}>
        <Link to={categoryLink(ids, cat.id)}>{cat.name}</Link>
      </div>
    ))}
  </div>
);
