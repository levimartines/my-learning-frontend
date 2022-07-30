import { useContext } from 'react';
import TaskService from '../../services/TaskService';
import { Task } from '../../models/task';
import { TasksContext } from '../../store/tasks-context';
import DeleteIcon from '../DeleteIcon/DeleteIcon';
import CompleteIcon from '../CompleteIcon/CompleteIcon';

interface IProps {
  task: Task;
}

function TaskItemComponent({ task }: IProps) {
  const tasksCtx = useContext(TasksContext);

  const markAsDone = (id: number) => {
    TaskService.markAsDone(id)
      .then(() => tasksCtx.removeTask(id))
      .catch((err) => console.error(`Error finishing task ${id}`, err));
  };

  const deleteTask = (id: number) => {
    TaskService.delete(id)
      .then(() => tasksCtx.removeTask(id))
      .catch((err) => console.error(`Error finishing task ${id}`, err));
  };

  return (
    <tr>
      <td>{task.description}</td>
      <td>{task.dueDate}</td>
      <td className="text-center">
        <CompleteIcon click={() => markAsDone(task.id!)}/>
      </td>
      <td className="text-center">
        <DeleteIcon click={() => deleteTask(task.id!)}/>
      </td>
    </tr>
  );
}

export default TaskItemComponent;
