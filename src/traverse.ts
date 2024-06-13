import { ExpressionNode, ProgramNode } from "./types/parser";
import { Traverse } from "./types/traverse";

/**
 * Performs a post-order traversal of an AST, invoking a visitor function on each node.
 *
 * @param {(ExpressionNode | ExpressionNode[])} nodes - The AST to traverse or an array of ASTs.
 * @param {(node: ExpressionNode) => void} visitor - The function to invoke on each node.
 * @returns {void}
 */
const traverse: Traverse = (
  nodes: ExpressionNode | ExpressionNode[],
  visitor: (node: ExpressionNode) => void
): void => {
  const traverseNodes = (nodes: ExpressionNode | ExpressionNode[]): void => {
    const nodesArray = Array.isArray(nodes) ? nodes : [nodes];
    nodesArray.forEach((node) => {
      Object.values(node).forEach((value) => {
        if (Array.isArray(value)) {
          value.forEach((childNode) => {
            if (typeof childNode === "object" && "type" in childNode) {
              traverseNodes([childNode]);
            }
          });
        } else if (typeof value === "object" && "type" in value) {
          traverseNodes([value]);
        }
      });
      visitor(node as ExpressionNode);
    });
  };

  traverseNodes(nodes);
};
  
export default traverse;