import ShuffleIcon from '@mui/icons-material/Shuffle'
import SearchIcon from '@mui/icons-material/Search'
import { List, ListAction, Text, ItemAction, Image, app, post } from '@List'

const listActions = (itemIds) => {

    const findAll = ({ setProgress, reloadList }) => {
        setProgress(true)
        post('/entityType/findAll').then(data => {
            app.success('Found all entity types')
            setProgress(false)
            reloadList()
        }, error => {
            app.error(error)
            setProgress(false)
            reloadList()
        })
    }

    const setRandomDefaultImages = ({ setProgress, reloadList }) => {
        setProgress(true)
        post('/entityType/setRandomDefaultImages', itemIds).then(data => {
            app.success('Random default images are set')
            setProgress(false)
            reloadList()
        }, error => {
            app.error(error)
            setProgress(false)
            reloadList()
        })
    }

    return <>
        <ListAction
            text="Find all"
            title="Finds all entity types existing in this software instance"
            icon={SearchIcon}
            click={(params) => findAll(params)}
        />
        <ListAction
            text="Set random images"
            title="Random images would be set as default images for the selected entity types"
            icon={ShuffleIcon}
            minCardinality={1}
            click={(params) => setRandomDefaultImages(params)}
            superAdmin
            devOnly
        />
    </>
}

const filters = <>
    <Text
        column='Name'
        placeholder='Name'
    />
</>

const headers = <>
    <td className="text-left">Default image</td>
    <th>Name</th>
</>

const row = (item) => <>
    <td>
        <Image
            url={item.relatedItems.defaultImageUrl}
            uploadUrl={`/entityType/setImage?entityTypeId=${item.id}`}
        />
    </td>
    <td>{item.name}</td>
</>

const itemActions = (item) => {
    const setRandomDefaultImage = ({ setProgress, setItem }) => {
        setProgress(true)
        post(`/entityType/setRandomDefaultImage?id=${item.id}`)
            .then(data => {
                app.success('Random default image is set')
                setProgress(false)
                setItem(data)
            }, error => {
                app.error(error)
                setProgress(false)
            })
    }

    return <>
        <ItemAction
            title='Set random default image'
            icon={ShuffleIcon}
            click={(params) => setRandomDefaultImage(params)}
            superAdmin
            devOnly
        />
    </>
}

const EntityTypes = () => {
    return <List
        title='Entity Types'
        entityType='entityType'
        listActions={listActions}
        filters={filters}
        headers={headers}
        row={row}
        itemActions={itemActions}
    />
}

export default EntityTypes
export { EntityTypes }