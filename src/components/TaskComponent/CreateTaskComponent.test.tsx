import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CreateTaskComponent from './CreateTaskComponent';
import TaskContextProvider from '../../store/tasks-context';

function renderTestComponent() {
  render(<TaskContextProvider><CreateTaskComponent/></TaskContextProvider>);
}

test('renders learn react link', () => {
  renderTestComponent();
  const descInput = screen.getByPlaceholderText(/Description/i);
  fireEvent.change(descInput, { target: { value: 'test task' } });

  // const descInput = screen.getByTy(/Description/i);
  fireEvent.change(descInput, { target: { value: 'test task' } });
});
