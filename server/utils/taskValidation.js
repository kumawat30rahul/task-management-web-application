const { createErrorResponse } = require("./responseHandler");

const createTaskValidation = (body) => {
  const { taskName, createdByUserId, createdBy } = body;
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

module.exports = { createTaskValidation };
