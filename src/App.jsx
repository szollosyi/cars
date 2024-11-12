import './App.css';
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

export const App=() => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("https://cars.sulla.hu/cars", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        // Beállítjuk az autó adatokat
        setCars(data);
      })
      .catch(error => {
        console.error("Hiba történt az adatok betöltésekor:", error);
      });
  }, []);

  return (
    <Row>
      {cars.map(car => (
        <Col md={4} key={car.id}>
          <Card className="mb-4">
            {/* A base64 kép közvetlen megjelenítése */}
            <Card.Img
              variant="top"
              src={`data:image/jpeg;base64,${car.car_picture}`}
              alt={`${car.car_name} kép`}
            />
            <Card.Body>
              <Card.Title>{car.car_name}</Card.Title>
              <Card.Text>
                <strong>Szín:</strong> {car.car_color} <br />
                <strong>Azonosító:</strong> {car.id}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
