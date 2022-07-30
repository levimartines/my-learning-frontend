import { getAllByRole, render, screen, fireEvent } from '@testing-library/react';
import TaskContextProvider from '../../store/tasks-context';
import { Task } from '../../models/task';
import axios from 'axios';
import TaskItemComponent from './TaskItemComponent';
import { act } from 'react-dom/test-utils';
import { API_URL } from '../../constants/env-constants';

const testTask: Task = {
  id: 1,
  description: 'new test task',
  dueDate: '2022-12-25',
  done: false,
};

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function renderTestComponent() {
  return render(<TaskContextProvider>
    <table>
      <tbody><TaskItemComponent task={testTask}/></tbody>
    </table>
  </TaskContextProvider>);
}

test('should render the component', () => {
  const { container } = renderTestComponent();
  let cellList = getAllByRole(container, 'cell');
  expect(cellList.length).toBe(4);

  expect(screen.getByText(/new test task/i)).toBeInTheDocument();
  expect(screen.getByText(/2022-12-25/i)).toBeInTheDocument();
});

test.skip('should mark as completed when click in done', async () => {
  mockedAxios.put.mockResolvedValue({ status: 201 });
  renderTestComponent();

  let icon = screen.getByLabelText('mark as done');
  await act(async () => {
    fireEvent(icon, new MouseEvent('click'));
  });

  expect(mockedAxios.put).toHaveBeenCalledWith(`${API_URL}/tasks/done/` + testTask.id);
});

