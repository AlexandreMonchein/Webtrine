import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  margin: 40px 120px;
  border: 1px solid;
  height: 70vh;
`;

export const List = styled.div`
  width: 30%;
  padding: 20px;
  overflow-y: scroll;
`;

export const ListItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const MapWrapper = styled.div`
  width: 70%;
`;
