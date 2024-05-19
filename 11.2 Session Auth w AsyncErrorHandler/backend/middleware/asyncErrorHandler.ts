import { NextFunction } from "express";

export default (func: (...args: any[]) => Promise<any>) => {
  return async (...args: Parameters<typeof func>) => {
    const next: NextFunction = args[args.length - 1];
    try {
      await func(...args);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
};
