interface Tokenizer {
    (input: string): Token[];
  }
  
  type TokenType =
    | "number"
    | "keyword"
    | "whitespace"
    | "type"
    | "parens"
    | "brackets"
    | "operator"
    | "identifier"
    | "assignment";
  
  interface Token {
    type: TokenType;
    value: string;
    line?: number;
    char?: number;
  }
  
  interface Matcher {
    (input: string, index: number): Token | null;
  }
  