import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import {
  Button,
  ClientInfo,
  ContactForm,
  ContactSection,
  Content,
  Description,
  FormContainer,
  Input,
  ProductDetails,
  ProductInfo,
  Textarea,
  Title,
} from "./extendedContact.styled";

const ExtendedContact = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { name, imageSrc, price, description, selectedSize, selectedColor } =
    location.state || {};

  const client = {
    name: "webtrine",
    contact: {
      address: {
        street: "Rue des Veloutiers",
        number: 227,
        zip: 69530,
        city: "Orlienas",
        country: "France",
      },
      phone: "+33614612295",
      email: "webtrine.pro@gmail.com",
    },
  };

  return (
    <ContactSection>
      <Content>
        <Title>{t("contact.title")}</Title>
        <Description>{t("contact.description")}</Description>
        {name && (
          <ProductDetails>
            <h2>Reservation Details</h2>
            <ProductInfo>
              <img src={imageSrc} alt={name} />
              <div>
                <p>
                  <strong>{t("display.productName")}:</strong> {name}
                </p>
                <p>
                  <strong>{t("display.price")}:</strong> {price}
                </p>
                <p>
                  <strong>{t("display.description")}:</strong> {description}
                </p>
                <p>
                  <strong>{t("display.selectedSize")}:</strong>{" "}
                  {selectedSize || "N/A"}
                </p>
                <p>
                  <strong>{t("display.selectedColor")}:</strong>{" "}
                  {selectedColor || "N/A"}
                </p>
              </div>
            </ProductInfo>
          </ProductDetails>
        )}
        <FormContainer>
          <ClientInfo>
            <h2>Contact Information</h2>
            <p>
              <strong>Address:</strong> {client.contact.address.number}{" "}
              {`${client.contact.address.street}, ${client.contact.address.zip} ${client.contact.address.city}, ${client.contact.address.country}`}
            </p>
            <p>
              <strong>Phone:</strong> {client.contact.phone}
            </p>
            <p>
              <strong>Email:</strong> {client.contact.email}
            </p>
          </ClientInfo>
          <ContactForm>
            <label htmlFor="name">{t("contact.name")} *</label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder={t("contact.namePlaceholder")}
              required
            />

            <label htmlFor="company">{t("contact.company")}</label>
            <Input
              type="text"
              id="company"
              name="company"
              placeholder={t("contact.companyPlaceholder")}
            />

            <label htmlFor="subject">{t("contact.subject")} *</label>
            <Input
              type="text"
              id="subject"
              name="subject"
              placeholder={t("contact.subjectPlaceholder")}
              required
            />

            <label htmlFor="content">{t("contact.content")} *</label>
            <Textarea
              id="content"
              name="content"
              placeholder={t("contact.contentPlaceholder")}
              required
            ></Textarea>

            <Button type="submit">{t("contact.send")}</Button>
          </ContactForm>
        </FormContainer>
      </Content>
    </ContactSection>
  );
};

export default ExtendedContact;
