import { CircularProgress, Grid } from "@mui/material";
import TaskCard from "../task-card";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { getAllTasks, updateTaskStatus } from "@/Config/services";

let initialData = {
  tasks: {},
  columns: {
    TODO: {
      id: "TODO",
      title: "TO DO",
      taskIds: [],
    },
    INPROGRESS: {
      id: "INPROGRESS",
      title: "INPROGRESS",
      taskIds: [],
    },
    CLOSED: {
      id: "CLOSED",
      title: "CLOSED",
      taskIds: [],
    },
  },
  columnOrder: ["TODO", "INPROGRESS", "CLOSED"],
};

const TaskDragAndDrop = ({
  fetchTasksAgain,
  setFetchTasksAgain,
  setTaskType,
  setIsOpen,
  setTaskId,
}) => {
  const [state, setState] = useState(initialData);
  const [updateTaskStatusLoader, setUpdateTaskStatusLoader] = useState({
    loader: false,
    taksId: "",
  });
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    //if user drops the task outside the droppable area
    if (!destination) return;

    //if user drops the task in the same droppable area
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    //if user drops the task in the same droppable area but different position
    if (destination.droppableId === source.droppableId) {
      const column = state.columns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    //if user drops the task in the different droppable area
    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
    updatingStatus(draggableId, destination.droppableId);
  };

  const fetchingAllTasks = async () => {
    try {
      const response = await getAllTasks();
      const allTasks = response?.data?.reduce((acc, task) => {
        acc[task?.taskId] = {
          id: task?.taskId,
          taskName: task?.taskName,
          taskDescription: task?.taskDescription,
          createdAt: task?.createdAt,
          severity: task?.severity,
          status: task?.taskStatus,
          expiryDate: task?.expiryDate,
        };
        return acc;
      }, {});

      const sepearatedColumnId = seperatingTasks(response?.data);
      const newInitialData = {
        ...initialData,
        tasks: allTasks,
        columns: {
          ...initialData.columns,
          TODO: {
            ...initialData.columns.TODO,
            taskIds: sepearatedColumnId.TODO,
          },
          INPROGRESS: {
            ...initialData.columns.INPROGRESS,
            taskIds: sepearatedColumnId.INPROGRESS,
          },
          CLOSED: {
            ...initialData.columns.CLOSED,
            taskIds: sepearatedColumnId.CLOSED,
          },
        },
      };
      initialData = newInitialData;
      setState(newInitialData);
      setFetchTasksAgain(false);
    } catch (error) {
      alert(error);
    }
  };

  const seperatingTasks = (allTasks) => {
    const todoTasks = allTasks
      ?.filter((task) => task?.taskStatus === "TODO")
      .map((task) => task?.taskId);
    const inprogressTasks = allTasks
      ?.filter((task) => task?.taskStatus === "INPROGRESS")
      .map((task) => task.taskId);
    const closedTasks = allTasks
      ?.filter((task) => task?.taskStatus === "CLOSED")
      .map((task) => task.taskId);

    return {
      TODO: todoTasks,
      INPROGRESS: inprogressTasks,
      CLOSED: closedTasks,
    };
  };

  const updatingStatus = async (taskId, status) => {
    try {
      setUpdateTaskStatusLoader({
        loader: true,
        taksId: taskId,
      });
      const payload = {
        taskId,
        taskStatus: status,
      };
      await updateTaskStatus(payload);
      setUpdateTaskStatusLoader({
        loader: false,
        taksId: "",
      });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchingAllTasks();
  }, [fetchTasksAgain]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full mt-8 h-[600px]">
        {fetchTasksAgain ? (
          <div className="h-24 w-full flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <Grid container spacing={2} className="h-full">
            {state.columnOrder.map((columnId) => {
              const column = state.columns[columnId];
              const tasks = column?.taskIds?.map(
                (taskId) => state.tasks[taskId]
              );
              return (
                <Grid item lg={4} md={4} sm={12} xs={12} className="h-full">
                  <div className="flex flex-col items-center justify-start gap-2 border border-gray-500 bg-gray-500/20 h-full">
                    <span className="h-auto w-full bg-blue-500 text-center text-white font-bold">
                      {column?.title}
                    </span>
                    <Droppable droppableId={column?.id}>
                      {(provided, snapshot) => (
                        <div
                          className="p-4 w-full flex flex-col gap-2 h-full  overflow-y-scroll"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {tasks?.map((task, index) => (
                            <Draggable
                              draggableId={`${task.id}`}
                              index={index}
                              key={task.id}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    key={task.id}
                                  >
                                    <TaskCard
                                      task={task}
                                      updateTaskStatusLoader={
                                        updateTaskStatusLoader
                                      }
                                      setTaskType={setTaskType}
                                      setIsOpen={setIsOpen}
                                      setTaskId={setTaskId}
                                    />
                                  </div>
                                );
                              }}
                            </Draggable>
                          ))}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
    </DragDropContext>
  );
};

export default TaskDragAndDrop;
