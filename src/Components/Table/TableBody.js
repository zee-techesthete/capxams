import React from 'react'
import TableBodyRow from './TableBody/TableBodyRow'
import SummaryRow from './TableBody/SummaryRow'

export default function TableBody(...props) {
  /**
   * summaryRow
   * Function to return summary-row class
   * @return {string}
   */
  const summaryRow = () => {
    if (props[0]?.hasOwnProperty('data') && props[0].data !== null && props[0].data.length > 0 && props[0].summaryRow !== undefined) {
      return <SummaryRow columns={props[0].columns} summaryRow={props[0].summaryRow} />
    }
  }

  /**
   * tableBodyContent
   * Function return "empty" message if no data is sent from API
   * @return {object}
   */
  const tableBodyContent = () => {
    if (!props[0]?.hasOwnProperty('data') || props[0].data === null || props[0].data.length === 0) {
      return (
        <tr>
          <td colSpan='100%'>{props[0].emptyTableMessage}</td>
        </tr>
      )
    } else {
      return props[0].data.map((row, index) => (
        <TableBodyRow
          index={index}
          key={index}
          onCheckboxChange={props[0].onCheckboxChange}
          row={row}
          selectAllChecked={props[0].selectAllChecked}
          selectedTableRowIds={props[0].selectedTableRowIds}
          summaryRow={props[0].summaryRow}
          tableHeight={props[0].tableHeight}
          type={props[0].type}
          updateSelectAllCheckedContext={props[0].updateSelectAllCheckedContext}
        />
      ))
    }
  }

  return (
    <tbody>
      {summaryRow()}
      {tableBodyContent()}
    </tbody>
  )
}
