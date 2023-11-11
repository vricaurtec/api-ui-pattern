import "./App.css";
import React, { useState, useEffect } from "react";
import { Carousel, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SlideShow = () => {
  const [catFacts, setCatFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    // Fetch cat facts from the API
    const fetchCatFacts = async () => {
      try {
        const response = await fetch("https://catfact.ninja/facts?limit=5");
        const data = await response.json();
        setCatFacts(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cat facts:", error);
        setIsLoading(false);
      }
    };

    fetchCatFacts();
  }, []);

  if (isLoading) {
    return (
      <div className="load">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {catFacts.map((fact, i) => (
        <Carousel.Item key={i}>
          <img
            className="pic"
            src={`https://placekitten.com/900/400?image=${i + 1}`}
            alt={`Slide ${i + 1}`}
          />
          <Carousel.Caption>
            <h3>Did you know?</h3>
            <p>{fact.fact}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Cat Fact Slideshow</h1>
      <SlideShow />
    </div>
  );
}

export default App;
