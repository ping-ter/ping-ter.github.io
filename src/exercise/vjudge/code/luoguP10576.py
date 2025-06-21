import math

x = 10120300500
x_2 = x * 2
ans = []
pre = 0
for a_sub_b in range(1, x_2):
    if a_sub_b / x_2 >= pre + 0.01:
        pre = a_sub_b / x_2
        print(pre)
    if x_2 % a_sub_b == 0:
        a_add_b = x_2 // a_sub_b
        a = (a_sub_b + a_add_b) // 2
        b = (a_add_b - a_sub_b) // 2
        ans.append((a * a + b * b) // 2)

print(ans)
print(sum(ans))
