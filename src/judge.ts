import { Config } from "./Models/Config";
import { Test } from "./Models/Test";
import fs from "node:fs";
import { log } from "./logger";
import {
  TestResult,
  TestStatus,
  testStatusToString,
} from "./Models/TestResult";
import {
  MemoryLimitExceedError,
  Runner,
  TimeLimitExceedError,
} from "./Models/Runner";
import { TestPoint } from "./Models/TestPoint";

export function judge(workDir: string, config: Config, source: string) {
  const test = new Test(config);
  const entropy = test.entropy;
  const sourceFile = `${workDir}/build/${entropy}.code`;
  const binaryFile = `${workDir}/build/${entropy}.bin`;
  const outputFile = `${workDir}/build/${entropy}.output`;
  const conf = test.config;
  const points = conf.points;

  log.info("Running judge...");
  log.debug(`Judging Config: ${JSON.stringify(test)}`);
  log.verbose("WorkDir: " + workDir);

  try {
    fs.mkdirSync(`${workDir}/build`, { recursive: true });
    fs.writeFileSync(sourceFile, source);
  } catch (e) {
    log.error("Failed to create build directory");
    log.error(e);
    process.exit(1);
  }

  try {
    if (!conf.compiler.compile(sourceFile, binaryFile)) {
      log.error("Failed to compile");
      process.exit(1);
    }
    runTestPoints(points, conf.runner, workDir, binaryFile);
  } catch (e) {
  } finally {
    log.verbose("Cleaning up...");
    try {
      fs.rmSync(sourceFile);
    } catch (e) {}
    try {
      fs.rmSync(binaryFile);
    } catch (e) {}
    try {
      fs.rmSync(outputFile);
    } catch (e) {}
    log.verbose("Cleaning Done!");
  }
}

function runTestPoints(
  points: Array<TestPoint>,
  runner: Runner,
  workDir: string,
  binaryFile: string
): Array<TestResult> {
  return points.map((point) => {
    log.info("");
    log.info(`### Test Point (${point.name}) Start ###`);
    let result = runTestPoint(point, runner, workDir, binaryFile);
    if (result.status === TestStatus.AC) {
      log.info(`### Test Point (${point.name}) Passed ### AC`);
    } else {
      log.warn(`### Test Point (${point.name}) Failed with ###`);
      log.warn(result.info);
      log.warn(
        `### Test Point (${point.name}) Failed ### ${testStatusToString(
          result.status
        )}`
      );
    }
    log.info("");
    return result;
  });
}

function runTestPoint(
  point: TestPoint,
  runner: Runner,
  workDir: string,
  binaryFile: string
): TestResult {
  const inputFile = `${workDir}/${point.input}`;
  const expectFile = `${workDir}/${point.output}`;
  log.debug(`Test Point: ${JSON.stringify(point)}`);
  let output: string;

  try {
    const input = fs.readFileSync(inputFile, "utf-8");
    output = runner.run(binaryFile, input);
  } catch (e) {
    let error = JSON.stringify(e);
    log.debug(`Runner error: ${error}`);
    if (e instanceof MemoryLimitExceedError) {
      return new TestResult(point, TestStatus.MLE);
    } else if (e instanceof TimeLimitExceedError) {
      return new TestResult(point, TestStatus.TLE);
    } else if (e instanceof Error) {
      return new TestResult(point, TestStatus.RE, e.message);
    } else {
      return new TestResult(point, TestStatus.RE, error);
    }
  }
  const expected = fs.readFileSync(expectFile, "utf-8");
  const compareResult = point.method.compare(output, expected);
  if (compareResult !== null) {
    return new TestResult(point, TestStatus.WA, compareResult);
  }
  return new TestResult(point, TestStatus.AC);
}
