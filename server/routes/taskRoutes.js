const express = require("express");
const TaskRouteHandler = require("../handlers/taskRouteHandler");

const taskRouter = express.Router();

//creating task
taskRouter.post("/create", TaskRouteHandler.createTask);

//editing task
taskRouter.patch("/edit", TaskRouteHandler.editingTask);

//deleting task
taskRouter.delete("/delete/:taskId", TaskRouteHandler.deletingTask);

//changing status of task
taskRouter.patch("/update-status", TaskRouteHandler.changingStatus);

//getting all tasks
taskRouter.get("/all", TaskRouteHandler.getAllTasks);

//getting task by id //
taskRouter.get("/get-task/:taskId", TaskRouteHandler.getTaskById);

//searching task by name
taskRouter.get("/search", TaskRouteHandler.searchTask);

//sorting according to time
// taskRouter.get("/sort/:sort", TaskRouteHandler.sortTask);

module.exports = taskRouter;
