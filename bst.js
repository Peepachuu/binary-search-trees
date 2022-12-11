const queue = require("./queue.js");

const Node = function(data=null) {
    let leftChild = null;
    let rightChild = null;

    return {
        data,
        leftChild,
        rightChild
    }
};

const Tree = function(array) {
    const uniq = [...new Set(array)];
    uniq.sort((a, b) => {return a - b});

    function buildTree(start, end, arr) {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        let root = Node(arr[mid]);

        root.leftChild = buildTree(start, mid - 1);
        root.rightChild = buildTree(mid + 1, end);

        return root;
    }

    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node.rightChild !== null) {
            prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.leftChild !== null) {
            prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    function find(node) {
        let currentRoot = headRoot;
        while (currentRoot != null && node.data != currentRoot.data) {
            if (node.data < currentRoot.data)
                currentRoot = currentRoot.leftChild;
            else if (node.data > currentRoot.data)
                currentRoot = currentRoot.rightChild;
        }
        return currentRoot;
    }

    function insert(node) {
        let currentRoot = headRoot;
        while (true) {
            if (node.data < currentRoot.data) {
                if (currentRoot.leftChild == null) break;
                currentRoot = currentRoot.leftChild;
            }
            else if (node.data > currentRoot.data) {
                if (currentRoot.rightChild == null) break;
                currentRoot = currentRoot.rightChild;
            }
            else if (node.data == currentRoot.data)
                return ;
        }
        if (node.data < currentRoot.data)
            currentRoot.leftChild = node;
        else if (node.data > currentRoot.data)
            currentRoot.rightChild = node;
    }

    function deleteNode(node) {
        let currentRoot = headRoot;
        
    }

    function levelOrder(callback, list=[]) {
        let currentRoot = headRoot;
        if (currentRoot == null) return;
        let q = queue();
        q.push(currentRoot);
        while (q.length() != 0) {
            let cur = q.pop();
            callback ? callback(cur) : list.push(cur.data);
            if (cur.leftChild != null) q.push(cur.leftChild);
            if (cur.rightChild != null) q.push(cur.rightChild); 
        }
        return list;
    }

    function isBalanced() {
        if (headRoot == null) 
            return false;
        
        return (Math.abs(height(headRoot.leftChild) - height(headRoot.rightChild)) <= 1);
    }

    function rebalance() {
        let arr = levelOrder(false);
        headRoot = buildTree(0, arr.length - 1, arr);
    }

    function preorder(callback, curRoot, list) {
        if (curRoot == null) 
            return;
        callback ? callback(curRoot) : list.push(curRoot.data);
        preorder(false, curRoot.leftChild, list);
        preorder(false, curRoot.rightChild, list);

        if (list.length > 0)
            return list;
    }

    function inorder(callback, curRoot, list) {
        if (curRoot == null) 
            return;
        inorder(false, curRoot.leftChild, list);
        callback ? callback(curRoot) : list.push(curRoot.data);
        inorder(false, curRoot.rightChild, list);
        
        if (list.length > 0)
            return list;
    }

    function postorder(callback, curRoot, list) {
        if (curRoot == null) 
            return;
        postorder(false, curRoot.leftChild, list);
        postorder(false, curRoot.rightChild, list);
        callback ? callback(curRoot) : list.push(curRoot.data);

        if (list.length > 0)
            return list;
    }

    function height(node) {
        if (node == null)
            return 0;
        return Math.max(height(node.leftChild) + 1, height(node.rightChild) + 1);
    }

    function depth(node) {
        let currentRoot = headRoot;
        let nodeDepth = 0;
        while (currentRoot != null && node.data != currentRoot.data) {
            if (node.data < currentRoot.data)
                currentRoot = currentRoot.leftChild;
            else if (node.data > currentRoot.data)
                currentRoot = currentRoot.rightChild;
            ++nodeDepth;
        }
        return (currentRoot == null ? "Does not exist" :  nodeDepth);
    }

    let headRoot = buildTree(0, uniq.length - 1, uniq);

    return {
        headRoot,
        prettyPrint,
        find,
        insert,
        preorder,
        inorder,
        postorder,
        height,
        depth,
        levelOrder,
        isBalanced,
        rebalance,
        deleteNode
    }
}

const bst = Tree([4, 1, 103, 2, 3, 555, 3, 2, 3]);
bst.prettyPrint(bst.headRoot);
console.log(bst.headRoot);
bst.insert(Node(66));
bst.prettyPrint(bst.headRoot);

bst.insert(Node(104));
console.log(bst.levelOrder(false));
bst.insert(Node(105));
bst.insert(Node(106));
bst.insert(Node(107));
console.log(bst.levelOrder(false));
bst.prettyPrint(bst.headRoot);