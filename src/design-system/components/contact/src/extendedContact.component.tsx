/* eslint-disable import/no-named-as-default-member */
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import emailjs from "@emailjs/browser";

import { getTemplate } from "../../../../App";
import { showPopUp } from "../../../../store/state.action";
import { getClient } from "../../../../store/state.selector";
import { MapComponent } from "../../map/src/moduleLeafletMap.component";
import PopUp from "../../popup/src/popUp.component";

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

const ExtendedContact = (datas) => {
  let template;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const client = useSelector(getClient).contact;
  const location = useLocation();

  const titleKey = "contact.title";
  const descriptionKey = "contact.description";

  if (!datas || Object.keys(datas).length === 0) {
    template = getTemplate("contact", "extendedContact", "Contact").datas;
  }

  const { features, title, subTitle, map } = template ? template : datas;

  const { displayPlan = false } = features || {};

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

  const { phone, email, address, mailTemplate: templateId } = client;

  const { number, street, zip, city } = address || {};

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

    const serviceId = "service_4fc2bmb";

    try {
      await emailjs.send(serviceId, templateId, {
        ...datas,
      });
      dispatch(
        showPopUp({ type: "success", message: "Email sent corrently!" })
      );
    } catch (error) {
      dispatch(showPopUp({ type: "error", message: "Email not sent:" }));
    }
  }, []);

  return (
    <ContactSection>
      <PopUp />
      {map ? <MapComponent {...map.datas} /> : null}
      <Content>
        {title ? (
          <Title>{title}</Title>
        ) : t(titleKey) !== titleKey ? (
          <Title>{t(titleKey)}</Title>
        ) : null}
        {subTitle ? (
          <Description>{subTitle}</Description>
        ) : t(descriptionKey) !== descriptionKey ? (
          <Description>{t(descriptionKey)}</Description>
        ) : null}
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
          {displayPlan && plan && (
            <ProductDetails>
              <h2>{t("prices.planTitle")}</h2>
              <ProductInfo>
                <div>
                  <p>
                    <strong>{t("prices.title")}:</strong> {planTitle}
                  </p>
                  <p>
                    <strong>{t("prices.price")}:</strong> {planPrice}{" "}
                    {planPer ? ` / ${planPer}` : null}
                  </p>
                </div>
              </ProductInfo>
            </ProductDetails>
          )}
          <FormDisplay>
            <ClientInfo>
              <h2>{t("contact.infoTitle")}</h2>
              {number && street && zip && city ? (
                <p>
                  <strong>{t("contact.address")}:</strong> {number}{" "}
                  {`${street}, ${zip} ${city}`}
                </p>
              ) : null}

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
                type="email"
                id="email"
                name="email"
                placeholder={t("contact.emailPlaceholder")}
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                required
              />

              <label htmlFor="phone">{t("contact.phone")} *</label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                placeholder={t("contact.phonePlaceholder")}
                pattern="^\d{10}$"
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
