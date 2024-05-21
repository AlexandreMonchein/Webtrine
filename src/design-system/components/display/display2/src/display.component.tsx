import styled from "styled-components";

import { Card } from "./card.component";

const datas = [
  {
    slug: "tech-challenge",
    name: "NikeCourt Tech Challenge 20",
    imageSrc: "https://via.placeholder.com/400",
    price: 16500,
    salePrice: null,
    // 1 hour ago! 🔥
    releaseDate: Date.now() - 1000 * 60 * 60 * 1,
    numOfColors: 2,
  },
  {
    slug: "metcon-5",
    name: "Nike Metcon 5 AMP",
    imageSrc: "https://via.placeholder.com/400",
    price: 16500,
    salePrice: null,
    releaseDate: Date.now() - 1000 * 60 * 60 * 24 * 2,
    numOfColors: 1,
  },
  {
    slug: "phantom",
    name: "Nike Phantom Vision",
    imageSrc: "https://via.placeholder.com/400",
    price: 16500,
    salePrice: null,
    releaseDate: Date.now() - 1000 * 60 * 60 * 24 * 4,
    numOfColors: 4,
  },
  {
    slug: "pegasus",
    name: "Nike Air Zoom Pegasus",
    imageSrc: "https://via.placeholder.com/400",
    price: 16500,
    salePrice: null,
    releaseDate: Date.now() - 1000 * 60 * 60 * 24 * 16,
    numOfColors: 1,
  },
  {
    slug: "joyride",
    name: "Nike Joyride Dual Run",
    imageSrc: "https://via.placeholder.com/400",
    price: 17000,
    salePrice: null,
    releaseDate: Date.now() - 1000 * 60 * 60 * 24 * 40,
    numOfColors: 2,
  },
  {
    slug: "legend-academy",
    name: "Nike Tiempo Legend 8",
    imageSrc: "https://via.placeholder.com/400",
    price: 16500,
    salePrice: 12500,
    releaseDate: Date.now() - 1000 * 60 * 60 * 24 * 50,
    numOfColors: 8,
  },
  {
    slug: "react-infinity",
    name: "Nike React Infinity Pro",
    imageSrc: "https://via.placeholder.com/400",
    price: 16000,
    salePrice: 14500,
    releaseDate: Date.now() - 1000 * 60 * 60 * 24 * 75,
    numOfColors: 1,
  },
  {
    slug: "phantom-flyknit",
    name: "Nike React Phantom Run Flyknit 2",
    imageSrc: "https://via.placeholder.com/400",
    price: 18500,
    salePrice: 16000,
    releaseDate: Date.now() - 1000 * 60 * 60 * 24 * 100,
    numOfColors: 4,
  },
  {
    slug: "lebron",
    name: "LeBron 17",
    imageSrc: "https://via.placeholder.com/400",
    price: 26000,
    salePrice: null,
    releaseDate: Date.now() - 1000 * 60 * 60 * 24 * 120,
    numOfColors: 1,
  },
];

export const Display2 = () => {
  return (
    <DisplayWrapper>
      <MainColumn>
        <Wrapper>
          {datas.map((data) => (
            <CardWrapper key={data.slug}>
              <Card {...data} />
            </CardWrapper>
          ))}
        </Wrapper>
      </MainColumn>
    </DisplayWrapper>
  );
};

const DisplayWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: baseline;
  gap: 32px;
  padding: 120px 40px;
`;

const MainColumn = styled.div`
  flex: 1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
`;

const CardWrapper = styled.div`
  min-width: 275px;
  flex: 1;
`;
