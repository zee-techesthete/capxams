import React, { useContext, useEffect, useState } from 'react'
import { TableContext } from '../../Contexts/Components/TableContext'
import PropTypes from 'prop-types'

export default function TableHeader({
  sortField,
  sortOrder,
  updateSortField,
  updateSortOrder,
  data,
  selectableRows,

  selectedTableRowIds,
  onCheckboxChange,
  updateSelectAllCheckedContext,
}) {
  const context = useContext(TableContext)
  const [selectAllChecked, updateSelectAllChecked] = useState(false)

  useEffect(() => {
    if (selectedTableRowIds?.length < 1) {
      updateSelectAllChecked(false)
    }
  }, [selectedTableRowIds])

  /**
   * handleSelectAll
   * Function to update selectedRows to reflect "all" or "empty"
   * @return change state of selectedRows and selectedAllChecked
   */
  const handleSelectAll = () => {
    if (selectAllChecked) {
      //if "select all" is already checked, remove ids from selectedTableRowIds array
      onCheckboxChange([])
      updateSelectAllCheckedContext(false)
    } else {
      // check off all rows and send row ids to parent
      onCheckboxChange(selectableRows.map(row => row.id))
      updateSelectAllCheckedContext(true)
    }
  }

  /**
   * multiselect
   * Function to build selectAll column header, if set to true in context
   * @return {object}
   */
  const multiselect = () => {
    if (context.multiselect) {
      return (
        <th className='col-checkbox selectAll freeze-col'>
          <input
            checked={selectAllChecked}
            onChange={() => {
              updateSelectAllChecked(!selectAllChecked)
              handleSelectAll()
            }}
            type='checkbox'
          />
        </th>
      )
    }
  }

  /**
   * actionCell
   * Function to build empty header cell for action column
   * @return {object}
   */
  const actionCell = () => {
    if (context.actions !== undefined && context.actions.length > 0) {
      return <th style={{ width: '100px' }}></th>
    }
  }

  const handleOnClick = column => {
    updateSortOrder(column.field === sortField ? (sortOrder !== 'desc' ? 'desc' : 'asc') : 'desc')
    updateSortField(column.field)
  }

  return (
    <thead>
      <tr>
        {multiselect()}
        {context.columns.map((column, index) => (
          <th
            className={'sorting' + (sortField === column.field ? '_' + sortOrder : '') + (column.fixed && data.length > 0 ? ' freeze-col' : '')}
            key={column.name}
            onClick={() => handleOnClick(column)}
            style={{ width: column.minWidth, left: index === 0 && context.multiselect ? '29px' : '0' }}
          >
            {column.name}
          </th>
        ))}
        {actionCell()}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  sortField: PropTypes.string,
  sortOrder: PropTypes.string,
  updateSortField: PropTypes.func,
  updateSortOrder: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object),
  selectableRows: PropTypes.arrayOf(PropTypes.object),
  selectedTableRowIds: PropTypes.arrayOf(PropTypes.string),
  onCheckboxChange: PropTypes.func,
  updateSelectAllChecked: PropTypes.func,
  updateSelectAllCheckedContext: PropTypes.func,
}
