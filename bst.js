console.log("这是一条二叉搜索树");

//二产排序树泛型参数需要实现一个"可比较"接口-iComparable
const Compare = {
  _LESS: -1,
  _BIGGER: 1,
  _EQUALS: 0
};

function iComparable(a, b) {
	if(a === b) {
		return Compare._EQUALS;
	}
	return a < b ? Compare._LESS : Compare._BIGGER;
}

class Node {
	constructor(element) {
		this.element = element;
		this.left = null;
		this.right = null;
	}
	toString() {
		return `节点元素为${this.element}`;
	}
}

class BinarySearchTree {
	constructor(compareFn = iComparable) {
	  this.compareFn = compareFn;
	  this.root = null;  
		this.size = 0;
	}
	
	getSize() {
		return this.size;
	}
	
	isEmpty() {
		return size == 0;
	}
	
	add(element) {
		this.root = this.$add(this.root, element);
	}
	
	$add(node, element) {
		if(node == null) {
			this.size++;
			return new Node(element);
		}
		
		if(this.compareFn(element, node.element) === Compare._LESS) 
			node.left = this.$add(node.left, element);
		else if(this.compareFn(element, node.element) === Compare._BIGGER)
			node.right = this.$add(node.right, element);
			
		return node;
	}
	
	contains(element) {
		return this.$contains(this.root, element);
	}
	
	$contains(node, element) {
		if(node == null) {
			return false;
		}
		
		if(this.compareFn(element, node.element) === Compare._EQUALS)
			return true;
		else if(this.compareFn(element, node.element) === Compare._LESS)
			return this.$contains(node.left, element);
		else 
			this.$contains(node.right, element);
	}
	
	preOrder() {
		this.$preOrder(this.root);
	}
	
	$preOrder(node) {
		if(node == null) {
			return;
		}
		console.log(`${node.element}`);
		this.$preOrder(node.left);
		this.$preOrder(node.right);
	}
	
	// 要不是打王者打到自闭,我都不想写这个,等会得去看看直播-2020.8.5
	
	inOrder() {
		this.$inOrder(this.root);
	}
	
	$inOrder(node) {
		if(node == null) {
			return;
		}
		this.$inOrder(node.left);
		console.log(`${node.element}`);
		this.$inOrder(node.right);
	}
	
	postOrder() {
		this.$postOrder(this.root);
	}
	
	$postOrder(node) {
		if(node == null) {
			return;
		}
		this.$postOrder(node.left);
		this.$postOrder(node.right);
		console.log(`${node.element}`);
	}
	
	// 层序遍历我就不写了,因为还要自己实现队列,懒得
	
	min() {
		if(this.size == 0){
			throw new Error("BST is empty!");
		}
		return this.$min(this.root).element;
	}
	
	$min(node) {
		if(node.left == null) {
			return node;
		}
		return this.$min(node.left);
	}
	
	minNR() {
		if(this.size == 0){
			throw new Error("BST is empty!");
		}
		let cur = this.root;
		while(cur.left != null){
			cur = cur.left;
		}
		return cur.element;
	}
	
	removeMin() {
		let ret = this.min();
		this.root = this.$removeMin(this.root);
		return ret;
	}
	
	$removeMin(node) {
		if (node.left == null) {
				let rightNode = node.right;
				node.right = null;  //断掉node它自己，右孩子接替它
				this.size--;
				return rightNode;
		}
		node.left = this.$removeMin(node.left);  //断掉node的左孩子，node还是它node
		return node;
	}
	
	remove(element) {
		this.$remove(this.root, element);
	}
	
	$remove(node, element) {
		if(node == null) {
			return null;
		}
		
		if(this.compareFn(element, node.element) === Compare._LESS) {
			node.left = this.$remove(node.left, element);
			return node;
		}
		else if(this.compareFn(element, node.element) === Compare._BIGGER) {
			node.right = this.$remove(node.right, element);
			return node;
		}
		else {  // element == node.element
		
			if(node.left == null) {
				let rightNode = node.right;
				node.right = null;
				this.size--;
				return rightNode;
			}
			
			if(node.right == null) {
				let leftNode = node.left;
				node.left = null;
				this.size--;
				return leftNode;
			}
			
			//待删除节点含有左右子树
			//找到比待删节点大的最小节点，即待删节点的右子树的最小节点
			//用这个节点替代待删节点的位置(hibbard deletion)
			let successor = this.$min(node.right);
			successor.right = this.$removeMin(node.right);
			successor.left = node.left; 

			node.left = node.right = null;
			return successor;
		}
	}
}

const bst = new BinarySearchTree();
bst.add(5);
bst.add(3);
bst.add(6);
bst.add(8);
bst.add(4);
bst.add(2);
bst.inOrder();
console.log("-----------------------")
console.info(bst.min());
bst.remove(3);
console.log("-----------------------")
bst.inOrder();
console.log("-----------------------")