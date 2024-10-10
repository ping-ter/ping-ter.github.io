import os
from bs4 import BeautifulSoup
# idata = input("输入网址:")



soup = BeautifulSoup(html_code, 'html.parser')
article = soup.find('article') 
text = article.get_text()

print(text)