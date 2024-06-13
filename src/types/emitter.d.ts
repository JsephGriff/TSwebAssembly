import { Program } from "./parser";
import { TransformedProgram } from "./transformer";

interface Emitter {
    (ast: TransformedProgram): Uint8Array;
  }