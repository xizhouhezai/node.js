import Vue from 'vue';
import weex from 'weex-vue-render';

import config from '@/assets/config';
import widgets from '@/assets/widgets';

// register vue widgets
widgets.install(Vue, config);

weex.init(Vue);

