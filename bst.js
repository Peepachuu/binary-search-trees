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

    let headRoot = buildTree(0, uniq.length - 1);

    return {
        headRoot,
        prettyPrint
    }
}

const bst = Tree([4, 1, 10343, 2, 3, 5555, 3, 2, 3]);
bst.prettyPrint(bst.headRoot);