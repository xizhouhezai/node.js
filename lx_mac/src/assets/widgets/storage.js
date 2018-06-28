export default class Storage {
  install(Vue) {
    Vue.prototype.$storage = {
      
      /**
       * Get string data from storage
       * @param  {String} key the key of data
       * @return {Promise}
       */
      get(key) {
        const storage = weex.requireModule('storage');

        return new Promise((resolve, reject) => {
          storage.getItem(key, (e) => {
            if (e.result === 'success') {
              resolve(e.data);
              return;
            }

            reject(e);
          });
        });
      },

      /**
       * Get json data from storage
       * @param  {String} key the key of data
       * @return {Promise}
       */
      getJSON(key) {
        const self = this;

        return new Promise((resolve, reject) => {
          self.get(key).then((data) => {
            resolve(JSON.parse(data));
          }, (e) => {
            reject(e);
          });
        });
      },

      /**
       * Set data to storage
       * @param {String} key   key of data
       * @param {String} value value of data
       */
      set(key, value) {
        const storage = weex.requireModule('storage');

        return new Promise((resolve, reject) => {
          storage.setItem(key, value, (e) => {
            if (e.result === 'success') {
              resolve();
              return;
            }

            reject(e);
          });
        });
      },

      /**
       * Set json data to storage
       * @param {String} key   key of data
       * @param {Object} value value of data
       */
      setJSON(key, value) {
        const self = this;
        const stringValue = JSON.stringify(value);

        return new Promise((resolve, reject) => {
          self.set(key, stringValue).then(() => {
            resolve();
          }, (e) => {
            reject(e);
          });
        });
      },

      /**
       * Remove data of specified key
       * @param  {String} key key of data
       * @return {Promise}
       */
      remove(key) {
        const storage = weex.requireModule('storage');

        return new Promise((resolve, reject) => {
          storage.removeItem(key, (e) => {
            if (e.result === 'success') {
              resolve();
              return;
            }

            reject(e);
          });
        });
      },
    }
  }
}
