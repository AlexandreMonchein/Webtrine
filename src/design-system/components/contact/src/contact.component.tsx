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

export const Contact = () => {
  return (
    <ContactSection>
      <Content>
        <Title>Contactez-nous</Title>
        <Description>
          Si vous êtes intéressé, contactez-nous via ce formulaire.
        </Description>
        <FormContainer>
          <ContactForm>
            <label htmlFor="name">Nom:</label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Votre nom"
              required
            />

            <label htmlFor="subject">Sujet:</label>
            <Input
              type="text"
              id="subject"
              name="subject"
              placeholder="Le sujet de votre message"
              required
            />

            <label htmlFor="content">Contenu:</label>
            <Textarea
              id="content"
              name="content"
              placeholder="Votre message"
              required
            ></Textarea>

            <Button type="submit">Envoyer</Button>
          </ContactForm></FormContainer>
      </Content>
    </ContactSection>
  );
};
