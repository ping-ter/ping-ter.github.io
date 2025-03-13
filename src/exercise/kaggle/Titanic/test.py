import torch
import numpy as np
import pandas as pd

t = torch.tensor([1,2,3,4,5]).reshape(5,1)
t = (t > 3).float()
print(t)