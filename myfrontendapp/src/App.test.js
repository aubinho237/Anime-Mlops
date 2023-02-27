import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Form from './Form/Form';
import React from 'react';
import Prediction from './Prediction/Prediction';
import userEvent from '@testing-library/user-event';
import { BrowserRouter} from 'react-router-dom';
import { Routes ,Route } from 'react-router-dom';

test('renders the form', () => {
  render(
    <MemoryRouter>
      <Form />
    </MemoryRouter>
  );
  const formElement = screen.getByText('Submit');
  expect(formElement).toBeInTheDocument();
});

describe('Form', () => {
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

  it('submits the form data when the submit button is clicked', () => {
    const handleSubmit = jest.fn();
    render(<Form onSubmit={handleSubmit} />, { wrapper: MemoryRouter });

    const titleInput = screen.getByLabelText('Title');
    const genreInput = screen.getByLabelText('Genre(s)');
    const descriptionInput = screen.getByLabelText('Description');
    const typeInput = screen.getByLabelText('Type');
    const producerInput = screen.getByLabelText('Producer');
    const studioInput = screen.getByLabelText('Studio');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(titleInput, { target: { value: 'Test title' } });
    fireEvent.change(genreInput, { target: { value: 'Test genre' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
    fireEvent.change(typeInput, { target: { value: 'Test type' } });
    fireEvent.change(producerInput, { target: { value: 'Test producer' } });
    fireEvent.change(studioInput, { target: { value: 'Test studio' } });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Test title',
      genre: 'Test genre',
      description: 'Test description',
      type: 'Test type',
      producer: 'Test producer',
      studio: 'Test studio',
    });
  });
});

describe('Prediction component', () => {
  it('renders title and rating', () => {
    const { getByText } = render(<Prediction />);
    const titleElement = getByText(/Rating prediction of One Piece/i);
    const ratingElement = getByText('70%');

    expect(titleElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();
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

test('submits the form and navigates to the prediction page', async () => {
  const { getByLabelText, getByText, queryByText } = render(
    <BrowserRouter>
        <Form />
        <Routes>
          <Route path="/prediction">
          <Prediction />
          </Route>
        </Routes>
        
      </BrowserRouter>
  );

  // Fill out form inputs
  fireEvent.change(getByLabelText('Title'), { target: { value: 'One Piece' } });
  fireEvent.change(getByLabelText('Genre(s)'), { target: { value: 'Action, Adventure, Comedy' } });
  fireEvent.change(getByLabelText('Description'), { target: { value: 'A pirate adventure like no other!' } });
  fireEvent.change(getByLabelText('Type'), { target: { value: 'TV' } });
  fireEvent.change(getByLabelText('Producer'), { target: { value: 'Toei Animation' } });
  fireEvent.change(getByLabelText('Studio'), { target: { value: 'Toei Animation' } });

  // Submit the form
  fireEvent.click(getByText('Submit'));

  // Wait for the prediction page to render
  await waitFor(() => expect(queryByText('Rating prediction of One Piece')).toBeInTheDocument());

  // Assert that we have successfully navigated to the prediction page
  expect(queryByText('Rating prediction of One Piece')).toBeInTheDocument();
  expect(queryByText('70%')).toBeInTheDocument();
});



