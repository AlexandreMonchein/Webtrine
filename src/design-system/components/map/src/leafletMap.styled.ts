import { MapContainer as LeafletMapContainer } from "react-leaflet";
import styled, { css } from "styled-components";

import { bp } from "../../../../breakpoint";
import { breakpointNames } from "../../../../breakpointDef";

export const Section = styled.section`
  box-sizing: border-box;
  color: var(--text-color-secondary);
  position: relative;
  z-index: var(--z-index-text);
`;

export const BigTitle = styled.h2`
  color: var(--title-color-2);
`;

export const Container = styled.div`
  display: flex;
  gap: 32px;
  height: 70vh;

  ${bp.max(
    breakpointNames.medium,
    css`
      flex-direction: column;
      width: 100%;
      height: 100vh;
      gap: 32px;
    `
  )}
`;

export const List = styled.div`
  width: 50%;
  display: flex;
  overflow-y: scroll;
  overflow-x: scroll;
  align-content: center;
  flex-wrap: wrap;

  ${bp.max(
    breakpointNames.medium,
    css`
      display: flex;
      width: auto;
      height: 50%;
      flex-direction: row;
      flex-wrap: nowrap;
    `
  )}

  ${bp.max(
    breakpointNames.small,
    css`
      flex-direction: column;
      height: 80%;
    `
  )}
`;

export const ListSection = styled.div`
  /* height: 50%; */
  width: 100%;

  ${bp.min(
    breakpointNames.large,
    css`
      overflow-y: scroll;
      align-content: center;
    `
  )}
`;

export const Title = styled.h2`
  color: var(--title-color-2);
  text-align: center;
`;

export const ListItem = styled.div``;

export const ListItemText = styled.p`
  text-align: center;
  margin: 0;
`;

export const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MapContainer = styled(LeafletMapContainer)`
  width: 100%;
  height: 100%;
`;
