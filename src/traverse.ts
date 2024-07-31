
/**
 * Performs a depth-first post-order traversal of the AST.
 *
 * @param {Program | ProgramNode[]} node - The node(s) to traverse.
 * @param {Visitor} visitor - The visitor function to apply to each node.
 * @returns {void}
 */
// Depth-first post-order traversal of the AST
const traverse: Traverse = (node: ProgramNode | ProgramNode[], visitor: Visitor): void => {
  // If the node is an array, traverse each element. Otherwise, create an array with the node.
  const nodes = Array.isArray(node) ? node : [node];
  
  // Traverse each node in the array
  nodes.forEach(value => traverseNode(value, visitor));
};

const traverseNode = (node: ProgramNode, visitor: Visitor): void => {
  Object.values(node).forEach(value => {
    if (Array.isArray(value)) {
      value.forEach(childNode => traverseNode(childNode, visitor));
    } else if (typeof value === 'object' && value !== null && 'type' in value) {
      traverseNode(value, visitor);
    }
  });
  visitor(node);
};
  
  export default traverse;