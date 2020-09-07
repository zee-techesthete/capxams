import React, { Component } from "react";
import PropTypes from "prop-types";
// import { GET_LINEITEMS_AND_SUMMARY } from '../../Queries/Pages/DSP/LineItems'
import { TableData } from "../../../Config/Constants/data";
import Metric from "../../../Models/metric";

export const CampaignItemsContext = React.createContext();

const DEFAULT_COLUMNS = [
  "name",
  "campaignName",
  "budgetAmount",
  "totalCost",
  "salesUsd",
  "roas",
  "acos",
  "impressions",
  "ctr",
  "dpv",
  "percentOfPurchasesNewToBrand",
  "totalSalesUsd",
  "totalRoas",
  "totalAcos",
  "totalPercentOfPurchasesNewToBrand",
  "labels",
  "deliveryRate",
];

export class CampaignItemsProvider extends Component {
  state = {
    campaignItems: TableData.dspLineItems,
    summaryRow: [],
    channels: [],
    columns: [],

    selectedColumns: DEFAULT_COLUMNS,
    selectedGraphMetrics: [
      new Metric(0, "Total Cost", "totalCost", false, true),
      new Metric(0, "Total Sales", "totalSales", false, true),
    ],
    selectedGraphLabels: [],
    selectedDateType: { id: 0, name: "Daily", value: "day" },
    selectedTrend: null,

    sortOrder: "desc",
    sortField: "totalCost",
    query: TableData.dspLineItemsSummary,

    totalCount: 0,
    offset: 0,
    limit: 10,

    /* store data for saved filters */
    savedFilters: [],

    displayFiltersPanel: false,
    selectedFilterId: null,
    selectedFilterName: "",
    selectedFilterConfig: [],
    filters: [],
    filterEditMode: false,

    selectableIds: [],
    selectedTableRowIds: [],
    isSelectAllChecked: false,
    bulkEditConfig: null,

    statusField: "deliveryStatus",
    disableStatus: true,
    statusKey: {
      CAMPAIGN_NOT_DELIVERING: "warning",
      CREATIVES_NOT_DELIVERING: "warning",
      DELETED: "archived",
      DELIVERING: "enabled",
      ENDED: "archived",
      INITIALIZING: "enabled",
      OUT_OF_BUDGET: "warning",
      PAUSED_BY_USER: "paused",
      READY_TO_DELIVER: "enabled",
    },

    labels: [],

    updateContextState: (field, value) => {
      // console.log(field, value)
      if (this.state[field] !== value) this.setState({ [field]: value });
    },

    updateLimit: (newLimit) => {
      if (this.state.limit !== newLimit) {
        if (newLimit > this.state.offset) {
          this.setState({ offset: 0, limit: newLimit });
        } else {
          this.setState({ limit: newLimit });
        }
      }
    },

    updateSelectedColumns: (newSelectedColumns) => {
      if (this.state.selectedColumns !== newSelectedColumns) {
        this.setState({
          selectedColumns: [...newSelectedColumns, "name"],
          query: TableData.dspLineItemsSummary,
        });
      }
    },

    updateSelectedGraphMetrics: (newSelectedMetrics) => {
      if (this.state.selectedGraphMetrics !== newSelectedMetrics) {
        this.setState({ selectedGraphMetrics: newSelectedMetrics });
      }
    },

    updateSelectedGraphLabels: (newSelectedLabels) => {
      if (this.state.selectedGraphLabels !== newSelectedLabels) {
        this.setState({ selectedGraphLabels: newSelectedLabels });
      }
    },

    updateSelectedTrend: (newTrend) => {
      if (this.state.selectedTrend !== newTrend) {
        this.setState({ selectedTrend: newTrend });
      } else {
        this.setState({ selectedTrend: null });
      }
    },
  };

  render() {
    return (
      <CampaignItemsContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </CampaignItemsContext.Provider>
    );
  }
}

CampaignItemsProvider.propTypes = {
  children: PropTypes.node,
};
