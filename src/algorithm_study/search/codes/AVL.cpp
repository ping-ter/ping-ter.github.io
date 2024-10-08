#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
using namespace std;

vector<int> datas = {
    2048, 3, 6149, 8201, 8203, 4109, 17, 6168, 2076, 4124, 2078, 4125, 8224, 33, 2079, 8225, 4128, 8230, 2089, 6187, 2092, 4141, 8238, 46, 4144, 4145, 49, 58, 2107, 60, 4156, 63, 8255, 4161, 2113, 4163, 8257, 6209, 4176, 6227, 2135, 8280, 8281, 87, 4186, 4189, 2142, 6241, 2147, 8293, 6250, 8298, 107, 8301, 4203, 6256, 112, 2162, 115, 2164, 6262, 2167, 8311, 6265, 2170, 4214, 124, 8317, 2174, 8316, 125, 4228, 136, 2186, 4234, 8333, 8334, 6288, 8336, 146, 2195, 4244, 8341, 6292, 4247, 4248, 8345, 4255, 8355, 6308, 2215, 172, 2221, 6322, 8371, 2235, 4286, 2239, 8386, 6338, 4290, 198, 8391, 4298, 203, 4301, 8399, 207, 2259, 2260, 6356, 4312, 217, 4315, 4316, 8416, 226, 8420, 8421, 8422, 2279, 6372, 2280, 2285, 8433, 242, 4337, 6389, 8438, 246, 4352, 2306, 259, 6405, 4361, 6416, 8465, 4368, 2324, 6421, 6422, 2327, 6424, 8473, 283, 8480, 291, 298, 4396, 4399, 6449, 8500, 4407, 311, 2361, 4410, 4412, 4415, 6466, 2371, 4420, 2374, 6470, 328, 2380, 2385, 2387, 8536, 344, 345, 2395, 6491, 2398, 8543, 6495, 6497, 353, 8548, 4453, 359, 6503, 4455, 6507, 4459, 365, 8557, 4464, 8563, 371, 4469, 8566, 4471, 2424, 6521, 377, 6523, 379, 6525, 8575, 2431, 8582, 8583, 8589, 8592, 8593, 6544, 401, 6552, 4504, 2458, 8608, 4512, 4516, 6565, 2471, 8615, 8620, 4529, 4531, 8631, 6584, 2490, 2495, 4546, 4548, 8650, 4558, 2511, 6613, 4565, 6615, 473, 6617, 2523, 8668, 480, 6626, 4579, 4583, 6633, 4589, 6640, 6646, 2553, 508, 8702, 6654, 512, 4606, 2562, 4610, 4611, 4613, 515, 523, 6667, 2574, 2580, 8728, 4634, 2586, 8737, 547, 8740, 548, 8741, 6695, 2600, 557, 558, 559, 6704, 8749, 2608, 2612, 8759, 2617, 569, 6714, 4668, 6717, 2625, 4674, 4675, 581, 4678, 8775, 8779, 2636, 2642, 8787, 2644, 4693, 4694, 8786, 601, 8794, 2651, 6747, 605, 2658, 6755, 8806, 6761, 6763, 6764, 6765, 8811, 4719, 4720, 4724, 8821, 2676, 2681, 4730, 646, 2695, 4744, 4745, 8849, 6801, 659, 6805, 8854, 6808, 8856, 6809, 8860, 2718, 8863, 4772, 2724, 678, 4775, 8871, 6828, 685, 8877, 2739, 692, 696, 6844, 700, 8894, 8903, 8904, 4809, 6855, 2772, 6869, 6870, 4825, 6874, 6876, 8928, 2785, 2789, 741, 742, 4840, 2796, 749, 4848, 756, 757, 4854, 8948, 765, 8961, 4865, 772, 4869, 6916, 777, 784, 2833, 8978, 787, 8980, 6932, 8979, 8983, 6931, 790, 4890, 2842, 2843, 799, 6949, 2855, 4909, 9005, 4911, 4914, 4918, 824, 826, 4923, 4931, 839, 841, 2889, 4942, 9038, 853, 9046, 855, 9048, 859, 2909, 9054, 864, 9058, 4965, 871, 874, 879, 4976, 9072, 885, 4982, 7032, 890, 9083, 4990, 896, 7046, 2952, 906, 5005, 7058, 914, 5012, 916, 922, 9115, 924, 9119, 9125, 2984, 7080, 936, 938, 2988, 941, 9135, 946, 5045, 7095, 9145, 955, 7103, 7104, 7105, 3008, 963, 3014, 3017, 5066, 7118, 5071, 7119, 3023, 3026, 7124, 981, 9176, 9179, 7136, 7137, 3042, 9188, 9189, 5093, 7146, 1003, 7151, 1008, 3056, 9201, 1011, 9204, 5109, 7158, 9209, 7162, 7163, 5116, 3073, 1026, 7174, 1032, 5130, 1036, 9229, 7184, 9234, 1042, 5142, 9239, 3097, 7194, 9247, 3105, 7202, 3107, 3110, 3116, 5164, 7213, 1071, 1075, 9267, 9269, 3127, 9272, 5176, 1082, 3136, 1089, 3139, 9284, 9289, 7243, 7244, 1102, 7246, 9295, 3152, 1110, 3160, 7258, 5212, 9312, 7268, 9319, 3177, 9330, 1139, 9334, 3191, 1144, 7288, 5239, 7293, 5248, 3205, 1158, 5254, 5253, 9356, 3213, 1172, 9366, 7318, 9371, 1180, 5275, 7326, 5279, 9376, 9377, 1184, 9381, 5287, 5288, 3241, 7338, 9392, 1200, 1207, 3255, 5305, 5306, 1217, 7375, 5328, 3279, 9423, 9427, 9424, 5327, 9430, 9431, 1236, 7385, 5339, 1248, 9442, 3298, 3299, 9448, 1258, 7403, 1261, 9455, 1264, 5361, 7410, 1265, 9456, 3317, 9462, 5367, 9464, 1271, 1276, 1278, 3331, 9477, 1285, 3335, 5383, 1289, 9482, 1297, 3345, 3350, 7446, 1304, 7449, 9498, 5403, 1310, 1311, 3359, 1314, 9511, 7464, 5420, 1328, 3379, 7478, 7479, 5436, 1342, 1343, 7488, 7490, 7493, 3402, 7499, 9550, 1359, 1360, 7505, 5458, 9556, 1368, 3419, 1372, 3421, 3423, 9568, 9573, 7527, 1384, 5481, 5480, 9579, 7532, 5483, 5479, 5494, 1399, 5496, 1404, 3455, 7551, 7553, 5509, 1415, 3467, 3468, 7569, 9619, 3476, 1431, 7580, 9635, 7593, 3498, 7596, 9645, 7598, 3501, 5549, 1458, 7604, 3510, 9654, 1462, 5562, 9661, 1470, 1471, 5565, 7617, 3527, 1480, 9673, 5578, 1482, 1489, 1492, 7637, 5592, 7641, 3548, 3553, 9698, 9699, 7652, 3560, 7659, 5612, 9709, 5611, 5616, 1521, 7667, 1524, 5621, 7670, 5631, 3585, 7683, 5636, 3589, 9734, 1541, 7689, 5642, 7692, 1549, 3598, 5647, 7701, 5655, 1560, 9753, 1561, 9752, 7709, 7710, 7714, 9763, 1572, 1573, 5668, 9768, 1576, 7722, 9771, 5676, 1579, 7726, 9778, 7732, 7733, 3636, 7735, 1591, 5686, 1595, 3644, 1598, 9792, 9796, 7749, 5702, 9800, 1609, 5708, 7756, 3661, 1615, 3665, 5713, 1619, 5715, 1632, 7777, 9834, 1647, 5746, 9842, 5749, 3704, 5753, 7803, 3710, 9854, 1664, 1665, 3714, 7811, 5759, 1669, 3718, 1671, 5761, 5772, 3726, 9871, 1679, 1681, 1683, 1688, 1694, 1695, 5792, 3746, 7845, 7846, 9895, 1703, 5802, 5804, 1709, 7854, 3758, 7857, 9908, 5813, 5817, 7866, 1722, 9913, 1726, 5823, 3778, 3780, 9925, 5831, 9930, 3787, 3790, 5841, 7889, 1748, 3797, 5846, 3800, 9951, 9954, 1763, 5858, 5862, 9960, 1768, 5866, 1776, 3827, 5876, 1779, 9977, 7931, 9980, 3837, 5886, 3848, 7946, 5899, 1806, 5902, 10000, 1810, 7955, 3862, 7965, 1822, 3869, 3874, 5925, 1833, 7978, 3885, 5935, 7983, 7985, 3888, 3891, 1844, 7989, 1846, 3896, 5945, 1850, 1855, 5952, 5959, 8008, 8020, 1881, 3937, 8039, 8041, 8042, 3947, 1900, 3950, 3955, 3960, 8056, 1914, 6012, 6023, 6027, 6029, 6034, 1939, 6036, 3989, 6038, 6039, 8086, 8092, 6047, 6049, 1954, 8100, 8101, 8102, 4008, 4009, 8105, 6063, 8112, 6076, 4035, 1990, 6090, 1998, 4046, 2006, 8155, 4064, 8160, 8163, 6116, 2021, 4070, 4071, 2024, 2025, 2023, 2027, 6124, 6122, 6128, 2034, 4083, 6131, 2036, 6135, 8186};
