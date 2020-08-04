import BasePagination from './BasePagination';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
    install(Vue) {
        registerComponent(Vue, BasePagination)
    }
};

use(Plugin);

export default Plugin;

export {
    BasePagination
};