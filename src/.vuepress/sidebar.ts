import { sidebar } from "vuepress-theme-hope";
// import themeSidebar from 'vuepress-theme-sidebar';
export default sidebar(
  {
    // collapse: "structure",
    // sidebarDepth: 1,
    "/": [
      "",
      "portfolio",
      {
        text: "算法笔记",
        icon: "book",
        prefix: "algorithm_study/",
        children: "structure",
      },
      {
        text: "刷题记录",
        icon: "laptop-code",
        prefix: "exercise/",
        link: "exercise/",
        children: "structure",
      },
    ],

  });
