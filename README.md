# Lookas2001 NOI News Spider

此项目用于从重要的 NOI 新闻网站抓取信息，然后推送到指定的地方。

当前已经支持的网站：

* [CCF NOI 官网](http://www.noi.cn/)
* [天津青少年科技创新活动服务平台](http://tianjin.xiaoxiaotong.org/)

## 安装、配置以及运行

此项目设计运行于 安装有 Node.js 的 Linux 。为了运行该项目，你需要先下载 [Node.js](https://nodejs.org/zh-cn/) 。未在 Windows 上经过测试，Windows 上运行应该大同小异。

从 [Releases](https://github.com/lookas2001/lookas2001-noi-news-spider/releases) 下载最新的释出版本。

进入项目目录，执行 `cp secrets.tmpl.js secrets.js` ，然后填入在 [ServerChan](http://sc.ftqq.com/) 以及 [PushBear](http://pushbear.ftqq.com/) 中申请到的密钥。

然后执行 `./daemon.sh` 即可。

## 反馈问题以及贡献代码

如果在使用此项目时发现了 bug 或者有新的想法，欢迎在 [Issues](https://github.com/lookas2001/lookas2001-noi-news-spider/issues) 提出。

当然，我们更希望有能力的用户直接贡献你的代码。[开源指南](https://opensource.guide/zh-cn/)

## TODO
