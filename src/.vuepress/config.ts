import { defineUserConfig } from "vuepress";
import { appendDatePlugin } from '@vuepress/plugin-append-date'
import theme from "./theme.js";
import mathjax from 'vuepress-plugin-mathjax';
// import { docsearchPlugin } from '@vuepress/plugin-docsearch'
// import themeSidebar from 'vuepress-theme-sidebar';
// import themeSidebar from 'vuepress-theme-sidebar';
import vuepressPluginAnchorRight from 'vuepress-plugin-anchor-right';
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "pingter",
  description: "pingter的个人博客",
  plugins: [appendDatePlugin(), vuepressPluginAnchorRight(),
  docsearchPlugin({
    // 配置项
    appId: "36S68U5X2M",

    apiKey: "96c88dec63e005e325f3cbdbd96129cd",

    indexName: "ping-terio",
    placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索',
      },
    },
    // debug: true
  }),
    // themeSidebar()
    // docsearchPlugin({
    //   appId: '<APP_ID>',
    //   apiKey: '<API_KEY>',
    //   indexName: '<INDEX_NAME>',
    //   locales: {
    //     '/': {
    //       placeholder: 'Search Documentation',
    //       translations: {
    //         button: {
    //           buttonText: 'Search Documentation',
    //         },
    //       },
    //     },
    //     '/zh/': {
    //       placeholder: '搜索文档',
    //       translations: {
    //         button: {
    //           buttonText: '搜索文档',
    //         },
    //       },
    //     },
    //   },
    // }),
  ],
  // plugins: [
  //   [
  //     mathjax,
  //     {
  //       target: 'svg',
  //       macros: {
  //         '*': '\\times',
  //       },
  //     },
  //   ],
  // ],
  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});

