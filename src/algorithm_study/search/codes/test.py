import random

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
print(len(a) + len(b))
for i in a:
    print("Insert", i)
for i in b:
    print("Remove", i)
