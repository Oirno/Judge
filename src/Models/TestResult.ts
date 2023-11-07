import { TestPoint } from "./TestPoint";
export class TestResult {
  readonly testPoint: TestPoint;
  readonly status: TestStatus;
  readonly info: string | null;

  constructor(
    testPoint: TestPoint,
    status: TestStatus,
    info: string | null = null
  ) {
    this.testPoint = testPoint;
    this.status = status;
    this.info = info;
  }
}

export enum TestStatus {
  Accepted = 0,
  AC = 0,
  WrongAnswer = 1,
  WA = 1,
  TimeLimitExceeded = 2,
  TLE = 2,
  MemoryLimitExceeded = 3,
  MLE = 3,
  RuntimeError = 4,
  RE = 4,
}

export function testStatusToFullString(status: TestStatus): string {
  switch (status) {
    case TestStatus.AC:
      return "Accepted";
    case TestStatus.WA:
      return "Wrong Answer";
    case TestStatus.TLE:
      return "Time Limit Exceeded";
    case TestStatus.MLE:
      return "Memory Limit Exceeded";
    case TestStatus.RE:
      return "Runtime Error";
    default:
      return "Unknown";
  }
}

export function testStatusToString(status: TestStatus): string {
  switch (status) {
    case TestStatus.AC:
      return "AC";
    case TestStatus.WA:
      return "WA";
    case TestStatus.TLE:
      return "TLE";
    case TestStatus.MLE:
      return "MLE";
    case TestStatus.RE:
      return "RE";
    default:
      return "Unknown";
  }
}
