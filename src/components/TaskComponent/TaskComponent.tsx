import { useContext, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import TaskService from '../../services/TaskService';
import CreateTaskComponent from './CreateTaskComponent';
import ListTaskComponent from './ListTaskComponent';
import { TasksContext } from '../../store/tasks-context';

export default function TaskComponent() {
  const tasksCtx = useContext(TasksContext);

  useEffect(() => {
    TaskService.findAll()
      .then((res) => tasksCtx.setTasks(res.data))
      .catch((err) => console.error('Error fetching tasks', err));
  }, []);

  return (
    <div className="base-component">
      <NavBar/>
      <CreateTaskComponent/>

      <div className="mt-3 mb-4 w-75">
        <ListTaskComponent/>
      </div>
    </div>
  );
}
