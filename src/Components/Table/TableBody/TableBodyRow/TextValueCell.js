export default ({ data, field, column: { options } }) => {
  if (data[field] === undefined) return ''
  return options?.find(o => o.value === data[field])?.name || ''
}
