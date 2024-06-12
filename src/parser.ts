import { operators } from "./tokenizer";
import { ExpressionNode, StatementNode, Operator, Parser, ParserStep} from "./types/parser";


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
  
    const eatToken = (value?: string) => {
      if (value && value !== currentToken.value) {
        throw new ParserError(
          `Unexpected token value, expected ${value}, received ${
            currentToken.value
          }`,
          currentToken
        );
      }
      currentToken = nextToken;
      nextToken = tokenIterator.next().value;
    };
  
/**
 * Parses an expression in the language.
 *
 * @return {ExpressionNode} The parsed expression node.
 * @throws {ParserError} If the token type is unexpected.
 */
    const parseExpression: ParserStep<ExpressionNode> = () => {
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
          node = { type: "identifier", value: currentToken.value };
          eatToken();
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
  
    const parsePrintStatement: ParserStep<StatementNode> = () => {
      eatToken("print");
      return {
        type: "printStatement",
        expression: parseExpression()
      };
    };

    const parseVariableAssignment: ParserStep<
      StatementNode> = () => {
        const name = currentToken.value;
        eatToken();
        eatToken("=");
        return { type: "variableAssignment", name, value: parseExpression() };
    };
    
    const parseVariableDeclarationStatement: ParserStep<
      StatementNode> = () => {
        eatToken("var");
        const name = currentToken.value;
        eatToken();
        eatToken("=");
        return {
            type: "variableDeclaration",
            name,
            initializer: parseExpression()
        };
      };
  
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
     * Parses a comma-separated list of values by repeatedly calling the provided function `foo`.
     *
     * @param {() => T} foo - A function that returns a value of type `T`.
     * @return {T[]} An array of values of type `T`.
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

    const parseStatement: ParserStep<StatementNode> = () => {
        if (currentToken.type === "keyword") {
          switch (currentToken.value) {
            case "print":
              return parsePrintStatement();
            case "var":
              return parseVariableDeclarationStatement();
            default:
              throw new ParserError(
                `Unknown keyword ${currentToken.value}`,
                currentToken
              );
          }
        } else if (currentToken.type === "identifier") {
          if (nextToken.value === "=") {
            return parseVariableAssignment();
          } else {
            return parseCallStatementNode();
          }
        } else {
            throw new ParserError(`Undefined token: ${currentToken.value}`, currentToken);
        }
      };
  
    const nodes: StatementNode[] = [];
    while (currentToken) {
      nodes.push(parseStatement());
    }
  
    return nodes;
  };