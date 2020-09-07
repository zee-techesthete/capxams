import React, { useContext, useState, useEffect } from "react";

import { COLUMNS, EMPTY_TABLE_MESSAGE } from "../../Config/Constants/columns";
import { CampaignItemsContext } from "../../Contexts/Components/CampaignItemsContext";
import Table from "../../Components/Table";

const CampaignItems = () => {
  const campaignItemsContext = useContext(CampaignItemsContext);
  const [campaignItems, setCampaignItems] = useState([]);
  const [summaryRow, updateSummaryRow] = useState([]);
  // const [selectedFilter, updateSelectedFilter] = useState(
  //   campaignItemsContext.selectedFilterConfig
  // );
  // const [saveFilterName, updateSaveFilterName] = useState(
  //   campaignItemsContext.selectedFilterName
  // );

  useEffect(() => {
    console.log("*propsEffect: ", campaignItemsContext);
    setCampaignItems(campaignItemsContext.campaignItems);
  }, [campaignItems]);

  // useEffect(() => {
  //   updateSelectedFilter(campaignItemsContext.selectedFilterConfig);
  // }, [campaignItemsContext.selectedFilterConfig]);

  // useEffect(() => {
  //   updateSaveFilterName(campaignItemsContext.selectedFilterName);
  // }, [campaignItemsContext.selectedFilterName]);
  console.log("*propsCampaignItems", campaignItems);
  return (
    <div className="capx-primary-table shadow-panel">
      <Table
        columns={COLUMNS.filter((column) =>
          campaignItemsContext.selectedColumns.includes(column.field)
        )}
        data={campaignItems.map((a) => ({
          ...a,
          entity: a.entity,
          name: a.name,
        }))}
        disableStatus={campaignItemsContext.disableStatus}
        emptyTableMessage={EMPTY_TABLE_MESSAGE}
        limit={campaignItemsContext.limit}
        // loading={loading}
        multiselect={true}
        offset={campaignItemsContext.offset}
        onCheckboxChange={(id) =>
          campaignItemsContext.updateContextState("selectedTableRowIds", id)
        }
        selectableIds={campaignItemsContext.selectableIds}
        selectableRows={campaignItemsContext.campaignItems.filter(
          (row) => row.selectable === true
        )}
        selectAllChecked={campaignItemsContext.isSelectAllChecked}
        selectedTableRowIds={campaignItemsContext.selectedTableRowIds}
        showPagination={true}
        sortField={campaignItemsContext.sortField}
        sortOrder={campaignItemsContext.sortOrder}
        statusField={campaignItemsContext.statusField}
        statusKey={campaignItemsContext.statusKey}
        summaryRow={summaryRow}
        totalCount={campaignItemsContext.totalCount}
        type={"lineItem"}
        updateLimit={(limit) => {
          campaignItemsContext.updateLimit(limit);
          campaignItemsContext.updateContextState("selectedTableRowIds", []);
          campaignItemsContext.updateContextState("isSelectAllChecked", false);
        }}
        updateOffset={(offset) => {
          campaignItemsContext.updateContextState("offset", offset);
          campaignItemsContext.updateContextState("selectedTableRowIds", []);
          campaignItemsContext.updateContextState("isSelectAllChecked", false);
        }}
        updateSelectAllCheckedContext={(state) =>
          campaignItemsContext.updateContextState("isSelectAllChecked", state)
        }
        updateSortField={(field) =>
          campaignItemsContext.updateContextState("sortField", field)
        } //for multiselect
        updateSortOrder={(order) =>
          campaignItemsContext.updateContextState("sortOrder", order)
        }
      />
    </div>
  );
};

export default CampaignItems;
