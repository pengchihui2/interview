# 面试题文献参考
vue中文教学 https://cn.vuejs.org/guide/essentials/template-syntax.html
问答面试题  https://juejin.cn/post/7291186330910556218

# 谈一谈对 MVVM 的理解？
    MVVM 是 Model-View-ViewModel 的缩写。MVVM 是一种设计思想。
    Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑;
    View 代表 UI 组件，它负责将数据模型转化成 UI 展现出来，View 是一个同步 View 和 Model 的对象
    在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互， Model 和 ViewModel 之间的交互是双向的， 因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到 View 上。
    对 ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的 同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 DOM，不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

# 说一下 v-for 与 v-show 的区别
共同点：都是动态显示 DOM 元素
手段
    v-if 是动态的向 DOM 树内添加或者删除 DOM 元素
    v-show 是通过设置 DOM 元素的 display 样式属性控制显隐
编译过程
    v-if 切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件
    v-show 只是简单的基于 css 切换
编译条件
    v-if 是惰性的，如果初始条件为假，则什么也不做。只有在条件第一次变为真时才开始局部编译
    v-show 是在任何条件下(首次条件是否为真)都被编译，然后被缓存，而且 DOM 元素保留
性能消耗
    v-if 有更高的切换消耗
    v-show 有更高的初始渲染消耗
使用场景
    v-if 适合运营条件不大可能改变
    v-show 适合频繁切换
# .v-on、v-model、v-bind、v-html
    v-on：简写为@，绑定事件；
    v-model：双向绑定；
    v-bind：简写为：，绑定DOM；
    v-html：使标签内html语法渲染。

# scoped 是如何实现样式穿透的
在很多项目中，会出现这么一种情况，即：引用了第三方组件，需要在组件中局部修改第三方组件的样式，而又不想去除 scoped 属性造成组件之间的样式污染。此时只能通过特殊的方式，穿透 scoped。

方法一 使用 ::v-deep 操作符( >>> 的别名) 如果希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，可以使用 >>> 操作符
<style scoped>
    .a >>> .b { /* ... */ }
</style>

方法二 定义一个含有 scoped 属性的 style 标签之外，再定义一个不含有 scoped 属性的 style 标签，即在一个 vue 组件中定义一个全局的 style 标签，一个含有作用域的 style 标签
<style>
/* global styles */
</style>

<style scoped>
/* local styles */
</style>

方法三 上面的方法一需要单独书写一个不含有 scoped 属性的 style 标签，可能会造成全局样式的污染。

#  ref 的作用是什么 

ref 的作用是被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。其特点是：
如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素
如果用在子组件上，引用就指向组件实例
所以常见的使用场景有：
基本用法，本页面获取 DOM 元素
获取子组件中的 data
调用子组件中的方法

# 说一下你知道的 vue 修饰符都有哪些
常见的事件修饰符如下：
    .stop：阻止冒泡。
    .prevent：阻止默认事件。
    .capture：使用事件捕获模式。
    .self：只在当前元素本身触发。
    .once：只触发一次。
    .passive：默认行为将会立即触发。
按键修饰符
    除了事件修饰符以外，在 vue 中还提供了有鼠标修饰符，键值修饰符，系统修饰符等功能。
    .left：左键
    .right：右键
    .middle：滚轮
    .enter：回车
    .tab：制表键
    .delete：捕获 “删除” 和 “退格” 键
    .esc：返回
    .space：空格
    .up：上
    .down：下
    .left：左
    .right：右
    .ctrl：ctrl 键
    .alt：alt 键
    .shift：shift 键
    .meta：meta 键
表单修饰符
    vue 同样也为表单控件也提供了修饰符，常见的有 .lazy、.number 和 .trim。
    .lazy：在文本框失去焦点时才会渲染
    .number：将文本框中所输入的内容转换为number类型
    .trim：可以自动过滤输入首尾的空格
# vue 项目中的性能优化
    尽量减少 data 中的数据，data 中的数据都会增加 getter 和 setter，会收集对应的 watcher
    v-if 和 v-for 不能连用
    如果需要使用 v-for 给每项元素绑定事件时使用事件代理
    SPA 页面采用 keep-alive 缓存组件
    在更多的情况下，使用 v-if 替代 v-show
    key 保证唯一
    使用路由懒加载、异步组件
    防抖、节流
    第三方模块按需导入
    长列表滚动到可视区域动态加载
    图片懒加载
    SEO 优化
    预渲染
    服务端渲染 SSR
    打包优化
    压缩代码
    Tree Shaking/Scope Hoisting
    使用 cdn 加载第三方模块
    多线程打包 happypack
    splitChunks 抽离公共文件
    sourceMap 优化
    用户体验
    骨架屏
    PWA
    还可以使用缓存(客户端缓存、服务端缓存)优化、服务端开启 gzip 压缩等
