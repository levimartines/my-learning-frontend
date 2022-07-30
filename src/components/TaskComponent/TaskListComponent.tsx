import { Table } from 'react-bootstrap';
import { useContext } from 'react';
import TaskItemComponent from './TaskItemComponent';
import { TasksContext } from '../../store/tasks-context';

function TaskListComponent() {
  const tasksCtx = useContext(TasksContext);

  if (!tasksCtx.tasks || tasksCtx.tasks.length === 0) {
    return (
      <div className="mt-3 mb-3 text-center">
        No tasks registered
      </div>
    );
  }

  return (
    <Table striped bordered variant="dark">
      <thead>
      <tr>
        <th>Description</th>
        <th>Due Date</th>
        <th className="text-center">Done?</th>
        <th className="text-center">Delete?</th>
      </tr>
      </thead>
      <tbody>
      {tasksCtx.tasks.map((task) => <TaskItemComponent key={task.id} task={task}/>)}
      </tbody>
    </Table>
  );
}

export default TaskListComponent;
