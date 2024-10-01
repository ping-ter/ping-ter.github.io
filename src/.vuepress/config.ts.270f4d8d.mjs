// src/.vuepress/config.ts
import { defineUserConfig } from "vuepress";

// src/.vuepress/theme.ts
import { hopeTheme } from "vuepress-theme-hope";

// src/.vuepress/navbar.ts
import { navbar } from "vuepress-theme-hope";
var navbar_default = navbar([
  "/",
  "/portfolio",
  "/demo/",
  {
    text: "\u6307\u5357",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [
      {
        text: "Bar",
        icon: "lightbulb",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "ellipsis", link: "" }]
      },
      {
        text: "Foo",
        icon: "lightbulb",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "ellipsis", link: "" }]
      }
    ]
  },
  {
    text: "V2 \u6587\u6863",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/"
  }
]);

// src/.vuepress/sidebar.ts
import { sidebar } from "vuepress-theme-hope";
var sidebar_default = sidebar({
  "/": [
    "",
    "portfolio",
    {
      text: "\u6848\u4F8B",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure"
    },
    {
      text: "\u6587\u6863",
      icon: "book",
      prefix: "guide/",
      children: "structure"
    },
    {
      text: "\u5E7B\u706F\u7247",
      icon: "person-chalkboard",
      link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html"
    }
  ]
});

// src/.vuepress/theme.ts
var theme_default = hopeTheme({
  hostname: "https://vuepress-theme-hope-docs-demo.netlify.app",
  author: {
    name: "pingter",
    url: "https://mister-hope.com"
  },
  iconAssets: "fontawesome-with-brands",
  logo: "https://theme-hope-assets.vuejs.press/logo.svg",
  repo: "vuepress-theme-hope/vuepress-theme-hope",
  docsDir: "src",
  // 导航栏
  navbar: navbar_default,
  // 侧边栏
  sidebar: sidebar_default,
  // 页脚
  footer: "\u9ED8\u8BA4\u9875\u811A",
  displayFooter: true,
  // 加密配置
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"]
    }
  },
  // 多语言配置
  metaLocales: {
    editLink: "\u5728 GitHub \u4E0A\u7F16\u8F91\u6B64\u9875"
  },
  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,
  // 在这里配置主题提供的插件
  plugins: {
    // 注意: 仅用于测试! 你必须自行生成并在生产环境中使用自己的评论服务
    comment: {
      provider: "Giscus",
      repo: "vuepress-theme-hope/giscus-discussions",
      repoId: "R_kgDOG_Pt2A",
      category: "Announcements",
      categoryId: "DIC_kwDOG_Pt2M4COD69"
    },
    components: {
      components: ["Badge", "VPCard"]
    },
    // 此处开启了很多功能用于演示，你应仅保留用到的功能。
    markdownImage: {
      figure: true,
      lazyload: true,
      size: true
    },
    // markdownMath: {
    //   // 启用前安装 katex
    //   // type: "katex",
    //   // 或者安装 mathjax-full
    //   type: "mathjax",
    // },
    // 此功能被开启用于演示，你应仅当使用时保留。
    markdownTab: true,
    // 此处开启了很多功能用于演示，你应仅保留用到的功能。
    mdEnhance: {
      align: true,
      attrs: true,
      component: true,
      demo: true,
      include: true,
      mark: true,
      plantuml: true,
      spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended"
              };
          }
        }
      ],
      sub: true,
      sup: true,
      tasklist: true,
      vPre: true
      // 在启用之前安装 chart.js
      // chart: true,
      // insert component easily
      // 在启用之前安装 echarts
      // echarts: true,
      // 在启用之前安装 flowchart.ts
      // flowchart: true,
      // gfm requires mathjax-full to provide tex support
      // gfm: true,
      // 在启用之前安装 mermaid
      // mermaid: true,
      // playground: {
      //   presets: ["ts", "vue"],
      // },
      // 在启用之前安装 @vue/repl
      // vuePlayground: true,
      // install sandpack-vue3 before enabling it
      // sandpack: true,
    }
    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
    // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },
  }
});

