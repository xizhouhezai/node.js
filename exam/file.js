const fs = require('fs')

let allList = fs.readdirSync('./')

let dirList = [];

allList.forEach(item => {
  console.log(item)
  if (fs.statSync(item).isDirectory()) {
    dirList.push(item)
  }
})

console.log(dirList)