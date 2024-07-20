const Task = require("../../modals/taskModal");
const idFieldCreator = require("../../utils/idCreator");

const TaskManager = {
  async createTask(taskData) {
    const taskId = await idFieldCreator("T", Task, "taskId");
    const {
      taskName,
      taskDescription,
      severity,
      expiryDate,
      createdBy,
      createdByUserId,
    } = taskData;
    try {
      const task = new Task({
        taskId: taskId,
        taskName: taskName,
        taskDesc: taskDescription,
        severity: severity,
        expiryDate: expiryDate,
        createdBy: createdBy,
        createdByUserId: createdByUserId,
        createdAt: new Date(),
      });
      await task.save();
      return Promise.resolve(task);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async editTask(taskData) {
    try {
      const {
        taskId,
        taskName,
        taskDescription,
        severity,
        expiryDate,
        updatedAt,
        updatedBy,
        updatedByUserId,
      } = taskData;
      const updateFields = {
        updatedAt: new Date(),
      };
      if (taskName) updateFields.taskName = taskName;
      if (taskDescription) updateFields.taskDesc = taskDescription;
      if (severity) updateFields.severity = severity;
      if (expiryDate) updateFields.expiryDate = expiryDate;
      if (updatedAt) updateFields.updatedAt = updatedAt;
      if (updatedBy) updateFields.updatedBy = updatedBy;
      if (updatedByUserId) updateFields.updatedByUserId = updatedByUserId;

      const task = await Task.findOneAndUpdate({ taskId }, updateFields, {
        new: true,
      });
      return Promise.resolve(task);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async deleteTask(taskId) {
    try {
      console.log(taskId);
      const task = await Task.deleteOne({ taskId });
      console.log(task);
      return Promise.resolve(task);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

module.exports = TaskManager;
