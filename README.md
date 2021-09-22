# 快速集成

您可以通过以下方式集成 SDK：

## 注意事项

- 不要使用 “im\_” 开头的 localStorage

### NPM 集成

在您的项目中使用 npm 安装相应的 IM SDK 依赖。

#### Web 项目：

```js
// IM Web SDK
npm install msim --save
```

#### 在项目脚本里引入模块，并初始化。

```js
import IM from "msim";
let im = IM.create();
```

### Script 集成

在您的项目中使用 script 标签引入 SDK，并初始化。[下载](https://www.showdoc.com.cn/server/api/attachment/visitfile/sign/091ea1c5fa768c735fa776fb168c9027 "[MSIM.zip")

```js
<!-- msim.js 可以从 下载 获取 -->
<script src="./msim.js"></script>
<script>
let im = IM.create()
// 接下来可以通过 im 进行事件绑定和构建 IM 应用
</script>
```

更详细的初始化流程请看 SDK 初始化例子
