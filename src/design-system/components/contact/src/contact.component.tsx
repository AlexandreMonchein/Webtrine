import { useTranslation } from "react-i18next";

import {
  Button,
  ContactForm,
  ContactSection,
  Content,
  Description,
  FormContainer,
  Input,
  Textarea,
  Title,
} from "./contact.styled";

const Contact = ({ datas }) => {
  const { t } = useTranslation();

  return (
    <ContactSection>
      <Content>
        <Title>{t("contact.title")}</Title>
        <Description>{t("contact.description")}</Description>
        <FormContainer>
          <ContactForm>
            <label htmlFor="name">{t("contact.name")} *</label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder={t("contact.namePlaceholder")}
              required
            />

            <label htmlFor="subject">{t("contact.company")}</label>
            <Input
              type="text"
              id="subject"
              name="subject"
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

export default Contact;
