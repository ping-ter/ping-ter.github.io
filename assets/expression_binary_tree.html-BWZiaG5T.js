import{_ as s,c as a,f as n,o as e}from"./app-Dlc50Gkp.js";const l={};function t(h,i){return e(),a("div",null,i[0]||(i[0]=[n(`<h1 id="表达式二叉树" tabindex="-1"><a class="header-anchor" href="#表达式二叉树"><span>表达式二叉树</span></a></h1><p>将表达式拆解开,运算符为节点,两个操作数为子树,即可构成表达式树</p><ul><li>表达式树的叶节点为操作数,其余节点为运算符</li><li>表达式树的中根序列为中缀表达式</li><li>表达式树的后根序列为后缀表达式</li></ul><h2 id="表达式树的构建" tabindex="-1"><a class="header-anchor" href="#表达式树的构建"><span>表达式树的构建</span></a></h2><h3 id="关于c-处理数字字符混合的情况" tabindex="-1"><a class="header-anchor" href="#关于c-处理数字字符混合的情况"><span>关于c++处理数字字符混合的情况</span></a></h3><p>当cin获取到一个非整形字符的时候，cin &gt;&gt; i 会返回false，并且会对cin对象做一个错误标记 只有使用 cin.clear() 清除错误标记后才能继续从缓冲区读取数据</p><p><a href="https://blog.csdn.net/qq_41191055/article/details/115349012" target="_blank" rel="noopener noreferrer">参考连接</a></p><div class="language-c++ line-numbers-mode" data-highlighter="shiki" data-ext="c++" data-title="c++" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">while</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (cin </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&gt;&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">        // 获取到整型值</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">        ivec</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">push_back</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(i);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    else</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">        // 需要先清除错误标记</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">        cin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">clear</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">        // cin.get()会获取缓冲区中的第一个字符，注意，空格和回车也会读取。</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        char</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> t </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> cin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (t </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">==</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39; &#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">            // 如果获取到了空格，则跳过，获取下一个字符</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            t </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> cin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">        // 此时t已经是我们想要的字符了</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">        cvec</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">push_back</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(t);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="后缀表达式构建" tabindex="-1"><a class="header-anchor" href="#后缀表达式构建"><span>后缀表达式构建</span></a></h3><h3 id="中缀表达式构建" tabindex="-1"><a class="header-anchor" href="#中缀表达式构建"><span>中缀表达式构建</span></a></h3>`,10)]))}const r=s(l,[["render",t],["__file","expression_binary_tree.html.vue"]]),k=JSON.parse('{"path":"/algorithm_study/tree/expression_binary_tree.html","title":"表达式二叉树","lang":"zh-CN","frontmatter":{"description":"表达式二叉树 将表达式拆解开,运算符为节点,两个操作数为子树,即可构成表达式树 表达式树的叶节点为操作数,其余节点为运算符 表达式树的中根序列为中缀表达式 表达式树的后根序列为后缀表达式 表达式树的构建 关于c++处理数字字符混合的情况 当cin获取到一个非整形字符的时候，cin >> i 会返回false，并且会对cin对象做一个错误标记 只有使用 ...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/algorithm_study/tree/expression_binary_tree.html"}],["meta",{"property":"og:site_name","content":"pingter"}],["meta",{"property":"og:title","content":"表达式二叉树"}],["meta",{"property":"og:description","content":"表达式二叉树 将表达式拆解开,运算符为节点,两个操作数为子树,即可构成表达式树 表达式树的叶节点为操作数,其余节点为运算符 表达式树的中根序列为中缀表达式 表达式树的后根序列为后缀表达式 表达式树的构建 关于c++处理数字字符混合的情况 当cin获取到一个非整形字符的时候，cin >> i 会返回false，并且会对cin对象做一个错误标记 只有使用 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-01T09:36:46.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-01T09:36:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"表达式二叉树\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-10-01T09:36:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"pingter\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]],"date":"2024-10-01T09:36:46.000Z"},"headers":[{"level":2,"title":"表达式树的构建","slug":"表达式树的构建","link":"#表达式树的构建","children":[{"level":3,"title":"关于c++处理数字字符混合的情况","slug":"关于c-处理数字字符混合的情况","link":"#关于c-处理数字字符混合的情况","children":[]},{"level":3,"title":"后缀表达式构建","slug":"后缀表达式构建","link":"#后缀表达式构建","children":[]},{"level":3,"title":"中缀表达式构建","slug":"中缀表达式构建","link":"#中缀表达式构建","children":[]}]}],"git":{"createdTime":1727775406000,"updatedTime":1727775406000,"contributors":[{"name":"pingter","email":"sy15253955056@gmail.com","commits":1}]},"readingTime":{"minutes":0.94,"words":281},"filePathRelative":"algorithm_study/tree/expression_binary_tree.md","localizedDate":"2024年10月1日","autoDesc":true}');export{r as comp,k as data};