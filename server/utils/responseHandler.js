const createSuccessResponse = ({ statusCode, message, status, data }) => {
  return {
    statusCode: statusCode || 200,
    message: message || "Success",
    status: status || "SUCCESS",
    data: data,
  };
};

const createErrorResponse = ({ statusCode, message, status, error }) => {
  return {
    statusCode: statusCode || 400,
    message: message || "Failed",
    status: status || "ERROR",
    error: error,
  };
};

const createConnectionErrorResponse = ({
  statusCode,
  message,
  status,
  error,
}) => {
  return {
    statusCode: statusCode || 500,
    message: message || "Failed",
    status: status || "ERROR",
    error: error,
  };
};

module.exports = {
  createSuccessResponse,
  createErrorResponse,
  createConnectionErrorResponse,
};
