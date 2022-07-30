import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardComponent from './DashboardComponent';

function renderTestComponent() {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardComponent/>}/>
      </Routes>
    </BrowserRouter>,
  );
}

test('renders learn react link', () => {
  renderTestComponent();
  const gif = screen.getByAltText(/loading/i);
  expect(gif).toBeInTheDocument();
});
