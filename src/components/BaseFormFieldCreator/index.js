import BaseFormFieldCreator from './BaseFormFieldCreator';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
    install(Vue) {
        registerComponent(Vue, BaseFormFieldCreator)
    }
};

use(Plugin);

export default Plugin;

export {
    BaseFormFieldCreator
};