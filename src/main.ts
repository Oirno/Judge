import { Command } from "commander";
import fs from "node:fs";
import { judge } from "./judge";
import { Config } from "./Models/Config";
import { initLogger, log } from "./logger";

const program = new Command("judge");

program
  .option("-c, --config <file>", "Oirno config file", "oirno/oirno.json")
  .option("-l, --log <level>", "log level", "info")
  .parse();

const opts = program.opts();
const configFile = opts.config;
const workDir = fs.realpathSync(configFile).replace(/\/[^/]+$/, "");
const logLevel = opts.log;
initLogger(logLevel, workDir + "/oirno.log");

if (!fs.existsSync(configFile)) {
  log.error("Config file not found");
  process.exit(1);
}

program
  .command("judge")
  .argument("[source]", "path to source code file", "source.code")
  .action((source: string) => {
    let configContent = fs.readFileSync(configFile, "utf-8");
    if (!fs.existsSync(source)) {
      log.error("Source file not found");
      process.exit(1);
    }
    let sourceContent = fs.readFileSync(source, "utf-8");
    judge(workDir, Config.fromJSON(JSON.parse(configContent)), sourceContent);
  });
program.parse();
