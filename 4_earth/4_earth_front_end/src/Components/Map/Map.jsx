import React, { useEffect, useState } from "react";
import L from "leaflet";

export default function(props) {
  useEffect(() => {
    const mymap = L.map("mapid").setView([10, 0], 1.5);
    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXRhbmFzb3Z0IiwiYSI6ImNqem12eng2bDA4M2Uzbm55ejdveGRobDQifQ.QPYIVyQUCZfyd_u2NNXD9Q",
      {
        attribution: "",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken:
          "pk.eyJ1IjoiYXRhbmFzb3Z0IiwiYSI6ImNqem12eng2bDA4M2Uzbm55ejdveGRobDQifQ.QPYIVyQUCZfyd_u2NNXD9Q"
      }
    ).addTo(mymap);

    function onMapClick(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      const marker = L.marker([lat, lng]).addTo(mymap);
      console.log(lat);
      marker.on("click", function() {
        mymap.removeLayer(marker);
      });
    }
    mymap.on("click", onMapClick);
  }, []);

  return (
    <div id="polutionMap" className="mapContainer">
      <h1>This is map component</h1>
      <div>
        <div className="map">
          <div id="mapid" />
        </div>
        <form className="campaingForm">
          <h3>Report a problem</h3>
          <label htmlFor="latitude">
            Latitude: <input type="text" name="latitude" />
          </label>
          <br />
          <label htmlFor="longitude">
            Longitude: <input type="text" name="longitude" />
          </label>
          <br />
          <label htmlFor="">
            Short description: <textarea />
          </label>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
