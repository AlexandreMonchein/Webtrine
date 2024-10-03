import React, { useState } from "react";
import classNames from "classnames";
import { icon } from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListMultipleItem,
  ListMultipleItemText,
  ListWrapper,
  MapWrapper,
  Section,
  Title,
} from "./leafletMap.styled";

import "leaflet/dist/leaflet.css";

const FlyToLocation = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  map.flyTo(position, 13);
  return null;
};

const ICON = icon({
  iconUrl: "./marker_icon.png",
  iconSize: [32, 32],
});

const MapComponent = (datas) => {
  const { places, title } = datas;

  if (!places.length) {
    return;
  }

  const onePlaceOnly = places.length === 1;

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    places[0].position[0],
    places[0].position[1],
  ]);

  return (
    <Section>
      <Container>
        <List
          className={classNames({
            solo: onePlaceOnly,
          })}
        >
          <Title
            className={classNames({
              solo: onePlaceOnly,
            })}
          >
            {title}
          </Title>
          {onePlaceOnly ? (
            <ListItem
              key={places[0].id}
              onClick={() =>
                setSelectedPosition([
                  places[0].position[0],
                  places[0].position[1],
                ])
              }
            >
              {places[0].name ? (
                <ListItemText>{places[0].name}</ListItemText>
              ) : null}
              {places[0].address ? (
                <ListItemText>{places[0].address}</ListItemText>
              ) : null}
              {places[0].mail ? (
                <ListItemText>{places[0].mail}</ListItemText>
              ) : null}
              {places[0].phone ? (
                <ListItemText>{places[0].phone}</ListItemText>
              ) : null}
            </ListItem>
          ) : (
            <ListWrapper>
              {places.map((place) => (
                <ListMultipleItem
                  key={place.id}
                  onClick={() =>
                    setSelectedPosition([place.position[0], place.position[1]])
                  }
                >
                  {place.name ? (
                    <ListMultipleItemText>{place.name}</ListMultipleItemText>
                  ) : null}
                  {place.address ? (
                    <ListMultipleItemText>{place.address}</ListMultipleItemText>
                  ) : null}
                  {place.mail ? (
                    <ListMultipleItemText>{place.mail}</ListMultipleItemText>
                  ) : null}
                  {place.phone ? (
                    <ListMultipleItemText>{place.phone}</ListMultipleItemText>
                  ) : null}
                </ListMultipleItem>
              ))}
            </ListWrapper>
          )}
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
                icon={ICON}
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
