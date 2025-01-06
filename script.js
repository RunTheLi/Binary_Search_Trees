class Node {
  constructor() {
    this.data = this.data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (array.length === 0) return null;
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);

    return this.constructTree(sortedArray, 0, sortedArray.length - 1);
  }

  //constructTree????

  //prettyPrint() function that will console.log your tree in a structured format.
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) return;
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {
    const insertNode = (root, value) => {
      if (root === null) return new Node(value);

      // Duplicates not allowed
      if (root.data === value) return root;

      if (value < root.data) {
        root.left = insert(root.left, key);
      } else if (value > root.data) {
        root.right = insert(root.right, key);
      }
      return root;
    };

    this.root = insertNode(this.root, value);
  }

  deleteItem(value) {
    const getSuccessor = (curr) => {
      curr = curr.right;
      while (curr !== null && curr.left !== null) {
        curr = curr.left;
      }
      return curr;
    };

    const delNode = (root, value) => {
      if (root === null) return root;

      if (value < root.data) {
        root.left = delNode(root.left, value);
      } else if (value > root.data) {
        root.right = delNode(root.right, value);
      } else {
        // Node to be deleted found
        if (root.left === null) return root.right;
        if (root.right === null) return root.left;

        // Node with two children
        const succ = getSuccessor(root);
        root.data = succ.data;
        root.right = delNode(root.right, succ.data);
      }
      return root;
    };

    // Update the root after deletion
    this.root = delNode(this.root, value);
  }

  find(value) {}

  levelOrder(callback) {}

  inOrder(callback){} 

  preOrder(callback){}

  postOrder(callback){}
}
