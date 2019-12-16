import React from "react";
import Card from 'react-bootstrap/Card';

export default function GalleryView(props) {
  return (
      <Card style={{ width: "15rem", height: "15rem",float: "left" }}>
        <Card.Img variant="top" src="https://img.icons8.com/ios/2x/user.png" />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            {props.text}
          </Card.Text>          
        </Card.Body>
      </Card> 
  );
}