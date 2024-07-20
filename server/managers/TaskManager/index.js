const Task = require("../../modals/taskModal");
const idFieldCreator = require("../../utils/idCreator");

const TaskManager = {
  async createTask(taskData) {
    const taskId = await idFieldCreator("T", Task, "taskId");
    console.log("Task ID: ", taskId);
    try {
      const task = new Task({
        taskId: taskId,
        taskName: taskData?.taskName,
        taskDesc: taskData?.taskDescription,
        severity: taskData?.severity,
        expiryDate: taskData?.expiryDate,
        createdBy: taskData?.createdBy,
        createdByUserId: taskData?.createdByUserId,
        createdAt: new Date(),
      });
      console.log("Task: ", task);
      await task.save();
      return Promise.resolve(task);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

module.exports = TaskManager;
