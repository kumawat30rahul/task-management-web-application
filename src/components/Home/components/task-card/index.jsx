import { dateFormater } from "@/components/common/common-functions";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@mui/material";
import { format } from "date-fns";

const TaskCard = ({
  task,
  key,
  updateTaskStatusLoader,
  setTaskType,
  setIsOpen,
  setTaskId,
  taskCardButtonLoaders,
}) => {
  const taskCardButtonHandler = (type, taskId) => {
    if (type === "Delete") {
      setTaskType("Delete");
    } else if (type === "Edit") {
      setTaskType("Edit");
    } else {
      setTaskType("View");
    }
    setTaskId(taskId);
    // setIsOpen(true);
  };

  return (
    <div
      className={`w-full border  border-t-8  p-2 rounded-lg cursor-pointer hover:scale-105 transition-all duration-200 bg-white ${
        task?.status === "CLOSED"
          ? "border-red-500"
          : task?.status === "INPROGRESS"
          ? "border-yellow-500"
          : "border-blue-500"
      }`}
      key={key}
    >
      {updateTaskStatusLoader?.loader &&
      updateTaskStatusLoader?.taskId === task?.id ? (
        <div className="h-24 w-full flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-start gap-2">
            <span className="text-lg md:text-xl font-bold">
              {task?.taskName || "NA"}
            </span>
            <span className="text-sm md:text-md text-start">
              {task?.taskDescription || "NA"}
            </span>
            <span className="text-xs text-gray-500">
              {dateFormater(task?.createdAt, "dd MMMM yyyy, hh:mm a")}
            </span>
          </div>
          <div className="w-full flex items-center justify-between mt-2">
            <span
              className={`${
                task?.severity === "Low"
                  ? "custom-severity-low"
                  : task?.severity === "Medium"
                  ? "custom-severity-medium"
                  : "custom-severity-high"
              }`}
            >
              {task?.severity || "NA"}
            </span>
            <span className="text-xs">
              Due Date: {dateFormater(task?.expiryDate, "dd MMMM yyyy") || "NA"}
            </span>
          </div>
          <div className="w-full flex items-center justify-end gap-2 mt-2">
            <Button
              className="bg-red-500 px-2 h-8"
              onClick={() => taskCardButtonHandler("Delete", task?.id)}
            >
              {taskCardButtonLoaders?.loader &&
              task?.id === taskCardButtonLoaders?.taskId &&
              taskCardButtonLoaders.taskType === "Delete" ? (
                <CircularProgress
                  sx={{ color: "white !important" }}
                  size={18}
                />
              ) : (
                "Delete"
              )}
            </Button>
            <Button
              className="bg-blue-500 px-2 h-8"
              onClick={() => taskCardButtonHandler("Edit", task?.id)}
            >
              {taskCardButtonLoaders?.loader &&
              task?.id === taskCardButtonLoaders?.taskId &&
              taskCardButtonLoaders.taskType === "Edit" ? (
                <CircularProgress
                  sx={{ color: "white !important" }}
                  size={18}
                />
              ) : (
                "Edit"
              )}
            </Button>
            <Button
              className="bg-blue-700 px-2 h-8"
              onClick={() => taskCardButtonHandler("View", task?.id)}
            >
              {taskCardButtonLoaders?.loader &&
              task?.id === taskCardButtonLoaders?.taskId &&
              taskCardButtonLoaders.taskType === "View" ? (
                <CircularProgress
                  sx={{ color: "white !important" }}
                  size={18}
                />
              ) : (
                "View"
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
