### 二叉排序树（BinarySearchTree）说明
```
-- bst.js
	          5
	        /   \
	       3     6
	     /  \     \
	    2    4     8
	
	bst.preOrder(); // 5 3 2 4 6 8
	bst.inOrder();  // 2 3 4 5 6 8
	bst.postOrder();  // 2 4 3 8 6 5
	bst.levelOrder(); // 5 3 6 2 4 8
	bst.max();  // 8
```
#####  1. 增加元素add
#####  2. 前序遍历preOrder
#####  3. 中序遍历inOrder
#####  4. 后序遍历postOrder
#####  5. 寻找最小值min
#####  6. 寻找最大值非递归实现minNR
#####  删除，查找等等

### demo说明
```
	*姓名     *成绩     *排名
	
	熊大       99        1
	熊二       98        2
	涂涂       98        2
	蹦蹦       97        3
```
##### 第一点,上面例子是一棵普通的二叉搜索树，在这成绩排名表中对于相同成绩来说，我们二叉搜索树需要加入一个count变量
```
-- index.js
	
			98：2
			/  \
		97：1 99：1
```
##### 第二点，其实排名也可以（1，2，2，4），要改改逻辑，不过也差不多