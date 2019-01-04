import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import { CSSTransition } from "react-transition-group";

const Category = ({ id, name, sublevels, ids }) => {
  const [collapsed, collapse] = useState(true);
  const events = useMemo(() => {
    if (matchMedia("(pointer:fine)").matches) { // Has cursor
      return {
        onMouseEnter: () => collapse(false),
        onMouseLeave: () => collapse(true),
      };
    }
    return {
      onClick: (e) => {
        collapse(!collapsed);
        e.stopPropagation();
      },
    };
  }, [collapsed]);
  return (
    <nav className="category" {...events}>
      {sublevels
        ? <div className="category-title">{name}</div>
        : <Link className="category-title" to={`/cat/${ids.join("/")}/${id}`}>{name}</Link>
      }
      {(sublevels && !collapsed) && (
        <nav className="subcategories">
          {sublevels.map(cat => <Category ids={[...ids, id]} {...cat} key={cat.id} />)}
        </nav>
      )}
    </nav>
  );
};

Category.defaultProps = {
  ids: [],
};

export default Category;
