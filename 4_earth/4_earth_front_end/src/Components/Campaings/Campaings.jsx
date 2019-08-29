import React, { useEffect, useState } from "react";
import L from "leaflet";
import axios from "axios";

export default function() {
  const [campaingState, setCampaingState] = useState({
    latitude: null,
    longitude: null,
    description: null,
    pictureHtml: null
  });

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
    const url = "http://localhost:3001/campaings";

    axios.get(url).then(result => {
      result.data.forEach(campaing => {
        const marker = L.marker([campaing.latitude, campaing.longitude]).addTo(
          mymap
        );
        marker.on("click", function() {
          const newCampaingState = {
            ...campaingState
          };
          newCampaingState.latitude = campaing.latitude;
          newCampaingState.longitude = campaing.longitude;
          newCampaingState.description = campaing.description;
          newCampaingState.pictureHtml = campaing.pictureHtml;
          setCampaingState(newCampaingState);
        });
      });
    });
  }, []);

  useEffect(() => {}, [campaingState]);
  return (
    <div id="campaings" className="campaingsContainer">
      <h1>See where our planet needs YOU!</h1>
      <div>
        <div className="campaingsMap">
          <div id="campaingMap" />
        </div>
        <div className="campaingInfo">
          <img src={campaingState.pictureHtml} />
          <div>
            {campaingState.longitude ? (
              <div>
                <p>Description of the problem: {campaingState.description}</p>
                <p>
                  Just look at that mess! Plese if you can help dealing whit
                  that you can enter theese coordinates on your GPS (
                  {campaingState.latitude},{campaingState.longitude}) and we'll
                  wait for you there. You can always help 4 Earth by clicking{" "}
                  <a className="donationsAnker" href="#donationsContainer">
                    HERE
                  </a>{" "}
                  and donating some money so that we can continue the war
                  against the world pollution!
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
