import { execSync, spawnSync } from "node:child_process";
import { log } from "../logger";

export class Runner {
  readonly template: String;
  constructor(template: string) {
    this.template = String(template);
  }

  getCommand(binary: string): string {
    return this.template.replace("{bin}", binary);
  }

  /**
   * Run the binary with input and output
   * @param {string} binary binary file path
   * @param {string} input input content
   *
   * @returns {string} run output if success, throw if failed
   */
  run(binary: string, input: string): string {
    const command = `${this.getCommand(binary)}`;
    try {
      log.info(`Run with command: ${command}`);
      return execSync(command, {
        input: input,
        stdio: "pipe",
      }).toString();
    } catch (e: any) {
      if (e instanceof Error) {
        throw e;
      } else {
        let error: ReturnType<typeof spawnSync> = e;
        throw Error(
          `status: ${error.status}, stderr: ${error.stderr.toString()}`
        );
      }
    }
  }

  toJSON() {
    return `Runner(${this.template})`;
  }
}

class LimitExceedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LimitExceedError";
  }
}

export class MemoryLimitExceedError extends LimitExceedError {
  constructor() {
    super("Memory Limit Exceed");
    this.name = "MLE";
  }
}

export class TimeLimitExceedError extends LimitExceedError {
  constructor() {
    super("Time Limit Exceed");
    this.name = "TLE";
  }
}
