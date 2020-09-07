import React, { Component } from "react";
import PropTypes from "prop-types";

export const GlobalContext = React.createContext();

export class GlobalProvider extends Component {
  state = {
    accountId: null,
    channelId: null,
    userId: null,
    daterange: {
      startDate: this.props.startDate,
      endDate: this.props.endDate,
    },
    daterangeCompare: {
      startDate: this.props.daterangeCompare.startDate,
      endDate: this.props.daterangeCompare.endDate,
    },
    phpFilters: null,
    phpFilterId: null,

    /* Used to automatically open the flyout when a new report is created */
    flyoutNewReportId: null,

    updateContextState: (field, value) => {
      if (this.state[field] !== value) this.setState({ [field]: value });
    },

    updateAccountIdAndChannelId: (accountId, channelId) => {
      if (
        accountId !== this.state.accountId &&
        channelId !== this.state.channelId
      ) {
        this.setState({ accountId: accountId, channelId: channelId });
      }
    },

    updateDaterange: (startDate, endDate) => {
      if (
        this.state.daterange.startDate !== startDate ||
        this.state.daterange.endDate !== endDate
      ) {
        this.setState({
          daterange: { startDate: startDate, endDate: endDate },
        });
      }
    },

    updateDaterangeCompare: (startDate, endDate) => {
      if (
        this.state.daterangeCompare.startDate !== startDate ||
        this.state.daterangeCompare.endDate !== endDate
      ) {
        this.setState({
          daterangeCompare: { startDate: startDate, endDate: endDate },
        });
      }
    },

    updateFlyoutNewReportId: (id) => this.setState({ flyoutNewReportId: id }),
  };

  render() {
    return (
      <GlobalContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

GlobalProvider.propTypes = {
  daterangeCompare: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  children: PropTypes.node,
};

GlobalProvider.defaultProps = {
  startDate: null,
  endDate: null,
  daterangeCompare: {
    startDate: null,
    endDate: null,
  },
};
