import { Comparer } from "./Comparer";
import { StringExactComparer } from "./StringExact";
import { ExternalComparer } from "./External";
import { NumberExactComparer } from "./NumberExact";

export abstract class CompareMethod {
  static fromJson(method: any): Comparer {
    if (typeof method === "string") {
      switch (method) {
        case "number-exact":
        case "exact":
          return new NumberExactComparer();
        case "string-exact":
          return new StringExactComparer();

        default:
          throw new Error(`Invalid compare method: ${method}`);
      }
    } else {
      return new ExternalComparer(method.command);
    }
  }
}
