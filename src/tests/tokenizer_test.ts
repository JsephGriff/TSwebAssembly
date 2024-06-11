import * as assert from 'assert';
import { tokenize } from '../tokenizer';

describe('tokenize', function() {

    it('handlesToken', function() {
        const input = " print";
        const tokens = tokenize(input);
        assert.strictEqual(tokens.length, 1);
    });

});