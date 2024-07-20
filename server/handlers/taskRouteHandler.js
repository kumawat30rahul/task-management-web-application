const {
  createSuccessResponse,
  createConnectionErrorResponse,
} = require("../utils/responseHandler");
const TaskManager = require("../managers/TaskManager");
const { createTaskValidation } = require("../utils/taskValidation");

const TaskRouteHandler = {
  async createTask(req, res) {
    const taskValidation = createTaskValidation(req.body);
    if (taskValidation) return res.send(taskValidation);
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
};

module.exports = TaskRouteHandler;
