const { createErrorResponse } = require("./responseHandler");

const validateUserRegistrationFields = (body) => {
  const { firstName, lastName, email, password, confirmedPassword } = body;
  if (!email && !password && !confirmedPassword && !firstName && !lastName) {
    return createErrorResponse({
      statusCode: 400,
      message: "All fields are required",
      status: "ERROR",
      error: "Invalid request data",
    });
  }

  if (!firstName) {
    return createErrorResponse({
      statusCode: 400,
      message: "First Name is required",
      status: "ERROR",
      error: "Invalid request data",
    });
  }

  if (!lastName) {
    return createErrorResponse({
      statusCode: 400,
      message: "Last Name is required",
      status: "ERROR",
      error: "Invalid request data",
    });
  }

  if (!email) {
    return createErrorResponse({
      statusCode: 400,
      message: "Email is required",
      status: "ERROR",
      error: "Invalid request data",
    });
  }

  if (!password) {
    return createErrorResponse({
      statusCode: 400,
      message: "Password is required",
      status: "ERROR",
      error: "Invalid request data",
    });
  }

  if (!confirmedPassword) {
    return createErrorResponse({
      statusCode: 400,
      message: "Confirmed Password is required",
      status: "ERROR",
      error: "Invalid request data",
    });
  }

  if (password !== confirmedPassword) {
    return createErrorResponse({
      statusCode: 400,
      message: "Password and confirmed password do not match",
      status: "ERROR",
      error: "Invalid request data",
    });
  }
};

const validateLoginFields = (body) => {
  const { email, password } = body;
  if (!email && !password) {
    return createErrorResponse({
      statusCode: 400,
      message: "All fields are required",
      status: "ERROR",
      error: "Invalid request data",
    });
  }

  if (!email) {
    return createErrorResponse({
      statusCode: 400,
      message: "Email is required",
      status: "ERROR",
      error: "Invalid request data",
    });
  }

  if (!password) {
    return createErrorResponse({
      statusCode: 400,
      message: "Password is required",
      status: "ERROR",
      error: "Invalid request data",
    });
  }
};

module.exports = { validateUserRegistrationFields, validateLoginFields };
