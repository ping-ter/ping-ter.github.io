import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,a as i,b as l,f as h,o as e}from"./app-BsAv5_B3.js";const t={};function k(p,s){return e(),n("div",null,s[0]||(s[0]=[i("h1",{id:"并查集",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#并查集"},[i("span",null,"并查集")])],-1),i("h2",{id:"概念",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#概念"},[i("span",null,"概念")])],-1),i("p",null,[i("span",null,[i("code",{"v-pre":""},"不相交集"),l(":交集是空集的集合,如{2,3,4}和{1,5}")])],-1),h(`<p>并查集主要解决不相交集的问题</p><ul><li>并,实现合并两个不相交集的操作</li><li>查,查询某个元素在哪个集合中</li></ul><p>一般选择集合中的一个元素表示这个集合,作为<code>代表元</code></p><h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2><ul><li><code>make_set(x)</code>,创建一个集合,该集合有一个元素x</li><li><code>union_set(x, y)</code>,合并两个元素所在的集合</li><li><code>find_set(x)</code>,找到元素所在的代表元</li></ul><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现"><span>实现</span></a></h2><p>并查集可以基于<code>森林</code>来实现,其中,树可以作为一个集合,树的根可以视为集合的代表元</p><p>在并查集的操作中,只需要知道某个节点的父亲即可,</p><h3 id="存储结构" tabindex="-1"><a class="header-anchor" href="#存储结构"><span>存储结构</span></a></h3><div class="language-c++ line-numbers-mode" data-highlighter="shiki" data-ext="c++" data-title="c++" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">struct</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> union_find</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    array</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">256</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> father;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    // 节点的父亲数组</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    union_find</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        fill</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">father</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">begin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(), </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">father</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">end</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(), </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> // 初始化成0</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> make_set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">char</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> union_set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">char</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">char</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> y</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    char</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> find_set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">char</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">};</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建集合" tabindex="-1"><a class="header-anchor" href="#创建集合"><span>创建集合</span></a></h3><div class="language-c++ line-numbers-mode" data-highlighter="shiki" data-ext="c++" data-title="c++" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">void</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> union_find</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">make_set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">char</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">    father</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[x] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> // 为x构建一个单节点的树</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询元素所在集合" tabindex="-1"><a class="header-anchor" href="#查询元素所在集合"><span>查询元素所在集合</span></a></h3><div class="language-c++ line-numbers-mode" data-highlighter="shiki" data-ext="c++" data-title="c++" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">char</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> union_find</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">find_set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">char</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    char</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> p </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> x;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    while</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">father</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[p] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">!=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        p </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> father</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[p];</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> p;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="合并集合" tabindex="-1"><a class="header-anchor" href="#合并集合"><span>合并集合</span></a></h3><h4 id="直接合并" tabindex="-1"><a class="header-anchor" href="#直接合并"><span>直接合并</span></a></h4><div class="language-c++ line-numbers-mode" data-highlighter="shiki" data-ext="c++" data-title="c++" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">void</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> union_find</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">union_set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">char</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">char</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> y</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">    father</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">find_set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(x)] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> find_set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(y);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种合并方式最坏的情况树会退化成一条直线,不利于查询操作</p><h2 id="优化" tabindex="-1"><a class="header-anchor" href="#优化"><span>优化</span></a></h2><h3 id="路径压缩" tabindex="-1"><a class="header-anchor" href="#路径压缩"><span>路径压缩</span></a></h3><p>在<code>find</code>操作时,找到<strong>x</strong>的根<strong>fx</strong>后,将沿途的元素的father都改成根</p><div class="language-c++ line-numbers-mode" data-highlighter="shiki" data-ext="c++" data-title="c++" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">char</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> union_find</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">find_set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">char</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    char</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> p </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> x;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    stack</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;char&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> sta;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    while</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">father</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[p] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">!=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">        sta</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">push</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(p);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        p </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> father</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[p];</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    while</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#56B6C2;">!</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">sta</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">empty</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">())</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">        father</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">sta</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">top</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> p;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">        sta</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pop</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> p;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>压缩前:</p><pre><code>1 in a  father: a
a in a  father:
b in x  father: p
e in x  father: x
x in x  father:
p in x  father: x
</code></pre><p>压缩后</p><pre><code>1 in a  father: a
a in a  father:
b in x  father: x
e in x  father: x
x in x  father:
p in x  father: x
</code></pre><h3 id="合并策略" tabindex="-1"><a class="header-anchor" href="#合并策略"><span>合并策略</span></a></h3><p>合并时,由矮树向高树合并可以缩短节点寻找根的路径</p><p>但是,uion时可以更新树的高度,而find路径压缩时不方便,难以实时更新</p><p>所以这里采用按<code>秩</code>合并,用<strong>秩大</strong>的节点作为<strong>秩小</strong>的节点的父亲</p><p>其中:</p><ul><li>树高增加时(union操作),秩增加</li><li>树高减少时(find操作),秩不变</li></ul><p>代码如下</p><div class="language-c++ line-numbers-mode" data-highlighter="shiki" data-ext="c++" data-title="c++" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">void</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> union_find</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">union_set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">char</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">char</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> y</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">    // father[find_set(x)] = find_set(y);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    char</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> fx </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> find_set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(x), fy </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> find_set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(y);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (fx </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">==</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> fy)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> // 已经在同一集合了,不合并</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">rank</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[fx] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&gt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> rank</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[fy])</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">        father</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[fy] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> fx;</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> // 树高没增加,秩不变</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    else</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">        father</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[fx] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> fy;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">rank</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[fx] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">==</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> rank</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[fy])</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">            rank</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[fy]</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">++</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> // 如果秩相等,那么根的秩加一</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复杂度分析" tabindex="-1"><a class="header-anchor" href="#复杂度分析"><span>复杂度分析</span></a></h2><ul><li>单独使用<strong>路径压缩</strong>或者<strong>按秩合并</strong>,Union和Find操作均摊下来的时间复杂度为<code>O(log n)</code></li><li>同时<strong>路径压缩</strong>或者<strong>按秩合并</strong>两种优化策略,每个操作的均摊时间复杂度接近<code>O(1)</code></li></ul>`,36)]))}const A=a(t,[["render",k],["__file","union_find.html.vue"]]),B=JSON.parse('{"path":"/algorithm_study/tree/union_find.html","title":"并查集","lang":"zh-CN","frontmatter":{"description":"并查集 概念 不相交集:交集是空集的集合,如{2,3,4}和{1,5} 并查集主要解决不相交集的问题 并,实现合并两个不相交集的操作 查,查询某个元素在哪个集合中 一般选择集合中的一个元素表示这个集合,作为代表元 操作 make_set(x),创建一个集合,该集合有一个元素x union_set(x, y),合并两个元素所在的集合 find_set(x...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/algorithm_study/tree/union_find.html"}],["meta",{"property":"og:site_name","content":"pingter"}],["meta",{"property":"og:title","content":"并查集"}],["meta",{"property":"og:description","content":"并查集 概念 不相交集:交集是空集的集合,如{2,3,4}和{1,5} 并查集主要解决不相交集的问题 并,实现合并两个不相交集的操作 查,查询某个元素在哪个集合中 一般选择集合中的一个元素表示这个集合,作为代表元 操作 make_set(x),创建一个集合,该集合有一个元素x union_set(x, y),合并两个元素所在的集合 find_set(x..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-01T09:36:46.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-01T09:36:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"并查集\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-10-01T09:36:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"pingter\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]],"date":"2024-10-01T09:36:46.000Z"},"headers":[{"level":2,"title":"概念","slug":"概念","link":"#概念","children":[]},{"level":2,"title":"操作","slug":"操作","link":"#操作","children":[]},{"level":2,"title":"实现","slug":"实现","link":"#实现","children":[{"level":3,"title":"存储结构","slug":"存储结构","link":"#存储结构","children":[]},{"level":3,"title":"创建集合","slug":"创建集合","link":"#创建集合","children":[]},{"level":3,"title":"查询元素所在集合","slug":"查询元素所在集合","link":"#查询元素所在集合","children":[]},{"level":3,"title":"合并集合","slug":"合并集合","link":"#合并集合","children":[]}]},{"level":2,"title":"优化","slug":"优化","link":"#优化","children":[{"level":3,"title":"路径压缩","slug":"路径压缩","link":"#路径压缩","children":[]},{"level":3,"title":"合并策略","slug":"合并策略","link":"#合并策略","children":[]}]},{"level":2,"title":"复杂度分析","slug":"复杂度分析","link":"#复杂度分析","children":[]}],"git":{"createdTime":1727775406000,"updatedTime":1727775406000,"contributors":[{"name":"pingter","email":"sy15253955056@gmail.com","commits":1}]},"readingTime":{"minutes":2.4,"words":720},"filePathRelative":"algorithm_study/tree/union_find.md","localizedDate":"2024年10月1日","autoDesc":true}');export{A as comp,B as data};