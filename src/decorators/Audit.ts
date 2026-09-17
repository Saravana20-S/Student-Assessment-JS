import { Logger } from "../utils/Logger";

export function Audit() {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      Logger.info(`AUDIT START: ${propertyKey}`);

      console.log(`[AUDIT] Starting: ${propertyKey}`);

      console.log(`[AUDIT] Arguments:`, args);

      try {
        const result = originalMethod.apply(this, args);

        Logger.info(`AUDIT SUCCESS: ${propertyKey}`);

        console.log(`[AUDIT] Completed: ${propertyKey}`);

        return result;
      } catch (error) {
        Logger.error(`AUDIT FAILED: ${propertyKey}`);

        console.error(`[AUDIT] Failed: ${propertyKey}`);

        throw error;
      }
    };

    return descriptor;
  };
}
