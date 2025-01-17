---
title: 运行 `npx vitepress init` 时出现 `ERR_TTY_INIT_FAILED`
date: 2024/03/02
tags:
  - VitePress
  - debug
---

# 运行 `npx vitepress init` 时出现 `ERR_TTY_INIT_FAILED`

想给笔记站加个时间轴页面，想试一试 [brc-dd/vitepress-blog-demo](https://github.com/brc-dd/vitepress-blog-demo/tree/main) 看一看效果。

按照 [Getting Started | VitePress](https://vitepress.dev/guide/getting-started)，先执行 `npm add -D vitepress` ：

```text
$ npm add -D vitepress

added 78 packages in 25s

10 packages are looking for funding
run npm fund for details
```

然后在执行 `npx vitepress init` 时出了问题

::: details `npx vitepress init`

```text
$ npx vitepress init

T  Welcome to VitePress!
node:internal/errors:563
    ErrorCaptureStackTrace(err);
    ^

SystemError [ERR_TTY_INIT_FAILED]: TTY initialization failed: uv_tty_init retured EBADF (bad file descriptor)
    at new SystemError (node:internal/errors:259:5)
    at new NodeError (node:internal/errors:370:7)
    at new WriteStream (node:tty:93:11)
    at oD.prompt (file:///E:/github/vitepress-timeline/node_modules/vitepress/dst/node/serve-Bbz0dL6j.js:46852:704)
    at te (file:///E:/github/vitepress-timeline/node_modules/vitepress/dist/nod/serve-Bbz0dL6j.js:46867:7)
    at root (file:///E:/github/vitepress-timeline/node_modules/vitepress/dist/nde/serve-Bbz0dL6j.js:48966:19)
    at he (file:///E:/github/vitepress-timeline/node_modules/vitepress/dist/nod/serve-Bbz0dL6j.js:46884:95)
    at init (file:///E:/github/vitepress-timeline/node_modules/vitepress/dist/nde/serve-Bbz0dL6j.js:48964:25)
    at file:///E:/github/vitepress-timeline/node_modules/vitepress/dist/node/cl.js:423:3
    at ModuleJob.run (node:internal/modules/esm/module_job:218:25) {
  code: 'ERR_TTY_INIT_FAILED',
  info: {
    errno: -4083,
    code: 'EBADF',
    message: 'bad file descriptor',
    syscall: 'uv_tty_init'
  },
  errno: [Getter/Setter],
  syscall: [Getter/Setter]
}

Node.js v20.11.1
```

:::

## 解决

改用 VS Code 终端执行 `npx vitepress init`。

![vscode-ERR_TTY_INIT_FAILED](https://cdn.jsdelivr.net/gh/tangjan/imgBed/notes/2024/03/02/vscode-ERR_TTY_INIT_FAILED/vscode-ERR_TTY_INIT_FAILED.png)

解决方法提供者不知道为啥，我也不知道为啥。。

这种问题 ChatGPT 就帮不上忙了。。🤣

## 参考

- [node.js - Cannot create Sveltekit app - ERR_TTY_INIT_FAILED uv_tty_init returned EBADF (bad file descriptor) - Stack Overflow](https://stackoverflow.com/questions/75750730/cannot-create-sveltekit-app-err-tty-init-failed-uv-tty-init-returned-ebadf-ba)