vector<int> datas2 = {
    7168, 1034, 5642, 3595, 2063, 6674, 8726, 5144, 5663, 9251, 43, 564, 53, 5177, 5696, 73, 8271, 4689, 88, 3164, 3682, 3170, 7784, 4713, 1132, 7277, 8302, 5751, 7294, 1667, 9354, 8331, 3212, 2225, 4274, 3251, 7352, 1722, 5836, 3276, 5850, 3291, 8412, 1762, 3814, 4848, 6389, 4341, 4864, 258, 6403, 3844, 3337, 5908, 5403, 7456, 7968, 7459, 5412, 803, 6962, 3378, 7988, 2875, 8515, 2899, 9556, 345, 4444, 5981, 7521, 5477, 9062, 7018, 9583, 3444, 4989, 6019, 3971, 1930, 7569, 5014, 9114, 6043, 4005, 947, 8118, 9654, 2497, 1477, 7126, 4060, 4064, 6114, 9700, 7149, 5616, 6640, 2047};

struct node
{
    int key;
    int height; // 节点高度
    node *leftChild;
    node *rightChild;
    node(int key) : key(key), rightChild(nullptr), leftChild(nullptr), height(0) {}
};

struct AVL
{
    node *root;

    AVL() : root(nullptr) {}
    node *search(int key);
    void inOrderTravel()
    {
        cout << endl;
        inOrder(root);
        cout << endl;
    }

