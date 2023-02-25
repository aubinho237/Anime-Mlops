// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Form from '../Form/Form';

test('renders the form', () => {
  render(
    <MemoryRouter>
      <Form />
    </MemoryRouter>
  );
  const formElement = screen.getByText('Submit');
  expect(formElement).toBeInTheDocument();
});