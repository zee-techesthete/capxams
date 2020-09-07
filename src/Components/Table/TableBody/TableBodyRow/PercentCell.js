export default ({ data, field }) => (data[field] !== undefined && data[field] !== null ? data[field].toFixed(2) + '%' : '0%')
