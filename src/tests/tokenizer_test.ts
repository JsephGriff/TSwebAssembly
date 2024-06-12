import * as assert from 'assert';
import { tokenize } from '../tokenizer';

describe('tokenize', function() {

    it('handlesToken', function() {
        const input = " print";
        const tokens = tokenize(input);
        assert.strictEqual(tokens.length, 1);
    });

    it('handlesMultipleTokens', function() {
        const input = " print 3.14 ";
        const tokens = tokenize(input);
        assert.strictEqual(tokens.length, 2);
        assert.strictEqual(tokens[0].type, "keyword");
        assert.strictEqual(tokens[1].type, "number");
    });

});