import { Comparer } from "./Comparer";
import fs from "node:fs";
import { log } from "../../logger";

export class StringExactComparer extends Comparer {
  /**
   * Output must be exactly the same as the expected output.
   */
  compare(output: string, expected: string) {
    log.info(`Comparing using ExactComparer`);

    if (output.length !== expected.length) {
      return "Output length not matched.";
    }
    // report the first difference and nearby status
    let i = 0;
    while (i < output.length && i < expected.length) {
      if (output[i] !== expected[i]) {
        return `Output not matched at index ${i}: ${output[i]} vs ${expected[i]}`;
      }
      i++;
    }

    return null;
  }

  toJSON() {
    return "string-exact";
  }
}
