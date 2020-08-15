let dataSource = [
	{ name: "熊二", score: 99 },
	{ name: "萝卜头", score: 70 },
	{ name: "蹦蹦", score: 88 },
	{ name: "涂涂", score: 69 },
	{ name: "光头强", score: 100 },
	{ name: "赵琳", score: 99 },
	{ name: "熊大", score: 98 },
	{ name: "李老板", score: 70 },
	{ name: "团子", score: 90 }
];
var oTableBody = document.getElementById("tableBody");
var oTableCaption = document.getElementById('tableCaption');
var oName = document.getElementById('name');
var oScore = document.getElementById('score');
var oBtnOK = document.getElementById('btnOK');
var template = '';  
let arr = [];

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
		this.count = 1;   //增加一个累计变量
	}
	toString() {
		return `节点元素为${this.element}:${this.count}`;
	}
}

class BST {
	constructor(compareFn = iComparable) {
	  this.compareFn = compareFn;
	  this.root = null;  
		this.size = 0;
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
		else 
			node.count ++;
		return node;
	}
	
	inOrder() {
		this.$inOrder(this.root);
	}
	
	$inOrder(node) {
		let obj = {
			element: 0,
			count: 0
		}
		if(node == null) {
			return;
		}
		this.$inOrder(node.right);  //成绩从高到低排,所以先看右节点
		obj["element"] = node.element;
		obj["count"] = node.count;
		arr.push(obj);
		this.$inOrder(node.left);
	}
}

function rank() {
	let resData = []; 
	let bst = new BST();
	for(let i = 0; i < dataSource.length; i++) {
		let element = dataSource[i].score;
		bst.add(element);
	}
	bst.inOrder();
	for(let j = 1; j <= arr.length; j++) {     //这里的j刚好就是排名,所以以1开始
		for(let k = 0; k < dataSource.length; k++) {
			let obj = {
				name: "",
				score: 0,
				rank: 0
			};
			if(arr[j-1].element == dataSource[k].score) {
				obj["name"] = dataSource[k].name;
				obj["score"] = dataSource[k].score;
				obj["rank"] = j;
				resData.push(obj);
			}
		}
	}
	return resData;  //排好的数据
}

function render() {
	template = "";
	arr = [];
	let data = rank();
	oTableCaption.innerText = `学生成绩单(共${data.length}人)`;
	for(let i = 0; i < data.length; i++) {
		template += `
			<tr>
				<td>${data[i].name}</td>
				<td>${data[i].score}</td>
				<td>${data[i].rank}</td>
			</tr>
		`;
	}
	oTableBody.innerHTML = template;
}

function btnOK() {
	let name = oName.value;
	let score = parseInt(oScore.value);
	dataSource.push({ name,score });
	render();
	 $('#myModal').modal('hide');  // jquery
}


render();
oBtnOK.addEventListener('click', btnOK, false);  //鼠标点击时调用showMes这个函数  