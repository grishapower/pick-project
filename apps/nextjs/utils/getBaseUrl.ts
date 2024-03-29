import * as process from "process";

export function getBaseUrl(): string {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return process.env.NEXTAUTH_URL || "";
}
