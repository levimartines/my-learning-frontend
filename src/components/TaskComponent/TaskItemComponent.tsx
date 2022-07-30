import { FaCheck, FaTrash } from 'react-icons/fa';
import { FiCheck, FiTrash } from 'react-icons/fi';
import { useContext, useState } from 'react';
import TaskService from '../../services/TaskService';
import { Task } from '../../models/task';
import { TasksContext } from '../../store/tasks-context';

interface IProps {
  task: Task;
}

function TaskItemComponent({ task }: IProps) {
  const tasksCtx = useContext(TasksContext);

  const [isDoneIconHovering, setIsDoneIconHovering] = useState(false);
  const [isDeleteIconHovering, setIsDeleteIconHovering] = useState(false);

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

  function deleteIcon() {
    if (isDeleteIconHovering) {
      return (
        <FaTrash
          className="pointer"
          onClick={() => deleteTask(task.id!)}
          onMouseOut={() => setIsDeleteIconHovering(false)}
        />
      );
    }
    return <FiTrash className="pointer" onMouseOver={() => setIsDeleteIconHovering(true)}/>;
  }

  function markAsDoneIcon() {
    if (isDoneIconHovering) {
      return (
        <FaCheck
          className="pointer"
          onClick={() => markAsDone(task.id!)}
          onMouseOut={() => setIsDoneIconHovering(false)}
        />
      );
    }
    return <FiCheck className="pointer" onMouseOver={() => setIsDoneIconHovering(true)}/>;
  }

  return (
    <tr>
      <td>{task.description}</td>
      <td>{task.dueDate}</td>
      <td className="text-center">
        {markAsDoneIcon()}
      </td>
      <td className="text-center">
        {deleteIcon()}
      </td>
    </tr>
  );
}

export default TaskItemComponent;
