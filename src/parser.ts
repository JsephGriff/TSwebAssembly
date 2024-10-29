import { operators } from "./tokenizer";

export class ParserError extends Error {
    token: Token;
    constructor(message: string, token: Token) {
        super(message);
        this.token = token;
    }
}

/**
 * Converts a string value to an Operator.
 * @param value The string value to convert.
 * @throws {Error} If the value is not a valid operator.
 * @returns {Operator} The converted operator.
 */
const asOperator = (value: string): Operator => {
    if (operators.includes(value)) {
        return value as Operator;
    } else {
        throw new Error(`'${value}' is not a valid operator`);
    }
};


export const parse: Parser = tokens => {
    const tokenIterator = tokens[Symbol.iterator]();
    let currentToken = tokenIterator.next().value;
    let nextToken = tokenIterator.next().value;

    const currentTokenIsKeyword = (name: string) =>
        currentToken.value === name && currentToken.type === "keyword";

    const currentTokenIsBracket = (name: string) =>
        currentToken.value === name && currentToken.type === "brackets";

    const eatToken = (value?: string) => {
        if (value && value !== currentToken.value) {
            throw new ParserError(
                `Unexpected token value, expected ${value}, received ${currentToken.value}`,
                currentToken
            );
        }
        currentToken = nextToken;
        nextToken = tokenIterator.next().value;
    };

    const parseExpression: ParserStep<ExpressionNode> = (): ExpressionNode => {
        if (!currentToken) {
            throw new ParserError("Unexpected end of input", currentToken);
        }

        let node: ExpressionNode;
        switch (currentToken.type) {
            case "number":
                node = {
                    type: "numberLiteral",
                    value: Number(currentToken.value)
                };
                eatToken();
                return node;
            case "identifier":
                if (nextToken && nextToken.type === "parens" && nextToken.value === "(") {
                    const returns: StatementNode[] = [];
                    returns.push(parseStatement());
                    node = {
                        type: "returnExpression",
                        value: returns
                    };
                } else {
                    node = { type: "identifier", value: currentToken.value };
                    eatToken();
                }
                return node;
            case "parens":
                eatToken("(");
                const left = parseExpression();
                const operator = currentToken.value;
                eatToken();
                const right = parseExpression();
                eatToken(")");
                return {
                    type: "binaryExpression",
                    left,
                    right,
                    operator: asOperator(operator)
                };
            default:
                throw new ParserError(
                    `Unexpected token type ${currentToken.type}`,
                    currentToken
                );
        }
    };
  
    /**
     * Parses a print statement in the metsu language.
     *
     * @return {StatementNode} The parsed print statement node.
     */
    const parsePrintStatement: ParserStep<StatementNode> = () => {
      eatToken("print");
      return {
        type: "printStatement",
        expression: parseExpression()
      };
    };

    /**
     * Parses an if statement in the metsu language.
     *
     * @return {StatementNode} The parsed if statement node.
     */
    const parseIfStatement: ParserStep<StatementNode> = () => {
        eatToken("if");
    
        const expression = parseExpression();
        
        eatToken("{");
        const consequent: StatementNode[] = [];
        const alternate: StatementNode[] = [];
        while (!currentTokenIsBracket("}")) {
                consequent.push(parseStatement());
        }
        eatToken("}");
        if (currentToken && currentTokenIsKeyword("else")) {
            eatToken("else");
            eatToken("{");
            alternate.push(parseStatement());
            eatToken("}");
        }
        
        return { type: "ifStatement", expression, consequent, alternate };
      };
    
    /**
     * Parses a while statement in the metsu language.
     *
     * @return {StatementNode} The parsed while statement node.
     */
    const parseWhileStatement: ParserStep<StatementNode> = () => {
        eatToken("while");
    
        const expression = parseExpression(); //condition to loop
        eatToken("{");
        const statements: StatementNode[] = [];
        while (!currentTokenIsBracket("}")) {
            statements.push(parseStatement());
        }
        eatToken("}");
        return { type: "whileStatement", expression, statements };
    };

    /**
     * Parses a variable assignment in the metsu language.
     *
     * @return {StatementNode} The parsed variable assignment node.
     */
    const parseVariableAssignment: ParserStep<StatementNode> = () => {
        const name = currentToken.value;
        eatToken();
        eatToken("=");
        return { type: "variableAssignment", name, value: parseExpression() };
    };
    
    /**
     * Parses a variable declaration statement in the metsu language.
     *
     * @return {StatementNode} The parsed variable declaration statement node.
     */
    const parseVariableDeclarationStatement: ParserStep<StatementNode> = () => {
        eatToken();
        const name = currentToken.value;
        eatToken();
        eatToken("=");
        return {
            type: "variableDeclaration",
            name,
            initializer: parseExpression()
        };
      };
  
    /**
     * Parses a call statement node in the language.
     *
     * @return {StatementNode} The parsed call statement node.
     */
    const parseCallStatementNode: ParserStep<StatementNode> = () => {
        const name = currentToken.value;
        eatToken();
    
        const args = parseCommaSeperatedList(() => parseExpression());
    
        return {
          type: "callStatement",
          name,
          args
        };
      };

    /**
     * Parses a list of comma-separated values.
     *
     * @param {function} foo - A function that returns a value of type T.
     * @return {T[]} An array of values of type T.
     */
    function parseCommaSeperatedList<T>(foo: () => T): T[] {
        const args: T[] = [];
        eatToken("(");
        while (currentToken.value !== ")") {
            args.push(foo());
            if (currentToken.value !== ")") {
                eatToken(",");
            }
        }
        eatToken(")");
        return args;
    }
    const parseReturnStatement: ParserStep<StatementNode> = () => {
        eatToken("return");
        return { type: "returnStatement", value: parseExpression() };
    }

    /**
     * Parses a procedure statement in the metsu language.
     *
     * @return {StatementNode} The parsed procedure statement node.
     */
    const parseProcStatement: ParserStep<StatementNode> = () => {
        eatToken("proc");
    
        const name = currentToken.value;
        eatToken();
    
        const args = parseCommaSeperatedList(() => {
            const arg: IdentifierNode = { type: "identifier", value: currentToken.value };
            eatToken();
            return arg;
        });
        eatToken("{");
        const statements: StatementNode[] = [];
        while (!currentTokenIsBracket("}")) {
            statements.push(parseStatement());
        }
        eatToken("}");
        return {
            type: "procStatement",
            name,
            args,
            statements
        };
    };
    
    /**
     * Parses a statement in the metsu language.
     *
     * @return {StatementNode} The parsed statement node.
     */
    const parseStatement: ParserStep<StatementNode> = () => {
        if (currentToken.type === "keyword") {
            switch (currentToken.value) {
                case "print":
                   return parsePrintStatement();
                case "while":
                    return parseWhileStatement();
                case "if":
                    return parseIfStatement();
                case "proc":
                    return parseProcStatement();
                case "return":
                    return parseReturnStatement();
                default:
                    throw new ParserError(
                        `Unknown keyword ${currentToken.value}`,
                        currentToken
                    );
            }
        } else if (currentToken.type === "type"){
            return parseVariableDeclarationStatement();
        }else if (currentToken.type === "identifier") {
            if (nextToken.value === "=") {
                return parseVariableAssignment();
            } else {
                return parseCallStatementNode();
            }
        }   else {
                throw new ParserError(`Undefined token: ${currentToken.value}`, currentToken);
            }
    };
  
    const nodes: StatementNode[] = [];
    while (currentToken) {
      nodes.push(parseStatement());
    }
  
    return nodes;
  };