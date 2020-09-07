import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../Styles/Components/table.scss";
import TableHeader from "./Table/TableHeader";
import TableBody from "./Table/TableBody";
import Pagination from "./Table/Pagination";
import { TableProvider } from "../Contexts/Components/TableContext";
import Loading from "./Loading";

export default function Table(props) {
  const [tableHeight, updateTableHeight] = useState(0);
  const { showPagination, loading, data, multiselect } = props;

  // Resize the table cells so the sticky cell and the other cells have the same height
  useEffect(() => {
    [...document.querySelectorAll("tr")].forEach((tr) => {
      [...tr.children].map((td) => (td.height = "auto"));
      let maxHeight = Math.max(
        ...[...tr.children].map((td) => td.offsetHeight)
      );

      [...tr.children].map((td) => (td.height = maxHeight));
    });
  });

  const displayPagination = () => {
    if (showPagination !== undefined && showPagination === true) {
      return <Pagination {...props} />;
    }
  };

  const showLoading = () => {
    if (loading) return <Loading containerClass={"loading-panel"} />;
  };

  return (
    <TableProvider {...props}>
      {/*<div className="right-shadow" style={{display: "block", bottom: "0px", left: '199px', height: tableHeight}}></div>*/}
      <div
        className="table-wrapper"
        style={{
          marginLeft:
            data !== undefined && data.length > 0
              ? multiselect
                ? "329px"
                : "300px"
              : "0px",
        }}
      >
        {showLoading()}
        <table
          className="capx-data-table"
          ref={(el) => {
            if (el) updateTableHeight(el.getBoundingClientRect().height);
          }}
        >
          <TableHeader {...props} />
          <TableBody {...props} tableHeight={tableHeight} />
        </table>
      </div>
      {displayPagination()}
    </TableProvider>
  );
}

Table.propTypes = {
  showPagination: PropTypes.bool,
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  multiselect: PropTypes.bool,
};
