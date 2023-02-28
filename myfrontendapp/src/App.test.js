import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Form from './Form/Form';
import React from 'react';
import Prediction from './Prediction/Prediction';
import userEvent from '@testing-library/user-event';
import { BrowserRouter} from 'react-router-dom';
import { Routes ,Route } from 'react-router-dom';
import App from './App/App';
import { Router } from 'react-router-dom';

test('renders the form', () => {
  render(
    <MemoryRouter>
      <Form />
    </MemoryRouter>
  );
  const formElement = screen.getByText('Submit');
  expect(formElement).toBeInTheDocument();
});

test('renders Prediction component for "/prediction/:title" path', () => {
  render(
    <MemoryRouter>
      <Prediction />
  </MemoryRouter>
  );
  const predictionElement = screen.getByText('Rating prediction of');
  expect(predictionElement).toBeInTheDocument();
});

describe('Form', () => {
  it('renders the form', () => {
    render(
      <MemoryRouter>
        <Form />
    </MemoryRouter>
    );

    const titleInput = screen.getByLabelText('Title');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    expect(titleInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it('renders the title and form inputs', () => {
    render(<Form />, { wrapper: MemoryRouter });
    expect(screen.getByText('Anime rating prediction')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Genre(s)')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Producer')).toBeInTheDocument();
    expect(screen.getByLabelText('Studio')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('Form updates input values when user types in input fields', () => {
    render(<Form />, { wrapper: MemoryRouter });
    const titleInput = screen.getByLabelText('Title');
    const genreInput = screen.getByLabelText('Genre(s)');
    const descriptionInput = screen.getByLabelText('Description');
    const typeInput = screen.getByLabelText('Type');
    const producerInput = screen.getByLabelText('Producer');
    const studioInput = screen.getByLabelText('Studio');
  
    fireEvent.change(titleInput, { target: { value: 'test title' } });
    fireEvent.change(genreInput, { target: { value: 'test genre' } });
    fireEvent.change(descriptionInput, { target: { value: 'test description' } });
    fireEvent.change(typeInput, { target: { value: 'test type' } });
    fireEvent.change(producerInput, { target: { value: 'test producer' } });
    fireEvent.change(studioInput, { target: { value: 'test studio' } });
  
    expect(titleInput.value).toBe('test title');
    expect(genreInput.value).toBe('test genre');
    expect(descriptionInput.value).toBe('test description');
    expect(typeInput.value).toBe('test type');
    expect(producerInput.value).toBe('test producer');
    expect(studioInput.value).toBe('test studio');
  });


  
});

describe('Prediction component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Prediction />);
    expect(getByText('Rating prediction of')).toBeInTheDocument();
  });

  it('displays the title', () => {
    const { getByText } = render(<Prediction />);
    expect(getByText('70%')).toBeInTheDocument();
  });

  it('renders with correct styles', () => {
    const { container } = render(<Prediction />);
    const styles = container.firstChild.style;

    expect(styles.padding).toEqual('20px');
    expect(styles.margin).toEqual('10px');
    expect(styles.display).toEqual('flex');
    expect(styles.width).toEqual('100%');
    expect(styles.flexDirection).toEqual('column');
    expect(styles.justifyContent).toEqual('center');
    expect(styles.alignItems).toEqual('center');
    
    const ratingStyles = container.firstChild.lastChild.className;

    expect(ratingStyles).toEqual('my-prediction');
  });
});






