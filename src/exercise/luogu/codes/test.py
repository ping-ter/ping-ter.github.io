import random

import subprocess

n = 100


def run(program, input_data):
    # 使用subprocess.run运行程序
    result = subprocess.run(program, input=input_data, text=True, capture_output=True)
    return result.stdout


def calculate_minimum_operations(a):

    # 初始化操作次数为0
    cnt = 0
    # 初始化左右指针，分别指向数组的开始和结束位置
    left, right = 0, n - 1

    while left < right:
        # 如果左右指针指向的元素相等，直接向中间移动指针
        if a[left] == a[right]:
            left += 1
            right -= 1
        else:
            # 计算左右指针指向元素的差值
            diff = a[right] - a[left]

            tag = abs(diff)
            cnt += tag

            # 判断左右指针相邻元素的大小关系，都小于或者都大于
            if (a[left] < a[right] and a[left + 1] < a[right - 1]) or (
                a[left] > a[right] and a[left + 1] > a[right - 1]
            ):
                # 根据差值更新相邻元素的值，这是核心
                if a[left] < a[right]:
                    a[left + 1] = min(tag + a[left + 1], a[right - 1])
                else:
                    a[right - 1] = min(tag + a[right - 1], a[left + 1])

            # 移动指针
            left += 1
            right -= 1

    return cnt


while True:
    a = [random.randint(1, 9) for _ in range(n)]

    # print(11, end=" ")
    # for i in a:
    #     print(i, end=" ")
    # print("")
    input_data = f"{n} " + " ".join(str(i) for i in a)
    print(input_data)
    result = calculate_minimum_operations(a)
    print("right:", result)
    result_ = run("./output/P10902.exe", input_data)
    print("out:", result_)
    if str(result) != result_:
        break
