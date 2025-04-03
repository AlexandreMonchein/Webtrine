import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import emailjs from "@emailjs/browser";

import { getTemplate } from "../../../App";
import { showPopUp } from "../../../store/state.action";
import { getClient, getTemplates } from "../../../store/state.selector";
import { MapLeaflet } from "../map/moduleLeafletMap.component";
import PopUp from "../popup/popUp.component";

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
  Field,
  Label,
  Hint,
} from "./extendedContact.styled";

const ExtendedContact = ({ datas }) => {
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
      const content = e.target.content.value || null;

      const datas = {
        name,
        company,
        emailFrom,
        number,
        content,
      };

      const serviceId = "service_4fc2bmb";

      try {
        await emailjs.send(serviceId, templateId, {
          ...datas,
        });
        dispatch(
          showPopUp({ type: "success", message: "Email envoyé avec succès !" })
        );
      } catch (error) {
        dispatch(
          showPopUp({
            type: "error",
            message: "Erreur : L'email n'a pas pu être envoyé.",
          })
        );
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
            <hr />
            <ContactForm>
              <Field>
                <Label htmlFor="name">
                  {t("contact.name")} <span>{t("contact.required")}</span>
                </Label>
                <Hint id="hint-name">{t("contact.nameHint")}</Hint>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t("contact.namePlaceholder")}
                  required
                  aria-describedby="hint-name"
                />
              </Field>
              <Field>
                <Label htmlFor="email">
                  {t("contact.email")} <span>{t("contact.required")}</span>
                </Label>
                <Hint id="hint-email">{t("contact.emailHint")}</Hint>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t("contact.emailPlaceholder")}
                  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                  required
                  aria-describedby="hint-email"
                />
              </Field>
              <Field>
                <Label htmlFor="phone">
                  {t("contact.phone")} <span>{t("contact.required")}</span>
                </Label>
                <Hint id="hint-phone">{t("contact.phoneHint")}</Hint>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder={t("contact.phonePlaceholder")}
                  pattern="^\d{10}$"
                  required
                  aria-describedby="hint-phone"
                />
              </Field>
              <Field>
                <Label htmlFor="company">{t("contact.company")}</Label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  placeholder={t("contact.companyPlaceholder")}
                />
              </Field>
              <Field>
                <Label htmlFor="content">
                  {t("contact.content")} <span>{t("contact.required")}</span>
                </Label>
                <Hint id="hint-content">{t("contact.contentHint")}</Hint>
                <Textarea
                  id="content"
                  name="content"
                  placeholder={t("contact.contentPlaceholder")}
                  required
                  aria-describedby="hint-content"
                />
              </Field>

              <Button type="submit">{t("contact.send")}</Button>
            </ContactForm>
          </FormDisplay>
        </FormContainer>
      </Content>
    </ContactSection>
  );
};

export default ExtendedContact;
