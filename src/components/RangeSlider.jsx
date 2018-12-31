import React, { useState, useCallback } from "react";

import Slider from "./Slider";

const RangeSlider = ({ value, min, max, onChange: onChangeProp, ...rest }) => {
  const [range, setRange] = useState([
    value[0] || min,
    value[1] || max,
  ]);

  const onChange = useCallback((e) => {
    const index = e.target.name === "min" ? 0 : 1;
    const newValue = range.slice(0);
    newValue[index] = Number(e.target.value);
    if (newValue[0] > newValue[1]) newValue.reverse();
    setRange(newValue);
    if (onChangeProp) onChangeProp(newValue);
  }, [range, onChangeProp]);

  const props = {
    onChange,
    min,
    max,
    ...rest,
  };

  return (
    <div>
      <Slider {...props} name="min" value={range[0]} />
      <Slider {...props} name="max" value={range[1]} />
      <div>
        {range.join(",")}
      </div>
    </div>
  );
};

export default RangeSlider;
