import { CompareMethod } from "./Comparers/CompareMethod";
import { Comparer } from "./Comparers/Comparer";

export class TestPoint {
  readonly name: string;
  readonly input: string;
  readonly output: string;
  readonly memoryLimit: number;
  readonly timeLimit: number;
  readonly method: Comparer;
  readonly score: number;
  constructor(
    name: string,
    input: string,
    output: string,
    memoryLimit: number,
    timeLimit: number,
    method: string,
    score: number
  ) {
    this.name = name;
    this.input = input;
    this.output = output;
    this.memoryLimit = memoryLimit;
    this.timeLimit = timeLimit;
    this.method = CompareMethod.fromJson(method);
    this.score = score;
  }
}
