const http = require('http')

class Application {
  constructor() {
    this.callbackFunc = () => {}
  }
  listen(...args) {
    let server = http.createServer((req, res) => {
      this.callbackFunc(req, res)
    })
    server.listen(...args)
  }
  use(callback) {
    this.callbackFunc = callback
  }
}

module.exports = Application