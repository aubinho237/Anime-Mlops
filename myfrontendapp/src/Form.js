import './Form.css';
import './Prediction.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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

  const title = {
    color: "gray",
    fontSize: "50px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px #ddd ",
    justifyContent: "center",
    alignItems: "center",

  };

    return (
      <div style={styles}>
        <h1 style={title}> Anime prediction rating </h1>
        <form className="my-form">
          <div className="form-left">
            <label htmlFor="title">Title</label>
            <input id="title" type="text" />

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

          <Link to="/prediction"><button type="submit">Submit</button></Link>
        </div>
      </form>
    </div>
  );
}

export default Form;
