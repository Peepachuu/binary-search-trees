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

    function buildTree(start, end) {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        let root = Node(uniq[mid]);

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
        while (currentRoot.leftChild != null && currentRoot.rightChild != null) {
            if (node.data < currentRoot.data)
                currentRoot = currentRoot.leftChild;
            else if (node.data > currentRoot.data)
                currentRoot = currentRoot.rightChild;
            else if (node.data == currentRoot.data)
                return ;
        }
        if (node.data < currentRoot.data)
            currentRoot.leftChild = node;
        else if (node.data > currentRoot.data)
            currentRoot.rightChild = node;
    }

    function isBalanced() {
        
    }

    let headRoot = buildTree(0, uniq.length - 1);

    return {
        headRoot,
        prettyPrint,
        find,
        insert
    }
}

const bst = Tree([4, 1, 10343, 2, 3, 5555, 3, 2, 3]);
bst.prettyPrint(bst.headRoot);
console.log(bst.headRoot);
bst.insertNode(66);
bst.prettyPrint(bst.headRoot);