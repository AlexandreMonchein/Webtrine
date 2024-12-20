import { Card } from "./card.component";
import {
  CardWrapper,
  GalleryWrapper,
  MainColumn,
  Wrapper,
} from "./gallery.styled";

const Gallery = ({ template }) => {
  const {
    features: { shouldRedirect },
    type,
  } = template;

  return (
    <GalleryWrapper>
      <MainColumn>
        <Wrapper>
          {template.inventory.map((data) => (
            <CardWrapper
              key={data.slug}
              className={type && type === "logo" && "is-logo"}
            >
              <Card data={data} shouldRedirect={shouldRedirect} />
            </CardWrapper>
          ))}
        </Wrapper>
      </MainColumn>
    </GalleryWrapper>
  );
};

export default Gallery;
