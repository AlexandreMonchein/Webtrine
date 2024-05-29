import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Product = () => {
  const location = useLocation();
  const { name, imageSrc, price, description, extraDatas } = location.state;
  const { sizes, colors } = extraDatas;

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  return (
    <Content>
      <ProductWrapper>
        <ImageWrapper>
          <ProductImage src={imageSrc} alt={name} />
        </ImageWrapper>
        <ProductInfo>
          <ProductName>{name}</ProductName>
          <ProductPrice>{`Price: $${(price / 100).toFixed(2)}`}</ProductPrice>
          <ProductDescription>{description}</ProductDescription>
          <form>
            {sizes.length > 0 ? (
              <ProductSizes>
                <label>
                  <strong>Select Size:</strong>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select size
                    </option>
                    {sizes.map((size, index) => (
                      <option key={index} value={size.size}>
                        {size.size}
                      </option>
                    ))}
                  </select>
                </label>
              </ProductSizes>
            ) : null}
            {colors.length > 0 ? (
              <ProductColors>
                <label>
                  <strong>Select Color:</strong>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select color
                    </option>
                    {colors.map((color, index) => (
                      <option key={index} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </label>
              </ProductColors>
            ) : null}

            <Link
              to={{
                pathname: "/contact",
              }}
              state={{
                name,
                imageSrc,
                price,
                description,
                selectedSize,
                selectedColor,
              }}
            >
              <ReserveButton type="button">Reserver</ReserveButton>
            </Link>
          </form>
        </ProductInfo>
      </ProductWrapper>
    </Content>
  );
};

export default Product;

// Styled-components

const Content = styled.section`
  padding: 40px 120px;
  min-height: 100vh;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 400px;
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 16px;
`;

const ProductInfo = styled.div`
  width: 100%;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
`;

const ProductName = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 16px;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  color: #e60023;
  margin-bottom: 16px;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 16px;
`;

const ProductSizes = styled.div`
  font-size: 1rem;
  color: #333;
  margin-bottom: 16px;

  select {
    margin-left: 10px;
  }
`;

const ProductColors = styled.div`
  font-size: 1rem;
  color: #333;
  margin-bottom: 16px;

  select {
    margin-left: 10px;
  }
`;

const ReserveButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
