import { Compiler } from "./Compiler";
import { Runner } from "./Runner";
import { TestPoint } from "./TestPoint";
export class Config {
  readonly compiler: Compiler;
  readonly runner: Runner;
  readonly points: Array<TestPoint>;

  constructor(compiler: Compiler, runner: Runner, points: Array<TestPoint>) {
    this.compiler = compiler;
    this.runner = runner;
    this.points = points;
  }

  static fromJSON(json: any): Config {
    const configs = json.config;
    const compiler = new Compiler(configs.compile);
    const runner = new Runner(configs.run);
    const defaultMemoryLimit = configs.memory_limit;
    const defaultTimeLimit = configs.time_limit;
    const points = json.points.map(
      (point: any) =>
        new TestPoint(
          point.name,
          point.input,
          point.output,
          point.memory_limit ?? defaultMemoryLimit,
          point.time_limit ?? defaultTimeLimit,
          point.method,
          point.score
        )
    );
    return new Config(compiler, runner, points);
  }
}
