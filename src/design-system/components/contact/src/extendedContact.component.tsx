/* eslint-disable import/no-named-as-default-member */
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import emailjs from "@emailjs/browser";

import { getClient } from "../../../../store/state.selector";

import {
  Button,
  ClientInfo,
  ContactForm,
  ContactSection,
  Content,
  Description,
  FormContainer,
  FormDisplay,
  Input,
  ProductDetails,
  ProductInfo,
  Textarea,
  Title,
} from "./extendedContact.styled";

const ExtendedContact = () => {
  const { t } = useTranslation();
  const client = useSelector(getClient).contact;
  const location = useLocation();

  const { product, plan } = location.state || {};

  const {
    name: productName,
    imageSrc,
    price: productPrice,
    description,
    selectedSize,
    selectedColor,
  } = product || {};

  const { title: planTitle, price: planPrice, per: planPer } = plan || {};

  console.warn(">>> location.state", location.state);

  const {
    phone,
    email,
    address: { number, street, zip, city },
  } = client;

  useEffect(() => emailjs.init("OYqEmnhZaB6k1hEGB"), []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const name = e.target.name.value || null;
    const company = e.target.company.value || null;
    const emailFrom = e.target.email.value || null;
    const number = e.target.phone.value || null;
    const subject = e.target.subject.value || null;
    const content = e.target.content.value || null;

    const datas = {
      name,
      company,
      emailFrom,
      number,
      subject,
      content,
      product: product
        ? {
            productName,
            productPrice,
            imageSrc,
            description,
            selectedSize,
            selectedColor,
          }
        : null,
      plan: plan ? { planTitle, planPrice, planPer } : null,
    };

    console.warn("datas", { datas });

    const serviceId = "service_4fc2bmb";
    const templateId = "template_8b4j0fm";
    try {
      await emailjs.send(serviceId, templateId, {
        ...datas,
      });
      alert("email successfully sent check inbox");
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ContactSection>
      <Content>
        <Title>{t("contact.title")}</Title>
        <Description>{t("contact.description")}</Description>
        <FormContainer onSubmit={handleSubmit}>
          {productName && (
            <ProductDetails>
              <h2>{t("display.reservationTitle")}</h2>
              <ProductInfo>
                <img src={imageSrc} alt={productName} />
                <div>
                  <p>
                    <strong>{t("display.productName")}:</strong> {productName}
                  </p>
                  <p>
                    <strong>{t("display.price")}:</strong> {productPrice}
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
          {plan && (
            <ProductDetails>
              <h2>{t("prices.planTitle")}</h2>
              <ProductInfo>
                <div>
                  <p>
                    <strong>{t("prices.title")}:</strong> {planTitle}
                  </p>
                  <p>
                    <strong>{t("prices.price")}:</strong> {planPrice} /{" "}
                    {planPer}
                  </p>
                </div>
              </ProductInfo>
            </ProductDetails>
          )}
          <FormDisplay>
            <ClientInfo>
              <h2>{t("contact.infoTitle")}</h2>
              <p>
                <strong>{t("contact.address")}:</strong> {number}{" "}
                {`${street}, ${zip} ${city}`}
              </p>
              <p>
                <strong>{t("contact.phone")}:</strong> {phone}
              </p>
              <p>
                <strong>{t("contact.email")}:</strong> {email}
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

              <label htmlFor="email">{t("contact.email")} *</label>
              <Input
                type="text"
                id="email"
                name="email"
                placeholder={t("contact.emailPlaceholder")}
                required
              />

              <label htmlFor="phone">{t("contact.phone")} *</label>
              <Input
                type="tel"
                pattern="+[0-9]{2}[0-9]{9}"
                id="phone"
                name="phone"
                placeholder={t("contact.phonePlaceholder")}
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
          </FormDisplay>
        </FormContainer>
      </Content>
    </ContactSection>
  );
};

export default ExtendedContact;
