import datetime

y = 2025
a = None
while True:
    a = datetime.date(y, 6, 1)
    if a.weekday() == 5:
        print(a)
        break
    y += 1

# 9999-6-1 周二
# a = datetime.date(2025, 6, 1)
# print(a.weekday())
# print((6 + 365) % 7)
# a = datetime.date(2026, 6, 1)
# print(a.weekday())
# a = 2025
# now = 6
# while now != 5:
#     a += 1
#     now += 365
#     if a % 4 == 0 and (a % 100 != 0 or a % 400 == 0):
#         now += 1
#     now %= 7
# print(a)