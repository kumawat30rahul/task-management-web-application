const {
  createSuccessResponse,
  createErrorResponse,
} = require("../utils/responseHandler");
const UserManger = require("../managers/UserManager");
const {
  validateUserRegistrationFields,
  validateLoginFields,
} = require("../utils/validation");

const UserRouteHandler = {
  async createUser(req, res) {
    try {
      const validationResult = validateUserRegistrationFields(req?.body); //validate user registration fields
      if (validationResult) return res.send(validationResult);
      const user = await UserManger.createUser(req.body);
      if (user) {
        return res.send(
          createSuccessResponse({
            statusCode: 201,
            message: "User created successfully",
            status: "SUCCESS",
            data: {},
          })
        );
      }
    } catch (error) {
      return res.send(
        createErrorResponse({
          statusCode: 500,
          message: "Failed to create user",
          status: "FAILED",
          error: error,
        })
      );
    }
  },

  async loginUser(req, res) {
    const validationResult = validateLoginFields(req?.body); //validate user fields
    if (validationResult) return res.send(validationResult);
    try {
      const user = await UserManger.loginUser(req.body);
      if (user) {
        return res.send(
          createSuccessResponse({
            statusCode: 200,
            message: "User logged in successfully",
            status: "SUCCESS",
            data: user,
          })
        );
      }
    } catch (error) {
      return res.send(
        createErrorResponse({
          statusCode: error?.statusCode || 500,
          message: error?.message || "Failed to login user",
          status: error?.status || "ERROR",
          error: error?.error,
        })
      );
    }
  },

  async googleLogin(req, res) {
    try {
      const user = await UserManger.googleLogin(req.body);
      if (user) {
        return res.send(
          createSuccessResponse({
            statusCode: 200,
            message: "User logged in successfully",
            status: "SUCCESS",
            data: user,
          })
        );
      }
    } catch (error) {
      return res.send(
        createErrorResponse({
          statusCode: error?.statusCode || 500,
          message: error?.message || "Failed to login user",
          status: error?.status || "ERROR",
          error: error?.error,
        })
      );
    }
  },
};

module.exports = UserRouteHandler;
