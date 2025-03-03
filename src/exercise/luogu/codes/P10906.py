data = r"kfdhtshmrw4nxg#f44ehlbn33ccto#mwfn2waebry#3qd1ubwyhcyuavuajb#vyecsycuzsmwp31ipzah#catatja3kaqbcss2th"

cnt = 0

a = "1234567890"
b = "#"

for i in range(8, 17):
    print(i)
    strs = [data[x : x + i] for x in range(len(data) - i + 1)]
    # print(strs)
    
    for s in strs:
        number = False
    
        for j in a:
            if j in s:
                number = True
                break
        if not number:
            continue
        if b not in s:
            continue
        cnt += 1
        
print(cnt)

# for i in data:
#     if ord(i) >= ord("a") and ord(i) <= ord("z"):
#         continue
#     if ord(i) >= ord("0") and ord(i) <= ord("9"):
#         continue
#     print(i, end="")
