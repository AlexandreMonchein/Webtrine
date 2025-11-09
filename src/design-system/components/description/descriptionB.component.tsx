// DescriptionB.component.tsx
import React from "react";

import { getCustomer } from "../../../customer.utils";
import {
  Box,
  Container,
  Cta,
  Divider,
  Figure,
  Grid,
  Img,
  RightFigure,
  Section,
  VisuallyHidden,
} from "./descriptionB.styled";
import { DescriptionBProps } from "./descriptionB.types";

const Arrow = () => (
  <svg
    aria-hidden="true"
    width="28"
    height="12"
    viewBox="0 0 28 12"
    focusable="false"
  >
    <path
      d="M0 6h24m0 0L18 1m6 5-6 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const DescriptionB: React.FC<DescriptionBProps> = ({
  id,
  className,
  content,
  title,
  subTitle,
}) => {
  const customer = getCustomer();
  const sectionLabelId = id ? `${id}-label` : null;

  return (
    <Section id={id} aria-labelledby={sectionLabelId} className={className}>
      <Container>
        {title ? (
          <h2 id={sectionLabelId}>{title}</h2>
        ) : subTitle ? (
          <p id={sectionLabelId} className="sr-only">
            {subTitle}
          </p>
        ) : null}
        <Grid>
          <Figure $bleedTop>
            <Img
              src={`${import.meta.env.BASE_URL}assets/${customer}/${content.leftImage.src}.webp`}
              alt={content.leftImage.alt}
              width={content.leftImage.width}
              height={content.leftImage.height}
              loading="eager"
            />
            <Box
              $anchor="top-left"
              role="group"
              aria-labelledby={`${id}-left-title`}
            >
              <h3 id={`${id}-left-title`}>{content.leftBox.title}</h3>
              <Divider />
              <p>{content.leftBox.description}</p>
              {content.leftBox.ctaHref ? (
                <Cta
                  href={content.leftBox.ctaHref}
                  aria-label={
                    content.leftBox.ariaLabelCta
                      ? content.leftBox.ariaLabelCta
                      : content.leftBox.ctaLabel
                        ? content.leftBox.ctaLabel
                        : null
                  }
                >
                  <span>
                    {content.leftBox.ctaLabel ? content.leftBox.ctaLabel : ""}
                  </span>
                  <Arrow />
                </Cta>
              ) : null}
            </Box>
          </Figure>

          <RightFigure>
            <Img
              src={`${import.meta.env.BASE_URL}assets/${customer}/${content.rightImage.src}.webp`}
              alt={content.rightImage.alt}
              width={content.rightImage.width}
              height={content.rightImage.height}
              loading="lazy"
            />
            <Box
              $anchor="bottom-right"
              role="group"
              aria-labelledby={`${id}-right-title`}
            >
              <h3 id={`${id}-right-title`}>{content.rightBox.title}</h3>
              <Divider />
              <p>{content.rightBox.description}</p>
              {content.rightBox.ctaHref ? (
                <Cta
                  href={content.rightBox.ctaHref}
                  aria-label={
                    content.rightBox.ariaLabelCta
                      ? content.rightBox.ariaLabelCta
                      : content.rightBox.ctaLabel
                        ? content.rightBox.ctaLabel
                        : null
                  }
                >
                  <span>
                    {content.rightBox.ctaLabel ? content.rightBox.ctaLabel : ""}
                  </span>
                  <Arrow />
                </Cta>
              ) : null}
            </Box>
          </RightFigure>
        </Grid>
      </Container>
    </Section>
  );
};

export default DescriptionB;
