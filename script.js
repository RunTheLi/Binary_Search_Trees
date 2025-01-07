class Node {
  constructor(value) {
    this.data = value; // Fix: Changed this.value to value
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

  //constructTree
  constructTree(array, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.constructTree(array, start, mid - 1);
    node.right = this.constructTree(array, mid + 1, end);

    return node;
  }

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
        root.left = insertNode(root.left, value); // Corrected the recursive call
      } else if (value > root.data) {
        root.right = insertNode(root.right, value); // Corrected the recursive call
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

  find(value) {
    const searchNode = (root, value) => {
      if (root === null || root.data === value) {
        return root;
      }
      if (value < root.data) {
        return searchNode(root.left, value);
      } else {
        return searchNode(root.right, value);
      }
    };
    return searchNode(this.root, value);
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }
    const traverseLevel = (nodes) => {
      if (nodes.length === 0) return;

      const nextLevel = [];
      for (const node of nodes) {
        callback(node);
        if (node.left !== null) nextLevel.push(node.left);
        if (node.right !== null) nextLevel.push(node.right);
      }
      traverseLevel(nextLevel);
    };
    if (this.root !== null) traverseLevel([this.root]);
  }

  //same as levelOrder but we have to modify it
  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      callback(node);
      traverse(node.right);
    };
    traverse(this.root);
  }

  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }
    const traverse = (node) => {
      if (node === null) return;
      callback(node);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
  }

  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      callback(node);
    };
    traverse(this.root);
  }

  height(node) {
    if (node === null) return -1;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    if (node === null) return -1;

    let depthCount = 0;
    let currentNode = node;

    while (currentNode !== this.root) {
      depthCount++;
      currentNode = this.findParent(currentNode);
    }
    return depthCount;
  }

  findParent(targetNode, currentNode = this.root) {
    if (currentNode === null || targetNode === null) return null;

    if (
      (currentNode.left === targetNode) ||
      (currentNode.right === targetNode)
    ) {
      return currentNode;
    }

    // Recursively search in the left and right subtrees.
    return (
      this.findParent(targetNode, currentNode.left) ||
      this.findParent(targetNode, currentNode.right)
    );
  }

  isBalanced(node = this.root) {
    if (node === null) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    const isCurrentBalanced = Math.abs(leftHeight - rightHeight) <= 1;
    return isCurrentBalanced && this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    const collectDataInOrder = (node, result = []) => {
      if (node === null) return result;

      collectDataInOrder(node.left, result);
      result.push(node.data);
      collectDataInOrder(node.right, result);
      return result;
    };

    const sortedArray = collectDataInOrder(this.root);
    this.root = this.buildTree(sortedArray);
  }
}

// Create a binary search tree and perform operations
function runDriverScript() {
  const bst = new Tree([10, 20, 30, 40, 50, 60, 70, 80, 90]);

  console.log('Initial Tree:');
  bst.prettyPrint();

  console.log('\nTree is balanced: ', bst.isBalanced());

  console.log('\nLevel Order:');
  bst.levelOrder((node) => console.log(node.data));

  console.log('Pre-order:');
  bst.preOrder((node) => console.log(node.data));

  console.log('Post-order:');
  bst.postOrder((node) => console.log(node.data));

  console.log('In-order:');
  bst.inOrder((node) => console.log(node.data));

  console.log('\nUnbalancing the tree by adding numbers greater than 100...');
  bst.insert(110);
  bst.insert(120);
  bst.insert(130);
  bst.insert(140);
  bst.insert(150);

  bst.prettyPrint();

  console.log('\nTree is balanced after unbalancing: ', bst.isBalanced());

  // Rebalance the tree
  console.log('\nRebalancing the tree...');
  bst.rebalance();

  // Check if the tree is balanced
  console.log('\nTree is balanced after rebalance: ', bst.isBalanced());

  // Print tree traversals again
  console.log('\nLevel Order:');
  bst.levelOrder((node) => console.log(node.data));

  console.log('Pre-order:');
  bst.preOrder((node) => console.log(node.data));

  console.log('Post-order:');
  bst.postOrder((node) => console.log(node.data));

  console.log('In-order:');
  bst.inOrder((node) => console.log(node.data));
}

runDriverScript();