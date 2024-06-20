"use server";

import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const mockDatas = {
  name: "John Doe",
  company: "Doe & Co",
  subject: "Product reservation",
  content:
    "Hi\n\nI would like to reserve this product\nPlease contact me back\n\nBest Regards",
  product: {
    productName: "Product Name",
    price: "1000€",
    description: "Product Description",
    selectedSize: "M",
    selectedColor: "Red",
  },
};

const ContactMail = (datas) => {
  const contactDetails = datas.length ? datas : mockDatas;

  const {
    name,
    company,
    subject,
    content,
    product: {
      productName,
      price,
      description,
      imageSrc,
      selectedSize,
      selectedColor,
    },
  } = contactDetails;

  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
            },
          },
        },
      }}
    >
      <Html>
        <Head />
        <Preview>{subject}</Preview>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-5 px-0 max-w-lg w-full">
            {productName ? (
              <div>
                <Section className="bg-gray-50 text-gray-800 rounded-md text-xs border-collapse border-spacing-0 mt-7 mb-4 h-6">
                  <Text className="bg-gray-50 px-3 text-sm font-medium m-0">
                    {name} aimerais réserver un produit:
                  </Text>
                </Section>
                <Section>
                  <Row>
                    <Column className="w-16">
                      <Img
                        src=""
                        width="64"
                        height="64"
                        alt="HBO Max"
                        className="m-0 ml-5 rounded-lg border border-gray-300"
                      />
                    </Column>
                    <Column className="pl-5.5">
                      <Text className="text-xs font-semibold m-0">
                        {productName}
                      </Text>
                      <Text className="text-xs text-gray-400 m-0">
                        {description}
                      </Text>
                      {selectedColor ? (
                        <Text className="text-xs text-gray-400 m-0">
                          Couleur: {selectedColor}
                        </Text>
                      ) : null}
                      {selectedSize ? (
                        <Text className="text-xs text-gray-400 m-0">
                          Taille: {selectedSize}
                        </Text>
                      ) : null}
                    </Column>

                    {price ? (
                      <Column className="table-cell pr-5 w-25 align-top text-right">
                        <Text className="text-xs font-semibold m-0">
                          {price}
                        </Text>
                      </Column>
                    ) : null}
                  </Row>
                </Section>
              </div>
            ) : null}

            <Section className="bg-gray-50 text-gray-800 rounded-md text-xs border-collapse border-spacing-0 mt-7 mb-4 h-6">
              <Text className="bg-gray-50 px-3 text-sm font-medium m-0">
                Contenu du mail:
              </Text>
            </Section>
            <Section>
              <Row>
                <Column className="pl-5.5">
                  <div className="flex flex-row pb-1">
                    <Text className="text-xs font-semibold m-0">
                      Nom: &nbsp;
                    </Text>
                    <Text className="text-xs text-gray-400 m-0">{name}</Text>
                  </div>

                  <div className="flex flex-row pb-1">
                    <Text className="text-xs font-semibold m-0">
                      Entreprise: &nbsp;
                    </Text>
                    <Text className="text-xs text-gray-400 m-0">{company}</Text>
                  </div>
                  <div className="flex flex-row pb-1">
                    <Text className="text-xs font-semibold m-0">
                      Sujet: &nbsp;
                    </Text>
                    <Text className="text-xs text-gray-400 m-0">{subject}</Text>
                  </div>
                  <Text className="text-xs font-semibold m-0">
                    Contenu du mail: &nbsp;
                  </Text>
                  <Text className="text-xs text-gray-400 m-0 pt-1 whitespace-pre-line">
                    {content}
                  </Text>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default ContactMail;
