# ALACarte 简体中文语言包

给 [ALACarte](https://github.com/sosjalapeno/ALACarte)（自建 Apple Music 无损下载器）提供**简体中文界面**。

- **不修改上游一行代码**，语言包在浏览器端运行时替换界面文案
- **与上游解耦**：升级上游后汉化自动保留，不需要重新导出前端
- **改翻译不用重建镜像**：只改 `zh.js`，刷新浏览器即生效
- 目前覆盖 480+ 条词条，含导航、搜索、音乐库、队列、设置、账号、错误提示、商店区域

## 快速开始

前置：Linux 主机（x86_64）+ Docker + Docker Compose。建议至少 4 核 8G 内存。

```bash
git clone https://github.com/narcissu31/alacarte-zh.git
cd alacarte-zh

# 1) 拉取上游源码并打好国内镜像加速器补丁
./scripts/fetch-upstream.sh

# 2) 构建并启动（首次约 10~25 分钟）
docker compose up -d --build

# 3) 取初始化令牌
docker logs alacarte-web 2>&1 | grep -i "setup token"
```

浏览器打开 `http://<你的IP>:8280`，用令牌 + 自设账号密码完成初始化，然后在 Settings 里填 Apple ID。

下载产物落在 `./music/`，结构为 `<歌手>/<专辑>/01. 曲名.flac`，可直接给 Plex / Jellyfin / Navidrome / 飞牛音乐 等扫描。

## 更新上游版本

```bash
./scripts/fetch-upstream.sh            # 重新拉取上游 main
docker compose up -d --build           # 重新构建
```

`zh.js` 是独立文件，**更新上游不会丢翻译**。若上游改了界面文案，跑一下覆盖率检查看缺哪些：

```bash
node scripts/check-coverage.mjs http://127.0.0.1:8280
```

它会把"还没翻译的界面文案"全部列出来，翻译后加进 `zh.js` 的 `D` 字典即可。

## 修改 / 补充翻译

编辑 `zh.js` 里的字典（结构清晰，按功能分区）：

```js
var D = {
  "Good listening": "好好享受音乐",
  "Download quality": "下载音质",
  // ...
};
```

保存后**刷新浏览器**（⌘⇧R）即生效，不用重启容器、不用重建镜像。

带数字/变量的文案用 `RULES` 里的正则处理：

```js
[/^(\d+)\s+tracks?$/i, "$1 首"],     // "12 tracks" → "12 首"
```

## 工作原理

```
浏览器 ──► nginx(zh 层, 8280) ──► alacarte-web(7373) ──► alacarte-wrapper(解密)
                 │
                 └─ 在 HTML 的 </body> 前注入 <script src="/zh.js">
```

nginx 用 `sub_filter` 在响应流里插入一行脚本，语言包随即接管界面文案的替换：

- 只替换**渲染出来的文本**与 `placeholder` / `title` / `aria-label` 等展示属性
- 代码里的枚举值、接口参数、文件名**一个都不碰**
- 用 `MutationObserver` 跟踪 SPA 路由切换与动态渲染
- 原生 `<option>` 若没有显式 `value`，只翻属性不翻文字（否则会改掉表单取值）

因此这个仓库可以安全地跟随上游更新：上游改了业务逻辑，语言包照常工作；上游改了文案，最多是那条又变回英文，补一条词条即可。

## 已知限制

- 含插值的句子（如 `Abort 3 active downloads?`）里，数字和复数 `s` 是独立的文本节点，逐节点翻译会拼出残句，因此这类弹窗标题保留英文（弹窗正文已汉化）
- 首帧可能有几十毫秒英文闪烁，属正常现象

## 免责声明

- 本项目**只包含一份中文语言包与部署编排**，不含上游 ALACarte 的任何源码或构建产物；上游代码由 `scripts/fetch-upstream.sh` 在本地拉取、本地构建
- ALACarte 及其依赖（含 FairPlay 解密组件）以 **AGPL-3.0** 等许可发布，使用与再分发请遵守其许可；本项目不替你承担任何合规责任
- 下载的音乐仅供**个人备份**使用。请确保你拥有相应的使用权，遵守 Apple 的服务条款与当地法律

## 致谢

- [sosjalapeno/ALACarte](https://github.com/sosjalapeno/ALACarte) —— 应用本体
- [zhaarey/apple-music-downloader](https://github.com/zhaarey/apple-music-downloader)、[WorldObservationLog/wrapper](https://github.com/WorldObservationLog/wrapper) —— 下载与解密核心
