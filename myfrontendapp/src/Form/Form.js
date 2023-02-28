import './Form.css';
import Prediction from '../Prediction/Prediction';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavBar from '../NavBar';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';


function Form() {
  const styles = {
    padding: '20px',
    margin: '10px',
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const titleStyle = {
    color: "gray",
    fontSize: "50px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px #ddd ",
    justifyContent: "center",
    alignItems: "center",

  };

  //const [title, setTitle] = useState('');

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  // new things added 
  const [title, setTitle] = useState('');
  const [genres, setGenres] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [producer, setProducer] = useState('');
  const [studio, setStudio] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // create a data object with the form data
    const data = {
      title: title,
      genres: genres,
      description: description,
      type: type,
      producer: producer,
      studio: studio
    };

    console.log(data);

    // send a POST request to the backend API
    axios.post('http://127.0.0.1:5000/api/predict', data)
      .then((response) => {
        // redirect to the prediction page with the response data
        console.log(response)
        navigate({
          pathname: '/prediction/' + data.title,
          state: { rating: response.data.rating } 
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //the tail added

    return (
      
      <div style={styles}>
    
        <h1 style={titleStyle}> Anime rating prediction </h1>
        <form onSubmit={handleSubmit} className="my-form">
          <div className="form-left">
            <label htmlFor="title">Title</label>
            <input id="title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} />

            <label htmlFor="genre">Genre(s)</label>
            <input id="genre" type="text" value={genres} onChange={(event) => setGenres(event.target.value)} />

            <label htmlFor="description">Description</label>
            <textarea id="description" rows="4" value={description} onChange={(event) => setDescription(event.target.value)}/>
          </div>

        <div className="form-right">
          <label htmlFor="type">Type</label>
          <input id="type" type="text" value={type} onChange={(event) => setType(event.target.value)} />

          <label htmlFor="producer">Producer</label>
          <input id="producer" type="text" value={producer} onChange={(event) => setProducer(event.target.value)} />

          <label htmlFor="studio">Studio</label>
          <input id="studio" type="text" value={studio} onChange={(event) => setStudio(event.target.value)}/>

         <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
