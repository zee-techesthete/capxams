import React from "react";
import PropTypes from "prop-types";
// import { useMutation } from '@apollo/react-hooks'
// import { DETACH_LABEL } from '../../../../Queries/Pages/DSP/LineItems'
// import { DSPApi } from '../../../../Config/ApiClient'
// import GetPageEntity from '../../../../Helpers/GetPageEntity'

const LabelCell = ({ data, field }) => {
  // const [detachLabelMutation] = useMutation(DETACH_LABEL, { client: DSPApi, refetchQueries: ['GetLineItemsAndSummary', 'GetLabels'] })

  // const handleDetachLabel = labelId => {
  //   detachLabelMutation({
  //     variables: {
  //       entityIds: data.adgroupLegacyId,
  //       labelIds: labelId,
  //       page: GetPageEntity(window.location.pathname),
  //     },
  //   }).then()
  // }

  return (
    <div>
      {/* {data[field].map(label => (
        <div className='pill-tag' key={label.id}>
          {label.name}
          <span className='tag-styling' style={{ background: label.color }} />
          <span className='tag-remove' onClick={() => handleDetachLabel(label.id)}></span>
        </div>
      ))} */}
    </div>
  );
};

LabelCell.propTypes = {
  // data: PropTypes.object,
  // field: PropTypes.string,
};

export default LabelCell;
