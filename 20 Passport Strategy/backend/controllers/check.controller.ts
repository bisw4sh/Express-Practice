import { Request, Response, NextFunction } from "express";

export const checkAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    console.log(req.session.role);
    return next();
  }

  res.json({
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
    return res.json({
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
  console.log("checked authorization");
  if (req?.session?.role === "admin") {
    return next();
  }
  return res.json({
    message: "You're not authorized",
    success: false,
  });
};
