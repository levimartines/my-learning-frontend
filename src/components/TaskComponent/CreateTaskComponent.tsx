import { Button, Form } from 'react-bootstrap';
import React, {
  FormEvent, useContext, useRef, useState,
} from 'react';
import { Task } from '../../models/task';
import { toFormattedDate } from '../../utils/DateUtils';
import TaskService from '../../services/TaskService';
import { TasksContext } from '../../store/tasks-context';

function CreateTaskComponent() {
  const tasksCtx = useContext(TasksContext);

  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const dueDateInputRef = useRef<HTMLInputElement>(null);

  const initialState = { description: '', dueDate: toFormattedDate(new Date()) };
  const [state, setState] = useState<Task>(initialState);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const task: Task = {
      dueDate: state.dueDate,
      description: descriptionInputRef.current!.value,
    };
    TaskService.save(task)
      .then((res) => {
        setState(initialState);
        tasksCtx.addTask(res.data);
      })
      .catch((err) => console.error('Error saving the Task', err));
  };

  const onChangeDueDate = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      dueDate: toFormattedDate(new Date(target.value)),
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3 mt-3" controlId="formEmail">
        <Form.Label>Description: </Form.Label>
        <Form.Control
          type="text"
          name="description"
          placeholder="Description"
          ref={descriptionInputRef}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please insert a description.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4" controlId="dueDate">
        <Form.Label>Due date: </Form.Label>
        <Form.Control
          type="date"
          name="dueDate"
          ref={dueDateInputRef}
          value={state.dueDate?.toString()}
          onChange={onChangeDueDate}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please insert a due date.
        </Form.Control.Feedback>
      </Form.Group>
      <div className="text-center justify-content-start">
        <Button variant="primary" type="submit">
          Create
        </Button>
      </div>
    </Form>
  );
}

export default CreateTaskComponent;
