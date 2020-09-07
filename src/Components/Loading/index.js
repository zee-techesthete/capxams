import React from "react";
import PropTypes from "prop-types";

const Loading = ({ containerClass }) => {
  return (
    <div className={containerClass}>
      <img
        alt="loading"
        src="https://cap-site-assets.s3.amazonaws.com/img/Tinuiti_Black_Purple_Gradient_Loop_RGB_Animated.svg"
      />
    </div>
  );
};

Loading.propTypes = {
  containerClass: PropTypes.string,
};

export default Loading;
