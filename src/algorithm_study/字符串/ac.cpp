#include <bits/stdc++.h>
using namespace std;
struct TrieTree
{
    struct node
    {
        string *word;
        node *fail;
        node *next[26];
        node() : word(nullptr)
        {
            fill(next, next + 26, nullptr);
        }
    };
    node *root;
    inline static int trans(const char a)
    {
        return a - 'a';
    }
    TrieTree()
    {
        root = new node();
    }
    void insert(const string &word)
    {
        node *p = root;
        for (const char &i : word)
        {
            int idx = trans(i);
            if (p->next[idx] == nullptr)
            {
                p->next[idx] = new node;
            }
            p = p->next[idx];
        }
        p->word = new string(word);
    }
    void build()
    {
        // 构建fail表
        queue<node*> q;
        for (int i = 0; i < 26; i++)
        {
            q.push(root->next[i]);
        }
        while(!q.empty())
        {
            node* u = q.front();
            q.pop();
            if (u)
            {
                
            }
        }

    }
};

