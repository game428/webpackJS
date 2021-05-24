本文主要介绍如何快速地将MSIM SDK 集成到您的 Web 项目中，只要按照如下步骤进行配置，就可以完成 SDK 的集成工作。

# 集成 SDK
您可以通过以下方式集成 SDK：

## NPM 集成
在您的项目中使用 npm 安装相应的 IM SDK 依赖。

### Web 项目：
```js
// IM Web SDK
npm install msim --save
```
### 在项目脚本里引入模块，并初始化。

```js
import IM from 'msim';

let im; // SDK 实例通常用 im 表示
IM.create().then(sdk => {
 im = sdk;
})
```
## Script 集成
在您的项目中使用 script 标签引入 SDK，并初始化。[下载](https://www.showdoc.com.cn/server/api/attachment/visitfile/sign/742c5b67837942dd9ff6a8c8baf30644 "[MSIM.zip")
```js
<!-- msim.js 可以从 下载 获取 -->
<script src="./msim.js"></script>
<script>
let im; // SDK 实例通常用 im 表示
IM.create().then(sdk => {
 im = sdk;
})
// 接下来可以通过 im 进行事件绑定和构建 IM 应用
</script>
```
更详细的初始化流程请看 SDK 初始化例子