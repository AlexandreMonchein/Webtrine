/* eslint-disable import/no-named-as-default-member */
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import emailjs from "@emailjs/browser";

import { getTemplate } from "../../../../App";
import { showPopUp } from "../../../../store/state.action";
import { getClient, getTemplates } from "../../../../store/state.selector";
import { MapLeaflet } from "../../map/src/moduleLeafletMap.component";
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
  Spacer,
  Textarea,
  Title,
} from "./extendedContact.styled";

const ExtendedContact = (datas) => {
  let template;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const client = useSelector(getClient).contact;
  const templates = useSelector(getTemplates);

  const titleKey = "contact.title";
  const descriptionKey = "contact.description";

  if (!datas || Object.keys(datas).length === 0) {
    template = getTemplate(
      templates,
      "contact",
      "extendedContact",
      "Contact"
    ).datas;
  }

  const { title, subTitle, map } = template ? template : datas;

  const { phone, email, mailTemplate: templateId } = client;

  useEffect(() => emailjs.init("OYqEmnhZaB6k1hEGB"), []);

  const handleSubmit = useCallback(
    async (e) => {
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
    },
    [dispatch, templateId]
  );

  return (
    <ContactSection>
      <PopUp />
      {map ? (
        <>
          <MapLeaflet {...map.datas} />
          <Spacer />
        </>
      ) : null}
      <Content>
        {title ? (
          <Title tabIndex={0}>{title}</Title>
        ) : t(titleKey) !== titleKey ? (
          <Title tabIndex={0}>{t(titleKey)}</Title>
        ) : null}
        {subTitle ? (
          <Description tabIndex={0}>{subTitle}</Description>
        ) : t(descriptionKey) !== descriptionKey ? (
          <Description tabIndex={0}>{t(descriptionKey)}</Description>
        ) : null}
        <FormContainer onSubmit={handleSubmit}>
          <FormDisplay>
            <ClientInfo>
              <h2 tabIndex={0}>{t("contact.infoTitle")}</h2>
              <p tabIndex={0}>
                <strong>{t("contact.phone")}:</strong> {phone}
              </p>
              <p tabIndex={0}>
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
