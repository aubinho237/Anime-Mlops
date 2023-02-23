import './App.css';
import Form from './Form';
import './App.css';

function App() {
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
    textShadow: "2px 2px 4px #ddd "

  };


  return (
    <div style={styles}>
      <h1 style = {title}>Anime rating prediction</h1>
      <Form />
    </div>
  );
}

export default App;
