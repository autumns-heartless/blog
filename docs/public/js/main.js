/*
 *--------------字符串命名说明--------------------
 * introduce = 介绍
 * sty1 ==the first  style   第一种样式
 * trs1 = the first transition language   第一组过渡语
 * lingtheight == gramm lightheight     高亮语法
 * scrollRight == 源码版向右移动
 * drawBoard ==画板，用于盛放简历内容
 * resume == 简历内容
 * str == 总的拼接字符串
 *
 */

/*字符拼接区*/
var introduce =
  '\n  /*我叫张三，来自广东深圳*/\n  /*我今年10岁，毕业于哈佛商学院，吹牛大王专业*/\n  /*接触前端一年，我的理想是当一名前端工程师*/\n  /*来看看我为你准备的菜，先来点CSS，加点基本样式......*/'

var sty1 = `
  body {
    transition: all 1s;
    background: #3f5263;
  }

  #sourceBoard {
    font-family: "微软雅黑";
    overflow: auto;
    border: 3px solid black;
    border-radius: 5px;
    width: 500px;
    height: 100vh;
    font-size: 14px;
    font-weight: 900;
  }
`
var trs1 = '\n  /*似乎有点单调，那么就让语法高亮吧*/'

var lightheight = `
  #sourceBoard {
    background: #ffffcc;
  }

  .token.property {
    color: #905;
  }

  .token.comment {
     color: #cc3300;
  }

  .token.selector {
    color: #690;
  }
`
var trs2 = '  /*接下来，我需要准备一下简历。先将刚才写的样式踢到一边儿去*/'

var scrollRight = `
  #sourceBoard {
    -webkit-transform: rotateY(10deg);
    -moz-transform: rotateX(10deg);
     position: relative;
    left: 65%;
  }
`
var drawBoard = `
  #drawBoard {
    color: #fff;
    float: left;
    position: relative;
    top: -440px;
    width: 860px;
    height: 100vh;
    border: 5px solid black;
    border-radius: 5px;
    overflow: auto;
  }
`

var resume = `
# 张鑫_前端开发简历

## 个人信息
- 姓名: 张鑫
- 性别: 男
- 出生年月: 1997-11
- 联系电话: 13488603307
- 求职岗位: 前端开发
- 到岗时间: 另行商议

## 教育背景
- 中国矿业大学 计算机科学与技术（本科）

## 技能特长
- 熟练使用 Git 版本管理、代码整合，带领团队协作开发
- 精通使用 HTML5、CSS3，Flex布局能高度还原UI设计图
- 熟练使用 Sass、Less 等CSS预处理器
- 熟悉面向对象 JS 编程
- 熟悉 Vue2，对Vue源码有一定了解
- 熟悉 Vue3、Ts
- 熟悉 微信小程序、Uniapp 多端开发
- 熟悉 Echarts 图表、DataV 可视化
- 熟悉 Vant、Element-ui、Uview、Ant-design 等组件库
- 熟悉 Webpack、Vite 打包工具
- 了解前端工程化，如组件化开发、模块化管理
- 熟悉 vitepress，搭建并持续更新个人博客

## 工作经历

### 宁夏瑞斯软件有限公司
- &zwnj;**职位**&zwnj;: 前端开发主管
- &zwnj;**职责**&zwnj;:
  - 负责技术框架选型与优化
  - 搭建前端组件库
  - 进行前端人员定期培训
  - 安排前端人员工作
  - 制定前端规范与规划

### 亚信科技（中国）有限公司
- &zwnj;**职位**&zwnj;: 前端开发
- &zwnj;**职责**&zwnj;:
  - 负责 PC、移动端功能开发
  - 设计、维护通用业务组件库
  - 参与制定代码规范、前端开发流程等文件
  - 研究新技术，优化产品体验

## 项目经验

### 东方购物（电视购物） ERP项目
- &zwnj;**职责**&zwnj;:
  - 品牌域管理、创建与模板创建
  - 产品域数据展示与上下架
  - 类目层级关系搭建
  - 供应商域业务串联与组件封装
  - 参与客服订单域 bug 解决
- &zwnj;**技术栈**&zwnj;: Vue2、Echarts

### 国家电网数据可视化（移动端）
- &zwnj;**职责**&zwnj;:
  - 框架搭建与技术选型
  - Echarts 图表构建与打印
  - 数据表格导入
- &zwnj;**技术栈**&zwnj;: Echarts、Html2canvas

### 中国移动和动力（Vue3）
- &zwnj;**职责**&zwnj;:
  - 主导渠道商模块开发
  - 封装组件与布局
  - 安全中心密码加密
  - 支付中心支付处理
- &zwnj;**技术栈**&zwnj;: Vue3、element-plus、Axios

### 葡萄酒项目
- &zwnj;**职责**&zwnj;:
  - 项目收尾与需求验收
  - 地图电子围栏绘制
  - 气象大屏PDF预览
  - 项目性能与打包优化
- &zwnj;**技术栈**&zwnj;: Vue2、Echarts、webpack

### 宁夏宣传部项目
- &zwnj;**职责**&zwnj;:
  - 组件库搭建、样式抽取与框架优化
  - 后台管理页面快速生成培训
  - 子系统业务开发与任务安排
- &zwnj;**亮点**&zwnj;:
  - 问卷调查模块动态渲染
  - 动态表单生成问卷
  - 专题建设评论组件
- &zwnj;**技术栈**&zwnj;: Vue2、Vue3、Echarts

## 自我评价
- 热衷于提升生产力和效率
- 抗压能力强，追求目标快速达成
- 喜欢钻研前沿技术
- 沟通能力强

## 博客
- CSDN博客：[我的CSDN博客](http://blog.csdn.net/qq_20264891)
- GitHub博客：[我的GitHub博客](https://ZQ-jhon.github.io)
`

