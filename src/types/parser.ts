interface Parser {
    (tokens: Token[]): Program;
  }
  
  interface ProgramNode {
    type: string;
  }
  
  type Operator = "+" | "-" | "/" | "*" | "==" | ">" | "<" | "&&";
  
  type ExpressionNode = NumberLiteralNode | BinaryExpressionNode | IdentifierNode | ReturnExpressionNode;
  
  type StatementNode =
    | PrintStatementNode
    | VariableDeclarationNode
    | VariableAssignmentNode
    | WhileStatementNode
    | CallStatementNode
    | IfStatementNode
    | ProcStatementNode
    | ReturnStatementNode;
  
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

  interface ReturnStatementNode extends ProgramNode {
    type: "returnStatement";
    value: ExpressionNode;
  }

  interface ReturnExpressionNode extends ProgramNode {
    type: "returnExpression";
    value: StatementNode[];
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
  
  interface WhileStatementNode extends ProgramNode {
    type: "whileStatement";
    expression: ExpressionNode;
    statements: StatementNode[];
  }
  
  interface ProcStatementNode extends ProgramNode {
    type: "procStatement";
    name: string,
    args: IdentifierNode[];
    statements: StatementNode[];
  }
  
  interface IfStatementNode extends ProgramNode {
    type: "ifStatement";
    expression: ExpressionNode;
    consequent: StatementNode[];
    alternate: StatementNode[];
  }
  
  interface ParserStep<T extends ProgramNode> {
    (): T;
  }
  