来学网移动端与app合并项目
=========================

## 命令

### npm start

Starts the development server for you to preview your weex page on browser.
You can also scan the QR code using weex playground to preview weex page on native.

### npm run dev

Open the code compilation task in watch mode.

### npm run ios

(Mac only, requires Xcode)
Starts the development server and loads your app in an iOS simulator.

### npm run android

(Requires Android build tools)
Starts the development server and loads your app on a connected Android device or emulator.

### npm run pack:ios

(Mac only, requires Xcode)
Packaging ios project into ipa package.

### npm run pack:android

(Requires Android build tools)
Packaging android project into apk package.

### npm run pack:web

Packaging html5 project into `web/build` folder.

### npm run test

Starts the test runner.

## 参考项目
+ [weex](http://weex.apache.org/cn/guide/)
+ [weex-ui](https://alibaba.github.io/weex-ui/#/cn/)
+ [网易严选weex版](https://www.oschina.net/p/yanxuan-weex)


## 可能遇到的问题
+ 使用```weex create awesome-app```创建应用后，如果第一次运行遇到错误，提示不能使用'vue'后缀。更改文件src/index.vue可以解决：

```javascript
// 更改前
import HelloWorld from './components/HelloWorld.vue';

// 更改后
import HelloWorld from './components/HelloWorld';
```

+ 创建android应用后，运行android应用之前要配置好android开发环境。需要配置环境变量: JAVA_HOME、ANDROID_HOME

+ 配置完环境变量后使用android studio导入项目，然后把需要安装的包安装一遍

+ 运行android应用之前，需要插上手机
