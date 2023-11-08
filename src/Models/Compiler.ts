import { execSync, spawnSync } from "node:child_process";
import { log } from "../logger";

export class Compiler {
  readonly template: String;
  constructor(template: string) {
    this.template = String(template);
  }

  getCommand(source: string, binary: string): string {
    return this.template.replace("{src}", source).replace("{bin}", binary);
  }

  compile(source: string, binary: string): boolean {
    const command = this.getCommand(source, binary);
    try {
      log.warn(`Compiling with command: ${command}`);
      const compileInfo = execSync(command, {
        stdio: "pipe",
      });
      log.verbose(`Compiler output: ${compileInfo}`);
    } catch (e: any) {
      let error: ReturnType<typeof spawnSync> = e;
      log.error(`<CE>!: ${error.status}`);
      log.error(error.stderr.toString());
      log.error(error.error?.toString());
      return false;
    }
    return true;
  }

  toJSON() {
    return `Compiler(${this.template})`;
  }
}
