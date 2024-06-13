import { ProcStatementNode, Program } from "./parser";

type TransformedProgram = ProcStatementNode[];

interface ASTTransformer {
  (ast: Program): TransformedProgram;
}