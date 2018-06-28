/**
 * jwt token handle class
 */
import { StorageKey } from './constants';

const storage = weex.requireModule('storage');

export default {
  getToken() {
    return new Promise((resolve, reject) => {
      storage.getItem(StorageKey.USER, (e) => {
        if (e.result === 'success') {
          const user = JSON.parse(e.data);
          resolve(user);
          return;
        }

        reject(e);
      });
    });
  }
}
