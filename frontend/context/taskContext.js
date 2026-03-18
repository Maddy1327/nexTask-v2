import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useUserContext } from "./userContext";
import toast from "react-hot-toast";

const TasksContext = createContext();

const serverUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const defaultTask = {
  title: "",
  description: "",
  priority: "low",
  dueDate: "",
  completed: false,
};

const formatDateForInput = (value) => {
  if (!value) {
    return "";
  }

  return value.includes("T") ? value.split("T")[0] : value;
};

const normalizeTaskFromApi = (task = {}) => ({
  ...defaultTask,
  ...task,
  priority: task.priority ? task.priority.toLowerCase() : "low",
  status: task.status ? task.status.toLowerCase() : task.status,
  dueDate: formatDateForInput(task.dueDate),
  completed: Boolean(task.completed),
});

const normalizeTaskForApi = (task = {}) => {
  const normalizedTask = {
    ...task,
    title: task.title?.trim() || "",
    description: task.description?.trim() || "",
    priority: task.priority ? task.priority.toUpperCase() : "LOW",
    completed: task.completed === true || task.completed === "true",
  };

  if (normalizedTask.status) {
    normalizedTask.status = normalizedTask.status.toUpperCase();
  }

  if (normalizedTask.dueDate) {
    normalizedTask.dueDate = normalizedTask.dueDate.includes("T")
      ? normalizedTask.dueDate
      : `${normalizedTask.dueDate}T00:00:00`;
  } else {
    normalizedTask.dueDate = null;
  }

  return normalizedTask;
};

const getApiErrorMessage = (error, fallbackMessage) => {
  const status = error.response?.status;
  const responseData = error.response?.data;

  if (typeof responseData === "string" && responseData.trim()) {
    return status ? `${fallbackMessage} (${status}): ${responseData}` : responseData;
  }

  if (responseData?.message) {
    return status
      ? `${fallbackMessage} (${status}): ${responseData.message}`
      : responseData.message;
  }

  if (error.message) {
    return status
      ? `${fallbackMessage} (${status}): ${error.message}`
      : `${fallbackMessage}: ${error.message}`;
  }

  return fallbackMessage;
};

export const TasksProvider = ({ children }) => {
  const userId = useUserContext().user?.id;

  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [task, setTask] = React.useState({});

  const [isEditing, setIsEditing] = React.useState(false);
  const [priority, setPriority] = React.useState("all");
  const [activeTask, setActiveTask] = React.useState(null);
  const [modalMode, setModalMode] = React.useState("");
  const [profileModal, setProfileModal] = React.useState(false);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const openModalForAdd = () => {
    setModalMode("add");
    setIsEditing(true);
    setTask(defaultTask);
  };

  const openModalForEdit = (task) => {
    setModalMode("edit");
    setIsEditing(true);
    setActiveTask(task);
  };

  const openProfileModal = () => {
    setProfileModal(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setProfileModal(false);
    setModalMode("");
    setActiveTask(null);
    setTask(defaultTask);
  };

  // GET TASKS
  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/tasks`, getAuthHeader());
      setTasks(response.data.map(normalizeTaskFromApi));
    } catch (error) {
      console.log("Error getting tasks", error);
    }
    setLoading(false);
  };

  // GET SINGLE TASK
  const getTask = async (taskId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${serverUrl}/tasks/${taskId}`,
        getAuthHeader()
      );
      setTask(normalizeTaskFromApi(response.data));
    } catch (error) {
      console.log("Error getting task", error);
    }
    setLoading(false);
  };

  // CREATE TASK
  const createTask = async (task) => {
    setLoading(true);
    try {
      const payload = normalizeTaskForApi(task);
      console.log("Creating task with data:", payload);
      const response = await axios.post(
        `${serverUrl}/tasks`,
        payload,
        getAuthHeader()
      );
      console.log("Task created successfully:", response.data);
      setTasks([...tasks, normalizeTaskFromApi(response.data)]);
      toast.success("Task created successfully");
      return true;
    } catch (error) {
      console.error("Error creating task:", error);
      console.error("Error response:", error.response?.data);
      toast.error(getApiErrorMessage(error, "Failed to create task"));
      return false;
    } finally {
      setLoading(false);
    }
  };

  // UPDATE TASK
  const updateTask = async (task) => {
    setLoading(true);
    try {
      const payload = normalizeTaskForApi(task);
      const res = await axios.patch(
        `${serverUrl}/tasks/${task.id}`,
        payload,
        getAuthHeader()
      );

      const newTasks = tasks.map((tsk) =>
        tsk.id === res.data.id ? normalizeTaskFromApi(res.data) : tsk
      );

      setTasks(newTasks);
      toast.success("Task updated successfully");
      return true;
    } catch (error) {
      console.log("Error updating task", error);
      toast.error(getApiErrorMessage(error, "Failed to update task"));
      return false;
    } finally {
      setLoading(false);
    }
  };

  // DELETE TASK
  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/tasks/${taskId}`, getAuthHeader());

      const newTasks = tasks.filter((tsk) => tsk.id !== taskId);
      setTasks(newTasks);

      toast.success("Task deleted");
    } catch (error) {
      console.log("Error deleting task", error);
    }
    setLoading(false);
  };

  const handleInput = (name) => (e) => {
    if (name === "setTask") {
      setTask(e);
    } else {
      setTask({ ...task, [name]: e.target.value });
    }
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const activeTasks = tasks.filter((task) => !task.completed);

  useEffect(() => {
    if (userId) {
      getTasks();
    }
  }, [userId]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        task,
        getTask,
        createTask,
        updateTask,
        deleteTask,
        priority,
        setPriority,
        handleInput,
        isEditing,
        setIsEditing,
        openModalForAdd,
        openModalForEdit,
        activeTask,
        closeModal,
        modalMode,
        openProfileModal,
        activeTasks,
        completedTasks,
        profileModal,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  return React.useContext(TasksContext);
};
