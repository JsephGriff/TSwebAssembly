export const keywords = [
    "print",
    "while",
    "if",
    "else",
    "proc",
    "return"
  ];
  export const types = [
    "Null",
    "bool",
    "int",
    "float",
    "char",
    "string",
    "obj",
    "void"
  ];
  export const operators = ["+", "-", "*", "/", "%", "==", "!=", "<=", ">=", "<", ">", "&&", "||", "," ];
  
  /**
   * Escapes special characters in a string to make it safe for use in a regular expression.
   *
   * @param {string} text - The input string to be escaped.
   * @return {string} The escaped string.
   */
  const escapeRegEx = (text: string) =>
    text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  
  export class TokenizerError extends Error {
    index: number;
    constructor(message: string, index: number) {
      super(message);
      this.index = index;
    }
  }
  
  // returns a token if the given regex matches at the current index
  const regexMatcher = (regex: string, type: TokenType): Matcher => (
    input,
    index
  ) => {
    const match = input.substring(index).match(regex);
    return (
      match && {
        type,
        value: match[0]
      }
    );
  };
  
  // matchers in precedence order
  const matchers = [
    regexMatcher("^-?[.0-9]+([eE]-?[0-9]{2})?", "number"),
    regexMatcher(`^(${keywords.join("|")})`, "keyword"),
    regexMatcher(`^(${types.join("|")})`, "type"),
    regexMatcher("^\\s+", "whitespace"),
    regexMatcher(`^(${operators.map(escapeRegEx).join("|")})`, "operator"),
    regexMatcher(`^[a-zA-Z]+`, "identifier"),
    regexMatcher(`^=`, "assignment"),
    regexMatcher("^[()]{1}", "parens"),
    regexMatcher("^[{}]{1}", "brackets")
  ];
  
  /**
   * Returns the location of a character in a string, given its index.
   *
   * @param {string} input - The input string.
   * @param {number} index - The index of the character in the string.
   * @return {{ char: number, line: number }} An object containing the character position and line number.
   */
  const locationForIndex = (input: string, index: number) => ({
    char: index - input.lastIndexOf("\n", index) - 1,
    line: input.substring(0, index).split("\n").length - 1
  });

//Tokenize input string to be parsed.
export const tokenize: Tokenizer = input => {
    const tokens: Token[] = [];
    let index = 0;
    while (index < input.length) {
      const matches = matchers.map(m => m(input, index)).filter(f => f);
      if (matches.length > 0) {
        // take the highest priority match
        const match = matches[0];
        if(match === null) {
            throw new Error("match is null!");
        }
        if (match.type !== "whitespace") {
          tokens.push({ ...match, ...locationForIndex(input, index) });
        }
        index += match.value.length;
      } else {
        throw new TokenizerError(
          `Unexpected token ${input.substring(index, index + 1)}`,
          index
        );
      }
    }
    return tokens;
  }; 