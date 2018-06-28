import Http from './http';
import Loc from './loc';
import Storage from './storage';

let isInstalled = false;
export default {
  install(Vue, { httpOptions, router }) {
    if (!isInstalled) {
      Vue.use(new Http(httpOptions));
      Vue.use(new Loc(router));
      Vue.use(new Storage());

      isInstalled = true;
    }
  }
}