# vue 中的 spa 应用如何优化首屏加载速度
    请求优化：CDN 将第三方的类库放到 CDN 上，能够大幅度减少生产环境中的项目体积，另外 CDN 能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上。
    缓存：将长时间不会改变的第三方类库或者静态资源设置为强缓存，将 max-age 设置为一个非常长的时间，再将访问路径加上哈希达到哈希值变了以后保证获取到最新资源，好的缓存策略有助于减轻服务器的压力，并且显著的提升用户的体验
    gzip：开启 gzip 压缩，通常开启 gzip 压缩能够有效的缩小传输资源的大小。
    http2：如果系统首屏同一时间需要加载的静态资源非常多，但是浏览器对同域名的 tcp 连接数量是有限制的(chrome 为 6 个)超过规定数量的 tcp 连接，则必须要等到之前的请求收到响应后才能继续发送，而 http2 则可以在多个 tcp 连接中并发多个请求没有限制，在一些网络较差的环境开启 http2 性能提升尤为明显。
    懒加载：当 url 匹配到相应的路径时，通过 import 动态加载页面组件，这样首屏的代码量会大幅减少，webpack 会把动态加载的页面组件分离成单独的一个 chunk.js 文件
    预渲染：由于浏览器在渲染出页面之前，需要先加载和解析相应的 html、css 和 js 文件，为此会有一段白屏的时间，可以添加loading，或者骨架屏幕尽可能的减少白屏对用户的影响体积优化
    合理使用第三方库：对于一些第三方 ui 框架、类库，尽量使用按需加载，减少打包体积
    使用可视化工具分析打包后的模块体积：webpack-bundle- analyzer 这个插件在每次打包后能够更加直观的分析打包后模块的体积，再对其中比较大的模块进行优化
    提高代码使用率：利用代码分割，将脚本中无需立即调用的代码在代码构建时转变为异步加载的过程
    封装：构建良好的项目架构，按照项目需求就行全局组件，插件，过滤器，指令，utils 等做一 些公共封装，可以有效减少我们的代码量，而且更容易维护资源优化
    图片懒加载：使用图片懒加载可以优化同一时间减少 http 请求开销，避免显示图片导致的画面抖动，提高用户体验
    使用 svg 图标：相对于用一张图片来表示图标，svg 拥有更好的图片质量，体积更小，并且不需要开启额外的 http 请求
    压缩图片：可以使用 image-webpack-loader，在用户肉眼分辨不清的情况下一定程度上压缩图片
# Vue.extend 和 Vue.component 的区别是什么？
    Vue.extend 用于创建一个基于 Vue 构造函数的“子类”，其参数应为一个包含组件选项的对象。
    Vue.component 用来注册全局组件。
# delete 和 Vue.delete 删除数组的区别是什么
    delete 只是被删除的元素变成了 empty/undefined 其他的元素的键值还是不变。
    Vue.delete 是直接将元素从数组中完全删除，改变了数组其他元素的键值。
# vue 的数据为什么频繁变化但只会更新一次
    这是因为 vue 的 DOM 更新是一个异步操作，在数据更新后会首先被 set 钩子监听到，但是不会马上执行 DOM 更新，而是在下一轮循环中执行#更新。
# 在 Vue 中要获取当前时间你会放到 computed 还是 methods 里？(抖音直播)
    放在 computed 里面。因为 computed 只有在它的相关依赖发生改变时才会重新求值。相比而言，方法只要发生重新渲染，methods 调用总会执行所有函数。
# 在给 vue 中的元素设置 key 值时可以使用 Math 的 random 方法么？
    random 是生成随机数，有一定概率多个 item 会生成相同的值，不能保证唯一。
    如果是根据数据来生成 item，数据具有 id 属性，那么就可以使用 id 来作为 key。
    如果不是根据数据生成 item，那么最好的方式就是使用时间戳来作为 key。或者使用诸如 uuid 之类的库来生成唯一的 id。
# 传递值的方式有哪些

# 统一代码风格常用啥

# 封装一个开关

# 封装一个axios请求格式