import { List } from '@List'

const headers = <>
    <th>Name</th>
</>

const row = (item) => <>
    <td>{item.name}</td>
</>

const EntityTypes = () => {
    return <List
        title='Entity Types'
        entityType='entityType'
        headers={headers}
        row={row}
    />
}

export default EntityTypes;