import './Form.css';
import Prediction from '../Prediction/Prediction';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavBar from '../NavBar';
import { useState } from 'react';

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

  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

    return (
      
      <div style={styles}>
    
        <h1 style={titleStyle}> Anime rating prediction </h1>
        <form onSubmit={handleSubmit} className="my-form">
          <div className="form-left">
            <label htmlFor="title">Title</label>
            <input id="title" type="text" value={title} onChange={handleTitleChange} />

            <label htmlFor="genre">Genre(s)</label>
            <input id="genre" type="text" />

            <label htmlFor="description">Description</label>
            <textarea id="description" rows="4" />
          </div>

        <div className="form-right">
          <label htmlFor="type">Type</label>
          <input id="type" type="text" />

          <label htmlFor="producer">Producer</label>
          <input id="producer" type="text" />

          <label htmlFor="studio">Studio</label>
          <input id="studio" type="text" />

          <Link to={`/prediction/${title}`}><button type="submit">Submit</button></Link>
        </div>
      </form>
    </div>
  );
}

export default Form;
