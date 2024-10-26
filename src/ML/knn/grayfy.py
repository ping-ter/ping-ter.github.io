import cv2

# 读取图片
image = cv2.imread("./shilaidi.png")

# 将图片转换为灰度模式
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
# 将灰度图像转换为 RGB 图像
rgb_image = cv2.cvtColor(gray_image, cv2.COLOR_GRAY2BGR)
# 保存黑白图片
cv2.imwrite("./gray_shilaidi.jpg", rgb_image)
