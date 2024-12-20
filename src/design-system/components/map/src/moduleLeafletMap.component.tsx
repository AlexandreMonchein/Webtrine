import React, { useState } from "react";
import classNames from "classnames";
import { icon } from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import {
  BigTitle,
  Container,
  List,
  ListContainer,
  ListItem,
  ListItemText,
  ListMultipleItem,
  ListMultipleItemText,
  ListSection,
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

export const MapComponent = (datas) => {
  console.warn(">>> MapComponent", datas);
  const { features, places, openTimesTitle, openTimes, title, bigTitle } =
    datas;
  const { isSmall = false } = features || {};

  if (!places.length) {
    return;
  }

  const onePlaceOnly = places.length === 1;

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    places[0].position[0],
    places[0].position[1],
  ]);

  return (
    <Section className={classNames({ isSmall: isSmall })}>
      {bigTitle ? <BigTitle>{bigTitle}</BigTitle> : null}
      <Container className={classNames({ isSmall: isSmall })}>
        <List
          className={classNames({
            solo: onePlaceOnly,
            isSmall: isSmall,
          })}
        >
          <ListSection
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
                {places[0].address ? (
                  <ListItemText>{places[0].address}</ListItemText>
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
                      setSelectedPosition([
                        place.position[0],
                        place.position[1],
                      ])
                    }
                  >
                    {place.address ? (
                      <ListMultipleItemText>
                        {place.address}
                      </ListMultipleItemText>
                    ) : null}
                    {place.phone ? (
                      <ListMultipleItemText>{place.phone}</ListMultipleItemText>
                    ) : null}
                  </ListMultipleItem>
                ))}
              </ListWrapper>
            )}
          </ListSection>
          {openTimes ? (
            <ListSection
              className={classNames({
                solo: onePlaceOnly,
              })}
            >
              <Title>{openTimesTitle}</Title>
              <ListContainer>
                {openTimes.map((openTime, index) => (
                  <ListItem key={index}>
                    <ListItemText>{openTime.days}</ListItemText>
                    <ListItemText>{openTime.hours}</ListItemText>
                  </ListItem>
                ))}
              </ListContainer>
            </ListSection>
          ) : null}
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
