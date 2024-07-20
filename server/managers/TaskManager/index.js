const Task = require("../../modals/taskModal");
const idFieldCreator = require("../../utils/idCreator");

const TaskManager = {
  async createTask(taskData) {
    const taskId = await idFieldCreator("T", Task, "taskId");
    try {
      const task = new Task({
        taskId: taskId,
        taskName: taskData?.taskName,
        taskDesc: taskData?.taskDesc,
        severity: taskData?.severity,
        expiryDate: taskData?.expiryDate,
        createdBy: taskData?.userName,
        createdByUserId: taskData?.userId,
        createdAt: new Date(),
      });
      await task.save();
      return Promise.resolve(task);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

module.exports = TaskManager;
