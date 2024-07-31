import { emitter } from "./emitter";
import { tokenize } from "./tokenizer";
import { parse } from "./parser";
import { transformer } from "./transformer";

export const compile: Compiler = (src: string) => {
  const tokens = tokenize(src);
  const ast = parse(tokens);
  const transformedAst = transformer(ast);
  const wasm = emitter(transformedAst);
  return wasm;
};

export const runtime: Runtime = async (src: string, env: Environment) => {
  const wasm = compile(src);
  const memory = new WebAssembly.Memory({ initial: 1 });
  const result: any = await WebAssembly.instantiate(wasm, {
    env: { ...env, memory }
  });
  return () => {
    result.instance.exports.run();
  };
};