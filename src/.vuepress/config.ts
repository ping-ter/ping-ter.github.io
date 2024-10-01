import { defineUserConfig } from "vuepress";
import { appendDatePlugin } from '@vuepress/plugin-append-date'
import theme from "./theme.js";
import mathjax from 'vuepress-plugin-mathjax';
// import themeSidebar from 'vuepress-theme-sidebar';

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "pingter",
  description: "pingter的个人博客",
  plugins: [appendDatePlugin()],
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

