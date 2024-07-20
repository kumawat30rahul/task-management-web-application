import { createErrorResponse } from "./responseHandler";

export const createTaskValidation = (taskName, createdByUserId, createdBy) => {
  if (!taskName) {
    return createErrorResponse({
      statusCode: 400,
      message: "Task Title is required",
      status: "ERROR",
      error: "Invalid request data",
    });
  }

  if (!createdByUserId) {
    return createErrorResponse({
      statusCode: 400,
      message: "Invalid Created User Id",
      status: "ERROR",
      error: "Invalid request data",
    });
  }
  if (!createdBy) {
    return createErrorResponse({
      statusCode: 400,
      message: "Invalid Created User Name",
      status: "ERROR",
      error: "Invalid request data",
    });
  }
  if (!createdByUserId) {
    return createErrorResponse({
      statusCode: 400,
      message: "Invalid Created User Id",
      status: "ERROR",
      error: "Invalid request data",
    });
  }
};
