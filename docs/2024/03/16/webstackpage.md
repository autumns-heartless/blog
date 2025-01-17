---
title: WebStackPage 个人导航站
date: 2024/03/16
tags:
  - 导航站
  - Capstone
---

# WebStackPage 个人导航站

源码：[GitHub](https://github.com/tangjan/nav) 。

## 动因

浏览器书签太多了，想把其中大部分公共站点都放到导航站，提高自己浏览器书签的信息密度，方便查找有用的书签。

大致找了一下个人导航站开源项目，最后决定使用 [WebStackPage](https://github.com/WebStackPage/WebStackPage.github.io)，手撕 HTML。

## 开发环境

在 [WebStackPage](https://github.com/WebStackPage/WebStackPage.github.io) 下载压缩包，然后解压到本地，用 VS Code 打开。

VS Code 使用 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 插件，方便在线调试。

::: info 为什么不 `git clone`

之所以下载压缩包，而不是 `git clone`，是为了保留一份源文件，方便参照。

当然也可以 clone 两份，不过我还是习惯下载压缩包。

:::

## 项目文件修改一览

以下文件树使用 [文件夹目录树生成工具](https://toolwa.com/dir-tree/) 生成。

`-` 表示删掉了这个文件，`+` 表示新增了这个文件，`→` 表示修改了这个文件，没有标记表示没有修改。

::: details WebStackPage.github.io-master

├─ assets<br>
&emsp;├─ css<br>
&emsp;│ │ ├─ `→` `nav.css`<br>
&emsp;│ │ └─ ……<br>
&emsp;├─ images<br>
&emsp;&emsp;├─ `+` `avatar.png`<br>
&emsp;&emsp;├─ `→` `favicon.png`<br>
&emsp;&emsp;├─ `→` `logo-collapsed@2x.png`<br>
&emsp;&emsp;├─ `→` `logo@2x.png`<br>
&emsp;&emsp;├─ `→` `logo_dark@2x.png`<br>
&emsp;&emsp;├─ `-` `preview.gif`<br>
&emsp;&emsp;├─ `-` `qqgroup_webstack.jpg`<br>
&emsp;&emsp;├─ `-` `qqgroup_webstack2.jpg`<br>
&emsp;&emsp;├─ `-` `webstack_banner_cn.png`<br>
&emsp;&emsp;├─ `-` `webstack_icon_producthunt.png`<br>
&emsp;&emsp;└─ `-` `webstack_no_pro.png`<br>
&emsp;├─ logos<br>
&emsp;│ │ ├─ `-` `viggoz`<br>
&emsp;│ │ └─ ……<br>
&emsp;│ └─ flags<br>
&emsp;├─ js<br>
&emsp;└─ `-` `webstack_logos.sketch`<br>
├─ cn<br>
│ ├─ `→` `about.html`<br>
│ └─ `→` `index.html`<br>
├─ en<br>
│ ├─ `→` `about.html`<br>
│ └─ `→` `index.html`<br>
├─ `→` `404.html`<br>
├─ `→` `CNAME`<br>
├─ `→` `index.html`<br>
├─ `-` `README.md`<br>
└─ LICENSE<br>

:::

## `404.html` 的修改

::: details `404.html`

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="utf-8" />
    <title>webstack - 404</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
    <link rel="shortcut icon" href="./assets/images/favicon.png" />

    <!-- Global site tag (gtag.js) - Google Analytics 
    https://analytics.google.com/analytics/web/ // [!code ++]
    -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-77253689-1"></script>
    // [!code --]
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-JYRF8GE4X6"></script>
    // [!code ++]

    <script>
      window.dataLayer = window.dataLayer || []

      function gtag() {
        dataLayer.push(arguments)
      }
      gtag('js', new Date())

      gtag('config', 'UA-77253689-1') // [!code --]
      gtag('config', 'G-JYRF8GE4X6') // [!code ++]
    </script>

    <!-- 百度统计 https://tongji.baidu.com/ -->
    // [!code ++]
    <script>
      var _hmt = _hmt || []
      ;(function () {
        var hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?c05bb16ea908292af9f6c513087a1cc3' // [!code --]
        hm.src = 'https://hm.baidu.com/hm.js?6bb9bd508871ffc19854ea3019e355f2' // [!code ++]
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
      })()
    </script>

    <style>
      html,
      body {
        width: 100%;
        height: 100%;
      }

      a,
      a img,
      a:before,
      a:after {
        text-decoration: none;
        transition-duration: 0.25s;
      }

      section {
        display: block;
      }

      body {
        line-height: 1;
      }

      #about {
        width: 40%;
        position: absolute;
        top: 40%;
        left: 10%;
        z-index: 20;
        transform: translate(0, -50%);
      }

      #about h1 {
        margin: 30px;
      }

      #about p {
        margin: 30px;
      }

      #about img {
        margin-left: 30px;
      }

      #about .social {
        float: left;
        margin: 30px;
      }

      #about .copyright {
        width: 100%;
        float: left;
        margin-bottom: 0px;
      }

      @media (max-width: 768px) {
        #about {
          width: 100%;
          left: 0px;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.85);
        }

        #about h1 {
          margin: 30px;
        }

        #about p {
          margin: 30px;
        }

        #about .social {
          margin: 30px;
        }

        #about .copyright {
          width: 100%;
          float: left;
          margin-bottom: 0px;
        }
      }

      @media (max-width: 580px) {
        #about {
          width: 100%;
          left: 0px;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.85);
        }

        #about h1 {
          margin: 30px;
        }

        #about p {
          margin: 30px;
          margin-bottom: 0;
        }

        #about .social {
          margin: 30px;
          margin-bottom: 0;
        }

        #about .copyright {
          width: 100%;
          float: left;
          margin-bottom: 0;
        }
      }

      .animated {
        animation-duration: 1s;
        animation-fill-mode: both;
      }

      .bounce-in {
        animation-name: bounce-in;
      }

      @keyframes bounce-in {
        from,
        60%,
        75%,
        90%,
        to {
          animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        0% {
          opacity: 0;
          transform: translate3d(-3000px, -50%, 0);
        }

        60% {
          opacity: 1;
          transform: translate3d(25px, -50%, 0);
        }

        75% {
          transform: translate3d(-10px, -50%, 0);
        }

        90% {
          transform: translate3d(5px, -50%, 0);
        }

        to {
          transform: translate3d(0, -50%);
        }
      }

      body {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 1.75;
        color: rgba(0, 0, 0, 0.65);
      }

      h1 {
        font-family: 'Merriweather', sans-serif;
        font-size: 50px;
        font-weight: 700;
        line-height: 1.25;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 25px;
      }

      a {
        color: rgba(3, 3, 3, 0.85);
        font-weight: 600;
      }

      @media (max-width: 580px) {
        body {
          font-size: 14px;
        }

        h1 {
          font-size: 42px;
          line-height: 1.45;
        }
      }

      .bg-align {
        margin-top: 50%;
      }
    </style>
  </head>

  <body>
    <section id="about" class="animated bounce-in">
      <div class="bg-align">
        <h1>404</h1>
        <p>Oops! It looks like you're lost...</p>
        <p>The Page you're looking for doesn't exist or another error occurred.</p>
        <p><a href="http://webstack.cc">👉 webstack.cc</a></p>
        // [!code --]
        <p><a href="http://nav.tangjiayan.cn">👉 nav.tangjiayan.cn</a></p>
        // [!code ++]
      </div>
    </section>
  </body>
</html>
```

:::

## 根目录下 `index.html` 的修改

这个 HTML 是用来 [重定向](https://en.wikipedia.org/wiki/URL_redirection) 的。

::: details `index.html`

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <link rel="shortcut icon" href="./assets/images/favicon.png" />
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    // [!code --]

    <script>
      var _hmt = _hmt || []
      ;(function () {
        var hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?c05bb16ea908292af9f6c513087a1cc3' // [!code --]
        hm.src = 'https://hm.baidu.com/hm.js?6bb9bd508871ffc19854ea3019e355f2' // [!code ++]
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
      })()
    </script>

    <script>
      // [!code --]
      ;(adsbygoogle = window.adsbygoogle || []).push({
        // [!code --]
        google_ad_client: 'ca-pub-8550836177608334', // [!code --]
        enable_page_level_ads: true, // [!code --]
      }) // [!code --]
    </script>
    // [!code --]

    <meta charset="UTF-8" />
    <title>WebStack.cc - 设计师网址导航</title>
    // [!code --]
    <title>糖加盐的导航站</title>
    // [!code ++]

    <script>
      if (navigator.appName == 'Netscape') {
        var language = navigator.language
      } else {
        var language = navigator.browserLanguage
      }

      if (language.indexOf('en') > -1) {
        document.location.href = 'en/index.html'
      } else if (language.indexOf('zh') > -1) {
        document.location.href = 'cn/index.html'
      } else {
        document.location.href = 'en/index.html'
      }
    </script>

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="author" content="viggo" />
    // [!code --]
    <meta name="author" content="jantang" />
    // [!code ++]
    <title>WebStack.cc - Collection of resources and tools for Designers</title>
    // [!code --]
    <title>Jan's navigation</title>
    // [!code ++]
    <meta
      name="keywords"
      content="UI设计,UI设计素材,设计导航,网址导航,设计资源,创意导航,创意网站导航,设计师网址大全,设计素材大全,设计师导航,UI设计资源,优秀UI设计欣赏,设计师导航,设计师网址大全,设计师网址导航,产品经理网址导航,UX师网址导航,www.webstack.cc"
    />
    // [!code --]
    <meta
      name="description"
      content="WebStack - 收集国内外优秀设计网站、UI设计资源网站、灵感创意网站、Resources网站，定时更新分享优质产品设计书签。www.webstack.cc"
    />
    // [!code --]

    <!-- / FB Open Graph -->
    // [!code --]
    <meta property="og:type" content="article" />
    // [!code --]
    <meta property="og:url" content="http://www.webstack.cc/" />
    // [!code --]
    <meta
      property="og:title"
      content="WebStack - 收集国内外优秀设计网站、UI设计资源网站、灵感创意网站、Resources网站，定时更新分享优质产品设计书签。www.webstack.cc"
    />
    // [!code --]
    <meta
      property="og:description"
      content="UI设计,UI设计素材,设计导航,网址导航,设计资源,创意导航,创意网站导航,设计师网址大全,设计素材大全,设计师导航,UI设计资源,优秀UI设计欣赏,设计师导航,设计师网址大全,设计师网址导航,产品经理网址导航,UX师网址导航,www.webstack.cc"
    />
    // [!code --]
    <meta
      property="og:image"
      content="http://www.webstack.cc/assets/images/webstack_banner_cn.png"
    />
    // [!code --]
    <meta
      property="og:site_name"
      content="WebStack - 收集国内外优秀设计网站、UI设计资源网站、灵感创意网站、Resources网站，定时更新分享优质产品设计书签。www.webstack.cc"
    />
    // [!code --]

    <!-- / Twitter Cards -->
    // [!code --]
    <meta name="twitter:card" content="summary_large_image" />
    // [!code --]
    <meta
      name="twitter:title"
      content="WebStack - 收集国内外优秀设计网站、UI设计资源网站、灵感创意网站、Resources网站，定时更新分享优质产品设计书签。www.webstack.cc"
    />
    // [!code --]
    <meta
      name="twitter:description"
      content="UI设计,UI设计素材,设计导航,网址导航,设计资源,创意导航,创意网站导航,设计师网址大全,设计素材大全,设计师导航,UI设计资源,优秀UI设计欣赏,设计师导航,设计师网址大全,设计师网址导航,产品经理网址导航,UX师网址导航,www.webstack.cc"
    />
    // [!code --]
    <meta
      name="twitter:image"
      content="http://www.webstack.cc/assets/images/webstack_banner_cn.png"
    />
    // [!code --]
  </head>

  <body>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-111463289-1"></script>
    // [!code --]
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-JYRF8GE4X6"></script>
    // [!code ++]
    <script>
      window.dataLayer = window.dataLayer || []

      function gtag() {
        dataLayer.push(arguments)
      }
      gtag('js', new Date())

      gtag('config', 'UA-111463289-1') // [!code --]
      gtag('config', 'G-JYRF8GE4X6') // [!code ++]
    </script>
  </body>
</html>
```

:::

## `/cn/about.html` 和 `/en/about.html`

首先修改 `cn/about.html`：

::: details `cn/about.html`

```html
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="author" content="viggo" /> // [!code --]
    <meta name="author" content="jantang" /> // [!code ++]
    <title>糖加盐的导航站</title>
    <meta name="keywords" content="UI设计,UI设计素材,设计导航,网址导航,设计资源,创意导航,创意网站导航,设计师网址大全,设计素材大全,设计师导航,UI设计资源,优秀UI设计欣赏,设计师导航,设计师网址大全,设计师网址导航,产品经理网址导航,交互设计师网址导航,www.webstack.cc"> // [!code --]
    <meta name="description" content="WebStack - 收集国内外优秀设计网站、UI设计资源网站、灵感创意网站、素材资源网站，定时更新分享优质产品设计书签。www.webstack.cc"> // [!code --]
    <link rel="shortcut icon" href="../assets/images/favicon.png">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Arimo:400,700,400italic">
    <link rel="stylesheet" href="../assets/css/fonts/linecons/css/linecons.css">
    <link rel="stylesheet" href="../assets/css/fonts/fontawesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="../assets/css/bootstrap.css">
    <link rel="stylesheet" href="../assets/css/xenon-core.css">
    <link rel="stylesheet" href="../assets/css/xenon-components.css">
    <link rel="stylesheet" href="../assets/css/xenon-skins.css">
    <link rel="stylesheet" href="../assets/css/nav.css">
    <script src="../assets/js/jquery-1.11.1.min.js"></script>

    <script>
        var _hmt = _hmt || [];
        (function () {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?c05bb16ea908292af9f6c513087a1cc3"; // [!code --]
            hm.src = "https://hm.baidu.com/hm.js?6bb9bd508871ffc19854ea3019e355f2"; // [!code ++]
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <!-- / FB Open Graph -->
    <meta property="og:type" content="article">  // [!code --]
    <meta property="og:url" content="http://www.webstack.cc/">  // [!code --]
    <meta property="og:title" content="WebStack - 收集国内外优秀设计网站、UI设计资源网站、灵感创意网站、素材资源网站，定时更新分享优质产品设计书签。www.webstack.cc">  // [!code --]
    <meta property="og:description" content="UI设计,UI设计素材,设计导航,网址导航,设计资源,创意导航,创意网站导航,设计师网址大全,设计素材大全,设计师导航,UI设计资源,优秀UI设计欣赏,设计师导航,设计师网址大全,设计师网址导航,产品经理网址导航,交互设计师网址导航,www.webstack.cc"> // [!code --]
    <meta property="og:image" content="http://webstack.cc/assets/images/webstack_banner_cn.png"> // [!code --]
    <meta property="og:site_name" content="WebStack - 收集国内外优秀设计网站、UI设计资源网站、灵感创意网站、素材资源网站，定时更新分享优质产品设计书签。www.webstack.cc">  // [!code --]

    <!-- / Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image"> // [!code --]
    <meta name="twitter:title" content="WebStack - 收集国内外优秀设计网站、UI设计资源网站、灵感创意网站、素材资源网站，定时更新分享优质产品设计书签。www.webstack.cc"> // [!code --]
    <meta name="twitter:description" content="UI设计,UI设计素材,设计导航,网址导航,设计资源,创意导航,创意网站导航,设计师网址大全,设计素材大全,设计师导航,UI设计资源,优秀UI设计欣赏,设计师导航,设计师网址大全,设计师网址导航,产品经理网址导航,交互设计师网址导航,www.webstack.cc"> // [!code --]
    <meta name="twitter:image" content="http://www.webstack.cc/assets/images/webstack_banner_cn.png"> // [!code --]
</head>

<body class="page-body boxed-container">
    <nav class="navbar horizontal-menu navbar-fixed-top">
        <div class="navbar-inner">
            <div class="navbar-brand">
                <a href="index.html" class="logo">
                    <img src="../assets/images/logo_dark@2x.png" width="100%" alt="" class="hidden-xs">
                    <img src="../assets/images/logo@2x.png" width="100%" alt="" class="visible-xs">
                </a>
            </div>
            <div class="navbar-mobile-clear"></div>
            <a href="https://github.com/WebStackPage/WebStackPage.github.io" target="_blank"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"></a> // [!code --]
        </div>
    </nav>
    <div class="page-container">
        <!-- add class "sidebar-collapsed" to close sidebar by default, "chat-visible" to make chat appear always -->
        <div class="main-content" style="">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default">
                        <!-- 关于网站 -->
                        <h4 class="text-gray">关于网站</h4> // [!code --]
                        <h4 class="text-gray">关于本站</h4> // [!code ++]
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <blockquote>
                                        <p>有一段时间我发现我的收藏夹越来越多，很难找到某个不常用的网站。所以就有了这个网站，这里收集的基本都是我自己浏览器收藏夹里的网站，我平时用的相对比较多的一些都在这里。</p> // [!code --]
                                        <p>浏览器书签太多了，把一些公用网站放在这。</p> // [!code ++]
                                        </br> // [!code --]
                                        <p>如果你也是设计师，如果你也正好喜欢设计，那希望这个网站能给你带来一些作用。</p> // [!code --]
                                        <p>闲聊或者有任何建议都可以加QQ群交流，一群：<strong>304584722</strong> // [!code --]
                                            二群：<strong>740911918</strong></p> // [!code --]
                                    </blockquote>
                                </div>
                            </div>
                            <!-- 关于站长 -->
                            <h4 class="text-gray">关于站长</h4> // [!code --]
                            <h4 class="text-gray">关于我</h4> // [!code ++]
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="xe-widget xe-conversations box2 label-info"
                                        onclick="window.open('http://www.viggoz.com/', '_blank')" // [!code --]
                                        onclick="window.open('http://www.tangjiayan.cn/', '_blank')" // [!code ++]data-toggle="tooltip"
                                        data-toggle="tooltip"
                                        data-placement="bottom" title="" data-original-title="http://www.viggoz.com/"> // [!code --]
                                        data-placement="bottom" title="" data-original-title="http://www.tangjiayan.cn/"> // [!code ++]
                                        <div class="xe-comment-entry">
                                            <a class="xe-user-img">
                                                <img src="../assets/images/logos/viggoz.png" class="img-circle" width="40"> // [!code --]
                                                <img src="../assets/images/avatar.png" class="img-circle" width="40"> // [!code ++]
                                            </a>
                                            <div class="xe-comment">
                                                <a href="#" class="xe-user-name overflowClip_1">
                                                    <strong>Designer. Viggo.</strong> // [!code --]
                                                    <strong>糖加盐</strong> // [!code ++]
                                                </a>
                                                <p class="overflowClip_2"> Full-time UI designer with an enduring interest in Coding.</p> // [!code --]
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-8"> // [!code --]
                                    <div class="row"> // [!code --]
                                        <div class="col-sm-12"> // [!code --]
                                            <br /> // [!code --]
                                            <blockquote> // [!code --]
                                                <p> // [!code --]
                                                    这是一个公益项目，而且是<a href="https://github.com/WebStackPage/WebStackPage.github.io">开源 </a>的。你也可以拿来制作自己的网址导航。如果你有更好的想法，可以通过个人网站<a href="http://www.viggoz.com"><span class="label label-info" data-toggle="tooltip" data-placement="left" title="" data-original-title="Hello I am a Tooltip">viggoz.com</span><a>中的联系方式找到我，欢迎与我交流分享。 // [!code --]
                                                </p> // [!code --]
                                            </blockquote> // [!code --]
                                        </div> // [!code --]
                                    </div> // [!code --]
                                    <br> // [!code --]
                                </div> // [!code --]
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Main Footer -->
            <footer class="main-footer sticky footer-type-1 fixed">
                <div class="footer-inner">
                    <div class="footer-text">
                        &copy; 2017 - 2020 // [!code --]
                        2024 &copy; <a href="https://www.tangjiayan.cn" target="_blank"><strong>糖加盐</strong></a> // [!code ++]
                        <a href="../cn/about.html"><strong>WebStack</strong></a> design by <a href="http://viggoz.com" target="_blank"><strong>Viggo</strong></a> // [!code --]
                        <br>Using <a href="https://github.com/WebStackPage/WebStackPage.github.io" target="_blank"><strong>WebStack</strong></a> // [!code ++]
                    </div>
                    <div class="go-up">
                        <a href="#" rel="go-top">
                            <i class="fa-angle-up"></i>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    <!-- Bottom Scripts -->
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/TweenMax.min.js"></script>
    <script src="assets/js/resizeable.js"></script>
    <script src="assets/js/joinable.js"></script>
    <script src="assets/js/xenon-api.js"></script>
    <script src="assets/js/xenon-toggles.js"></script>
    <!-- JavaScripts initializations and stuff -->
    <script src="assets/js/xenon-custom.js"></script>
    <textarea tabindex="-1"
        style="position: absolute; top: -999px; left: 0px; right: auto; bottom: auto; border: 0px; padding: 0px; box-sizing: content-box; word-wrap: break-word; overflow: hidden; transition: none; height: 0px !important; min-height: 0px !important; font-family: Arimo, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 400; font-style: normal; letter-spacing: 0px; text-transform: none; word-spacing: 0px; text-indent: 0px; line-height: 18.5714px; width: 53px;"
        class="autosizejs" id="autosizejs"></textarea>
</body>

</html>
```

:::

然后，直接将 `cn/about.html` 的内容复制粘贴到 `en/about.html` 里，在 `en/about.html` 里修改以下内容：

::: details [lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)

```html
<html lang="zh">
  // [!code --]
  <html lang="en-US">
    // [!code ++]
  </html>
</html>
```

:::

::: details 网页标题

```html
<title>糖加盐的导航站</title>
// [!code --]
<title>Jan's Navigation</title>
// [!code ++]
```

:::

::: details 关于本站

```html
<h4 class="text-gray">关于本站</h4>
// [!code --]
<h4 class="text-gray">About this site</h4>
// [!code ++]
```

---

```html
<div class="row">
  <div class="col-sm-12">
    <blockquote>
      <p>浏览器书签太多了，把一些公用网站放在这。</p>
      // [!code --]
      <p>I have too many browser bookmarks and put some public websites on this navigation site.</p>
      // [!code ++]
    </blockquote>
  </div>
</div>
```

:::

::: details 关于我

```html
<h4 class="text-gray">关于我</h4>
// [!code --]
<h4 class="text-gray">About me</h4>
// [!code ++]
```

---

```html
<div class="xe-comment">
  <a href="#" class="xe-user-name overflowClip_1">
    <strong>糖加盐</strong>
    // [!code --]
    <strong>Jan Tang</strong>
    // [!code ++]
  </a>
</div>
```

:::

::: details 页脚

```html
<div class="footer-text">
  2024 &copy;
  <a href="https://www.tangjiayan.cn" target="_blank"><strong>糖加盐</strong></a>
  // [!code --] 2024 &copy;
  <a href="https://www.tangjiayan.cn" target="_blank"><strong>Jan Tang</strong></a>
  // [!code ++]
  <br />
  Using
  <a href="https://github.com/WebStackPage/WebStackPage.github.io" target="_blank">
    <strong>WebStack</strong>
  </a>
</div>
```

:::

## `/cn/index.html` 和 `/en/index.html`

这两个 `index.html` 文件就是网站的主体了。

先修改 `/cn/index.html`。

其中，`page-container` 类的内容就是导航站的书签主体内容了，修改太多了，就不展示了，可以在 [github](https://github.com/tangjan/nav) 看完整代码。

::: details `cn/index.html`

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
      // [!code --]
    </script>
    // [!code --]
    <script>
      // [!code --]
      ;(adsbygoogle = window.adsbygoogle || []).push({
        // [!code --]
        google_ad_client: 'ca-pub-8550836177608334', // [!code --]
        enable_page_level_ads: true, // [!code --]
      }) // [!code --]
    </script>
    // [!code --]

    <script>
      var _hmt = _hmt || []
      ;(function () {
        var hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?c05bb16ea908292af9f6c513087a1cc3' // [!code --]
        hm.src = 'https://hm.baidu.com/hm.js?6bb9bd508871ffc19854ea3019e355f2' // [!code ++]
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
      })()
    </script>

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="author" content="viggo" />
    // [!code --]
    <meta name="author" content="jantang" />
    // [!code ++]

    <title>WebStack.cc - 设计师网址导航</title>
    // [!code --]
    <title>糖加盐的导航站</title>
    // [!code ++]
    <meta
      name="keywords"
      content="UI设计,UI设计素材,设计导航,网址导航,设计资源,创意导航,创意网站导航,设计师网址大全,设计素材大全,设计师导航,UI设计资源,优秀UI设计欣赏,设计师导航,设计师网址大全,设计师网址导航,产品经理网址导航,交互设计师网址导航,www.webstack.cc"
    />
    // [!code --]
    <meta
      name="description"
      content="WebStack - 收集国内外优秀设计网站、UI设计资源网站、灵感创意网站、素材资源网站，定时更新分享优质产品设计书签。www.webstack.cc"
    />
    // [!code --]
    <link rel="shortcut icon" href="../assets/images/favicon.png" />
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Arimo:400,700,400italic" />
    <link rel="stylesheet" href="../assets/css/fonts/linecons/css/linecons.css" />
    <link rel="stylesheet" href="../assets/css/fonts/fontawesome/css/font-awesome.min.css" />
    <link rel="stylesheet" href="../assets/css/bootstrap.css" />
    <link rel="stylesheet" href="../assets/css/xenon-core.css" />
    <link rel="stylesheet" href="../assets/css/xenon-components.css" />
    <link rel="stylesheet" href="../assets/css/xenon-skins.css" />
    <link rel="stylesheet" href="../assets/css/nav.css" />
    <script src="../assets/js/jquery-1.11.1.min.js"></script>
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- / FB Open Graph -->
    // [!code --]
    <meta property="og:type" content="article" />
    // [!code --]
    <meta property="og:url" content="http://www.webstack.cc/" />
    // [!code --]
    <meta
      property="og:title"
      content="WebStack - 收集国内外优秀设计网站、UI设计资源网站、灵感创意网站、素材资源网站，定时更新分享优质产品设计书签。www.webstack.cc"
    />
    // [!code --]
    <meta
      property="og:description"
      content="UI设计,UI设计素材,设计导航,网址导航,设计资源,创意导航,创意网站导航,设计师网址大全,设计素材大全,设计师导航,UI设计资源,优秀UI设计欣赏,设计师导航,设计师网址大全,设计师网址导航,产品经理网址导航,交互设计师网址导航,www.webstack.cc"
    />
    // [!code --]
    <meta property="og:image" content="http://webstack.cc/assets/images/webstack_banner_cn.png" />
    // [!code --]
    <meta
      property="og:site_name"
      content="WebStack - 收集国内外优秀设计网站、UI设计资源网站、灵感创意网站、素材资源网站，定时更新分享优质产品设计书签。www.webstack.cc"
    />
    // [!code --]

    <!-- / Twitter Cards -->
    // [!code --]
    <meta name="twitter:card" content="summary_large_image" />
    // [!code --]
    <meta
      name="twitter:title"
      content="WebStack - 收集国内外优秀设计网站、UI设计资源网站、灵感创意网站、素材资源网站，定时更新分享优质产品设计书签。www.webstack.cc"
    />
    // [!code --]
    <meta
      name="twitter:description"
      content="UI设计,UI设计素材,设计导航,网址导航,设计资源,创意导航,创意网站导航,设计师网址大全,设计素材大全,设计师导航,UI设计资源,优秀UI设计欣赏,设计师导航,设计师网址大全,设计师网址导航,产品经理网址导航,交互设计师网址导航,www.webstack.cc"
    />
    // [!code --]
    <meta
      name="twitter:image"
      content="http://www.webstack.cc/assets/images/webstack_banner_cn.png"
    />
    // [!code --]
  </head>

  <body class="page-body">
    <!-- skin-white -->
    <div class="page-container">// [!code warning] ... // [!code warning]</div>
    // [!code warning]

    <!-- 锚点平滑移动 -->
    <script type="text/javascript">
      $(document).ready(function () {
        //img lazy loaded
        const observer = lozad()
        observer.observe()

        $(document).on('click', '.has-sub', function () {
          var _this = $(this)
          if (!$(this).hasClass('expanded')) {
            setTimeout(function () {
              _this.find('ul').attr('style', '')
            }, 300)
          } else {
            $('.has-sub ul').each(function (id, ele) {
              var _that = $(this)
              if (_this.find('ul')[0] != ele) {
                setTimeout(function () {
                  _that.attr('style', '')
                }, 300)
              }
            })
          }
        })
        $('.user-info-menu .hidden-sm').click(function () {
          if ($('.sidebar-menu').hasClass('collapsed')) {
            $('.has-sub.expanded > ul').attr('style', '')
          } else {
            $('.has-sub.expanded > ul').show()
          }
        })
        $('#main-menu li ul li').click(function () {
          $(this).siblings('li').removeClass('active') // 删除其他兄弟元素的样式
          $(this).addClass('active') // 添加当前元素的样式
        })
        $('a.smooth').click(function (ev) {
          ev.preventDefault()

          public_vars.$mainMenu.add(public_vars.$sidebarProfile).toggleClass('mobile-is-visible')
          ps_destroy()
          $('html, body').animate(
            {
              scrollTop: $($(this).attr('href')).offset().top - 30,
            },
            {
              duration: 500,
              easing: 'swing',
            },
          )
        })
        return false
      })

      var href = ''
      var pos = 0
      $('a.smooth').click(function (e) {
        $('#main-menu li').each(function () {
          $(this).removeClass('active')
        })
        $(this).parent('li').addClass('active')
        e.preventDefault()
        href = $(this).attr('href')
        pos = $(href).position().top - 30
      })
    </script>
    <!-- Bottom Scripts -->
    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js/TweenMax.min.js"></script>
    <script src="../assets/js/resizeable.js"></script>
    <script src="../assets/js/joinable.js"></script>
    <script src="../assets/js/xenon-api.js"></script>
    <script src="../assets/js/xenon-toggles.js"></script>
    <!-- JavaScripts initializations and stuff -->
    <script src="../assets/js/xenon-custom.js"></script>
    <script src="../assets/js/lozad.js"></script>
  </body>
</html>
```

:::

同理，修改好后将其整个复制粘贴到 `/en/index.html` 中，修改 `/en/index.html` 的以下内容：

::: details lang

```html
<html lang="zh">
  // [!code --]
  <html lang="en-US">
    // [!code ++]
  </html>
</html>
```

:::

::: details 网页标题

```html
<title>糖加盐的导航站</title>
// [!code --]
<title>Jan's Navigation</title>
// [!code ++]
```

:::

::: details 切换语言按钮

```html
<a href="../cn/index.html" class="dropdown-toggle" data-toggle="dropdown">
  <img src="../assets/images/flags/flag-cn.png" alt="flag-cn" />
  Chinese // [!code --]
  <img src="../assets/images/flags/flag-us.png" alt="flag-cn" />
  English // [!code ++]
</a>
```

:::

::: details 页脚

```html
<div class="footer-text">
  2024 &copy;
  <a href="https://www.tangjiayan.cn" target="_blank"><strong>糖加盐</strong></a>
  // [!code --] 2024 &copy;
  <a href="https://www.tangjiayan.cn" target="_blank"><strong>Jan Tang</strong></a>
  // [!code ++]
  <br />
  Using
  <a href="https://github.com/WebStackPage/WebStackPage.github.io" target="_blank">
    <strong>WebStack</strong>
  </a>
</div>
```

:::

另外，在给书签添加图标的过程中，发现有些网站的图标原本是方形的（比如 [Instagram](https://www.instagram.com/)、[StackOverflow](https://stackoverflow.com/)、[YouTube](https://www.youtube.com/)），用默认的圆形类 `img-circle` 会被裁剪掉一部分，不好看。

所以我在 `/assets/css/nav.css` 里加了个 `image-square` 类，需要显示为正方形的就用这个类。

```css
.img-square {
  padding: 7px 0;
}
```

## 参考

- [Colored Diffs in Code Blocks | VitePress](https://vitepress.dev/guide/markdown#colored-diffs-in-code-blocks)
- [Diffchecker](https://www.diffchecker.com/zh-Hans/)
- [iconfont-阿里巴巴矢量图标库](https://www.iconfont.cn/)
- [高效书签管理，我是如何管理 5000 条书签的 - 奔跑中的奶酪](https://www.runningcheese.com/bm)
- [你的浏览器书签是怎么分类的？欢迎强迫症整理癖人士回答 👏🏻 - V2EX](https://www.v2ex.com/t/983060)
