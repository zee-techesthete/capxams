import React from 'react'
import NumberFormat from 'react-number-format'
import PropTypes from 'prop-types'

const NumberCell = ({ data, field }) => <NumberFormat decimalScale={'2'} displayType={'text'} thousandSeparator={true} value={data[field]} />

NumberCell.propTypes = {
  data: PropTypes.object,
  field: PropTypes.string,
}

export default NumberCell