    void insert(int key);
    void delNode(int key);
    void rankOrder();

private:
    void rotate(node *&nownode); // 旋转
    // 各种旋转
    void LL(node *&nownode);
    void RR(node *&nownode);
    void LR(node *&nownode);
    void RL(node *&nownode);

    static inline void updateHeight(node *nownode); // 更新节点高度
    static inline int balanceFactor(node *nownode); // 计算平衡系数
    static inline int height(node *nownode);        // 获取高度,空节点高度为 -1
    void inOrder(node *nownode);
    void insert_in(node *&nownode, int key);
    void delNode_in(node *&nownode, int key);
};

int AVL::height(node *nownode) // 获取高度,空节点高度为 -1
{
    return nownode == nullptr ? -1 : nownode->height;
}

void AVL::updateHeight(node *nownode) // 更新节点高度
{
    nownode->height = max(height(nownode->leftChild), height(nownode->rightChild)) + 1;
}

void AVL::inOrder(node *nownode)
{
    if (nownode == nullptr)
    {
        return;
    }

    inOrder(nownode->leftChild);
    cout << nownode->key << " ";
    inOrder(nownode->rightChild);
}

void AVL::insert(int key)
{
    insert_in(root, key);
}

void AVL::insert_in(node *&nownode, int key)
{
    if (nownode == nullptr)
    {
        nownode = new node(key);
    }
    else if (nownode->key < key)
    {
        insert_in(nownode->rightChild, key);
    }
    else if (nownode->key > key)
    {
        insert_in(nownode->leftChild, key);
    }

    rotate(nownode);       // 从底向上调用旋转函数来平衡
    updateHeight(nownode); // 更新节点高度
}

