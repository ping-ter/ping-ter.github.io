import requests
import bs4 as bs
import re
import os
import urllib.request
import json

def json_parser(html: str):
    # convert raw html to json
    # !!! a new method is discovered, this function is deprecated !!!
    try:
        pattern = r'decodeURIComponent\("(.*?)"\)'
        soup = bs.BeautifulSoup(html, "html.parser")
        script = soup.find_all("script")[0].string
        match = re.search(pattern, script)
        if match:
            content = urllib.parse.unquote(match.group(1))
            js = json.loads(content)
            return js
        else:
            print("No match found.")
            return None
    except Exception as e:
        print("Error: ", e)
        return None
    
def problem_markdown_parser(dict: dict,file):
    # convert json to markdown
    pid = dict["pid"]
    title = dict["title"]

    translation = {
        "background": "题目背景",
        "description": "题目描述",
        "inputFormat": "输入格式",
        "outputFormat": "输出格式",
        # "samples": "样例",
        "hint": "说明/提示",
    }

    def content_parser(content):
        # remove the head and tail \n
        content = content.lstrip("\n").rstrip("\n")
        return content

    # with open(pid + "-" + title + ".md", "a", encoding="utf-8") as f:
    with open(file, "a", encoding="utf-8") as f:    
        f.write("# " + f"{pid} " + title + "\n\n")
        if dict["background"] != "":
            f.write("## " + translation["background"] + "\n\n")
            f.write(content_parser(dict["background"]) + "\n\n")
        if dict["description"] != "":
            f.write("## " + translation["description"] + "\n\n")
            f.write(content_parser(dict["description"]) + "\n\n")
        if dict["inputFormat"] != "":
            f.write("## " + translation["inputFormat"] + "\n\n")
            f.write(content_parser(dict["inputFormat"]) + "\n\n")
        if dict["outputFormat"] != "":
            f.write("## " + translation["outputFormat"] + "\n\n")
            f.write(content_parser(dict["outputFormat"]) + "\n\n")
        if dict["hint"] != "":
            f.write("## " + translation["hint"] + "\n\n")
            f.write(content_parser(dict["hint"]))

def create_luogu_md(problemId, file):
    

    headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
            'Accept': '*/*',
            'Host': 'www.luogu.com.cn',
            'Connection': 'keep-alive',
            # 'Cookie': '__client_id=ca02d46480bf42032e4d99e690eec5e887a5228c; _uid=630003'
        }
    problem_url = "https://www.luogu.com.cn/problem/P{}"
    res = requests.get(url=problem_url.format(problemId), headers=headers)
    # print(res.text)
    data = json_parser(res.text)
    # print(data)
    problem_markdown_parser(data["currentData"]["problem"],file)