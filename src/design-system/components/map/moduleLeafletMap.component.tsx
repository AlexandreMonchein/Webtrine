import "leaflet/dist/leaflet.css";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";

import { icon } from "leaflet";
import { GestureHandling } from "leaflet-gesture-handling";
import { ReactElement, useState } from "react";
import { Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";

import {
  BigTitle,
  Container,
  List,
  ListContainer,
  ListItem,
  ListItemText,
  ListSection,
  MapContainer,
  Section,
  Title,
} from "./leafletMap.styled";

const ICON = icon({
  iconUrl: "./assets/marker_icon.webp",
  iconSize: [32, 32],
});

export const MapLeaflet = (datas): ReactElement | null => {
  const { places, openTimesTitle, openTimes, title, bigTitle } = datas;

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    places.length ? places[0].position[0] : 0,
    places.length ? places[0].position[1] : 0,
  ]);

  const [init, setInit] = useState<boolean>(true);

  if (!places.length) {
    return null;
  }

  // const onClickMarker = (id) => {
  //   // TODO: handle click on marker
  // };
  const zoom = 13;

  const LocationMarker = () => {
    const map = useMapEvents({
      locationfound(e) {
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return null;
  };
  const GestureHandlingSetter = () => {
    const map = useMap() as any;
    map.gestureHandling.enable();
    map.addHandler("gestureHandling", GestureHandling);
    setInit(false);
    return null;
  };

  return (
    <Section>
      {bigTitle ? <BigTitle tabIndex={0}>{bigTitle}</BigTitle> : null}
      <Container>
        <List>
          <ListSection>
            <Title tabIndex={0}>{title}</Title>
            <ListItem
              key={places[0].id}
              onClick={() => {
                setSelectedPosition([
                  places[0].position[0],
                  places[0].position[1],
                ]);
              }}
            >
              {places[0].address ? (
                <ListItemText tabIndex={0}>{places[0].address}</ListItemText>
              ) : null}
              {places[0].phone ? (
                <ListItemText tabIndex={0}>{places[0].phone}</ListItemText>
              ) : null}
            </ListItem>
          </ListSection>
          {openTimes ? (
            <ListSection>
              <Title tabIndex={0}>{openTimesTitle}</Title>
              <ListContainer>
                {openTimes.map((openTime) => (
                  <ListItem
                    tabIndex={0}
                    key={`${openTime.days}-${openTime.hours}`}
                  >
                    <ListItemText>{openTime.days}</ListItemText>
                    <ListItemText>{openTime.hours}</ListItemText>
                  </ListItem>
                ))}
              </ListContainer>
            </ListSection>
          ) : null}
        </List>
        <MapContainer
          id="map-id"
          center={selectedPosition}
          zoom={zoom}
          scrollWheelZoom={false}
          doubleClickZoom={true}
          minZoom={2}
          preferCanvas={false}
          whenCreated={() => console.warn(">>> Map Created")}
          whenReady={() => console.warn(">>> Map Ready")}
        >
          <TileLayer
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            noWrap={true}
          />
          {places.map((place) => (
            <Marker
              key={`marker_contact_list_${place.id}`}
              position={place.position}
              icon={ICON}
              // eventHandlers={{
              //   click: () => {
              //     onClickMarker(place.id);
              //   },
              // }}
            />
          ))}
          <LocationMarker />
          {init && <GestureHandlingSetter />}
        </MapContainer>
      </Container>
    </Section>
  );
};