var trs3 =
  '\n  /*对了，这个简历是markdown语法，应该改成html才看着舒服。\n  *接下来变个魔术\n  *倒数3个数字\n  *3......\n  *2......\n  *1......\n  *OK,这就是为您准备的菜，祝享用愉快！ */'
var str = introduce
  .concat(sty1)
  .concat(trs1)
  .concat(lightheight)
  .concat(trs2)
  .concat(scrollRight)
  .concat(drawBoard)
  .concat(resume)
  .concat(trs3)

/*常规定义区*/
var styleTag = document.getElementById('styleTag')
var sourceBoard = document.getElementById('sourceBoard')
var n = 0

/*源码版控制区*/
var controller = setInterval(put, 90)
function put() {
  /*吐代码区域*/
  n++

  if (n > 0 && n <= 929) {
    sourceBoard.innerHTML = str.substring(0, n)

    styleTag.innerHTML = str.substring(0, n)
  }

  /*溢出下拉*/
  if (n >= 380) {
    $('#sourceBoard').animate(
      {
        scrollTop: 1000,
      },
      50,
    )
  }
  /*代码高亮*/
  if (n >= 465 && n <= 929) {
    sourceBoard.innerHTML = Prism.highlight(str.substring(0, n), Prism.languages.css)
  }

  /*创建pre简历板*/
  if (n >= 672 && n <= 929) {
    if (document.getElementById('drawBoard')) {
      console.log('drawBoard元素已经存在')
    } else {
      var drawBoard = document.createElement('pre')
      drawBoard.id = 'drawBoard'
      document.body.appendChild(drawBoard)
    }
  }

  /*简历板溢出下拉*/
  if (n > 929 && n < 1885) {
    var drawBoard = document.getElementById('drawBoard')
    drawBoard.innerHTML = str.substring(929, n)

    $('#drawBoard').animate(
      {
        scrollTop: 1000,
      },
      50,
    )
  }

  /*简历板写完之后，需要在sourceBoard中写入魔术代码*/
  if (n >= 1885) {
    sourceBoard.innerHTML =
      Prism.highlight(str.substring(0, 929), Prism.languages.css) +
      Prism.highlight(str.substring(1883, n), Prism.languages.css)
  }

  /*魔术代码*/
  if (n >= 1977) {
    var drawBoard = document.getElementById('drawBoard')
    drawBoard.innerHTML = marked(str.substring(929, 1885))

    if (n > str.length) {
      window.clearInterval(controller)
    }
  }

  console.log(n)
}
