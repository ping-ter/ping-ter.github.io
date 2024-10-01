const path = require('path')
const spawn = require('cross-spawn')
const fs = require('fs');

/**
 * @type {import('@vuepress/types').Plugin}
 */
module.exports = (options = {}, context) => ({
    extendPageData($page) {
        const { transformer, dateOptions } = options
        const timestamp = getGitLastUpdatedTimeStamp($page._filePath)
        const $lang = $page._computed.$lang
        if (timestamp) {
            const lastUpdated = typeof transformer === 'function'
                ? transformer(timestamp, $lang)
                : defaultTransformer(timestamp, $lang, dateOptions)
            $page.lastUpdated = lastUpdated
            $page.lastUpdatedTimestamp = timestamp
        }
    }
})

function defaultTransformer(timestamp, lang, dateOptions) {
    return new Date(timestamp).toLocaleString(lang, dateOptions)
}

function getGitLastUpdatedTimeStamp(filePath) {
    let lastUpdated
    try {
        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error(err);
                return;
            }

            const mtime = stats.mtime.getTime(); // 获取时间戳
            // console.log('文件最后修改时间戳：', mtime);
            lastUpdated = mtime;
        });
    } catch (e) { /* do not handle for now */ }
    return lastUpdated
}
