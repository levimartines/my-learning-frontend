import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders learn react link', () => {
  const { container } = render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>,
  );
  const divApp = container.getElementsByClassName('App');
  expect(divApp.length).toBe(1);
});
