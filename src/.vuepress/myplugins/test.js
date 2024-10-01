// const fs = require('fs');
import fs from 'fs';

// console.log("111");

fs.stat('F:\\myBlog\\vuepress\\my-docs\\src\\.vuepress\\myplugins\\docs_update_time.js', (err, stats) => {
    if (err) {
        console.error(err);
        return;
    }

    const mtime = stats.mtime.getTime(); // 获取时间戳
    console.log('文件最后修改时间戳：', mtime);
});