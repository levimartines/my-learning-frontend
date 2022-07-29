import NavBar from '../NavBar/NavBar';
import { useContext, useEffect } from 'react';
import TaskService from '../../services/TaskService';
import CreateTaskComponent from '../CreateTaskComponent/CreateTaskComponent';
import TaskListComponent from './TaskListComponent';
import TaskContextProvider, { TasksContext } from '../../store/tasks-context';

export default function TaskComponent() {
  const tasksCtx = useContext(TasksContext);

  useEffect(() => {
    TaskService.findAll()
      .then(res => tasksCtx.setTasks(res.data))
      .catch(err => console.error('Error fetching tasks', err));
  });

  return (
    <TaskContextProvider>
      <div className="base-component">
        <NavBar/>
        <CreateTaskComponent/>

        <div className="mt-3 mb-4 w-75">
          <TaskListComponent/>
        </div>
      </div>
    </TaskContextProvider>
  );
}