import { operators } from "../tokenizer";

interface Parser {
    (tokens: Token[]): Program;
}

interface ProgramNode {
    type: string;
}

type Operator = typeof operators[number];
//"+" | "-" | "/" | "*" | "==" | ">" | "<" | "&&" | ",";

type ExpressionNode = NumberLiteralNode | BinaryExpressionNode | IdentifierNode;

type StatementNode =
    | PrintStatementNode
    | VariableDeclarationNode
    | VariableAssignmentNode
    | CallStatementNode;
type Program = StatementNode[];

interface VariableDeclarationNode extends ProgramNode {
    type: "variableDeclaration";
    name: string;
    initializer: ExpressionNode;
}
  
  interface VariableAssignmentNode extends ProgramNode {
    type: "variableAssignment";
    name: string;
    value: ExpressionNode;
}

interface NumberLiteralNode extends ProgramNode {
    type: "numberLiteral";
    value: number;
}

interface IdentifierNode extends ProgramNode {
    type: "identifier";
    value: string;
}
  
interface BinaryExpressionNode extends ProgramNode {
    type: "binaryExpression";
    left: ExpressionNode;
    right: ExpressionNode;
    operator: Operator;
}

interface PrintStatementNode extends ProgramNode {
    type: "printStatement";
    expression: ExpressionNode;
}

interface CallStatementNode extends ProgramNode {
    type: "callStatement";
    name: string,
    args: ExpressionNode[];
}




interface ParserStep<T extends ProgramNode> {
    (): T;
}