import React from 'react'
import NumberFormat from 'react-number-format'
import PropTypes from 'prop-types'

export function CurrencyCell({ data, field }) {
  return <NumberFormat decimalScale={2} displayType={'text'} prefix={'$'} thousandSeparator={true} value={data[field]} />
}

CurrencyCell.propTypes = {
  /**
   * Data is a key-value object. Example: { cost: 50, sales: 1456 }
   */
  data: PropTypes.object,
  /**
   * Field is used to mention which value which key we want to access in data
   */
  field: PropTypes.string,
}

export default CurrencyCell
