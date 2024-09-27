import { Card } from "./card.component";
import {
  CardWrapper,
  DisplayWrapper,
  MainColumn,
  Wrapper,
} from "./display.styled";

const Display = ({ template }) => {
  console.warn(">>> template", template);
  const {
    features: { shouldRedirect },
  } = template;

  return (
    <DisplayWrapper>
      <MainColumn>
        <Wrapper>
          {template.inventory.map((data) => (
            <CardWrapper key={data.slug}>
              <Card data={data} shouldRedirect={shouldRedirect} />
            </CardWrapper>
          ))}
        </Wrapper>
      </MainColumn>
    </DisplayWrapper>
  );
};

export default Display;
