import { Comparer } from "./Comparer";

export class NumberExactComparer extends Comparer {
  /**
   * Separate the output into lines and compare each line.
   * Each line must have each number exactly the same.
   */
  compare(output: string, expected: string): string | null {
    const outputLines = output.trim().split("\n");
    const expectedLines = expected.trim().split("\n");

    if (outputLines.length !== expectedLines.length) {
      return "Output line count not matched.";
    }

    for (let i = 0; i < outputLines.length; i++) {
      const outputLine = outputLines[i];
      const expectedLine = expectedLines[i];
      const outputNumbers = outputLine.split(" ");
      const expectedNumbers = expectedLine.split(" ");

      if (outputNumbers.length !== expectedNumbers.length) {
        return `Output line ${i + 1} number count not matched.`;
      }

      for (let j = 0; j < outputNumbers.length; j++) {
        const outputNumber = outputNumbers[j];
        const expectedNumber = expectedNumbers[j];
        if (outputNumber !== expectedNumber) {
          return `Output line ${i + 1} number ${
            j + 1
          } not matched: ${outputNumber} vs expected ${expectedNumber}`;
        }
      }
    }

    return null;
  }

  toJSON(): string {
    return "number-exact";
  }
}
