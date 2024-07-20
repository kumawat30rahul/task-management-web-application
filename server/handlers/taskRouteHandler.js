const {
  createSuccessResponse,
  createConnectionErrorResponse,
} = require("../utils/responseHandler");
const TaskManager = require("../managers/TaskManager");
const { taskValidation } = require("../utils/taskValidation");

const TaskRouteHandler = {
  async createTask(req, res) {
    const isTaskValid = taskValidation(req.body);
    if (isTaskValid) return res.send(isTaskValid);
    try {
      const response = await TaskManager.createTask(req.body);
      if (response) {
        return res.send(
          createSuccessResponse({
            statusCode: 200,
            message: "Task Successfully Created",
            status: "SUCCESS",
            data: response,
          })
        );
      }
    } catch (error) {
      return res.send(
        createConnectionErrorResponse({
          statusCode: 500,
          message: "Something Went wrong while creating task",
          status: "ERROR",
          data: error,
        })
      );
    }
  },

  async editingTask(req, res) {
    const isTaskValid = taskValidation(req.body);
    if (isTaskValid) return res.send(isTaskValid);
    try {
      const response = await TaskManager.editTask(req.body);
      if (response) {
        return res.send(
          createSuccessResponse({
            statusCode: 200,
            message: "Task Successfully Edited",
            status: "SUCCESS",
            data: response,
          })
        );
      }
    } catch (error) {
      return res.send(
        createConnectionErrorResponse({
          statusCode: 500,
          message: "Something Went wrong while editing task",
          status: "ERROR",
          data: error,
        })
      );
    }
  },
};

module.exports = TaskRouteHandler;