// src/.vuepress/config.ts
import mathjax from "vuepress-plugin-mathjax";
var config_default = defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "pingter",
  description: "pingter\u7684\u4E2A\u4EBA\u535A\u5BA2",
  plugins: [
    [
      mathjax,
      {
        target: "svg",
        macros: {
          "*": "\\times"
        }
      }
    ]
  ],
  theme: theme_default
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjLy52dWVwcmVzcy9jb25maWcudHMiLCAic3JjLy52dWVwcmVzcy90aGVtZS50cyIsICJzcmMvLnZ1ZXByZXNzL25hdmJhci50cyIsICJzcmMvLnZ1ZXByZXNzL3NpZGViYXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOi9teUJsb2cvdnVlcHJlc3MvbXktZG9jcy9zcmMvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxteUJsb2dcXFxcdnVlcHJlc3NcXFxcbXktZG9jc1xcXFxzcmNcXFxcLnZ1ZXByZXNzXFxcXGNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovbXlCbG9nL3Z1ZXByZXNzL215LWRvY3Mvc3JjLy52dWVwcmVzcy9jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVVc2VyQ29uZmlnIH0gZnJvbSBcInZ1ZXByZXNzXCI7XG5cbmltcG9ydCB0aGVtZSBmcm9tIFwiLi90aGVtZS5qc1wiO1xuaW1wb3J0IG1hdGhqYXggZnJvbSAndnVlcHJlc3MtcGx1Z2luLW1hdGhqYXgnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVVc2VyQ29uZmlnKHtcbiAgYmFzZTogXCIvXCIsXG5cbiAgbGFuZzogXCJ6aC1DTlwiLFxuICB0aXRsZTogXCJwaW5ndGVyXCIsXG4gIGRlc2NyaXB0aW9uOiBcInBpbmd0ZXJcdTc2ODRcdTRFMkFcdTRFQkFcdTUzNUFcdTVCQTJcIixcbiAgcGx1Z2luczogW1xuICAgIFtcbiAgICAgIG1hdGhqYXgsXG4gICAgICB7XG4gICAgICAgIHRhcmdldDogJ3N2ZycsXG4gICAgICAgIG1hY3Jvczoge1xuICAgICAgICAgICcqJzogJ1xcXFx0aW1lcycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIF0sXG4gIHRoZW1lLFxuIFxuICAvLyBcdTU0OEMgUFdBIFx1NEUwMFx1OEQ3N1x1NTQyRlx1NzUyOFxuICAvLyBzaG91bGRQcmVmZXRjaDogZmFsc2UsXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjovbXlCbG9nL3Z1ZXByZXNzL215LWRvY3Mvc3JjLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxcbXlCbG9nXFxcXHZ1ZXByZXNzXFxcXG15LWRvY3NcXFxcc3JjXFxcXC52dWVwcmVzc1xcXFx0aGVtZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovbXlCbG9nL3Z1ZXByZXNzL215LWRvY3Mvc3JjLy52dWVwcmVzcy90aGVtZS50c1wiO2ltcG9ydCB7IGhvcGVUaGVtZSB9IGZyb20gXCJ2dWVwcmVzcy10aGVtZS1ob3BlXCI7XG5cbmltcG9ydCBuYXZiYXIgZnJvbSBcIi4vbmF2YmFyLmpzXCI7XG5pbXBvcnQgc2lkZWJhciBmcm9tIFwiLi9zaWRlYmFyLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGhvcGVUaGVtZSh7XG4gIGhvc3RuYW1lOiBcImh0dHBzOi8vdnVlcHJlc3MtdGhlbWUtaG9wZS1kb2NzLWRlbW8ubmV0bGlmeS5hcHBcIixcblxuICBhdXRob3I6IHtcbiAgICBuYW1lOiBcInBpbmd0ZXJcIixcbiAgICB1cmw6IFwiaHR0cHM6Ly9taXN0ZXItaG9wZS5jb21cIixcbiAgfSxcblxuICBpY29uQXNzZXRzOiBcImZvbnRhd2Vzb21lLXdpdGgtYnJhbmRzXCIsXG5cbiAgbG9nbzogXCJodHRwczovL3RoZW1lLWhvcGUtYXNzZXRzLnZ1ZWpzLnByZXNzL2xvZ28uc3ZnXCIsXG5cbiAgcmVwbzogXCJ2dWVwcmVzcy10aGVtZS1ob3BlL3Z1ZXByZXNzLXRoZW1lLWhvcGVcIixcblxuICBkb2NzRGlyOiBcInNyY1wiLFxuXG4gIC8vIFx1NUJGQ1x1ODIyQVx1NjgwRlxuICBuYXZiYXIsXG5cbiAgLy8gXHU0RkE3XHU4RkI5XHU2ODBGXG4gIHNpZGViYXIsXG5cbiAgLy8gXHU5ODc1XHU4MTFBXG4gIGZvb3RlcjogXCJcdTlFRDhcdThCQTRcdTk4NzVcdTgxMUFcIixcbiAgZGlzcGxheUZvb3RlcjogdHJ1ZSxcblxuICAvLyBcdTUyQTBcdTVCQzZcdTkxNERcdTdGNkVcbiAgZW5jcnlwdDoge1xuICAgIGNvbmZpZzoge1xuICAgICAgXCIvZGVtby9lbmNyeXB0Lmh0bWxcIjogW1wiMTIzNFwiXSxcbiAgICB9LFxuICB9LFxuXG4gIC8vIFx1NTkxQVx1OEJFRFx1OEEwMFx1OTE0RFx1N0Y2RVxuICBtZXRhTG9jYWxlczoge1xuICAgIGVkaXRMaW5rOiBcIlx1NTcyOCBHaXRIdWIgXHU0RTBBXHU3RjE2XHU4RjkxXHU2QjY0XHU5ODc1XCIsXG4gIH0sXG5cbiAgLy8gXHU1OTgyXHU2NzlDXHU2MEYzXHU4OTgxXHU1QjlFXHU2NUY2XHU2N0U1XHU3NzBCXHU0RUZCXHU0RjU1XHU2NTM5XHU1M0Q4XHVGRjBDXHU1NDJGXHU3NTI4XHU1QjgzXHUzMDAyXHU2Q0U4OiBcdThGRDlcdTVCRjlcdTY2RjRcdTY1QjBcdTYwMjdcdTgwRkRcdTY3MDlcdTVGODhcdTU5MjdcdThEMUZcdTk3NjJcdTVGNzFcdTU0Q0RcbiAgLy8gaG90UmVsb2FkOiB0cnVlLFxuXG4gIC8vIFx1NTcyOFx1OEZEOVx1OTFDQ1x1OTE0RFx1N0Y2RVx1NEUzQlx1OTg5OFx1NjNEMFx1NEY5Qlx1NzY4NFx1NjNEMlx1NEVGNlxuICBwbHVnaW5zOiB7XG4gICAgLy8gXHU2Q0U4XHU2MTBGOiBcdTRFQzVcdTc1MjhcdTRFOEVcdTZENEJcdThCRDUhIFx1NEY2MFx1NUZDNVx1OTg3Qlx1ODFFQVx1ODg0Q1x1NzUxRlx1NjIxMFx1NUU3Nlx1NTcyOFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NEUyRFx1NEY3Rlx1NzUyOFx1ODFFQVx1NURGMVx1NzY4NFx1OEJDNFx1OEJCQVx1NjcwRFx1NTJBMVxuICAgIGNvbW1lbnQ6IHtcbiAgICAgIHByb3ZpZGVyOiBcIkdpc2N1c1wiLFxuICAgICAgcmVwbzogXCJ2dWVwcmVzcy10aGVtZS1ob3BlL2dpc2N1cy1kaXNjdXNzaW9uc1wiLFxuICAgICAgcmVwb0lkOiBcIlJfa2dET0dfUHQyQVwiLFxuICAgICAgY2F0ZWdvcnk6IFwiQW5ub3VuY2VtZW50c1wiLFxuICAgICAgY2F0ZWdvcnlJZDogXCJESUNfa3dET0dfUHQyTTRDT0Q2OVwiLFxuICAgIH0sXG5cbiAgICBjb21wb25lbnRzOiB7XG4gICAgICBjb21wb25lbnRzOiBbXCJCYWRnZVwiLCBcIlZQQ2FyZFwiXSxcbiAgICB9LFxuXG4gICAgLy8gXHU2QjY0XHU1OTA0XHU1RjAwXHU1NDJGXHU0RTg2XHU1Rjg4XHU1OTFBXHU1MjlGXHU4MEZEXHU3NTI4XHU0RThFXHU2RjE0XHU3OTNBXHVGRjBDXHU0RjYwXHU1RTk0XHU0RUM1XHU0RkREXHU3NTU5XHU3NTI4XHU1MjMwXHU3Njg0XHU1MjlGXHU4MEZEXHUzMDAyXG4gICAgbWFya2Rvd25JbWFnZToge1xuICAgICAgZmlndXJlOiB0cnVlLFxuICAgICAgbGF6eWxvYWQ6IHRydWUsXG4gICAgICBzaXplOiB0cnVlLFxuICAgIH0sXG5cbiAgICAvLyBtYXJrZG93bk1hdGg6IHtcbiAgICAvLyAgIC8vIFx1NTQyRlx1NzUyOFx1NTI0RFx1NUI4OVx1ODhDNSBrYXRleFxuICAgIC8vICAgLy8gdHlwZTogXCJrYXRleFwiLFxuICAgIC8vICAgLy8gXHU2MjE2XHU4MDA1XHU1Qjg5XHU4OEM1IG1hdGhqYXgtZnVsbFxuICAgIC8vICAgdHlwZTogXCJtYXRoamF4XCIsXG4gICAgLy8gfSxcblxuICAgIC8vIFx1NkI2NFx1NTI5Rlx1ODBGRFx1ODhBQlx1NUYwMFx1NTQyRlx1NzUyOFx1NEU4RVx1NkYxNFx1NzkzQVx1RkYwQ1x1NEY2MFx1NUU5NFx1NEVDNVx1NUY1M1x1NEY3Rlx1NzUyOFx1NjVGNlx1NEZERFx1NzU1OVx1MzAwMlxuICAgIG1hcmtkb3duVGFiOiB0cnVlLFxuXG4gICAgLy8gXHU2QjY0XHU1OTA0XHU1RjAwXHU1NDJGXHU0RTg2XHU1Rjg4XHU1OTFBXHU1MjlGXHU4MEZEXHU3NTI4XHU0RThFXHU2RjE0XHU3OTNBXHVGRjBDXHU0RjYwXHU1RTk0XHU0RUM1XHU0RkREXHU3NTU5XHU3NTI4XHU1MjMwXHU3Njg0XHU1MjlGXHU4MEZEXHUzMDAyXG4gICAgbWRFbmhhbmNlOiB7XG4gICAgICBhbGlnbjogdHJ1ZSxcbiAgICAgIGF0dHJzOiB0cnVlLFxuICAgICAgY29tcG9uZW50OiB0cnVlLFxuICAgICAgZGVtbzogdHJ1ZSxcbiAgICAgIGluY2x1ZGU6IHRydWUsXG4gICAgICBtYXJrOiB0cnVlLFxuICAgICAgcGxhbnR1bWw6IHRydWUsXG4gICAgICBzcG9pbGVyOiB0cnVlLFxuICAgICAgc3R5bGl6ZTogW1xuICAgICAgICB7XG4gICAgICAgICAgbWF0Y2hlcjogXCJSZWNvbW1lbmRlZFwiLFxuICAgICAgICAgIHJlcGxhY2VyOiAoeyB0YWcgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRhZyA9PT0gXCJlbVwiKVxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRhZzogXCJCYWRnZVwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGlwXCIgfSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIlJlY29tbWVuZGVkXCIsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBzdWI6IHRydWUsXG4gICAgICBzdXA6IHRydWUsXG4gICAgICB0YXNrbGlzdDogdHJ1ZSxcbiAgICAgIHZQcmU6IHRydWUsXG5cbiAgICAgIC8vIFx1NTcyOFx1NTQyRlx1NzUyOFx1NEU0Qlx1NTI0RFx1NUI4OVx1ODhDNSBjaGFydC5qc1xuICAgICAgLy8gY2hhcnQ6IHRydWUsXG5cbiAgICAgIC8vIGluc2VydCBjb21wb25lbnQgZWFzaWx5XG5cbiAgICAgIC8vIFx1NTcyOFx1NTQyRlx1NzUyOFx1NEU0Qlx1NTI0RFx1NUI4OVx1ODhDNSBlY2hhcnRzXG4gICAgICAvLyBlY2hhcnRzOiB0cnVlLFxuXG4gICAgICAvLyBcdTU3MjhcdTU0MkZcdTc1MjhcdTRFNEJcdTUyNERcdTVCODlcdTg4QzUgZmxvd2NoYXJ0LnRzXG4gICAgICAvLyBmbG93Y2hhcnQ6IHRydWUsXG5cbiAgICAgIC8vIGdmbSByZXF1aXJlcyBtYXRoamF4LWZ1bGwgdG8gcHJvdmlkZSB0ZXggc3VwcG9ydFxuICAgICAgLy8gZ2ZtOiB0cnVlLFxuXG4gICAgICAvLyBcdTU3MjhcdTU0MkZcdTc1MjhcdTRFNEJcdTUyNERcdTVCODlcdTg4QzUgbWVybWFpZFxuICAgICAgLy8gbWVybWFpZDogdHJ1ZSxcblxuICAgICAgLy8gcGxheWdyb3VuZDoge1xuICAgICAgLy8gICBwcmVzZXRzOiBbXCJ0c1wiLCBcInZ1ZVwiXSxcbiAgICAgIC8vIH0sXG5cbiAgICAgIC8vIFx1NTcyOFx1NTQyRlx1NzUyOFx1NEU0Qlx1NTI0RFx1NUI4OVx1ODhDNSBAdnVlL3JlcGxcbiAgICAgIC8vIHZ1ZVBsYXlncm91bmQ6IHRydWUsXG5cbiAgICAgIC8vIGluc3RhbGwgc2FuZHBhY2stdnVlMyBiZWZvcmUgZW5hYmxpbmcgaXRcbiAgICAgIC8vIHNhbmRwYWNrOiB0cnVlLFxuICAgIH0sXG5cbiAgICAvLyBcdTU5ODJcdTY3OUNcdTRGNjBcdTk3MDBcdTg5ODEgUFdBXHUzMDAyXHU1Qjg5XHU4OEM1IEB2dWVwcmVzcy9wbHVnaW4tcHdhIFx1NUU3Nlx1NTNENlx1NkQ4OFx1NEUwQlx1NjVCOVx1NkNFOFx1OTFDQVxuICAgIC8vIHB3YToge1xuICAgIC8vICAgZmF2aWNvbjogXCIvZmF2aWNvbi5pY29cIixcbiAgICAvLyAgIGNhY2hlSFRNTDogdHJ1ZSxcbiAgICAvLyAgIGNhY2hlSW1hZ2U6IHRydWUsXG4gICAgLy8gICBhcHBlbmRCYXNlOiB0cnVlLFxuICAgIC8vICAgYXBwbGU6IHtcbiAgICAvLyAgICAgaWNvbjogXCIvYXNzZXRzL2ljb24vYXBwbGUtaWNvbi0xNTIucG5nXCIsXG4gICAgLy8gICAgIHN0YXR1c0JhckNvbG9yOiBcImJsYWNrXCIsXG4gICAgLy8gICB9LFxuICAgIC8vICAgbXNUaWxlOiB7XG4gICAgLy8gICAgIGltYWdlOiBcIi9hc3NldHMvaWNvbi9tcy1pY29uLTE0NC5wbmdcIixcbiAgICAvLyAgICAgY29sb3I6IFwiI2ZmZmZmZlwiLFxuICAgIC8vICAgfSxcbiAgICAvLyAgIG1hbmlmZXN0OiB7XG4gICAgLy8gICAgIGljb25zOiBbXG4gICAgLy8gICAgICAge1xuICAgIC8vICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9jaHJvbWUtbWFzay01MTIucG5nXCIsXG4gICAgLy8gICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgLy8gICAgICAgICBwdXJwb3NlOiBcIm1hc2thYmxlXCIsXG4gICAgLy8gICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgICAge1xuICAgIC8vICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9jaHJvbWUtbWFzay0xOTIucG5nXCIsXG4gICAgLy8gICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgLy8gICAgICAgICBwdXJwb3NlOiBcIm1hc2thYmxlXCIsXG4gICAgLy8gICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgICAge1xuICAgIC8vICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9jaHJvbWUtNTEyLnBuZ1wiLFxuICAgIC8vICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgIC8vICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vY2hyb21lLTE5Mi5wbmdcIixcbiAgICAvLyAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcbiAgICAvLyAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgXSxcbiAgICAvLyAgICAgc2hvcnRjdXRzOiBbXG4gICAgLy8gICAgICAge1xuICAgIC8vICAgICAgICAgbmFtZTogXCJEZW1vXCIsXG4gICAgLy8gICAgICAgICBzaG9ydF9uYW1lOiBcIkRlbW9cIixcbiAgICAvLyAgICAgICAgIHVybDogXCIvZGVtby9cIixcbiAgICAvLyAgICAgICAgIGljb25zOiBbXG4gICAgLy8gICAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICBzcmM6IFwiL2Fzc2V0cy9pY29uL2d1aWRlLW1hc2thYmxlLnBuZ1wiLFxuICAgIC8vICAgICAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcbiAgICAvLyAgICAgICAgICAgICBwdXJwb3NlOiBcIm1hc2thYmxlXCIsXG4gICAgLy8gICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAvLyAgICAgICAgICAgfSxcbiAgICAvLyAgICAgICAgIF0sXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgXSxcbiAgICAvLyAgIH0sXG4gICAgLy8gfSxcblxuICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NEY2MFx1OTcwMFx1ODk4MVx1NUU3Qlx1NzA2Rlx1NzI0N1x1RkYwQ1x1NUI4OVx1ODhDNSBAdnVlcHJlc3MvcGx1Z2luLXJldmVhbGpzIFx1NUU3Nlx1NTNENlx1NkQ4OFx1NEUwQlx1NjVCOVx1NkNFOFx1OTFDQVxuICAgIC8vIHJldmVhbGpzOiB7XG4gICAgLy8gICBwbHVnaW5zOiBbXCJoaWdobGlnaHRcIiwgXCJtYXRoXCIsIFwic2VhcmNoXCIsIFwibm90ZXNcIiwgXCJ6b29tXCJdLFxuICAgIC8vIH0sXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjovbXlCbG9nL3Z1ZXByZXNzL215LWRvY3Mvc3JjLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxcbXlCbG9nXFxcXHZ1ZXByZXNzXFxcXG15LWRvY3NcXFxcc3JjXFxcXC52dWVwcmVzc1xcXFxuYXZiYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L215QmxvZy92dWVwcmVzcy9teS1kb2NzL3NyYy8udnVlcHJlc3MvbmF2YmFyLnRzXCI7aW1wb3J0IHsgbmF2YmFyIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgbmF2YmFyKFtcbiAgXCIvXCIsXG4gIFwiL3BvcnRmb2xpb1wiLFxuICBcIi9kZW1vL1wiLFxuICB7XG4gICAgdGV4dDogXCJcdTYzMDdcdTUzNTdcIixcbiAgICBpY29uOiBcImxpZ2h0YnVsYlwiLFxuICAgIHByZWZpeDogXCIvZ3VpZGUvXCIsXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJCYXJcIixcbiAgICAgICAgaWNvbjogXCJsaWdodGJ1bGJcIixcbiAgICAgICAgcHJlZml4OiBcImJhci9cIixcbiAgICAgICAgY2hpbGRyZW46IFtcImJhelwiLCB7IHRleHQ6IFwiLi4uXCIsIGljb246IFwiZWxsaXBzaXNcIiwgbGluazogXCJcIiB9XSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiRm9vXCIsXG4gICAgICAgIGljb246IFwibGlnaHRidWxiXCIsXG4gICAgICAgIHByZWZpeDogXCJmb28vXCIsXG4gICAgICAgIGNoaWxkcmVuOiBbXCJyYXlcIiwgeyB0ZXh0OiBcIi4uLlwiLCBpY29uOiBcImVsbGlwc2lzXCIsIGxpbms6IFwiXCIgfV0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiBcIlYyIFx1NjU4N1x1Njg2M1wiLFxuICAgIGljb246IFwiYm9va1wiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly90aGVtZS1ob3BlLnZ1ZWpzLnByZXNzL3poL1wiLFxuICB9LFxuXSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6L215QmxvZy92dWVwcmVzcy9teS1kb2NzL3NyYy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXG15QmxvZ1xcXFx2dWVwcmVzc1xcXFxteS1kb2NzXFxcXHNyY1xcXFwudnVlcHJlc3NcXFxcc2lkZWJhci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovbXlCbG9nL3Z1ZXByZXNzL215LWRvY3Mvc3JjLy52dWVwcmVzcy9zaWRlYmFyLnRzXCI7aW1wb3J0IHsgc2lkZWJhciB9IGZyb20gXCJ2dWVwcmVzcy10aGVtZS1ob3BlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHNpZGViYXIoe1xuICBcIi9cIjogW1xuICAgIFwiXCIsXG4gICAgXCJwb3J0Zm9saW9cIixcbiAgICB7XG4gICAgICB0ZXh0OiBcIlx1Njg0OFx1NEY4QlwiLFxuICAgICAgaWNvbjogXCJsYXB0b3AtY29kZVwiLFxuICAgICAgcHJlZml4OiBcImRlbW8vXCIsXG4gICAgICBsaW5rOiBcImRlbW8vXCIsXG4gICAgICBjaGlsZHJlbjogXCJzdHJ1Y3R1cmVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6IFwiXHU2NTg3XHU2ODYzXCIsXG4gICAgICBpY29uOiBcImJvb2tcIixcbiAgICAgIHByZWZpeDogXCJndWlkZS9cIixcbiAgICAgIGNoaWxkcmVuOiBcInN0cnVjdHVyZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJcdTVFN0JcdTcwNkZcdTcyNDdcIixcbiAgICAgIGljb246IFwicGVyc29uLWNoYWxrYm9hcmRcIixcbiAgICAgIGxpbms6IFwiaHR0cHM6Ly9lY29zeXN0ZW0udnVlanMucHJlc3MvemgvcGx1Z2lucy9tYXJrZG93bi9yZXZlYWxqcy9kZW1vLmh0bWxcIixcbiAgICB9LFxuICBdLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVTLFNBQVMsd0JBQXdCOzs7QUNBbkMsU0FBUyxpQkFBaUI7OztBQ0F4QixTQUFTLGNBQWM7QUFFOVQsSUFBTyxpQkFBUSxPQUFPO0FBQUEsRUFDcEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxNQUNSO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixVQUFVLENBQUMsT0FBTyxFQUFFLE1BQU0sT0FBTyxNQUFNLFlBQVksTUFBTSxHQUFHLENBQUM7QUFBQSxNQUMvRDtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLFVBQVUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxPQUFPLE1BQU0sWUFBWSxNQUFNLEdBQUcsQ0FBQztBQUFBLE1BQy9EO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7OztBQzlCd1MsU0FBUyxlQUFlO0FBRWpVLElBQU8sa0JBQVEsUUFBUTtBQUFBLEVBQ3JCLEtBQUs7QUFBQSxJQUNIO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1B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
