import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/portfolio",
  // "/demo/",

  
  {
    text: "算法笔记",
    icon: "lightbulb",
    prefix: "/algorithm_study/",
    // children: [],
    link: "algorithm_study/",
  },
  {
    text: "刷题记录",
    icon: "laptop-code",
    prefix: "exercise/",
    link: "exercise/",
    // children: "structure",
  },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
