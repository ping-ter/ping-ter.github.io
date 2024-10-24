
def fun(arg):
    if arg == 1:
        raise TimeoutError

try:
    fun(1)
except Exception as e:
    print("except")
    print(e)
else:
    print("else")
finally:
    print("finally")
    print("处理完成")
    
print(123)

