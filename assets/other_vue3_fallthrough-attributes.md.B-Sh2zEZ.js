import{_ as n,o as a,c as p,I as l,a5 as e,D as t}from"./chunks/framework._yq8SQnG.js";const i="/assets/FSqCfF4VNHqiPRLRgXs8iFY_BxNXmOBk023gKDw12kg.BLdRjWP1.png",r="/assets/BHWy6b3SwhxqWar7HUIqW8ctN_e906C8I6BdWdGISxM.C_7qqjOM.png",c="/assets/pSou60RRwElNK7OCTW9N99YN07-tA6TYf6PEunxtCx0.DdE4lqhy.png",b="/assets/ZzQX9Wa5qlSJiAONfb1sdD6U3PB9TVRPOxNs_EAf7Q.HwtucAP1.png",u="/assets/4jHuQZ0wj7RZ9S-Vo_NxIHVwcNELcy6G7Dv8Fs2YL8Y.DlFBLepK.png",o="/assets/yIO32EqpjBkIXeamXlkTpiq631FrWFjB2iErl2mX0Kw.BM3BuYJO.png",m="/assets/vpxBQ9X4X4QsCJgn2r-Ky1drDwrU1KAXQ4lPldtHf84.BJo70FZA.png",g="/assets/2lfUxvdQTp4KQREGJ0p-rcP6kov6ovXLbLD6IXDEbU8.DtR9SonO.png",x=JSON.parse('{"title":"透传 Attributes","description":"","frontmatter":{},"headers":[],"relativePath":"other/vue3/fallthrough-attributes.md","filePath":"other/vue3/fallthrough-attributes.md","lastUpdated":1724312588000}'),d={name:"other/vue3/fallthrough-attributes.md"},h=e(`<h1 id="透传-attributes" tabindex="-1">透传 Attributes <a class="header-anchor" href="#透传-attributes" aria-label="Permalink to &quot;透传 Attributes&quot;">​</a></h1><p>直接说透传 Attributes 我们可能是有点陌生，但在组件封装的时候我们常见到的$attrs 肯定是熟悉的，所谓透传就是我们使用$attrs 将父组件的未声明的 Props 直接传递给子组件内部的 HTML 标签或自定义组件。</p><p>使用透传简化了属性传递的流程，我们不需要通过 props 将父组件的属性逐层传递下去，并且可以直接在子组件中访问到父组件的属性。</p><p>透传传递的属性包括变量、方法、class、style 和 id。</p><h2 id="_1-透传-class、style-和-id" tabindex="-1">1.透传 class、style 和 id <a class="header-anchor" href="#_1-透传-class、style-和-id" aria-label="Permalink to &quot;1.透传 class、style 和 id&quot;">​</a></h2><p>1.1 样式可直接透传给子组件</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 父组件中加载子组件，并在父组件中定义类名</span></span>
<span class="line"><span>// 父组件</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;ComAttrs class=&quot;parent-style&quot;&gt;&lt;/ComAttrs&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span>import ComAttrs from &#39;./ComAttrs.vue&#39;</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span>&lt;style lang=&quot;less&quot; scoped&gt;</span></span>
<span class="line"><span>.parent-style {</span></span>
<span class="line"><span>  background: red;</span></span>
<span class="line"><span>  color: #fff;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/style&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 子组件</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;h3&gt;你好，我是子组件&lt;/h3&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>&lt;script setup lang=&quot;ts&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>&lt;style lang=&quot;scss&quot; scoped&gt;&lt;/style&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>页面效果：</p><p><img src="`+i+`" alt="image" loading="lazy"> 1.2 class、style 的合并</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 同时在引用组件及子组件上分别定义类名，会进行合并。</span></span>
<span class="line"><span>// 父组件</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;ComAttrs class=&quot;parent-style&quot;&gt;&lt;/ComAttrs&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span>import ComAttrs from &#39;./ComAttrs.vue&#39;</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span>&lt;style lang=&quot;less&quot; scoped&gt;</span></span>
<span class="line"><span>.parent-style {</span></span>
<span class="line"><span>  background: red;</span></span>
<span class="line"><span>  color: #fff;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/style&gt;</span></span>
<span class="line"><span>// 子组件</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;h3 class=&quot;children-style&quot;&gt;你好，我是子组件&lt;/h3&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>&lt;script setup lang=&quot;ts&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>&lt;style lang=&quot;less&quot; scoped&gt;</span></span>
<span class="line"><span>.children-style {</span></span>
<span class="line"><span>  color: blue;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/style&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>页面效果：</p><p><img src="`+r+`" alt="image" loading="lazy"></p><h2 id="_2-父组件传递属性-子组件获取传递过来的属性" tabindex="-1">2.父组件传递属性，子组件获取传递过来的属性 <a class="header-anchor" href="#_2-父组件传递属性-子组件获取传递过来的属性" aria-label="Permalink to &quot;2.父组件传递属性，子组件获取传递过来的属性&quot;">​</a></h2><ul><li>子组件只有一个根元素，父级透传的 attribute 会自动被添加到根元素上。</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 父节点</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;ComAttrs</span></span>
<span class="line"><span>    class=&quot;parent-style&quot;</span></span>
<span class="line"><span>    name=&quot;张三&quot;</span></span>
<span class="line"><span>    age=&quot;28&quot;</span></span>
<span class="line"><span>  &gt; &lt;/ComAttrs&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span>import ComAttrs from &#39;./ComAttrs.vue&#39;</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span>&lt;style lang=&quot;less&quot; scoped&gt;</span></span>
<span class="line"><span>.parent-style {</span></span>
<span class="line"><span>  background: red;</span></span>
<span class="line"><span>  color: #fff;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/style&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 子组件通过useAttrs 接收</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div&gt;</span></span>
<span class="line"><span>    &lt;h3&gt;我是子组件&lt;/h3&gt;</span></span>
<span class="line"><span>    &lt;p&gt;姓名：{{ attrs.name }}&lt;/p&gt;</span></span>
<span class="line"><span>    &lt;p&gt;年龄：{{ attrs.age }}&lt;/p&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span>import { useAttrs } from &#39;vue&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const attrs = useAttrs()</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span>&lt;style lang=&quot;less&quot; scoped&gt;</span></span>
<span class="line"><span>.children-style {</span></span>
<span class="line"><span>  color: blue;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/style&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><ul><li>子组件存在多个根元素的时候，不会自动 attribute 透传行为，如果$attrs 没有被显示绑定，将会抛出一个运行时警告。</li></ul><p><img src="`+c+`" alt="image" loading="lazy"></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>// 显式绑定$attrs</span></span>
<span class="line"><span>  &lt;div v-bind=&quot;$attrs&quot;&gt;</span></span>
<span class="line"><span>    &lt;h3&gt;我是子组件&lt;/h3&gt;</span></span>
<span class="line"><span>    &lt;p&gt;姓名：{{ $attrs.name }}&lt;/p&gt;</span></span>
<span class="line"><span>    &lt;p&gt;年龄：{{ $attrs.age }}&lt;/p&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>  &lt;div&gt;我是另一个根元素&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><ul><li>若不做显式绑定，也可以直接通过$attrs 来访问到透传过来的属性，那么在有多个根节点时候进行显式绑定的意义是什么？</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 父组件</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div&gt;</span></span>
<span class="line"><span>    &lt;ComAttrs id=&quot;parentId&quot; class=&quot;parent-style&quot; name=&quot;张三&quot; age=&quot;28&quot;&gt; &lt;/ComAttrs&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span>import ComAttrs from &#39;./ComAttrs.vue&#39;</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span>&lt;style lang=&quot;less&quot; scoped&gt;</span></span>
<span class="line"><span>.parent-style {</span></span>
<span class="line"><span>  background: red;</span></span>
<span class="line"><span>  color: #fff;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/style&gt;</span></span>
<span class="line"><span>// 子组件没有做显式绑定</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;children-style&quot;&gt;</span></span>
<span class="line"><span>    &lt;h3&gt;我是子组件&lt;/h3&gt;</span></span>
<span class="line"><span>    &lt;p&gt;姓名：{{ $attrs.name }}&lt;/p&gt;</span></span>
<span class="line"><span>    &lt;p&gt;年龄：{{ $attrs.age }}&lt;/p&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>  &lt;div&gt;我是另一个根元素&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span>&lt;style lang=&quot;less&quot; scoped&gt;</span></span>
<span class="line"><span>.children-style {</span></span>
<span class="line"><span>  color: blue;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/style&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>页面效果：</p><p><img src="`+b+'" alt="image" loading="lazy"></p><p>仔细观察上图的页面效果展示图，可以发现在父组件引用子组件的时候，我们定义了 id、class 都没有透传给子组件，当我们进行显式绑定后的页面效果如下图：（父级类名虽然透传过来了，但由于存在多个根元素，所以父级的样式还没有起作用）</p><p><img src="'+u+'" alt="image" loading="lazy"></p><h2 id="_3-深层组件继承" tabindex="-1">3.深层组件继承 <a class="header-anchor" href="#_3-深层组件继承" aria-label="Permalink to &quot;3.深层组件继承&quot;">​</a></h2><ul><li>存在两级以上组件进行透传的时候，最底层组件能获取到最顶层透传过来的属性，但是最顶层通过 prop 或者 emits 声明的事件传递给中间层，最底层是没办法获取到的。 按照官方的说法： 声明过的 props 和侦听函数被中间层“消费”了</li><li>组件透传截图</li></ul><p><img src="'+o+'" alt="image" loading="lazy"></p><ul><li>页面效果</li></ul><p><img src="'+m+'" alt="image" loading="lazy"></p><h2 id="_4-禁用-attributes-继承" tabindex="-1">4.禁用 Attributes 继承 <a class="header-anchor" href="#_4-禁用-attributes-继承" aria-label="Permalink to &quot;4.禁用 Attributes 继承&quot;">​</a></h2><ul><li>使用场景： 如果你不想要一个组件自动的继承 attribute(这句话的意思是单个根元素都是自动透传继承的，尤其是类名都会自动透传给子组件，如果你不想要子组件自动继承父组件的样式),就可以在组件选项中设置 inheritAttrs:false。但还是可以通过$attrs 访问到透传过来的属性。 页面效果：</li></ul><p><img src="'+g+`" alt="image" loading="lazy"></p><ul><li>组件选项中设置 inheritAttrs:false， 如果你使用了<code>&lt;script setup&gt;&lt;/script&gt;</code>,你需要一个额外的<code>&lt;script&gt;&lt;/script&gt;</code>块来书写这个选项声明。</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;children-style&quot;&gt;</span></span>
<span class="line"><span>    &lt;p&gt;姓名：{{ $attrs.name }}&lt;/p&gt;</span></span>
<span class="line"><span>    &lt;p&gt;组件ComAttrs: 父级通过props传递过来的title: {{ title }}&lt;/p&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>&lt;script lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  inheritAttrs: false</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span>&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span>defineProps&lt;{</span></span>
<span class="line"><span>  title: string</span></span>
<span class="line"><span>}&gt;()</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;style lang=&quot;less&quot; scoped&gt;</span></span>
<span class="line"><span>.children-style {</span></span>
<span class="line"><span>  color: blue;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/style&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><ul><li>从 vue3.3 开始，可以直接在<code>&lt;script setup&gt;&lt;/script/&gt;</code>中使用 defineOptions,</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span>defineOptions({</span></span>
<span class="line"><span>  inheritAttrs: false</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="_5-注意" tabindex="-1">5.注意 <a class="header-anchor" href="#_5-注意" aria-label="Permalink to &quot;5.注意&quot;">​</a></h2><ul><li>和 props 有所不同，透传 attributes 在 JavaScript 中保留了他们原始的大小写，所以像 foo-bar 这样一个 attribute 需要通过$attrs[&#39;foo-bar&#39;]来访问。</li><li>像@click 这样一个 v-on 事件监听器将在此对象下被暴露为一个函数$attrs.onClick;</li><li>没有参数的 v-bind 会将一个对象的所有属性都作为 attribute 应用到目标元素上。</li><li>attrs 对象虽然总是反映为最新的透传 attribute,但它并非响应式的（考虑到性能因素）。因此不能通过侦听器去监听他的变化。如果需要响应性，可以使用 prop。或者也可以使用 onUpdated()是的在每次更新时结合最新的 attrs 执行副作用。</li></ul>`,38);function q(v,y,_,f,k,C){const s=t("BackTop");return a(),p("div",{"data-pagefind-body":!0},[l(s),h])}const P=n(d,[["render",q]]);export{x as __pageData,P as default};
