import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const CheckboxCell = ({ id, onCheckboxChange, selectedTableRowIds, selectAllChecked, updateSelectAllCheckedContext }) => {
  const [checked, updateChecked] = useState(selectAllChecked)

  // add or remove clicked row to selectedRows
  const handleSelectRow = () => {
    if (selectedTableRowIds.findIndex(e => e === id) === -1) {
      //add row to selectedRows
      onCheckboxChange(selectedTableRowIds.concat([id]))
    } else {
      //remove row from selectedRows and set selectAllChecked to false
      onCheckboxChange(selectedTableRowIds.filter(el => el !== id))
      updateSelectAllCheckedContext(false)
    }
  }

  //if "select all" is checked, check this box
  useEffect(() => {
    if (selectAllChecked) {
      updateChecked(true)
    }
  }, [selectAllChecked])

  useEffect(() => {
    if (selectedTableRowIds.findIndex(e => e === id) === -1 && !selectAllChecked) {
      updateChecked(false)
    } else {
      updateChecked(true)
    }
  }, [selectedTableRowIds])

  return (
    <input
      checked={checked}
      id={id}
      onChange={() => {
        updateChecked(!checked)
        handleSelectRow()
      }}
      type='checkbox'
    />
  )
}

CheckboxCell.propTypes = {
  id: PropTypes.string,
  onCheckboxChange: PropTypes.func,
  selectedTableRowIds: PropTypes.arrayOf(PropTypes.string),
  selectAllChecked: PropTypes.bool,
  updateSelectAllCheckedContext: PropTypes.func,
}

export default CheckboxCell
