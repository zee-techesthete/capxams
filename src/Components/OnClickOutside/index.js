import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function OnClickOutside({ children, config }) {
  const node = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleClick = (e) => {
    if (!node.current.contains(e.target)) config();
  };

  return <span ref={node}>{children}</span>;
}

OnClickOutside.propTypes = {
  children: PropTypes.node,
  config: PropTypes.func,
};
