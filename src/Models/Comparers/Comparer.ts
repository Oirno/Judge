export abstract class Comparer {
  /**
   * Compare the output with the expected output.
   * @param output The output content.
   * @param expected The expected output content.
   *
   * @returns null if the output is correct, otherwise return the error message.
   */
  abstract compare(output: string, expected: string): string | null;

  abstract toJSON(): string | object;
}
