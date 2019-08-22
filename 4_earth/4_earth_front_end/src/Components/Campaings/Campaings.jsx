import React, { useEffect } from "react";
import L from "leaflet";

export default function() {
  useEffect(() => {
    const mymap = L.map("campaingMap", { scrollWheelZoom: false }).setView(
      [10, 0],
      1.5
    );
    mymap.on("focus", function() {
      mymap.scrollWheelZoom.enable();
    });
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
    }
    mymap.on("click", onMapClick);
  }, []);
  return (
    <div id="campaings" className="campaingsContainer">
      <div>
        <h1>This is campaings component</h1>
      </div>
      <div id="campaingMap" />
    </div>
  );
}
