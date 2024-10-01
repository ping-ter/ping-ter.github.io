import os
import sys

n = int(input())
A = [int(input()) for _ in range(0,n)]
minnum = min(A)
maxnum = max(A)
A.append(0)
canGives = {x for x in A}
cannots = 0
#cannotsNum = []
continues = 0

steps = minnum * minnum + maxnum

for i in range(1,steps):
    for j in A:
        if i - j in canGives:
            canGives.add(i)
            continues += 1
            break
    if not (i in canGives):
        cannots += 1
        #cannotsNum.append(i)
        continues = 0
    elif continues == minnum:
        break
    
if not continues == minnum:
    print("INF")
else:
    print(cannots)        
