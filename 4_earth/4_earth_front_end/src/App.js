import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Campaings from "./Components/Campaings/Campaings";
import Map from "./Components/Map/Map";
import Donations from "./Components/Donations/Donations";

function App() {
  return (
    <div className="App">
      <Header/>
      <Home />
      <Campaings />
      <Map />
      <Donations />
    </div>
  );
}

export default App;
