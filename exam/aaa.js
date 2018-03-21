/**
 * 现在有一个aaa.js文件，它里面有如下操作，从终端提示用户输入一项目名，然后读取下，在当前目录下，创建这目
 * 录，并且生成一个package.json,里面有两个依赖。要通过npm i安装react react-dom;最后终端通知你安装完毕。
 * 只允许用户执行一次node aaa与输入项目名，完成这些操作
 */

/**
 * 1. 获取用户终端输入
 * 2. 创建用户输入文件夹
 * 3. 生成 package.json 文件
 * 4. npm i 安装 react 以及 react-dom
 * 5. 通知用户依赖安装完成
 */ 

const readline = require('readline');
const fs = require('fs');
const exec = require('child_process').exec;

// 获取用户输入
const getUserInput = inputTip => {
  const myReadline = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve, reject) => {
    myReadline.question(inputTip, answer => {
      myReadline.close();
      resolve(answer);
    });
  });
};

// 获取当前目录下的文件夹列表
const getDirNameList = path => {
  let allList = fs.readdirSync(path);
  let dirList = [];
  allList.forEach(item => {
    if (fs.statSync(item).isDirectory()) {
      dirList.push(item);
    }
  });
  return dirList;
};

// 生成 package.json 文件
const generatePackageJsonFile = projectName => {
  const packageJSON = JSON.stringify(
    {
      "name": projectName,
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
        "react": "^16.2.0",
        "react-dom": "^16.2.0"
      }
    }
  );

  fs.writeFileSync(`./${projectName}/package.json`, packageJSON);
};

// 创建目录
const createProject = (inputTip = 'Please input project name: ') => {
  getUserInput(inputTip).then(answer => {
    let dirList = getDirNameList('./');
    if (dirList.includes(answer)) {
      // 同名处理
      createProject('File exists, please input a new project name: ');
    } else {
      // 创建文件夹
      exec(`mkdir ${answer}`, (error, stdout, stderr) => {
        if (error) {
          console.error(error);
          process.exit();
        } else {
          // 创建package.json文件
          generatePackageJsonFile(answer);
          console.log('\nInstall dependencies...');
          exec(`cd ${answer} && npm i`, err => {
            if (err) {
              consoole.error(err);
              process.exit();
            } else {
              console.log('\nDependencies install completed!!!');
              process.exit();
            }
          });

        }
      });
    }
  });
};

createProject();