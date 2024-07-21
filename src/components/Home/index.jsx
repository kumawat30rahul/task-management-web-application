import { useState } from "react";
import CommonDialog from "../common/common-dialog";
import SelectCommon from "../common/Common-select";
import Navbar from "../Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { DatePicker } from "../ui/datePicker";
import TaskDragAndDrop from "./components/task-dnd";

const HomePage = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [tasksDetails, setTasksDetails] = useState({
    taskName: "",
    taskDesc: "",
    taskSeverity: "",
    taskDate: "",
  });
  const [taskType, setTaskType] = useState("Edit");
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

  const dialogContent = () => {
    if (taskType === "Add" || taskType === "Edit") {
      return (
        <div className="flex flex-col items-start justify-start gap-3 w-full">
          <div className="w-full">
            <label htmlFor="name">Title</label>
            <Input
              placeholder="Type Here..."
              name="name"
              className="custom-input"
              onChange={(e) => taskDetailsHandler(e.target.value, "taskName")}
            />
          </div>
          <div className="w-full">
            <label htmlFor="desc">Task Description</label>
            <Input
              placeholder="Type Here..."
              name="desc"
              className="custom-input"
              onChange={(e) => taskDetailsHandler(e.target.value, "taskDesc")}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>
              <SelectCommon
                defaultPlaceHolder="Severity"
                options={severityOptions}
                setTasksDetails={setTasksDetails}
              />
            </div>
            <div>
              <DatePicker setTasksDetails={setTasksDetails} />
            </div>
          </div>
          <div>
            <Button className="bg-blue-500">Save</Button>
          </div>
        </div>
      );
    } else if (taskType === "View") {
      return (
        <div className="flex flex-col gap-3 mt-3">
          <div className="flex flex-col">
            <span>Title</span>
            <span className="text-xl font-bold text-black">
              {tasksDetails?.taskName || "NA"}
            </span>
          </div>
          <div className="flex flex-col">
            <span>Description</span>
            <span className="text-lg text-black">
              {tasksDetails?.taskDesc || "NA"}
            </span>
          </div>
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span>Created At</span>
              <span className="text-lg text-black">
                {tasksDetails?.createdAt || "NA"}
              </span>
            </div>
            <div>
              <span className="custom-severity-todo">
                {tasksDetails?.severity || "TODO"}
              </span>
            </div>
          </div>
          <Button className="bg-blue-500 w-max">Close</Button>
        </div>
      );
    }
  };

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
                : "Edit Task"
            }`}
            dialogContent={dialogContent()}
          >
            <Button className="bg-blue-500">Add Task</Button>
          </CommonDialog>
        </div>
        <div className="h-14 w-full rounded-full flex items-center justify-between">
          <div className="w-1/4 rounded-lg">
            <Input className="rounded-lg" placeholder="Search Here..." />
          </div>
          <div>
            <SelectCommon
              defaultPlaceHolder="Sort By"
              options={sortingOptions}
            />
          </div>
        </div>
        <Separator orientation="horizontal" />
        <TaskDragAndDrop />
      </div>
    </>
  );
};

export default HomePage;
