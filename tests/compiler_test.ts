import * as assert from 'assert';
import { runtime } from "../src/compiler";
import apps from './apps';

const executeCode = async (code: string, ) => {
    const output: any[] = [];
    const display = new Uint8Array(10000);
    try {
      const tick = await runtime(code, {
        print: d => output.push(d),
        display
      });
      tick();
      return { output, display };
    } catch (e) {
      console.error(e);
    }
  };

describe("compiler", () => {
    it('compiles', function() {
          assert.strictEqual(true, true);
    });
    apps.forEach((app) => {
        it(app.name, async function() {
          const result = await executeCode(app.input);

          // Deep equality assertion for output
         if(result === undefined) {
            //throw error output to console
            assert.fail("result.output is undefined");
         } else {
            assert.deepStrictEqual(result.output, app.output, "output mismatch");
         }

        });
      });
});