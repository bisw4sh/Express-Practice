import { Request, Response, NextFunction } from "express";

export const checkAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({
    message: "You're not authenticated",
    success: false,
  });
};

export const checkNotAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return res.status(400).json({
      message: "You're already authenticated",
      success: false,
    });
  }
  next();
};

export const checkAuthorized = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req?.session?.passport?.user?.role === "admin") {
    return next();
  }
  return res.status(403).json({
    message: "You're not authorized",
    success: false,
  });
};
