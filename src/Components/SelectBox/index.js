import React from "react";
import PropTypes from "prop-types";

/**
 * Display a Select Box
 *
 * @param {object} props
 */
export default function SelectBox({
  style,
  isOpen,
  isActive,
  isHidden,
  testId,
  children,
}) {
  return (
    <div
      className={`selectbox selectbox--${style} ${isOpen ? "open" : ""} ${
        isActive ? "active" : ""
      }   ${isHidden ? "hidden" : ""}`}
      data-testid={testId !== undefined ? testId : "default-selectbox"}
    >
      {children}
    </div>
  );
}

SelectBox.propTypes = {
  style: PropTypes.string,
  isOpen: PropTypes.bool,
  isActive: PropTypes.bool,
  isHidden: PropTypes.bool,
  testId: PropTypes.string,
  children: PropTypes.node,
};
