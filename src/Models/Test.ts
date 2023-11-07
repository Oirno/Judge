import { Config } from "./Config";

export class Test {
  readonly entropy: string;
  readonly config: Config;
  constructor(config: Config) {
    this.entropy = Math.random().toString(36).substring(2, 15);
    this.config = config;
  }
}
