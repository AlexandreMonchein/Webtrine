import emailjs from "@emailjs/browser";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { showPopUp } from "../../../store/state.action";
import { getClient } from "../../../store/state.selector";
import { MapLeaflet } from "../map/moduleLeafletMap.component";
import PopUp from "../popup/popUp.component";
import {
  Button,
  ClientInfo,
  ContactForm,
  ContactSection,
  Content,
  Description,
  Field,
  FormContainer,
  FormDisplay,
  Hint,
  Input,
  Label,
  Spacer,
  Textarea,
  Title,
} from "./defaultContact.styled";

const DefaultContact = ({ datas }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const client = useSelector(getClient).contact;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { map } = datas || {};

  const { phone, email, mailTemplate: templateId } = client;

  useEffect(() => emailjs.init("OYqEmnhZaB6k1hEGB"), []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Empêcher les soumissions multiples
      if (isSubmitting) return;

      setIsSubmitting(true);

      const name = e.target.name.value || null;
      const company = e.target.company.value || null;
      const emailFrom = e.target.email.value || null;
      const number = e.target.phone.value || null;
      const content = e.target.content.value || null;
      const replyTo = email || "webtrine.pro@gmail.com";

      const datas = {
        name,
        company,
        emailFrom,
        number,
        content,
        replyTo,
      };

      const serviceId = "service_4fc2bmb";

      try {
        await emailjs.send(serviceId, templateId, {
          ...datas,
        });
        dispatch(
          showPopUp({
            type: "success",
            message: t("contact.emailSentSuccess"),
          }),
        );

        e.target.reset();
      } catch (error) {
        dispatch(
          showPopUp({
            type: "error",
            message: t("contact.emailSentError"),
          }),
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, email, templateId, dispatch, t],
  );

  const title = t("contact.title");
  const subTitle = t("contact.description");

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
        {title ? <Title>{title}</Title> : null}
        {subTitle ? <Description>{subTitle}</Description> : null}
        <FormContainer onSubmit={handleSubmit}>
          <FormDisplay>
            <ClientInfo>
              <h2>{t("contact.infoTitle")}</h2>
              <p>
                <strong>{t("contact.phone")}:</strong> {phone}
              </p>
              <p>
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
                <Hint id="hint-company">{t("contact.companyHint")}</Hint>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  placeholder={t("contact.companyPlaceholder")}
                  aria-describedby="hint-company"
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

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t("contact.sending") : t("contact.send")}
              </Button>
            </ContactForm>
          </FormDisplay>
        </FormContainer>
      </Content>
    </ContactSection>
  );
};

export default DefaultContact;
