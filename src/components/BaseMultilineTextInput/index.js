import BaseMultilineTextInput from './BaseMultilineTextInput';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
    install(Vue) {
        registerComponent(Vue, BaseMultilineTextInput)
    }
};

use(Plugin);

export default Plugin;

export {
    BaseMultilineTextInput
};