void AVL::rankOrder()
{
    queue<node *> que;

    que.push(root);

    while (!que.empty())
    {
        node *nownode = que.front();
        que.pop();
        if (nownode != nullptr)
        {
            cout << nownode->key << " ";
            que.push(nownode->leftChild);
            que.push(nownode->rightChild);
        }
    }
}

node *AVL::search(int key)
{
    node *p = root;
    while (p != nullptr)
    {
        if (p->key > key)
        {
            p = p->leftChild;
        }
        else if (p->key < key)
        {
            p = p->rightChild;
        }
        else
        {
            return p;
        }
    }
    return nullptr; // 未查询到
}

void AVL::delNode(int key)
{
    delNode_in(root, key);
}

// 涉及修改,要用引用
void AVL::delNode_in(node *&nownode, int key)
{
    if (nownode == nullptr)
    {
        return; // 未查询到,不执行操作
    }

    if (nownode->key < key)
    {
        delNode_in(nownode->rightChild, key);
    }
    else if (nownode->key > key)
    {
        delNode_in(nownode->leftChild, key);
    }
    else // 查询到目标节点
    {
        // 有两个节点的情况
        if (nownode->leftChild != nullptr && nownode->rightChild != nullptr)
        {
            node *newroot = nownode->rightChild;
            while (newroot->leftChild != nullptr)
            {
                newroot = newroot->leftChild; // 找到中根后继
            }

            nownode->key = newroot->key;
            delNode_in(newroot, newroot->key);
        }
        else // 其它情况
        {
            node *pre = nownode;
            nownode = pre->rightChild; // 因为是引用,可以直接修改
            if (pre->leftChild != nullptr)
            {
                nownode = pre->leftChild;
            }
            delete pre;
        }
    }

    if (nownode != nullptr) // 删除后可能变成空树
    {
        rotate(nownode);
        updateHeight(nownode);
    }
}

int AVL::balanceFactor(node *nownode) // 计算平衡系数
{
    return height(nownode->leftChild) - height(nownode->rightChild);
}

void AVL::rotate(node *&nownode)
{
    int nownodeBF = balanceFactor(nownode);
    node *child;
    int childBF;
    if (nownodeBF > 1) // 左偏树
    {
        child = nownode->leftChild;
        childBF = balanceFactor(child);
        if (childBF < 0) // 右边高
        {
            LR(nownode);
        }
        else
        {
            RR(nownode);
        }
    }
    else if (nownodeBF < -1) // 右偏树
    {
        child = nownode->rightChild;
        childBF = balanceFactor(child);
        if (childBF > 0) // 左边高
        {
            RL(nownode);
        }
        else
        {
            LL(nownode);
        }
    }
}

// 各种旋转
void AVL::LL(node *&nownode)
{
    node *temp = nownode;
    node *child = nownode->rightChild;
    nownode = child; // 取代
    temp->rightChild = child->leftChild;
    child->leftChild = temp;

    // 更新高度
    updateHeight(temp);
    updateHeight(child);
}

void AVL::RR(node *&nownode)
{
    node *temp = nownode;
    node *child = nownode->leftChild;
    nownode = child; // 取代
    temp->leftChild = child->rightChild;
    child->rightChild = temp;

    // 更新高度
    updateHeight(temp);
    updateHeight(child);
}

void AVL::LR(node *&nownode)
{
    LL(nownode->leftChild);
    RR(nownode);
}

void AVL::RL(node *&nownode)
{
    RR(nownode->rightChild);
    LL(nownode);
}

int main()
{
    AVL a;
    // int op,data;
    // while(1)
    // {
    //     cin >> op >> data;
    //     if(op == 1)
    //     {
    //         a.insert(data);
    //     }
    //     else if(op == 2)
    //     {
    //         a.delNode(data);
    //     }
    //     cout << "nowRoot:" << a.root->key << endl;
    //     a.inOrderTravel();
    // }
    for (int i = 0; i < 20; i++)
    {
        a.insert(i);
    }
    a.inOrderTravel();
    cout << "\n";
    a.rankOrder();
    return 0;
}