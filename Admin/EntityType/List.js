import ShuffleIcon from '@mui/icons-material/Shuffle';
import { List, ListAction, ItemAction, Image, app, post } from '@List'

const listActions = (itemIds) => {

    const setRandomDefaultImages = ({ setProgress, reloadList }) => {
        setProgress(true)
        post('/entityType/setRandomDefaultImages').then(data => {
            app.success('Random default images are set');
            setProgress(false);
            reloadList();
        }, error => {
            app.error(error);
            setProgress(false);
            reloadList();
        })
    }

    return <>
        <ListAction
            text="Set random images"
            title="Random images would be set as default images for the selected entity types"
            icon={ShuffleIcon}
            minCardinality={1}
            click={(params) => setRandomDefaultImages(params)}
        />
    </>
}

const headers = <>
    <td>Default image</td>
    <th>Name</th>
</>

const row = (item) => <>
    <td>
        <Image
            url={item.relatedItems.defaultImageUrl}
            uploadUrl={`/entityType/setImage?id=${item.id}`}
        />
    </td>
    <td>{item.name}</td>
</>

const itemActions = (item) => {
    const setRandomDefaultImage = ({ setProgress, setItem }) => {
        setProgress(true);
        post(`/entityType/setRandomDefaultImage?id=${item.id}`)
            .then(data => {
                app.success('Random default image is set');
                setProgress(false);
                setItem(data);
            }, error => {
                app.error(error);
                setProgress(false);
            })
    }

    return <>
        <ItemAction
            title='Set random default image'
            icon={ShuffleIcon}
            click={(params) => setRandomDefaultImage(params)}
        />
    </>
}

const EntityTypes = () => {
    return <List
        title='Entity Types'
        entityType='entityType'
        listActions={listActions}
        headers={headers}
        row={row}
        itemActions={itemActions}
    />
}

export default EntityTypes;
export { EntityTypes }