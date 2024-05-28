import React, { useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import {
  Container,
  List,
  ListItem,
  MapWrapper,
  Section,
} from "./leafletMap.styled";

import "leaflet/dist/leaflet.css";

const FlyToLocation = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  map.flyTo(position, 13);
  return null;
};

const MapComponent = (datas) => {
  const { places } = datas;

  if (!places.length) {
    return;
  }

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    places[0].position[0],
    places[0].position[1],
  ]);

  console.warn(">>> datas", datas);

  return (
    <Section>
      <Container>
        <List>
          {places.map((place) => (
            <ListItem
              key={place.id}
              onClick={() =>
                setSelectedPosition([place.position[0], place.position[1]])
              }
            >
              <h3>{place.name}</h3>
              <p>{place.address}</p>
              <p>{place.phone}</p>
            </ListItem>
          ))}
        </List>
        <MapWrapper>
          <MapContainer
            center={selectedPosition}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {places.map((place) => (
              <Marker
                key={place.id}
                position={[place.position[0], place.position[1]]}
              >
                {/* Add popups or other marker features here if needed */}
              </Marker>
            ))}
            <FlyToLocation
              position={[selectedPosition[0], selectedPosition[1]]}
            />
          </MapContainer>
        </MapWrapper>
      </Container>
    </Section>
  );
};

export default MapComponent;
