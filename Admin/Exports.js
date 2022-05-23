import { EntityTypes } from './EntityType/List'
import FingerprintIcon from '@mui/icons-material/Fingerprint';

const EntitiesRoutes = [
    {
        path: "/entityTypes",
        component: EntityTypes,
        superAdmin: true
    }
]

const EntitiesMenu = [
    {
        title: "Entity Types",
        icon: FingerprintIcon,
        url: "/entityTypes",
        superAdmin: true
    }
]

export { EntitiesRoutes }
export { EntitiesMenu }