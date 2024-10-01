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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjLy52dWVwcmVzcy9jb25maWcudHMiLCAic3JjLy52dWVwcmVzcy90aGVtZS50cyIsICJzcmMvLnZ1ZXByZXNzL25hdmJhci50cyIsICJzcmMvLnZ1ZXByZXNzL3NpZGViYXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOi9teUJsb2cvdnVlcHJlc3MvbXktZG9jcy9zcmMvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxteUJsb2dcXFxcdnVlcHJlc3NcXFxcbXktZG9jc1xcXFxzcmNcXFxcLnZ1ZXByZXNzXFxcXGNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovbXlCbG9nL3Z1ZXByZXNzL215LWRvY3Mvc3JjLy52dWVwcmVzcy9jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVVc2VyQ29uZmlnIH0gZnJvbSBcInZ1ZXByZXNzXCI7XG5cbmltcG9ydCB0aGVtZSBmcm9tIFwiLi90aGVtZS5qc1wiO1xuaW1wb3J0IG1hdGhqYXggZnJvbSAndnVlcHJlc3MtcGx1Z2luLW1hdGhqYXgnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVVc2VyQ29uZmlnKHtcbiAgYmFzZTogXCIvXCIsXG5cbiAgbGFuZzogXCJ6aC1DTlwiLFxuICB0aXRsZTogXCJwaW5ndGVyXCIsXG4gIGRlc2NyaXB0aW9uOiBcInBpbmd0ZXJcdTc2ODRcdTRFMkFcdTRFQkFcdTUzNUFcdTVCQTJcIixcbiAgcGx1Z2luczogW1xuICAgIFtcbiAgICAgIG1hdGhqYXgsXG4gICAgICB7XG4gICAgICAgIHRhcmdldDogJ3N2ZycsXG4gICAgICAgIG1hY3Jvczoge1xuICAgICAgICAgICcqJzogJ1xcXFx0aW1lcycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIF0sXG4gIHRoZW1lLFxuXG4gIC8vIFx1NTQ4QyBQV0EgXHU0RTAwXHU4RDc3XHU1NDJGXHU3NTI4XG4gIC8vIHNob3VsZFByZWZldGNoOiBmYWxzZSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOi9teUJsb2cvdnVlcHJlc3MvbXktZG9jcy9zcmMvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxteUJsb2dcXFxcdnVlcHJlc3NcXFxcbXktZG9jc1xcXFxzcmNcXFxcLnZ1ZXByZXNzXFxcXHRoZW1lLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9teUJsb2cvdnVlcHJlc3MvbXktZG9jcy9zcmMvLnZ1ZXByZXNzL3RoZW1lLnRzXCI7aW1wb3J0IHsgaG9wZVRoZW1lIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIjtcblxuaW1wb3J0IG5hdmJhciBmcm9tIFwiLi9uYXZiYXIuanNcIjtcbmltcG9ydCBzaWRlYmFyIGZyb20gXCIuL3NpZGViYXIuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgaG9wZVRoZW1lKHtcbiAgaG9zdG5hbWU6IFwiaHR0cHM6Ly92dWVwcmVzcy10aGVtZS1ob3BlLWRvY3MtZGVtby5uZXRsaWZ5LmFwcFwiLFxuXG4gIGF1dGhvcjoge1xuICAgIG5hbWU6IFwicGluZ3RlclwiLFxuICAgIHVybDogXCJodHRwczovL21pc3Rlci1ob3BlLmNvbVwiLFxuICB9LFxuXG4gIGljb25Bc3NldHM6IFwiZm9udGF3ZXNvbWUtd2l0aC1icmFuZHNcIixcblxuICBsb2dvOiBcImh0dHBzOi8vdGhlbWUtaG9wZS1hc3NldHMudnVlanMucHJlc3MvbG9nby5zdmdcIixcblxuICByZXBvOiBcInZ1ZXByZXNzLXRoZW1lLWhvcGUvdnVlcHJlc3MtdGhlbWUtaG9wZVwiLFxuXG4gIGRvY3NEaXI6IFwic3JjXCIsXG5cbiAgLy8gXHU1QkZDXHU4MjJBXHU2ODBGXG4gIG5hdmJhcixcblxuICAvLyBcdTRGQTdcdThGQjlcdTY4MEZcbiAgc2lkZWJhcixcblxuICAvLyBcdTk4NzVcdTgxMUFcbiAgZm9vdGVyOiBcIlx1OUVEOFx1OEJBNFx1OTg3NVx1ODExQVwiLFxuICBkaXNwbGF5Rm9vdGVyOiB0cnVlLFxuXG4gIC8vIFx1NTJBMFx1NUJDNlx1OTE0RFx1N0Y2RVxuICBlbmNyeXB0OiB7XG4gICAgY29uZmlnOiB7XG4gICAgICBcIi9kZW1vL2VuY3J5cHQuaHRtbFwiOiBbXCIxMjM0XCJdLFxuICAgIH0sXG4gIH0sXG5cbiAgLy8gXHU1OTFBXHU4QkVEXHU4QTAwXHU5MTREXHU3RjZFXG4gIG1ldGFMb2NhbGVzOiB7XG4gICAgZWRpdExpbms6IFwiXHU1NzI4IEdpdEh1YiBcdTRFMEFcdTdGMTZcdThGOTFcdTZCNjRcdTk4NzVcIixcbiAgfSxcblxuICAvLyBcdTU5ODJcdTY3OUNcdTYwRjNcdTg5ODFcdTVCOUVcdTY1RjZcdTY3RTVcdTc3MEJcdTRFRkJcdTRGNTVcdTY1MzlcdTUzRDhcdUZGMENcdTU0MkZcdTc1MjhcdTVCODNcdTMwMDJcdTZDRTg6IFx1OEZEOVx1NUJGOVx1NjZGNFx1NjVCMFx1NjAyN1x1ODBGRFx1NjcwOVx1NUY4OFx1NTkyN1x1OEQxRlx1OTc2Mlx1NUY3MVx1NTRDRFxuICAvLyBob3RSZWxvYWQ6IHRydWUsXG5cbiAgLy8gXHU1NzI4XHU4RkQ5XHU5MUNDXHU5MTREXHU3RjZFXHU0RTNCXHU5ODk4XHU2M0QwXHU0RjlCXHU3Njg0XHU2M0QyXHU0RUY2XG4gIHBsdWdpbnM6IHtcbiAgICAvLyBcdTZDRThcdTYxMEY6IFx1NEVDNVx1NzUyOFx1NEU4RVx1NkQ0Qlx1OEJENSEgXHU0RjYwXHU1RkM1XHU5ODdCXHU4MUVBXHU4ODRDXHU3NTFGXHU2MjEwXHU1RTc2XHU1NzI4XHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU0RTJEXHU0RjdGXHU3NTI4XHU4MUVBXHU1REYxXHU3Njg0XHU4QkM0XHU4QkJBXHU2NzBEXHU1MkExXG4gICAgY29tbWVudDoge1xuICAgICAgcHJvdmlkZXI6IFwiR2lzY3VzXCIsXG4gICAgICByZXBvOiBcInZ1ZXByZXNzLXRoZW1lLWhvcGUvZ2lzY3VzLWRpc2N1c3Npb25zXCIsXG4gICAgICByZXBvSWQ6IFwiUl9rZ0RPR19QdDJBXCIsXG4gICAgICBjYXRlZ29yeTogXCJBbm5vdW5jZW1lbnRzXCIsXG4gICAgICBjYXRlZ29yeUlkOiBcIkRJQ19rd0RPR19QdDJNNENPRDY5XCIsXG4gICAgfSxcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgIGNvbXBvbmVudHM6IFtcIkJhZGdlXCIsIFwiVlBDYXJkXCJdLFxuICAgIH0sXG5cbiAgICAvLyBcdTZCNjRcdTU5MDRcdTVGMDBcdTU0MkZcdTRFODZcdTVGODhcdTU5MUFcdTUyOUZcdTgwRkRcdTc1MjhcdTRFOEVcdTZGMTRcdTc5M0FcdUZGMENcdTRGNjBcdTVFOTRcdTRFQzVcdTRGRERcdTc1NTlcdTc1MjhcdTUyMzBcdTc2ODRcdTUyOUZcdTgwRkRcdTMwMDJcbiAgICBtYXJrZG93bkltYWdlOiB7XG4gICAgICBmaWd1cmU6IHRydWUsXG4gICAgICBsYXp5bG9hZDogdHJ1ZSxcbiAgICAgIHNpemU6IHRydWUsXG4gICAgfSxcblxuICAgIC8vIG1hcmtkb3duTWF0aDoge1xuICAgIC8vICAgLy8gXHU1NDJGXHU3NTI4XHU1MjREXHU1Qjg5XHU4OEM1IGthdGV4XG4gICAgLy8gICAvLyB0eXBlOiBcImthdGV4XCIsXG4gICAgLy8gICAvLyBcdTYyMTZcdTgwMDVcdTVCODlcdTg4QzUgbWF0aGpheC1mdWxsXG4gICAgLy8gICB0eXBlOiBcIm1hdGhqYXhcIixcbiAgICAvLyB9LFxuXG4gICAgLy8gXHU2QjY0XHU1MjlGXHU4MEZEXHU4OEFCXHU1RjAwXHU1NDJGXHU3NTI4XHU0RThFXHU2RjE0XHU3OTNBXHVGRjBDXHU0RjYwXHU1RTk0XHU0RUM1XHU1RjUzXHU0RjdGXHU3NTI4XHU2NUY2XHU0RkREXHU3NTU5XHUzMDAyXG4gICAgbWFya2Rvd25UYWI6IHRydWUsXG5cbiAgICAvLyBcdTZCNjRcdTU5MDRcdTVGMDBcdTU0MkZcdTRFODZcdTVGODhcdTU5MUFcdTUyOUZcdTgwRkRcdTc1MjhcdTRFOEVcdTZGMTRcdTc5M0FcdUZGMENcdTRGNjBcdTVFOTRcdTRFQzVcdTRGRERcdTc1NTlcdTc1MjhcdTUyMzBcdTc2ODRcdTUyOUZcdTgwRkRcdTMwMDJcbiAgICBtZEVuaGFuY2U6IHtcbiAgICAgIGFsaWduOiB0cnVlLFxuICAgICAgYXR0cnM6IHRydWUsXG4gICAgICBjb21wb25lbnQ6IHRydWUsXG4gICAgICBkZW1vOiB0cnVlLFxuICAgICAgaW5jbHVkZTogdHJ1ZSxcbiAgICAgIG1hcms6IHRydWUsXG4gICAgICBwbGFudHVtbDogdHJ1ZSxcbiAgICAgIHNwb2lsZXI6IHRydWUsXG4gICAgICBzdHlsaXplOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBtYXRjaGVyOiBcIlJlY29tbWVuZGVkXCIsXG4gICAgICAgICAgcmVwbGFjZXI6ICh7IHRhZyB9KSA9PiB7XG4gICAgICAgICAgICBpZiAodGFnID09PSBcImVtXCIpXG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdGFnOiBcIkJhZGdlXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJ0aXBcIiB9LFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiUmVjb21tZW5kZWRcIixcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHN1YjogdHJ1ZSxcbiAgICAgIHN1cDogdHJ1ZSxcbiAgICAgIHRhc2tsaXN0OiB0cnVlLFxuICAgICAgdlByZTogdHJ1ZSxcblxuICAgICAgLy8gXHU1NzI4XHU1NDJGXHU3NTI4XHU0RTRCXHU1MjREXHU1Qjg5XHU4OEM1IGNoYXJ0LmpzXG4gICAgICAvLyBjaGFydDogdHJ1ZSxcblxuICAgICAgLy8gaW5zZXJ0IGNvbXBvbmVudCBlYXNpbHlcblxuICAgICAgLy8gXHU1NzI4XHU1NDJGXHU3NTI4XHU0RTRCXHU1MjREXHU1Qjg5XHU4OEM1IGVjaGFydHNcbiAgICAgIC8vIGVjaGFydHM6IHRydWUsXG5cbiAgICAgIC8vIFx1NTcyOFx1NTQyRlx1NzUyOFx1NEU0Qlx1NTI0RFx1NUI4OVx1ODhDNSBmbG93Y2hhcnQudHNcbiAgICAgIC8vIGZsb3djaGFydDogdHJ1ZSxcblxuICAgICAgLy8gZ2ZtIHJlcXVpcmVzIG1hdGhqYXgtZnVsbCB0byBwcm92aWRlIHRleCBzdXBwb3J0XG4gICAgICAvLyBnZm06IHRydWUsXG5cbiAgICAgIC8vIFx1NTcyOFx1NTQyRlx1NzUyOFx1NEU0Qlx1NTI0RFx1NUI4OVx1ODhDNSBtZXJtYWlkXG4gICAgICAvLyBtZXJtYWlkOiB0cnVlLFxuXG4gICAgICAvLyBwbGF5Z3JvdW5kOiB7XG4gICAgICAvLyAgIHByZXNldHM6IFtcInRzXCIsIFwidnVlXCJdLFxuICAgICAgLy8gfSxcblxuICAgICAgLy8gXHU1NzI4XHU1NDJGXHU3NTI4XHU0RTRCXHU1MjREXHU1Qjg5XHU4OEM1IEB2dWUvcmVwbFxuICAgICAgLy8gdnVlUGxheWdyb3VuZDogdHJ1ZSxcblxuICAgICAgLy8gaW5zdGFsbCBzYW5kcGFjay12dWUzIGJlZm9yZSBlbmFibGluZyBpdFxuICAgICAgLy8gc2FuZHBhY2s6IHRydWUsXG4gICAgfSxcblxuICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NEY2MFx1OTcwMFx1ODk4MSBQV0FcdTMwMDJcdTVCODlcdTg4QzUgQHZ1ZXByZXNzL3BsdWdpbi1wd2EgXHU1RTc2XHU1M0Q2XHU2RDg4XHU0RTBCXHU2NUI5XHU2Q0U4XHU5MUNBXG4gICAgLy8gcHdhOiB7XG4gICAgLy8gICBmYXZpY29uOiBcIi9mYXZpY29uLmljb1wiLFxuICAgIC8vICAgY2FjaGVIVE1MOiB0cnVlLFxuICAgIC8vICAgY2FjaGVJbWFnZTogdHJ1ZSxcbiAgICAvLyAgIGFwcGVuZEJhc2U6IHRydWUsXG4gICAgLy8gICBhcHBsZToge1xuICAgIC8vICAgICBpY29uOiBcIi9hc3NldHMvaWNvbi9hcHBsZS1pY29uLTE1Mi5wbmdcIixcbiAgICAvLyAgICAgc3RhdHVzQmFyQ29sb3I6IFwiYmxhY2tcIixcbiAgICAvLyAgIH0sXG4gICAgLy8gICBtc1RpbGU6IHtcbiAgICAvLyAgICAgaW1hZ2U6IFwiL2Fzc2V0cy9pY29uL21zLWljb24tMTQ0LnBuZ1wiLFxuICAgIC8vICAgICBjb2xvcjogXCIjZmZmZmZmXCIsXG4gICAgLy8gICB9LFxuICAgIC8vICAgbWFuaWZlc3Q6IHtcbiAgICAvLyAgICAgaWNvbnM6IFtcbiAgICAvLyAgICAgICB7XG4gICAgLy8gICAgICAgICBzcmM6IFwiL2Fzc2V0cy9pY29uL2Nocm9tZS1tYXNrLTUxMi5wbmdcIixcbiAgICAvLyAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAvLyAgICAgICAgIHB1cnBvc2U6IFwibWFza2FibGVcIixcbiAgICAvLyAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgICB7XG4gICAgLy8gICAgICAgICBzcmM6IFwiL2Fzc2V0cy9pY29uL2Nocm9tZS1tYXNrLTE5Mi5wbmdcIixcbiAgICAvLyAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcbiAgICAvLyAgICAgICAgIHB1cnBvc2U6IFwibWFza2FibGVcIixcbiAgICAvLyAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgICB7XG4gICAgLy8gICAgICAgICBzcmM6IFwiL2Fzc2V0cy9pY29uL2Nocm9tZS01MTIucG5nXCIsXG4gICAgLy8gICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgLy8gICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgICAge1xuICAgIC8vICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9jaHJvbWUtMTkyLnBuZ1wiLFxuICAgIC8vICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgIC8vICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICBdLFxuICAgIC8vICAgICBzaG9ydGN1dHM6IFtcbiAgICAvLyAgICAgICB7XG4gICAgLy8gICAgICAgICBuYW1lOiBcIkRlbW9cIixcbiAgICAvLyAgICAgICAgIHNob3J0X25hbWU6IFwiRGVtb1wiLFxuICAgIC8vICAgICAgICAgdXJsOiBcIi9kZW1vL1wiLFxuICAgIC8vICAgICAgICAgaWNvbnM6IFtcbiAgICAvLyAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vZ3VpZGUtbWFza2FibGUucG5nXCIsXG4gICAgLy8gICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgIC8vICAgICAgICAgICAgIHB1cnBvc2U6IFwibWFza2FibGVcIixcbiAgICAvLyAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgIC8vICAgICAgICAgICB9LFxuICAgIC8vICAgICAgICAgXSxcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICBdLFxuICAgIC8vICAgfSxcbiAgICAvLyB9LFxuXG4gICAgLy8gXHU1OTgyXHU2NzlDXHU0RjYwXHU5NzAwXHU4OTgxXHU1RTdCXHU3MDZGXHU3MjQ3XHVGRjBDXHU1Qjg5XHU4OEM1IEB2dWVwcmVzcy9wbHVnaW4tcmV2ZWFsanMgXHU1RTc2XHU1M0Q2XHU2RDg4XHU0RTBCXHU2NUI5XHU2Q0U4XHU5MUNBXG4gICAgLy8gcmV2ZWFsanM6IHtcbiAgICAvLyAgIHBsdWdpbnM6IFtcImhpZ2hsaWdodFwiLCBcIm1hdGhcIiwgXCJzZWFyY2hcIiwgXCJub3Rlc1wiLCBcInpvb21cIl0sXG4gICAgLy8gfSxcbiAgfSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOi9teUJsb2cvdnVlcHJlc3MvbXktZG9jcy9zcmMvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxteUJsb2dcXFxcdnVlcHJlc3NcXFxcbXktZG9jc1xcXFxzcmNcXFxcLnZ1ZXByZXNzXFxcXG5hdmJhci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovbXlCbG9nL3Z1ZXByZXNzL215LWRvY3Mvc3JjLy52dWVwcmVzcy9uYXZiYXIudHNcIjtpbXBvcnQgeyBuYXZiYXIgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBuYXZiYXIoW1xuICBcIi9cIixcbiAgXCIvcG9ydGZvbGlvXCIsXG4gIFwiL2RlbW8vXCIsXG4gIHtcbiAgICB0ZXh0OiBcIlx1NjMwN1x1NTM1N1wiLFxuICAgIGljb246IFwibGlnaHRidWxiXCIsXG4gICAgcHJlZml4OiBcIi9ndWlkZS9cIixcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkJhclwiLFxuICAgICAgICBpY29uOiBcImxpZ2h0YnVsYlwiLFxuICAgICAgICBwcmVmaXg6IFwiYmFyL1wiLFxuICAgICAgICBjaGlsZHJlbjogW1wiYmF6XCIsIHsgdGV4dDogXCIuLi5cIiwgaWNvbjogXCJlbGxpcHNpc1wiLCBsaW5rOiBcIlwiIH1dLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJGb29cIixcbiAgICAgICAgaWNvbjogXCJsaWdodGJ1bGJcIixcbiAgICAgICAgcHJlZml4OiBcImZvby9cIixcbiAgICAgICAgY2hpbGRyZW46IFtcInJheVwiLCB7IHRleHQ6IFwiLi4uXCIsIGljb246IFwiZWxsaXBzaXNcIiwgbGluazogXCJcIiB9XSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwiVjIgXHU2NTg3XHU2ODYzXCIsXG4gICAgaWNvbjogXCJib29rXCIsXG4gICAgbGluazogXCJodHRwczovL3RoZW1lLWhvcGUudnVlanMucHJlc3MvemgvXCIsXG4gIH0sXG5dKTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjovbXlCbG9nL3Z1ZXByZXNzL215LWRvY3Mvc3JjLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxcbXlCbG9nXFxcXHZ1ZXByZXNzXFxcXG15LWRvY3NcXFxcc3JjXFxcXC52dWVwcmVzc1xcXFxzaWRlYmFyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9teUJsb2cvdnVlcHJlc3MvbXktZG9jcy9zcmMvLnZ1ZXByZXNzL3NpZGViYXIudHNcIjtpbXBvcnQgeyBzaWRlYmFyIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgc2lkZWJhcih7XG4gIFwiL1wiOiBbXG4gICAgXCJcIixcbiAgICBcInBvcnRmb2xpb1wiLFxuICAgIHtcbiAgICAgIHRleHQ6IFwiXHU2ODQ4XHU0RjhCXCIsXG4gICAgICBpY29uOiBcImxhcHRvcC1jb2RlXCIsXG4gICAgICBwcmVmaXg6IFwiZGVtby9cIixcbiAgICAgIGxpbms6IFwiZGVtby9cIixcbiAgICAgIGNoaWxkcmVuOiBcInN0cnVjdHVyZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJcdTY1ODdcdTY4NjNcIixcbiAgICAgIGljb246IFwiYm9va1wiLFxuICAgICAgcHJlZml4OiBcImd1aWRlL1wiLFxuICAgICAgY2hpbGRyZW46IFwic3RydWN0dXJlXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcIlx1NUU3Qlx1NzA2Rlx1NzI0N1wiLFxuICAgICAgaWNvbjogXCJwZXJzb24tY2hhbGtib2FyZFwiLFxuICAgICAgbGluazogXCJodHRwczovL2Vjb3N5c3RlbS52dWVqcy5wcmVzcy96aC9wbHVnaW5zL21hcmtkb3duL3JldmVhbGpzL2RlbW8uaHRtbFwiLFxuICAgIH0sXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVMsU0FBUyx3QkFBd0I7OztBQ0FuQyxTQUFTLGlCQUFpQjs7O0FDQXhCLFNBQVMsY0FBYztBQUU5VCxJQUFPLGlCQUFRLE9BQU87QUFBQSxFQUNwQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsVUFBVTtBQUFBLE1BQ1I7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLFVBQVUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxPQUFPLE1BQU0sWUFBWSxNQUFNLEdBQUcsQ0FBQztBQUFBLE1BQy9EO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsVUFBVSxDQUFDLE9BQU8sRUFBRSxNQUFNLE9BQU8sTUFBTSxZQUFZLE1BQU0sR0FBRyxDQUFDO0FBQUEsTUFDL0Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzs7O0FDOUJ3UyxTQUFTLGVBQWU7QUFFalUsSUFBTyxrQkFBUSxRQUFRO0FBQUEsRUFDckIsS0FBSztBQUFBLElBQ0g7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUNGLENBQUM7OztBRnBCRCxJQUFPLGdCQUFRLFVBQVU7QUFBQSxFQUN2QixVQUFVO0FBQUEsRUFFVixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsRUFDUDtBQUFBLEVBRUEsWUFBWTtBQUFBLEVBRVosTUFBTTtBQUFBLEVBRU4sTUFBTTtBQUFBLEVBRU4sU0FBUztBQUFBO0FBQUEsRUFHVDtBQUFBO0FBQUEsRUFHQTtBQUFBO0FBQUEsRUFHQSxRQUFRO0FBQUEsRUFDUixlQUFlO0FBQUE7QUFBQSxFQUdmLFNBQVM7QUFBQSxJQUNQLFFBQVE7QUFBQSxNQUNOLHNCQUFzQixDQUFDLE1BQU07QUFBQSxJQUMvQjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBR0EsYUFBYTtBQUFBLElBQ1gsVUFBVTtBQUFBLEVBQ1o7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU1BLFNBQVM7QUFBQTtBQUFBLElBRVAsU0FBUztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsWUFBWTtBQUFBLElBQ2Q7QUFBQSxJQUVBLFlBQVk7QUFBQSxNQUNWLFlBQVksQ0FBQyxTQUFTLFFBQVE7QUFBQSxJQUNoQztBQUFBO0FBQUEsSUFHQSxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsSUFDUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFVQSxhQUFhO0FBQUE7QUFBQSxJQUdiLFdBQVc7QUFBQSxNQUNULE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLFdBQVc7QUFBQSxNQUNYLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxRQUNQO0FBQUEsVUFDRSxTQUFTO0FBQUEsVUFDVCxVQUFVLENBQUMsRUFBRSxJQUFJLE1BQU07QUFDckIsZ0JBQUksUUFBUTtBQUNWLHFCQUFPO0FBQUEsZ0JBQ0wsS0FBSztBQUFBLGdCQUNMLE9BQU8sRUFBRSxNQUFNLE1BQU07QUFBQSxnQkFDckIsU0FBUztBQUFBLGNBQ1g7QUFBQSxVQUNKO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQTRCUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBK0RGO0FBQ0YsQ0FBQzs7O0FEak1ELE9BQU8sYUFBYTtBQUVwQixJQUFPLGlCQUFRLGlCQUFpQjtBQUFBLEVBQzlCLE1BQU07QUFBQSxFQUVOLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUNiLFNBQVM7QUFBQSxJQUNQO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxRQUNFLFFBQVE7QUFBQSxRQUNSLFFBQVE7QUFBQSxVQUNOLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBO0FBQUE7QUFJRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
