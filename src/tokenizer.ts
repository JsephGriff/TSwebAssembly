
/**
 * List of catagory keywords to tokenize
 */
export const keywords: string[] = ["print"];
export const operators: string[] = ["+", "-", "*", "/", "==", "<", ">", "&&", ","];


const regexMatcher = (regex: string, type: TokenType): Matcher =>
    (input: string, index: number) => {
        const match = input.substring(index).match(regex);
        return (
            match && {
                type,
                value: match[0]
            }
        );
    };

const matchers = [
    regexMatcher("^[.0-9]+", "number"),
    regexMatcher(`^(${keywords.join("|")})`, "keyword"),
    regexMatcher("^\\s+", "whitespace")
];
  
export const tokenize: Tokenizer = input => {
    const tokens: Token[] = [];
    let index = 0;
    while (index < input.length) {
      const matches = matchers.map(m => m(input, index)).filter(f => f)
      const match = matches[0];
      if(match === null) {
        throw new Error("match is null!"); //Safe Typechecking.
      }
      if (match.type !== "whitespace") {
        tokens.push(match);
      }
      index += match.value.length;
    }
    return tokens;
  };
  