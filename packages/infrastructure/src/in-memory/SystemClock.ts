import type { IClock } from "@app/core";

export class SystemClock implements IClock {
  now(): Date {
    return new Date();
  }
}

export const systemClock = new SystemClock();
