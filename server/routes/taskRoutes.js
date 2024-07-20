const express = require("express");
const TaskRouteHandler = require("../handlers/taskRouteHandler");

const taskRouter = express.Router();

//creating task
taskRouter.post("/create", TaskRouteHandler.createTask);

//editing task
taskRouter.patch("/edit", TaskRouteHandler.editingTask);

module.exports = taskRouter;
