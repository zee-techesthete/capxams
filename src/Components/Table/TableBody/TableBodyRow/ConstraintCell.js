export default ({ data, field, column: { options } }) => `${options?.find(o => o.value === data[field].name).name} ${data[field].operator} ${data[field].value}`
