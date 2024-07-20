const { createErrorResponse } = require("./responseHandler");

const taskValidation = (body) => {
  const {
    taskId,
    taskName,
    createdByUserId,
    createdBy,
    updatedAt,
    updatedBy,
    updatedByUserId,
  } = body;
  if (taskId) {
    if (!taskId) {
      return createErrorResponse({
        statusCode: 400,
        message: "Invalid Task Id",
        status: "ERROR",
        error: "Invalid request data",
      });
    }
    if (!updatedByUserId) {
      return createErrorResponse({
        statusCode: 400,
        message: "Invalid Updated User Id",
        status: "ERROR",
        error: "Invalid request data",
      });
    }
    if (!updatedBy) {
      return createErrorResponse({
        statusCode: 400,
        message: "Invalid Updated User Name",
        status: "ERROR",
        error: "Invalid request data",
      });
    }
    if (!updatedAt) {
      return createErrorResponse({
        statusCode: 400,
        message: "Invalid Updated Time",
        status: "ERROR",
        error: "Invalid request data",
      });
    }
  }
  if (!taskName) {
    return createErrorResponse({
      statusCode: 400,
      message: "Task Title is required",
      status: "ERROR",
      error: "Invalid request data",
    });
  }

  if (!createdBy && !taskId) {
    return createErrorResponse({
      statusCode: 400,
      message: "Invalid Created User Name",
      status: "ERROR",
      error: "Invalid request data",
    });
  }
  if (!createdByUserId && !taskId) {
    return createErrorResponse({
      statusCode: 400,
      message: "Invalid Created User Id",
      status: "ERROR",
      error: "Invalid request data",
    });
  }
};

module.exports = { taskValidation };
