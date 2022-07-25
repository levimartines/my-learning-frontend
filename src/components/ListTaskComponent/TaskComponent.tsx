import NavBar from '../NavBar/NavBar';
import { useEffect, useState } from 'react';
import { Task } from '../../models/task';
import TaskService from '../../services/TaskService';
import CreateTaskComponent from '../CreateTaskComponent/CreateTaskComponent';
import TaskListComponent from './TaskListComponent';

export default function TaskComponent() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    TaskService.findAll()
      .then(res => setTasks(res.data))
      .catch(err => console.error('Error fetching tasks', err));
  }, []);

  function addTask(task: Task) {
    setTasks([...tasks, task]);
  }

  function removeFromState(id: number) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  return (
    <div className="base-component">
      <NavBar/>
      <CreateTaskComponent addTask={addTask}/>

      <div className="mt-3 mb-4 w-75">
        <TaskListComponent markTaskAsDone={removeFromState} tasks={tasks} handleDelete={removeFromState}/>
      </div>
    </div>
  );
}