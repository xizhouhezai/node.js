/**
 * http request widget
 *
 * request options:
 * {
 *   name: api id,
 *   url: request url,
 *   data: request data,
 *   method: request method,
 *   headers: request headers,
 *   params: params set for uri
 * }
 */
import pathToRegexp from 'path-to-regexp';
import querystring from 'querystring';

/**
 * http request class
 */
export default class Http {
  constructor({ baseUrl = '', apis }) {
    this.baseUrl = baseUrl;
    this.apis = apis;

    return this;
  }

  install(Vue) {
    const self = this;
    Vue.prototype.$http = {

      get(options) {
        const newOptions = Object.assign(options, {
          method: 'GET',
        });

        return new Promise((resolve, reject) => {
          request(newOptions, resolve, reject);
        });
      },

      post(options) {
        const newOptions = Object.assign(options, {
          method: 'POST',
        });

        return new Promise((resolve, reject) => {
          request(newOptions, resolve, reject);
        });
      },

      patch(options) {
        const newOptions = Object.assign(options, {
          method: 'PATCH',
        });

        return new Promise((resolve, reject) => {
          request(newOptions, resolve, reject);
        });
      },

      put(options) {
        const newOptions = Object.assign(options, {
          method: 'PUT',
        });

        return new Promise((resolve, reject) => {
          request(newOptions, resolve, reject);
        });
      },


      delete(options) {
        const newOptions = Object.assign(options, {
          method: 'DELETE',
        });

        return new Promise((resolve, reject) => {
          request(newOptions, resolve, reject);
        });
      },
    };

    /**
     * Send http request
     * @param  {Object}   options  request options
     * @param  {Function} callback
     */
    function request(options, resolve, reject) {
      const { name, url, data, method, headers, params } = options;
      let uri = getUri(name, method, data, params);

      // add app query in url
      if (uri.indexOf('?') > -1) {
        uri += '&app=mac';
      } else {
        uri += '?app=mac';
      }

      const sOptions = {
        method: method && method.toUpperCase() || 'GET',
        url: url || (self.baseUrl + uri),
        headers: headers || {},
        type: 'json',
      };

      if (sOptions.method !== 'GET' && data) {
        sOptions.body = querystring.stringify(data);
      }

      if (typeof sOptions.headers['Content-Type'] == 'undefined') {
        sOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      }

      const stream = weex.requireModule('stream');
      stream.fetch(sOptions, (response) => {
        if (response.ok) {
          resolve(response.data);
          return
        }

        reject(response);
      });
    }

    function getUri(name, method, data, params) {
      if (!name) {
        return '';
      }
      let uri = self.apis[name];

      let keys = [];
      pathToRegexp(uri, keys);

      if (keys.length > 0) {
        keys.forEach((key) => {
          if (!params[key.name]) {
            throw new Error(`You are using dynamic params but ${key.name} not existed in your params`);
          }

          uri = uri.replace(`:${key.name}`, params[key.name] || 'undefined');
        });
      }

      if (method === 'GET') {
        uri += '?' + querystring.stringify(data);
      }

      return uri;
    }
  }
}
