import { useEffect, useState } from "react";
import CommonDialog from "../common/common-dialog";
import SelectCommon from "../common/Common-select";
import Navbar from "../Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { DatePicker } from "../ui/datePicker";
import TaskDragAndDrop from "./components/task-dnd";
import {
  createTask,
  deleteTask,
  editTask,
  getTaskById,
} from "@/Config/services";
import { CircularProgress } from "@mui/material";
import { dateFormater } from "../common/common-functions";
import { SearchSheet } from "./components/searchDetails";

const HomePage = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [tasksDetails, setTasksDetails] = useState();
  const [taskId, setTaskId] = useState("");
  const [taskCreationLoader, setTaskCreationLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [fetchTasksAgain, setFetchTasksAgain] = useState(false);
  const [taskType, setTaskType] = useState("");
  const { userName } = userDetails;

  const sortingOptions = [
    { value: "recent", label: "Recent" },
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "prevWeek", label: "Last Week" },
  ];

  const severityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const taskDetailsHandler = (value, name) => {
    setTasksDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createTaskFunction = async () => {
    setTaskCreationLoader(true);
    try {
      const payload = {
        taskName: tasksDetails?.taskName,
        taskDescription: tasksDetails?.taskDesc,
        severity: tasksDetails?.taskSeverity,
        expiryDate: tasksDetails?.expiryDate,
        createdBy: userName,
        createdByUserId: userDetails?.userId,
      };

      await createTask(payload);
      setTaskCreationLoader(false);
      setFetchTasksAgain(true);
      setIsOpen(false);
    } catch (error) {
      alert(error);
      setTaskCreationLoader(false);
    }
  };

  const handleClose = () => {
    setTaskType("");
    setIsOpen(false);
  };

  const dialogContent = () => {
    if (taskType === "Add" || taskType === "Edit") {
      return (
        <div className="flex flex-col items-start justify-start gap-3 w-full">
          <div className="w-full flex flex-col items-start">
            <label htmlFor="name">Title</label>
            <Input
              placeholder="Type Here..."
              value={tasksDetails?.taskName}
              name="name"
              className="custom-input"
              onChange={(e) => taskDetailsHandler(e.target.value, "taskName")}
            />
          </div>
          <div className="w-full flex flex-col items-start">
            <label htmlFor="desc">Task Description</label>
            <Input
              placeholder="Type Here..."
              value={tasksDetails?.taskDescription}
              name="desc"
              className="custom-input"
              onChange={(e) => taskDetailsHandler(e.target.value, "taskDesc")}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 w-full">
            <div className="w-full">
              <SelectCommon
                defaultPlaceHolder="Severity"
                options={severityOptions}
                setTasksDetails={setTasksDetails}
                tasksDetails={tasksDetails}
              />
            </div>
            <div className="w-full">
              <DatePicker
                setTasksDetails={setTasksDetails}
                tasksDetails={tasksDetails}
              />
            </div>
          </div>
          <div>
            <Button
              className="bg-blue-500"
              onClick={
                taskType === "Edit" ? editingTaskFunction : createTaskFunction
              }
            >
              {taskCreationLoader ? (
                <CircularProgress
                  size={18}
                  sx={{ color: "white !important" }}
                />
              ) : taskType === "Edit" ? (
                "Update"
              ) : (
                "Create Task"
              )}
            </Button>
          </div>
        </div>
      );
    } else if (taskType === "View") {
      return (
        <div className="flex flex-col gap-3 mt-3">
          <div className="flex flex-col items-start">
            <span>Title</span>
            <span className="text-xl font-bold text-black">
              {tasksDetails?.taskName || "NA"}
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span>Description</span>
            <span className="text-lg text-black text-start">
              {tasksDetails?.taskDescription || "NA"}
            </span>
          </div>
          <div className="flex items-start justify-between">
            <div className="flex flex-col items-start">
              <span>Created At</span>
              <span className="text-lg text-black">
                {dateFormater(
                  tasksDetails?.createdAt,
                  "dd MMMM yyyy, hh:mm a"
                ) || "NA"}
              </span>
            </div>
            <div>
              <span className="custom-severity-todo">
                {tasksDetails?.taskStatus}
              </span>
            </div>
          </div>
          <Button className="bg-blue-500 w-max" onClick={handleClose}>
            Close
          </Button>
        </div>
      );
    } else if (taskType === "Delete") {
      return (
        <div className="flex flex-col items-start relativ">
          <span className="text-start">
            Are you sure you want to delete this task?
          </span>
          <div className="flex items-center justify-start md:justify-end gap-2 mt-4 w-full">
            <Button className="bg-red-500 w-max" onClick={deleteTaskFunction}>
              Yes
            </Button>
            <Button className="bg-blue-500 w-max" onClick={handleClose}>
              No
            </Button>
          </div>
        </div>
      );
    }
  };

  const getTasksByIdFunction = async (taskId) => {
    try {
      const response = await getTaskById(taskId);
      const res = response?.data;
      setTasksDetails({
        taskName: res?.taskName,
        taskDescription: res?.taskDescription,
        taskSeverity: res?.severity,
        expiryDate: res?.expiryDate,
        createdAt: res?.createdAt,
        taskStatus: res?.taskStatus,
      });
      setIsOpen(true);
    } catch (error) {
      alert(error);
    }
  };
  const editingTaskFunction = async () => {
    setTaskCreationLoader(true);
    try {
      const payload = {
        taskId,
        taskName: tasksDetails?.taskName,
        taskDescription: tasksDetails?.taskDesc,
        severity: tasksDetails?.taskSeverity,
        expiryDate: tasksDetails?.expiryDate,
        updatedAt: new Date(),
        updatedBy: userName,
        updatedByUserId: userDetails?.userId,
      };

      const response = await editTask(payload);
      setTaskCreationLoader(false);
      setFetchTasksAgain(true);
      setTaskType("");
      setIsOpen(false);
    } catch (error) {
      alert(error);
      setTaskCreationLoader(false);
    }
  };

  const deleteTaskFunction = async () => {
    try {
      await deleteTask(taskId);
      setFetchTasksAgain(true);
      setTaskType("");
      setIsOpen(false);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (taskType !== "Add" && taskId && taskType !== "") {
      getTasksByIdFunction(taskId);
    }
  }, [taskType]);

  return (
    <>
      <Navbar />
      <div className="p-4 flex flex-col gap-3 items-start justify-start">
        <div className="flex flex-col items-start gap-4">
          <span className="text-2xl font-bold">Welcome!! {userName}</span>
          <CommonDialog
            title={`${
              taskType === "Add"
                ? "Add Task"
                : taskType === "View"
                ? "Task Details"
                : taskType === "Edit"
                ? "Edit Task"
                : "Delete Task"
            }`}
            isOpen={isOpen}
            setIsOpen={() => {
              setIsOpen(true);
              setTaskType("Add");
              setTasksDetails({});
            }}
            setIsClose={handleClose}
            dialogContent={dialogContent()}
          >
            <Button className="bg-blue-500">Add Task</Button>
          </CommonDialog>
        </div>
        <div className="h-14 w-full rounded-full flex flex-col gap-2 sm:flex-row sm:items-center justify-between">
          <div className="w-full sm:w-2/4 lg:w-1/4 rounded-lg">
            <SearchSheet setTaskType={setTaskType} setTaskId={setTaskId}>
              <div>
                <Input
                  className="rounded-lg w-full"
                  placeholder="Search Here..."
                />
              </div>
            </SearchSheet>
          </div>
          {/* <div>
            <SelectCommon
              defaultPlaceHolder="Sort By"
              options={sortingOptions}
            />
          </div> */}
        </div>
        <Separator orientation="horizontal" className="mt-10 sm:mt-0" />
        <TaskDragAndDrop
          fetchTasksAgain={fetchTasksAgain}
          setFetchTasksAgain={setFetchTasksAgain}
          setTaskType={setTaskType}
          setIsOpen={setIsOpen}
          setTaskId={setTaskId}
        />
      </div>
    </>
  );
};

export default HomePage;
