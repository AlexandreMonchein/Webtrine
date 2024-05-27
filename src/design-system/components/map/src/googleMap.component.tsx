import React, { useCallback, useState } from "react";

import { GoogleMap as Map, LoadScript, Marker } from "@react-google-maps/api";

import { Container, List, ListItem, MapWrapper } from "./googleMap.styled";

const places = [
  {
    id: 1,
    name: "Company A",
    address: "123 Main St",
    phone: "123-456-7890",
    position: { lat: 51.505, lng: -0.09 },
  },
  {
    id: 2,
    name: "Company B",
    address: "456 Broadway",
    phone: "987-654-3210",
    position: { lat: 51.515, lng: -0.1 },
  },
  {
    id: 3,
    name: "Company C",
    address: "789 Market St",
    phone: "456-789-0123",
    position: { lat: 51.525, lng: -0.08 },
  },
];

const GoogleMap = (datas) => {
  const {
    places,
    features: { activated },
  } = datas;

  if (!places.length || !activated) {
    return;
  }
  const [selectedPosition, setSelectedPosition] = useState({
    lat: places[0].position.lat,
    lng: places[0].position.lng,
  });

  const onLoad = useCallback(
    (map) => {
      map.panTo(selectedPosition);
    },
    [selectedPosition]
  );

  return (
    <Container>
      <List>
        {places.map((place) => (
          <ListItem
            key={place.id}
            onClick={() => setSelectedPosition(place.position)}
          >
            <h3>{place.name}</h3>
            <p>{place.address}</p>
            <p>{place.phone}</p>
          </ListItem>
        ))}
      </List>
      <MapWrapper>
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <Map
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={selectedPosition}
            zoom={13}
            onLoad={onLoad}
          >
            {places.map((place) => (
              <Marker key={place.id} position={place.position} />
            ))}
          </Map>
        </LoadScript>
      </MapWrapper>
    </Container>
  );
};

export default GoogleMap;
