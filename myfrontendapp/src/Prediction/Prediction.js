import React from 'react';
import './Prediction.css';
import NavBar from '../NavBar';

const Prediction = () => {
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
        fontSize: "40px",
        fontWeight: "bold",
        textShadow: "2px 2px 4px #ddd ",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    
      };

      const text = {
        color: "black",
        fontSize: "30px",
        fontWeight: "bold",
        textShadow: "2px 2px 4px #ddd ",
        justifyContent: "center",
        alignItems: "center",
    
      };

  return (
    <div style={styles}>
      <div>
        <div style={title}> Rating prediction of One Piece  </div>

      </div>
      <h1  className='my-prediction'> 70% </h1>
    </div>
  );
};

export default Prediction;