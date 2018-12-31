import React from "react";

const Slider = props => <input type="range" {...props} />;

Slider.defaultProps = {
  step: 1,
  min: 0,
  max: 10,
};

export default Slider;
