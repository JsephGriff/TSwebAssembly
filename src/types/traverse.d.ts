import { ExpressionNode } from "./parser";

interface Traverse {
    (nodes: ExpressionNode[] | ExpressionNode, visitor: Visitor): void;
  }
  
  interface Visitor {
    (node: ExpressionNode): void;
  }