import * as assert from 'assert';
import traverse from "../src/traverse";
import { Visitor } from '../src/types/traverse';

describe('traverse', function() {

    it('traverseSingleNode', function() {
        const ast = {
            type: "foo",
            bar: {
              type: "buz"
            }
        };
        
        const visited: string[] = [];
        const visitor: Visitor = node => visited.push(node.type);
        traverse(ast, visitor);

        assert.deepStrictEqual(visited, ["buz", "foo"]);
    });

    it('traverses', function() {
        const ast = {
            type: "foo",
            bar: [
                {type: "baz"},
                {type: "bar"}
            ]
        };
        
        const visited: string[] = [];
        const visitor: Visitor = node => visited.push(node.type);
        traverse(ast, visitor);

        assert.deepStrictEqual(visited, ["baz", "bar", "foo"]);
    });

    it('should traverse complex array root structure', () => {
        const ast = [
             {
                type: 'foo',
                bar: {
                    type: 'buz',
                    baz: {
                        type: 'qux',
                        },
                },
            },
            {
            type: 'fun',
            },
        ];
        const visited: string[] = [];
        const visitor: Visitor = node => visited.push(node.type);
        traverse(ast, visitor);

        assert.deepStrictEqual(visited, ['qux', 'buz', 'foo', 'fun']);
    });


});