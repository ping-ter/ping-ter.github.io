import subprocess
import random
import anytree


def generate_data():
    a = set()
    b = set()
    for i in range(0, 15):
        a.add(random.randint(0, 15))

    for i in range(0, 15):
        b.add(random.randint(0, 15))

    a = list(a)
    b = list(b)
    random.shuffle(a)
    random.shuffle(b)
    data = str(len(a) + len(b)) + "\n"
    for i in a:
        data += "Insert " + str(i) + "\n" 
    for i in b:
        data += "Remove " + str(i) + "\n" 
    print(data)
    return data

def run_program(program_path, input_data):
    process = subprocess.Popen(program_path, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
    output, error = process.communicate(input=input_data)
    return output

def compare_outputs(output1, output2):
    return output1 == output2


def io_test():
    program1_path = './output/RBT.exe'
    program2_path = './test2/output/init.exe'
    
    while True:
        # 准备输入数据
        input_data = generate_data()
        # file = open("./8.in","r")
        # input_data = file.read()
        print("输入:")
        print(input_data)
        try:
            output1 = run_program(program1_path, input_data)
            output2 = run_program(program2_path, input_data)

            print("output1:")
            print(output1.encode())
            print("output2:")
            print(output2.encode())
            if compare_outputs(output1, output2):
                print("输出结果相同")
            else:
                print("输出结果不同")
                break
            
        except Exception as e:
            print(f"运行时发生异常: {e}")
            break
        
        
io_test()