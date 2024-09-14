import{_ as a,o as p,c as e,G as l,a3 as i,B as r}from"./chunks/framework.C9J_1yf-.js";const g=JSON.parse('{"title":"写给懒人的 Vue3 速查宝典","description":"","frontmatter":{},"headers":[],"relativePath":"other/vue3/quickSearchTreasureBook.md","filePath":"other/vue3/quickSearchTreasureBook.md","lastUpdated":1726295847000}'),c={name:"other/vue3/quickSearchTreasureBook.md"};function t(b,s,u,o,m,d){const n=r("BackTop");return p(),e("div",{"data-pagefind-body":!0},[l(n),s[0]||(s[0]=i(`<h1 id="写给懒人的-vue3-速查宝典" tabindex="-1">写给懒人的 Vue3 速查宝典 <a class="header-anchor" href="#写给懒人的-vue3-速查宝典" aria-label="Permalink to &quot;写给懒人的 Vue3 速查宝典&quot;">​</a></h1><p><strong>Vue 3 相对于 Vue 2 有许多改进和新功能，其中一些主要的变化包括：</strong></p><ol><li><code>使用 Composition API</code>：Vue 3 引入了 Composition API，这是一种新的、更灵活的组件编写方式，允许更好地组织和复用代码。</li><li><code>改进的性能</code>：Vue 3 在性能方面进行了许多改进，包括更快的渲染速度、更小的捆绑体积和更好的内存管理。</li><li><code>更好的 TypeScript 支持</code>：Vue 3 提供了更好的 TypeScript 支持，包括类型推断和类型注解。</li><li><code>新的路由器和状态管理库</code>：Vue 3 引入了新的路由器和状态管理库，称为 Vue Router 和 Vuex 4。</li><li><code>更好的 tree-shaking 支持</code>：Vue 3 更好地支持 tree-shaking，这意味着在生产环境中，只打包实际使用的代码，从而减少应用程序的大小。</li></ol><h3 id="setup" tabindex="-1">setup <a class="header-anchor" href="#setup" aria-label="Permalink to &quot;setup&quot;">​</a></h3><p>在 Vue 3 中，<code>setup</code> 是一个新的组件选项，用于定义组件的逻辑和状态。通过使用 setup，可以更清晰地组织组件的逻辑和状态，并使其更易于测试和维护。<code>也可以直接把setup写在script标签上哦</code>。</p><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;section&gt;     </span></span>
<span class="line"><span>    {{ count }}    </span></span>
<span class="line"><span>  &lt;/section&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>  export default {    </span></span>
<span class="line"><span>     name: &#39;MyComponent&#39;,</span></span>
<span class="line"><span>      setup() {      </span></span>
<span class="line"><span>        const count = ref(0);    </span></span>
<span class="line"><span>        const increment = () =&gt; {</span></span>
<span class="line"><span>            count.value++;       </span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>        return {       </span></span>
<span class="line"><span>            count,        </span></span>
<span class="line"><span>            increment       </span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="响应式数据" tabindex="-1">响应式数据 <a class="header-anchor" href="#响应式数据" aria-label="Permalink to &quot;响应式数据&quot;">​</a></h3><p>使用<code>reactive</code>创建对象类型响应式数据，如果给 reactive 重新分配一个对象，会失去响应式，可以使用<code>Object.assign()</code>去整体替换。使用 ref 创建基本类型响应数据</p><blockquote><p>ref 也可以创建对象类型的响应数据。若层级较深，建议 reactive</p></blockquote><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;script setup&gt;     </span></span>
<span class="line"><span>  import { reactive, ref } from &#39;vue&#39;;     </span></span>
<span class="line"><span>  let obj = reactive({       </span></span>
<span class="line"><span>    a: 1,       </span></span>
<span class="line"><span>    b: {         </span></span>
<span class="line"><span>      c: 3,  </span></span>
<span class="line"><span>      d: 4   </span></span>
<span class="line"><span>    }     </span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>  let str = ref(&#39;hi&#39;);</span></span>
<span class="line"><span>  const fnc = () =&gt; {       </span></span>
<span class="line"><span>    str.value = &#39;hello!&#39;; // 记得加.value    </span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="解构响应式对象" tabindex="-1">解构响应式对象 <a class="header-anchor" href="#解构响应式对象" aria-label="Permalink to &quot;解构响应式对象&quot;">​</a></h3><p><code>toRefs</code>可用来解构，该对象的每个属性都是独立的 ref 对象，并保持响应式</p><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { reactive, toRefs } from &#39;vue&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let info = reactive({     </span></span>
<span class="line"><span>  name: &#39;Echo&#39;,     </span></span>
<span class="line"><span>  age: 26,     </span></span>
<span class="line"><span>  gender: &#39;Male&#39;</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let { name, age, gender } = toRefs(info); // 解构数据，并保持响应式</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="如何监听多个数据" tabindex="-1">如何监听多个数据？ <a class="header-anchor" href="#如何监听多个数据" aria-label="Permalink to &quot;如何监听多个数据？&quot;">​</a></h3><p>监听多个数据，第一个参数需用数组包起来；如果监听非对象类型，需写成函数形式，若监听 reactive 定义的对象类型，就默认开启深度监听。</p><p>开启 immediate ：上来就调用监听里的内容，类似 react 中的 useEffect(()=&gt;{},[])</p><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { watch } from &#39;vue&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 监听active、type</span></span>
<span class="line"><span>watch(</span></span>
<span class="line"><span>  [() =&gt; props.active, ()=&gt; props.type],</span></span>
<span class="line"><span>  (nv, ov) =&gt; {</span></span>
<span class="line"><span>    // nv代表最新数据，ov是老数据     console.log(nv)     //开启deep代表深度监听</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  { deep:true, immediate: true }</span></span>
<span class="line"><span>)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="解放双手-自动检测变化" tabindex="-1">解放双手，自动检测变化 <a class="header-anchor" href="#解放双手-自动检测变化" aria-label="Permalink to &quot;解放双手，自动检测变化&quot;">​</a></h3><p><code>watchEffect</code>可以自动检测到属性的变化，无需手动指定要监听的属性。</p><p>与传统的 watch 不同，watchEffect 会在属性变化时自动执行副作用函数，并且可以返回一个清理函数，用于在组件卸载时清理副作用。</p><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { watchEffect } from &#39;vue&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 只要temp.val跟json.val发生变更，就会自动执行watchEffect内的副作用函数</span></span>
<span class="line"><span>watchEffect(() =&gt; {     </span></span>
<span class="line"><span>  if(temp.val &gt; 60 || json.val &gt; 60){</span></span>
<span class="line"><span>    console.log(&#39;发送请求&#39;)     </span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="接收-props" tabindex="-1">接收 props <a class="header-anchor" href="#接收-props" aria-label="Permalink to &quot;接收 props&quot;">​</a></h3><p>父子组件传值，需要使用<code>defineProps</code>接收 props，案例如下：</p><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;script setup&gt;</span></span>
<span class="line"><span>import { defineProps } from &#39;vue&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//子组件接收props    </span></span>
<span class="line"><span>const props = defineProps({</span></span>
<span class="line"><span>    language: {</span></span>
<span class="line"><span>      type: Object,    </span></span>
<span class="line"><span>       // 也可以使用withDefaults设置默认值     </span></span>
<span class="line"><span>      default: () =&gt; ({}),    </span></span>
<span class="line"><span>    },       </span></span>
<span class="line"><span>    cookieCountry: {        </span></span>
<span class="line"><span>       type: String,      </span></span>
<span class="line"><span>       default: &#39;&#39;    </span></span>
<span class="line"><span>    }    </span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="ref-属性-父子交互" tabindex="-1">Ref 属性（父子交互） <a class="header-anchor" href="#ref-属性-父子交互" aria-label="Permalink to &quot;Ref 属性（父子交互）&quot;">​</a></h3><p>通过 <code>Ref 属性</code>，可以从父组件中访问子组件的属性和方法，或者直接操作 DOM 元素。</p><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>    &lt;section ref=&quot;myDiv&quot;&gt;Hello, World!&lt;/section&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>import { ref, onMounted } from &#39;vue&#39;;</span></span>
<span class="line"><span>    export default {</span></span>
<span class="line"><span>        setup() {</span></span>
<span class="line"><span>            const myDiv = ref(null);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // mounted是生命周期，代表挂载完毕</span></span>
<span class="line"><span>            onMounted(() =&gt; {       </span></span>
<span class="line"><span>              myDiv.value.style.color = &#39;red&#39;; // 将myDiv的颜色改成红色     </span></span>
<span class="line"><span>            });         </span></span>
<span class="line"><span></span></span>
<span class="line"><span>           return {</span></span>
<span class="line"><span>               myDiv</span></span>
<span class="line"><span>           };</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><blockquote><p>如果父组件想访问子组件的内容，子组件需使用 defineExpose 将内容导出。</p></blockquote><p>defineExpose 将组件中的属性或方法暴露给外部环境，以便在其他组件或模板中使用。</p><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;      </span></span>
<span class="line"><span>  &lt;card-num ref=&quot;cardNumRef&quot; /&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script setup&gt;     </span></span>
<span class="line"><span>import { ref } from &#39;vue&#39;;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>const resetAllRefData = () =&gt; {       </span></span>
<span class="line"><span>  console.log(cardNumRef.value.cardNo) // 获取子组件中的cardNo值     </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>cardNum 组件：</p><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;script setup&gt;</span></span>
<span class="line"><span>     import { defineExpose } from &#39;vue&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     const resetData = () =&gt; {       </span></span>
<span class="line"><span>        cardNo.value = &#39;&#39;       </span></span>
<span class="line"><span>        cardNum.value = &#39;&#39;     </span></span>
<span class="line"><span>     }     </span></span>
<span class="line"><span></span></span>
<span class="line"><span>     // 暴露     </span></span>
<span class="line"><span>     defineExpose({ resetData })</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="自定义事件" tabindex="-1">自定义事件 <a class="header-anchor" href="#自定义事件" aria-label="Permalink to &quot;自定义事件&quot;">​</a></h3><p><code>defineEmits</code> 是 Vue 3 中的一个新特性，它允许你在组件中自定义事件。在父组件中，可以使用 v-on 指令来监听自定义事件。</p><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;    </span></span>
<span class="line"><span>&lt;!-- 自定义一个叫update的事件 --&gt;     </span></span>
<span class="line"><span>  &lt;Child @update=&quot;onUpdate&quot;/&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script setup&gt;     </span></span>
<span class="line"><span>import Child from &#39;/Child.vue&#39;;</span></span>
<span class="line"><span>       </span></span>
<span class="line"><span>const onUpdate = (value) =&gt; {       </span></span>
<span class="line"><span>  console.log(value) // 666     </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>Child 组件：</p><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;     </span></span>
<span class="line"><span>  &lt;!-- 点击button，将666传给父，emits 触发事件 --&gt;    </span></span>
<span class="line"><span>  &lt;button @click=&quot;emits(&#39;update&#39;,666)&quot;/&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script setup&gt;     </span></span>
<span class="line"><span>import { defineEmits,onMounted } from &#39;vue&#39;;</span></span>
<span class="line"><span>         </span></span>
<span class="line"><span>// 定义 emits     </span></span>
<span class="line"><span>const emits = defineEmits([&#39;update&#39;])</span></span>
<span class="line"><span>// 接收事件名update</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="vue3-生命周期" tabindex="-1">vue3 生命周期 <a class="header-anchor" href="#vue3-生命周期" aria-label="Permalink to &quot;vue3 生命周期&quot;">​</a></h3><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;script setup&gt;     </span></span>
<span class="line"><span>import { onMounted,onBeforeMount,onUpdated,unmounted } from &#39;vue&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 挂载前</span></span>
<span class="line"><span>  onBeforeMount(()=&gt;{})</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>  // 挂载完毕     </span></span>
<span class="line"><span>  onMounted(()=&gt;{})</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>  // 更新完毕     </span></span>
<span class="line"><span>  onUpdated(()=&gt;{})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 卸载完毕</span></span>
<span class="line"><span>  onUnmounted(()=&gt;{})</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><code>beforeCreate</code>: 在实例初始化之后。</p><p><code>created</code>: 在实例创建完成后被立即调用。</p><p><code>beforeUpdate</code>: 数据更新时。</p><p><code>beforeUnmount</code>: 实例销毁之前。</p><p>以此类推...</p><h3 id="作用域插槽" tabindex="-1">作用域插槽 <a class="header-anchor" href="#作用域插槽" aria-label="Permalink to &quot;作用域插槽&quot;">​</a></h3><p>作用域插槽，它允许你在一个组件中定义具有局部作用域的插槽。通过作用域插槽，可以将组件的属性传递给插槽内容，从而使插槽内容能够根据组件的状态进行动态渲染。<br> 作用域插槽使用 <code>v-slot</code> 指令来定义，它可以接受一个参数，该参数指定了要传递给插槽的属性名。<br> 下面是具名插槽+作用域插槽的例子：</p><blockquote><p>如果不写名字就是默认插槽</p></blockquote><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- &lt;template #ScopedSlot=&quot;{list}&quot;&gt;&lt;/template&gt; --&gt;</span></span>
<span class="line"><span>&lt;template&gt;     </span></span>
<span class="line"><span>  &lt;SlotComponent&gt;       </span></span>
<span class="line"><span>      &lt;!-- ScopedSlot是插槽名，params子组件传的是参数 --&gt;       </span></span>
<span class="line"><span>      &lt;template v-slot:ScopedSlot=&#39;params&#39;&gt;         </span></span>
<span class="line"><span>          &lt;ul&gt;           </span></span>
<span class="line"><span>            &lt;li v-for=&#39;d in params.list&#39; :key=&quot;d.id&quot;&gt;           </span></span>
<span class="line"><span>              {{ d.name }}           </span></span>
<span class="line"><span>            &lt;/li&gt;         </span></span>
<span class="line"><span>          &lt;/ul&gt;       </span></span>
<span class="line"><span>      &lt;/template&gt;     </span></span>
<span class="line"><span>  &lt;/SlotComponent&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>  import SlotComponent from &#39;./SlotComponent.vue&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  export default {     </span></span>
<span class="line"><span>      components: { SlotComponent },</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>子组件 SlotComponent：</p><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;     </span></span>
<span class="line"><span>  &lt;section&gt;       </span></span>
<span class="line"><span>    &lt;slot name=&quot;ScopedSlot&quot; :list=&quot;list&quot; /&gt;     </span></span>
<span class="line"><span>  &lt;/section&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script setup&gt;    </span></span>
<span class="line"><span>import { reactive } from &#39;vue&#39;;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>let list = reactive([       </span></span>
<span class="line"><span>  { id: &#39;001&#39;, name: &#39;test-01&#39; },</span></span>
<span class="line"><span>  { id: &#39;002&#39;, name: &#39;test-02&#39; }     </span></span>
<span class="line"><span>])</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="提高性能-浅层次响应" tabindex="-1">提高性能-浅层次响应 <a class="header-anchor" href="#提高性能-浅层次响应" aria-label="Permalink to &quot;提高性能-浅层次响应&quot;">​</a></h3><p><code>shallowRef()</code>与<code>ref()</code>类似，但它不支持深度响应性，是浅层次响应。</p><p>对嵌套对象的属性或数组元素的修改不会触发响应性。这在需要优化性能并避免不必要的深度响应性跟踪时非常有用。这样使用浅的响应式提高性能，只有最外一层是响应式。</p><blockquote><p>shallowReactive 同理</p></blockquote><h3 id="响应式对象-原始对象" tabindex="-1">响应式对象 =&gt; 原始对象 <a class="header-anchor" href="#响应式对象-原始对象" aria-label="Permalink to &quot;响应式对象 =&gt; 原始对象&quot;">​</a></h3><p><code>toRaw()</code> 是用于将响应式对象转换为原始对象。以便在需要时进行操作。转换后的对象不再具有响应性，对其进行的更改不会触发 Vue 的更新机制。</p><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { reactive, toRaw } from &#39;vue&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const obj = reactive({ name: &#39;John&#39;, age: 24 });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const rawObj = toRaw(obj);</span></span>
<span class="line"><span>console.log(rawObj);    // 输出：{ name: &#39;John&#39;, age: 24 }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rawObj.name = &#39;Alice&#39;;</span></span>
<span class="line"><span>console.log(obj.name); // 输出：&#39;John&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="创建自定义的-ref" tabindex="-1">创建自定义的 ref <a class="header-anchor" href="#创建自定义的-ref" aria-label="Permalink to &quot;创建自定义的 ref&quot;">​</a></h3><p><code>customRef</code> 是 Vue 3 中引入的一个新特性，用于创建自定义的 ref，让用户来决定什么时候收集和执行依赖，从而更好地控制行为和逻辑。customRef 接受 track 和 trigger 两个函数作为参数，并返回一个带有 get 和 set 方法的对象。</p><p>track 用于追踪数据，trigger 用于触发响应，更新视图。一般 track 方法放在 get 中，trigger 方法放在 set 中。</p><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { customRef } from &#39;vue&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const myCustomRef = customRef((track, trigger) =&gt; {</span></span>
<span class="line"><span>    // 在这里编写自定义的逻辑</span></span>
<span class="line"><span>     return {</span></span>
<span class="line"><span>        get() {    </span></span>
<span class="line"><span>           track() // 跟踪    </span></span>
<span class="line"><span>        },       </span></span>
<span class="line"><span>        set(value) {         </span></span>
<span class="line"><span>          trigger() // 触发       </span></span>
<span class="line"><span>        }     </span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 在组件中使用自定义的 ref</span></span>
<span class="line"><span>const myComponent = {     </span></span>
<span class="line"><span>    template: \`&lt;section ref=&quot;myCustomRef&quot;&gt;&lt;/section&gt;\`,</span></span>
<span class="line"><span>    setup() {       </span></span>
<span class="line"><span>      const myCustomRef = myCustomRef();</span></span>
<span class="line"><span>      console.log(myCustomRef.value); // 获取当前的引用值</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="获取未在-props-中声明的属性" tabindex="-1">获取未在 props 中声明的属性 <a class="header-anchor" href="#获取未在-props-中声明的属性" aria-label="Permalink to &quot;获取未在 props 中声明的属性&quot;">​</a></h3><p><code>$attrs</code> 可以用于获取父组件传递的属性值，或者在组件内部未在 props 中声明的属性。</p><p>注意：$attrs 中的属性是只读的，不能直接修改。如果需要在组件内部处理未在 props 中声明的属性，可以使用 v-bind 指令或动态组件来实现。</p><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- 传值给子组件 --&gt;</span></span>
<span class="line"><span>&lt;child-component :id=&quot;id&quot; :style=&quot;style&quot; some-other-attribute=&quot;value&quot;&gt;&lt;/child-component&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default {     </span></span>
<span class="line"><span>  props: [&#39;id&#39;, &#39;style&#39;], // props只接收了id跟style     </span></span>
<span class="line"><span>  created() {       </span></span>
<span class="line"><span>    console.log(this.$attrs); // $attrs能实现全部获取，输出：{ id: &quot;id&quot;, style: &quot;style&quot;, someOtherAttribute: &quot;value&quot; }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="组件间通信" tabindex="-1">组件间通信 <a class="header-anchor" href="#组件间通信" aria-label="Permalink to &quot;组件间通信&quot;">​</a></h3><p>$parent 和 refs 是用于组件间通信和访问的属性。需要配合<code>defineExpose</code>一起使用</p><ul><li>refs 可以用于在模板中访问子组件或 DOM 元素。在模板中的元素或组件上使用 ref 属性来定义一个引用名称，然后在组件的 JavaScript 代码中通过 <code>$refs</code> 访问到这个元素或组件。</li><li>parent 指向当前组件的父组件实例。通过 <code>$parent</code>，可以访问父组件的属性、方法和事件等。</li></ul><p>父组件 $refs 示例代码：</p><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;     </span></span>
<span class="line"><span>  &lt;section&gt;       </span></span>
<span class="line"><span>    &lt;button @click=&quot;myButton($refs)&quot;&gt;点击我&lt;/button&gt;       </span></span>
<span class="line"><span>    &lt;!-- 子组件 --&gt;       </span></span>
<span class="line"><span>    &lt;ChildComponent1 /&gt;       </span></span>
<span class="line"><span>    &lt;ChildComponent2 /&gt;     </span></span>
<span class="line"><span>  &lt;/section&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script setup&gt;     </span></span>
<span class="line"><span>  import ChildComponent1 from &#39;/ChildComponent1.vue&#39;;     </span></span>
<span class="line"><span>  import ChildComponent2 from &#39;/ChildComponent2.vue&#39;;</span></span>
<span class="line"><span>  import { ref, defineExpose } from &#39;vue&#39;;</span></span>
<span class="line"><span>          </span></span>
<span class="line"><span>  let value=ref(&#39;666&#39;);</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>  function myButton(refs) {</span></span>
<span class="line"><span>      // refs是子组件的集合       </span></span>
<span class="line"><span>      for(let key in refs){         </span></span>
<span class="line"><span>        refs[key].val += 1 // 操作每个子组件的 val + 1       </span></span>
<span class="line"><span>      }     </span></span>
<span class="line"><span>  }     </span></span>
<span class="line"><span>  defineExpose({value})</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>子组件 $parent 示例代码：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;template&gt;     </span></span>
<span class="line"><span>  &lt;section&gt;       </span></span>
<span class="line"><span>    &lt;button @click=&quot;parentMethod($parent)&quot;&gt;点击我&lt;/button&gt;</span></span>
<span class="line"><span>  &lt;/section&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;     </span></span>
<span class="line"><span>  import { ref } from &#39;vue&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  let value=ref(&#39;888&#39;);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  function myButton(parent) {       </span></span>
<span class="line"><span>    parent.value -= 1 // 子操作父的value     </span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  defineExpose({value})</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div><h3 id="隔代通信" tabindex="-1">隔代通信 <a class="header-anchor" href="#隔代通信" aria-label="Permalink to &quot;隔代通信&quot;">​</a></h3><p><code>provide</code> 是一个用于提供依赖注入的选项。可用于隔代通信；它允许父组件向其后代组件提供共享的数据或功能。在子组件中可以通过 inject 选项来接收父组件提供的属性。</p><div class="language-script vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;     </span></span>
<span class="line"><span>  &lt;section&gt;       </span></span>
<span class="line"><span>    &lt;Child /&gt;     </span></span>
<span class="line"><span>  &lt;/section&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script setup&gt;     </span></span>
<span class="line"><span>  import Child from &#39;./Child.vue&#39;;     </span></span>
<span class="line"><span>  import { ref, provide } from &#39;vue&#39;;</span></span>
<span class="line"><span>           </span></span>
<span class="line"><span>  let value = ref({ name:&#39;sam&#39;, age:18 });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // provide向后代提供数据     </span></span>
<span class="line"><span>  provide(&#39;val&#39;,value);</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>子组件 Child：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;template&gt;     </span></span>
<span class="line"><span>  &lt;section&gt;       </span></span>
<span class="line"><span>    &lt;!-- sam --&gt;       </span></span>
<span class="line"><span>    姓名:{{data.name}}       </span></span>
<span class="line"><span>    &lt;!-- 18 --&gt;       </span></span>
<span class="line"><span>    年龄:{{data.age}}     </span></span>
<span class="line"><span>  &lt;/section&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script setup&gt;     </span></span>
<span class="line"><span>  import { inject } from &#39;vue&#39;;</span></span>
<span class="line"><span>     </span></span>
<span class="line"><span>  // inject接收数据     </span></span>
<span class="line"><span>  let data = inject(&#39;val&#39;, {</span></span>
<span class="line"><span>    // 第二个参数是默认值       </span></span>
<span class="line"><span>    name:&#39;未知&#39;,       </span></span>
<span class="line"><span>    age:0     </span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div>`,73))])}const v=a(c,[["render",t]]);export{g as __pageData,v as default};
