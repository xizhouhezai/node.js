// import { StorageKey } from './constants';

class User {
  constructor(options) {
    this.id = options.id;
    this.token = options.token;
  }
}

/**
 * decryption token
 * @param {String} token Api token
 * @return {Object}
 */
export default function crypto(token) {
  if (token) {
    let str = token.split('.')[1];
    let json = decodeURIComponent(escape(window.atob(str)));
    if (json) {
      json = JSON.parse(json)
      let result = new User({id: json.id, token: token});
      return result;
    }
  }
}