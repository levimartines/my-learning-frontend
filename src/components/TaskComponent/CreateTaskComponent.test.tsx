import { fireEvent, render, screen } from '@testing-library/react';
import CreateTaskComponent from './CreateTaskComponent';
import TaskContextProvider from '../../store/tasks-context';
import { Task } from '../../models/task';
import axios from 'axios';
import { API_URL } from '../../constants/env-constants';
import { act } from 'react-dom/test-utils';

const testTask: Task = {
  id: 1,
  description: 'new test task',
  dueDate: '2022-12-25',
  done: false,
};

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function renderTestComponent() {
  render(<TaskContextProvider><CreateTaskComponent/></TaskContextProvider>);
}

test('should render the form', () => {
  renderTestComponent();
  const descInput = screen.getByLabelText(/Description/i);
  expect(descInput).toBeInTheDocument();
  const dateInput = screen.getByLabelText(/Due date/i);
  expect(dateInput).toBeInTheDocument();
  const button = screen.getByText(/Create/i);
  expect(button).toBeInTheDocument();
});

test('should send the request to backend when submit with a valid form', async () => {
  renderTestComponent();
  mockedAxios.post.mockResolvedValue({ data: testTask });

  fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: testTask.description } });
  fireEvent.change(screen.getByLabelText(/Due date/i), { target: { value: testTask.dueDate } });

  await act(async () => {
    fireEvent(screen.getByText(/Create/i), new MouseEvent('click'));
  });

  expect(mockedAxios.post).toHaveBeenCalledWith(`${API_URL}/tasks`, {
    description: 'new test task',
    dueDate: '2022-12-25',
  });
});
