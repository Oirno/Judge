import { log } from "../../logger";
import { Comparer } from "./Comparer";
import os from "node:os";
import fs from "node:fs";
import { execSync } from "node:child_process";

export class ExternalComparer extends Comparer {
  readonly template: string;
  constructor(command: string) {
    super();
    this.template = command;
  }

  compare(output: string, expected: string) {
    const entropy = Math.random().toString(36).substring(2, 15);
    const tempDir = os.tmpdir();
    const outputFilePath = `${tempDir}/${entropy}.oirno.out`;
    const expectedFilePath = `${tempDir}/${entropy}.oirno.exp`;
    fs.writeFileSync(outputFilePath, output);
    fs.writeFileSync(expectedFilePath, expected);
    const command = this.template
      .replace("{out}", outputFilePath)
      .replace("{exp}", expectedFilePath);
    log.info(`Comparing with external command: ${command}`);

    try {
      const execOutput = execSync(command, {
        stdio: "pipe",
      });
      log.verbose(`External comparer output: ${execOutput}`);
    } catch (e: any) {
      return e.toString();
    }

    return null;
  }

  toJSON() {
    return {
      command: this.template,
    };
  }
}
