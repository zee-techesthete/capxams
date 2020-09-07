import React from 'react'
import PropTypes from 'prop-types'
import SelectBoxOption from '../../../../Models/SelectBoxOption'

const GoalCell = ({ data, column: { goalOptions, predictYNameOptions } }) => (
  <React.Fragment>
    <div className={'table-cell-super'}>{goalOptions?.find(o => o.value === data['goal'])?.name || ''}</div>
    <div>{predictYNameOptions.flatMap(o => o.items)?.find(o => o.value === data['predictYName'])?.name || ''}</div>
  </React.Fragment>
)

GoalCell.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  column: PropTypes.shape({
    goalOptions: PropTypes.arrayOf(SelectBoxOption),
    predictYNameOptions: PropTypes.arrayOf(SelectBoxOption),
  }),
}

export default GoalCell
