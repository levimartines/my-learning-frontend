import { Table } from 'react-bootstrap';
import TaskItemComponent from './TaskItemComponent';
import { Task } from '../../models/task';

interface IProps {
  tasks: Task[];
  markTaskAsDone: (id: number) => void;
  handleDelete: (id: number) => void;
}

function TaskListComponent({ tasks, markTaskAsDone, handleDelete }: IProps) {
  if (!tasks || tasks.length === 0) {
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
      {tasks.map(task => <TaskItemComponent handleMarkTaskAsDone={markTaskAsDone} handleDelete={handleDelete} key={task.id} task={task}/>)}
      </tbody>
    </Table>
  );
}

export default TaskListComponent;