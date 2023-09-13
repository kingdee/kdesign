# 贡献指南
感谢你的宝贵时间，我们很高兴您有兴趣为 KDesign 做出贡献。请在你要提 pull request 之前，请务必花点时间阅读下面的入门指南。

## 分支管理
KDesign使用 Git Flow的思想来管理分支，我们长期维护两个分支 `main` 和 `develop`。如果你需要修复一个bug，请提pull request到 `main` 分支；如果你需要新增功能/组件，请提pull request到 `develop` 分支。每周我们会对代码进行code review，并合并代码到 `main` 和 `develop` 分支。

## Bug
我们使用 Github issues 来追踪 bug。为了更快地了解和解决 bug，在提交 issue 时，你也可以通过我们提供的模板来重现问题。

## 新特性
如果你有提供或者优化功能的想法，我们推荐你使用 Github issues 来新建一个添加新功能的 issue。

## Pull Request
KDesign团队成员都是用 Yarn 进行包管理。下面的指令我们也会使用yarn进行示例，按照以下指令操作前请准备你的 Yarn 环境
1. Fork 此仓库，从 main 创建分支。
2. 在仓库根目录下执行 yarn，安装依赖。
3. 执行 yarn start 启动项目，默认会启动8003端口，你可以通过浏览器访问 [http://localhost:8003](http://localhost:8003).
4. 对代码库进行更改。如果适用的话，请确保改写了相应的单测代码。
5. 确认执行 yarn test 后所有的测试都是通过的。
6. 如果进行了任何 api 更改，请手动更新组件下的 index.md 文件。如果进行了token的更改，请运行 yarn token进行token的自动生成。
7. 执行 yarn lint 对更改后的代码进行格式校验，对于格式不正确的位置可以使用 yarn lint-fix:script/style自动进行修复，对于不能自动修复的位置需要手动去修改。
7. 执行 git cz进行commit, 请同时遵守 Commit 规范。
8. 提交 pull request, 如果有对应的 issue，请进行关联。

同步最新的组件库代码，请参照以下的操作步骤：
1. 添加远程仓库，运行 `git remote add kd https://github.com/kdcloudone/kdesign.git`, 关联的远程仓库名kd可按照自己的需要命名
2. 同步kdesign组件库最新的代码到本地仓库，运行`git fetch kd`
3. 同步组件库最新代码到本地main分支，运行 `git rebase kd/main`
4. 推送最新代码到远程, `git push origin main`, 如果推送失败，可以使用 `git push origin main -f`
## 常用指令
```bash
# 代码格式校验
$ yarn lint

# ts代码格式校验
$ yarn lint:script

# 样式代码校验
$ yarn lint:style

# ts代码格式化修复
$ yarn lint-fix:script

# 样式代码格式化修复
$ yarn lint-fix:style

# 组件单测脚本快照更新
$ yarn test:update

# 开发新组建自动化模板
$ yarn new

# 自动化token api
$ yarn token
```

## Commit 指南
KDesign团队成员使用commitizen进行git commit管理。所以使用 git cz 代替 git commit进行代码提交。当执行git cz后就会出现交互命令行辅助你进行commit信息提交。
针对commit description部分我们做了如下要求：
这是我们一条符合规范的提交信息示例："[table] 添加表头行/列合并功能 fix #268"，所以我们的commit信息格式如下

```bash
[组件名/cli/others]: 动词(添加/修改/删除)...关联issues(fix/fixes/fixed/close/closes/closed #268)
```

- commit是对组件的修改,请在"[]"放括号内部填写组件名；如果是文档网站方面的更改请填写cli；其他情况请填写others
- commit的具体描述请采用"动词+具体改动"的方式进行表述

> 更多组件开发相关的介绍以及开发新组件的内容，请大家移步至[新组件开发贡献指南](./COMPONENT.md)
