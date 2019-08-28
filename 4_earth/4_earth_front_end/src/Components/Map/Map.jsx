import React, { useEffect, useState } from "react";
import L from "leaflet";
import axios from "axios";

export default function(props) {
  const [inputRefs, setInputRefs] = useState({
    latInput: undefined,
    lngInput: undefined
  });

  const [mapState, setMapState] = useState({
    latitude: 0,
    longitude: 0,
    description: "",
    pictureHtml: ""
  });

  const [myMarkers, setHasMarker] = useState({
    oldMarker: []
  });

  const [postedPollution, setPostedPolution] = useState({
    posted: false
  });

  const inputChangeHandler = event => {
    console.log("event");
    const newState = {
      ...mapState
    };
    newState[event.target.name] = event.target.value;
    setMapState(newState);
  };

  const submitHandler = event => {
    event.preventDefault();
    const url = "http://localhost:3001/campaings";
    const data = {
      latitude: mapState.latitude,
      longitude: mapState.longitude,
      pictureHtml: mapState.pictureHtml,
      description: mapState.description
    };
    axios.post(url, data).then(response => {
      setPostedPolution({ posted: true });
    });
  };

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

    function onMapClick(event) {
      const oldMarkers = {
        ...myMarkers
      };
      if (myMarkers.oldMarker.length !== 0) {
        mymap.removeLayer(myMarkers.oldMarker[0]);
        oldMarkers.oldMarker.pop();
        setHasMarker(oldMarkers);
      }
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;

      const newMapState = {
        ...mapState
      };
      newMapState.latitude = lat;
      newMapState.longitude = lng;

      setMapState(newMapState);
      // inputRefs.latInput.value = event.latlng.lat;
      // const latInputEvent = new Event("input", { bubbles: false });
      // inputRefs.latInput.dispatchEvent(latInputEvent);

      // inputRefs.lngInput.value = event.latlng.lng;
      // const lngInputEvent = new Event("input", { bubbles: true });
      // inputRefs.latInput.dispatchEvent(lngInputEvent);

      const marker = new L.Marker(new L.LatLng(lat, lng));

      oldMarkers.oldMarker.push(marker);
      setHasMarker(oldMarkers);

      mymap.addLayer(marker);

      marker.on("click", function() {
        inputRefs.latInput.value = 0;
        inputRefs.lngInput.value = 0;
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
        {postedPollution.posted ? (
          <div>Thank you</div>
        ) : (
          <div className="mapFormContainer">
            <form className="campaingForm" onSubmit={submitHandler}>
              <h3>Report a pollution!</h3>
              <label htmlFor="latitude">
                Latitude:
                <input
                  type="text"
                  name="latitude"
                  onChange={inputChangeHandler}
                  value={mapState.latitude}
                  placeholder="latitude"
                  ref={inputEl => {
                    inputRefs.latInput = inputEl;
                  }}
                />
              </label>
              <br />
              <label htmlFor="longitude">
                Longitude:
                <input
                  type="text"
                  name="longitude"
                  onChange={inputChangeHandler}
                  value={mapState.longitude}
                  placeholder="longitude"
                  ref={inputEl => {
                    inputRefs.lngInput = inputEl;
                  }}
                />
              </label>
              <br />
              <label htmlFor="pictureHtml">
                Picture:
                <input
                  type="text"
                  name="pictureHtml"
                  onChange={inputChangeHandler}
                  value={mapState.pictureHtml}
                  placeholder="picture url"
                />
              </label>
              <br />
              <label htmlFor="description">
                Short description:
                <textarea
                  name="description"
                  onChange={inputChangeHandler}
                  value={mapState.description}
                />
              </label>
              <button>Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
