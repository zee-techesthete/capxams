import React, { Component } from "react";
import PropTypes from "prop-types";
export const TableContext = React.createContext();

export class TableProvider extends Component {
  state = {
    data: this.props.data,
    columns: this.props.columns,
    actions: this.props.actions,
    editAction: this.props.editAction,
    deleteAction: this.props.deleteAction,
    downloadAction: this.props.downloadAction,

    multiselect: this.props.multiselect,
    selectAllChecked: false,
    selectedRows: [],
    offset: this.props.offset,
    limit: this.props.limit,
    totalCount: this.props.totalCount,

    statusField: this.props.statusField,
    disableStatus: this.props.disableStatus,
    statusKey: this.props.statusKey,

    updateContextState: (field, value) => {
      if (this.state[field] !== value) this.setState({ [field]: value });
    },
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.state.updateContextState("columns", nextProps.columns);
  }

  render() {
    return (
      <TableContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </TableContext.Provider>
    );
  }
}

TableProvider.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  editAction: PropTypes.func,
  deleteAction: PropTypes.func,
  downloadAction: PropTypes.func,
  multiselect: PropTypes.bool,
  offset: PropTypes.number,
  limit: PropTypes.number,
  totalCount: PropTypes.number,
  statusField: PropTypes.string,
  disableStatus: PropTypes.bool,
  statusKey: PropTypes.string,
  children: PropTypes.node,
  actions: PropTypes.arrayOf(PropTypes.string),
};
