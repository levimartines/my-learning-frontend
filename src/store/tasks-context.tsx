import React, { useState } from 'react';
import { Task } from '../models/task';

interface ITasksContext {
  tasks: Task[],
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
}

export const TasksContext = React.createContext<ITasksContext>({
  tasks: [],
  addTask: () => {
  },
  removeTask: () => {
  },
  setTasks: () => {
  },
});

const TaskContextProvider: React.FC<any> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  function setTasksHandler(tasks: Task[]) {
    setTasks(tasks);
  }

  function addTaskHandler(task: Task) {
    setTasks([...tasks, task]);
  }

  function removeTaskHandler(id: number) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  const ctx: ITasksContext = {
    tasks,
    setTasks: setTasksHandler,
    addTask: addTaskHandler,
    removeTask: removeTaskHandler,
  };

  return <TasksContext.Provider value={ctx}>{children}</TasksContext.Provider>;
};

export default TaskContextProvider;
