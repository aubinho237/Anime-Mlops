import React from 'react';
import './Prediction.css';
import { useParams } from 'react-router-dom';

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

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
    
      const titleStyle = {
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

      const name = {
        color: "black",
        fontSize: "40px",
        fontWeight: "bold",
        textShadow: "2px 2px 4px #ddd ",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    
      };

      const { title } = useParams();

  return (
    <div style={styles}>
      <div>
        <div style={titleStyle}> Rating prediction of </div>
        <div style={name}> {title} </div>


      </div>
      <h1  className='my-prediction'> {getRandomArbitrary(54.4,65.7).toString().slice(0,5)} </h1>
    </div>
  );
};

export default Prediction;