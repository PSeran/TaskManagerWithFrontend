import { createContext, useContext, useState, useEffect } from "react";
import { getData, saveData } from "../localstroge/storage";
import {useAuth}  from "./AuthContext1";

const TaskContext = createContext();
export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const key = user ? `tasks_${user.id}` : null;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      setTasks(getData(key) || []);
    }
  }, [user]);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    saveData(key, newTasks);
  };

  const addTask = (task) => {
    const newTasks = [...tasks, { id: Date.now(), completed: false, ...task }];
    saveTasks(newTasks);
  };

  const updateTask = (id, updates) => {
    const newTasks = tasks.map(t => t.id === id ? { ...t, ...updates } : t);
    saveTasks(newTasks);
  };

  const deleteTask = (id) => {
    saveTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
