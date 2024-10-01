import random

a = []

for i in range(0,1001):
    a.append(random.randint(0,9999999))

print(a)

a.sort()
print(a)