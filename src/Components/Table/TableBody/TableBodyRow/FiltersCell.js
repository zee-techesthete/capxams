import React from 'react'
import PropTypes from 'prop-types'

const FiltersCell = ({ data, field, column: { options } }) => {
  const filters = data[field]

  if (filters === null || filters.length === 0) return null

  const moreFilters = filters.length > 1 ? <span>+{filters.length - 1} Filters</span> : null

  return (
    <React.Fragment>
      <div>
        {options.find(o => o.value === filters[0].name).name} {filters[0].operator} {filters[0].value}
      </div>
      <div className={'table-cell-sub'}>{moreFilters}</div>
    </React.Fragment>
  )
}

FiltersCell.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  field: PropTypes.string,
  column: PropTypes.shape({
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string,
            operator: PropTypes.arrayOf(PropTypes.string),
            type: PropTypes.string,
          })
        ),
      })
    ),
  }),
}

export default FiltersCell
