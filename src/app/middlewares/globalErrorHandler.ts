import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import { TErrorSources } from "../types/error";
import handleZodError from "../errors/handleZodError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: string | number = httpStatus.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = err.message || "Something went wrong!";
  let error = err;
  let errorSources: TErrorSources = [
    {
      path: "",
      message: message,
    },
  ];

  // Zod validation error
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  //  Postgres error via Knex
  else if (err?.code === "23502") {
    // NOT NULL constraint failed
    statusCode = httpStatus.BAD_REQUEST;
    message = `Missing required field: ${err.column}`;
    errorSources = [
      {
        path: err.column || "",
        message: message,
      },
    ];
  } else if (err?.code === "23503") {
    // FOREIGN KEY violation
    statusCode = httpStatus.BAD_REQUEST;
    message = `Invalid reference in field: ${err.column}`;
    errorSources = [
      {
        path: err.column || "",
        message: message,
      },
    ];
  } else if (err?.code === "23505") {
    // UNIQUE constraint violation
    statusCode = httpStatus.CONFLICT;
    message = `Duplicate value violates unique constraint`;
    errorSources = [
      {
        path: err.constraint || "",
        message: message,
      },
    ];
  }
  else if (err?.code === "22007"|| err?.code === "22008") {
    // Invalid date format or out of range
    statusCode = httpStatus.BAD_REQUEST;
    message = `Invalid date format for field: ${err.column || 'birthdate'}`;
    errorSources = [
      {
        path: err.column || "birthdate",
        message: message,
      },
    ];
  }


  res.status(statusCode).json({
    success,
    message,
    error,
    errorSources,
  });
};

export default globalErrorHandler;
