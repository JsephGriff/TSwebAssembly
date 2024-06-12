import * as assert from 'assert';
import { parse } from '../parser';

describe('parseTokens', function() {

    it('parses single statements', function() {
        const tokens: Token[] = [
            { type: "keyword", value: "print" },
            { type: "number", value: "22" }
          ];
        
          const ast = parse(tokens);
          assert.strictEqual(ast.length,1);
    });

    it('parsePrintWithUnaryExpression', function() {
        const tokens: Token[] = [
            {
              type: "keyword",
              value: "print"
            },
            {
              type: "number",
              value: "22"
            }
          ];
        const ast = parse(tokens);
        const node = ast[0];

        assert.deepStrictEqual(node,{
            type: "printStatement",
            expression: { type: "numberLiteral", value: 22 }
        });
    });
});