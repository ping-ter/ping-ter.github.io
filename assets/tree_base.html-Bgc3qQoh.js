import{_ as i,c as a,f as e,o as n}from"./app-Dlc50Gkp.js";const l={};function t(h,s){return n(),a("div",null,s[0]||(s[0]=[e(`<h1 id="树" tabindex="-1"><a class="header-anchor" href="#树"><span>树</span></a></h1><h2 id="存储结构" tabindex="-1"><a class="header-anchor" href="#存储结构"><span>存储结构</span></a></h2><h3 id="孩子链表链接结构" tabindex="-1"><a class="header-anchor" href="#孩子链表链接结构"><span>孩子链表链接结构</span></a></h3><div class="language-c++ line-numbers-mode" data-highlighter="shiki" data-ext="c++" data-title="c++" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">struct</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> ChildNode</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> index;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    ChildNode </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">next;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">struct</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> treeNode</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    char</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> data;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> father_index;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    ChildNode </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">firstChild;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">struct</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> tree</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> size;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    vector</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">treeNode</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> table;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">};</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="左孩子-右兄弟链接结构" tabindex="-1"><a class="header-anchor" href="#左孩子-右兄弟链接结构"><span>左孩子-右兄弟链接结构</span></a></h3><div class="language-c++ line-numbers-mode" data-highlighter="shiki" data-ext="c++" data-title="c++" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">struct</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> node</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    char</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> data;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    node </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">FirstChild;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    node </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">NextBrother;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">};</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种存储方式结构上与二叉树的二叉链表法一样,可以套用二叉树的一些算法框架</p>`,7)]))}const r=i(l,[["render",t],["__file","tree_base.html.vue"]]),d=JSON.parse('{"path":"/algorithm_study/tree/tree_base.html","title":"树","lang":"zh-CN","frontmatter":{"description":"树 存储结构 孩子链表链接结构 左孩子-右兄弟链接结构 这种存储方式结构上与二叉树的二叉链表法一样,可以套用二叉树的一些算法框架","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/algorithm_study/tree/tree_base.html"}],["meta",{"property":"og:site_name","content":"pingter"}],["meta",{"property":"og:title","content":"树"}],["meta",{"property":"og:description","content":"树 存储结构 孩子链表链接结构 左孩子-右兄弟链接结构 这种存储方式结构上与二叉树的二叉链表法一样,可以套用二叉树的一些算法框架"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-01T09:36:46.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-01T09:36:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"树\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-10-01T09:36:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"pingter\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]],"date":"2024-10-01T09:36:46.000Z"},"headers":[{"level":2,"title":"存储结构","slug":"存储结构","link":"#存储结构","children":[{"level":3,"title":"孩子链表链接结构","slug":"孩子链表链接结构","link":"#孩子链表链接结构","children":[]},{"level":3,"title":"左孩子-右兄弟链接结构","slug":"左孩子-右兄弟链接结构","link":"#左孩子-右兄弟链接结构","children":[]}]}],"git":{"createdTime":1727775406000,"updatedTime":1727775406000,"contributors":[{"name":"pingter","email":"sy15253955056@gmail.com","commits":1}]},"readingTime":{"minutes":0.3,"words":89},"filePathRelative":"algorithm_study/tree/tree_base.md","localizedDate":"2024年10月1日","autoDesc":true}');export{r as comp,d as data};