import zhconv

def convert_file(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 转换为简体中文
    content_simplified = zhconv.convert(content, 'zh-cn')
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content_simplified)

# 使用示例
input_file = './cmn.csv'  # 繁体中文文档
output_file = './cmn.csv'  # 转换后的简体中文文档
convert_file(input_file, output_file)
