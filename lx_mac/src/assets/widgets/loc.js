/**
 * url navigation manager class
 */
import pathToRegexp from 'path-to-regexp';
import querystring from 'querystring';

export default class Loc {
  constructor({ routes }) {
    this.routes = routes;
  }

  install(Vue) {
    const self = this;
    const bundleUrl = weex.config.bundleUrl;

    Vue.prototype.$loc = {
      open(url) {
        const bundleUrl = parseUrl(url);

        return new Promise((resolve, reject) => {
          if (bundleUrl === null) {
            reject(url);
            return;
          }

          const navigator = weex.requireModule('navigator');
          navigator.push({
            url: bundleUrl,
            animated: 'true',
          }, (e) => {
            resolve(e);
          });
        });
      },

      back() {
        // eslint-disable-next-line
        return new Promise((resolve, reject) => {
          const navigator = weex.requireModule('navigator');
          navigator.pop({
            animated: 'true'
          }, (e) => {
            resolve(e);
          });
        });
      },
    };

    Vue.prototype.$context = parseBundle(bundleUrl);

    /**
     * Get bundle url
     * @param  {String} url request url
     * @return {String}
     */
    function parseUrl(url) {
      if (url.indexOf('/') != 0) {
        console.error("the url must begin with '/'");
        return null;
      }

      //copy from vue-router
      const encodeReserveRE = /[!'()*]/g;
      const encodeReserveReplacer = c => '%' + c.charCodeAt(0).toString(16);
      const encode = str => encodeURIComponent(str)
          .replace(encodeReserveRE, encodeReserveReplacer)
          .replace(/%2C/g, ',');

      const uri = url.split('?')[0];

      // find out the rule
      let matchRule = {};
      self.routes.forEach((r) => {
        const re = pathToRegexp(r.path);
        const match = re.exec(uri);

        if (match !== null) {
          matchRule = r;
        }
      });

      // get the keys and values
      let keys = [];
      const pathReg = pathToRegexp(matchRule.path, keys);
      const values = pathReg.exec(uri);
      // save the last value to find query and hash
      // const lastValue = values[values.length - 1];
      // the true value
      // values[values.length - 1] = lastValue.split(/\?|\#/)[0];


      // parse params to key/value object
      const params = {};
      if (keys.length > 0) {
        keys.forEach((key, i) => {
          params[key.name] = values[i+1];
        });
      }

      // get query and hash
      const queryIndex = url.indexOf('?');
      const hashIndex = url.indexOf('#');
      if (queryIndex > 0 && hashIndex > 0 && queryIndex > hashIndex) {
        console.error("Could not set '#' behind '?'");
        return null;
      }

      const queryString = queryIndex > 0 ?
        url.substring(queryIndex + 1, hashIndex > 0 ? hashIndex : url.length) :
        '';
      const hashString = hashIndex > 0 ?
        url.substring(hashIndex, url.length) :
        '';

      const query = querystring.parse(queryString);

      // add bundleUrl's params
      let componentPath = matchRule.component;

      const platform = weex.config.env ?
        weex.config.env.platform :
        weex.config.platform;

      if (platform.toLowerCase() === 'web') {
        componentPath = componentPath.replace('.js', '.html');
      }

      componentPath = setBundleUrl(bundleUrl, componentPath);

      for (let key in params) {
        componentPath += (componentPath.indexOf('?') < 0 ? '?' : '&') +
          key +
          '=' +
          encode(params[key]);
      }

      for (let q in query) {
        componentPath += (componentPath.indexOf('?') < 0 ? '?' : '&') +
          q +
          '=' +
          encode(query[q]);
      }
      return componentPath + hashString;
    }

    /**
     * Get route object
     * @param  {String} bundle bundle url
     * @return {Object}
     */
    function parseBundle(bundle) {
      let bundleUrl = bundle;
      let context = {
        params: null,
        query: null,
        hash: null,
        path: null,
        fullPath: null,
        matched: null,
        name: null,
      };

      const platform = weex.config.env ?
        weex.config.env.platform :
        weex.config.platform;

      if (platform.toLowerCase() === 'web') {
        const lastSlashIndex = bundleUrl.lastIndexOf('/');
        bundleUrl = bundleUrl.substring(lastSlashIndex + 1);
        bundleUrl = bundleUrl.replace('.html', '.js');
      }

      let uri = bundleUrl.split(/\?|#/)[0];
      if (uri === '') {
        uri = 'index.js';
      }
      // fint out the rule
      let matchRule = null;
      self.routes.forEach((r) => {
        let comp = r.component.split('/')
        if (comp[comp.length-1] === uri) {
          matchRule = r;
          return false;
        }
      });

      if (matchRule === null) {
        console.error('Can not find match route');

        return context;
      }

      context.matched = matchRule;
      context.name = matchRule.name;

      // get keys
      let keys = [];
      pathToRegexp(matchRule.path, keys);

      // get query and hash
      const queryIndex = bundleUrl.indexOf('?');
      const hashIndex = bundleUrl.indexOf('#');

      const queryString = queryIndex > 0 ?
        bundleUrl.substring(queryIndex + 1, hashIndex > 0 ? hashIndex : bundleUrl.length) :
        '';
      context.hash = hashIndex > 0 ?
        bundleUrl.substring(hashIndex, bundleUrl.length) :
        '';

      const allQuery = querystring.parse(queryString);

      const params = {};
      const query = {};
      let paramsKey = [];

      if (keys.length > 0) {
        paramsKey = keys.map(key => key.name);
      }

      for (let q in allQuery) {
        allQuery[q] = decodeURIComponent(allQuery[q]);

        if (paramsKey.indexOf(q) < 0) {
          query[q] = allQuery[q];
        } else {
          params[q] = allQuery[q];
        }
      }

      context.params = params;
      context.query = query;

      // get path
      let path = matchRule.path;
      for (let p in params) {
        path = path.replace(':' + p, params[p]);
      }

      context.path = path;
      context.fullPath = path + '?' + querystring.stringify(query) + context.hash;

      return context;
    }

    // set bundle
    function setBundleUrl(url, jsFile) {
        const bundleUrl = url;
        let host = '';
        let path = '';
        let nativeBase;
        const isAndroidAssets = bundleUrl.indexOf('your_current_IP') >= 0 || bundleUrl.indexOf('file://assets/') >= 0;
        const isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
        if (isAndroidAssets) {
            nativeBase = 'file://assets/dist';
        } else if (isiOSAssets) {
            nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
        } else {
            const matches = /\/\/([^/]+?)\//.exec(bundleUrl);
            // const matchFirstPath = /\/\/[^/]+\/([^/\s]+)\//.exec(bundleUrl);
            if (matches && matches.length >= 2) {
                host = matches[1];
            }
            /*if (matchFirstPath && matchFirstPath.length >= 2) {
                path = matchFirstPath[1];
            }*/
            nativeBase = 'http://' + host + '/';
        }
        // const h5Base = './index.html?page=';
        // in Native
        let base = nativeBase + (path? path + '/' : '');
        /*if (typeof navigator !== 'undefined' && (navigator.appCodeName === 'Mozilla' || navigator.product === 'Gecko')) {
            // check if in weexpack project
            if (path === 'web' || path === 'dist') {
                base = h5Base + '/dist/';
            } else {
                base = h5Base + '';
            }
        } else {
            base = nativeBase + (!!path? path+'/':'');
        }*/

        const newUrl = base + jsFile;
        return newUrl;
    }
  }
}
