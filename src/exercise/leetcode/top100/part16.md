# 热门100题part16（）

## 538.把二叉搜索树转换为累加树

乍一看理解不了题意，弄明白之后发现就是在二叉树上算前缀和，只不过顺序是反中根遍历。

```c++
class Solution
{
    int sum = 0;

public:
    TreeNode *convertBST(TreeNode *root)
    {
        if (root == nullptr)
        {
            return nullptr;
        }
        convertBST(root->right);
        sum += root->val;
        root->val = sum;
        convertBST(root->left);
        return root;
    }
};
```

## 85.最大矩形

`221.最大正方形`升级版，那道题使用DP解决，尝试一下这题能不能DP。

![Alt text](image-1.png)

可以看到，大矩形也是可以拆成几个同构的小矩形的，只不过正方形只要记录边长，这个要记录长和宽。
但是还有个大问题，一个点对应的最大正方形可以唯一，但是长方形可以有好几种形态。

## 105.从前序与中序遍历序列构造二叉树

可以从前序遍历序列找到根节点，对应地通过中序遍历序列划分左右子树，递归即可。

```c++
class Solution
{
    int i = 0;
    TreeNode *buildInner(vector<int> &preorder, vector<int> &inorder, int l, int r)
    {
        // cout << l << "," << r << "\n";
        if (l > r || i >= preorder.size())
        {
            return nullptr;
        }
        auto node = new TreeNode(preorder[i]);
        i++;
        int mid;
        for (int j = l; j <= r; j++)
        {
            if (inorder[j] == node->val)
            {
                mid = j;
                break;
            }
        }
        node->left = buildInner(preorder, inorder, l, mid - 1);
        node->right = buildInner(preorder, inorder, mid + 1, r);
        return node;
    }

public:
    TreeNode *buildTree(vector<int> &preorder, vector<int> &inorder)
    {
        return buildInner(preorder, inorder, 0, preorder.size() - 1);
    }
};
```

## 84.柱状图中最大的矩形

像是动态规划，想想怎么递推