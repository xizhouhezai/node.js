const readline = require('readline')
const fs = require('fs')

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// rl.question("请输入内容：", (answer) => {
//   console.log(answer)
//   rl.close()
// })

const getFileName = inputTip => {
  const myReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve, reject) => {
    myReadLine.question(inputTip, answer => {
      resolve(answer)
      myReadLine.close()
    })
  })
}

const writeFile = path => {
  getFileName("请输入文件名：").then((res) => {
    getFileName("请输入一句话：").then((con) => {
      fs.writeFileSync(`${path}${res}.txt`, con)
    })
  })
}

writeFile('./')