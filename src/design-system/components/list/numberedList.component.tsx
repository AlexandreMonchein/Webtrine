import React from "react";
import {
  ListContainer,
  ListItem,
  NumberCircle,
  Content,
  Title,
  Description,
  Section,
  BigTitle,
} from "./numberedList.styled";

export interface ListItemProps {
  title: string;
  description: string;
}

export interface ListProps {
  content: ListItemProps[];
  title: string;
}

const NumberedList: React.FC<ListProps> = (props) => {
  const { content, title } = props;

  return (
    <Section>
      {title && <BigTitle tabIndex={0}>{title}</BigTitle>}
      <ListContainer>
        {content.map((item, index) => (
          <ListItem
            key={index}
            tabIndex={0}
            aria-labelledby={`title-${index}`}
            aria-describedby={`description-${index}`}
          >
            <NumberCircle>{index + 1}</NumberCircle>
            <Content>
              <Title id={`title-${index}`}>{item.title}</Title>
              <Description id={`description-${index}`}>
                {item.description}
              </Description>
            </Content>
          </ListItem>
        ))}
      </ListContainer>
    </Section>
  );
};

export default NumberedList;
