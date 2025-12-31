import emailjs from "@emailjs/browser";
import DOMPurify from "dompurify";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { getCustomer } from "../../../customer.utils";
import { showPopUp } from "../../../store/state.action";
import { getClient, getSocials } from "../../../store/state.selector";
import { MapLeafletZone } from "../map/moduleLeafletZone.component";
import PopUp from "../popup/popUp.component";
import {
  Button,
  ClientInfo,
  ContactForm,
  ContactSectionWithZone,
  Content,
  Description,
  Field,
  FormContainer,
  FormDisplay,
  Hint,
  Input,
  Label,
  Logo,
  SocialLogos,
  Textarea,
  Title,
} from "./defaultContact.styled";

const componentFiles = import.meta.glob(
  "../../../assets/**/**/*.component.tsx",
);

const PetSittingContact = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const customer = getCustomer();
  const { contact, logo } = useSelector(getClient);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const socials: { [key: string]: { link: string; color: string } } =
    useSelector(getSocials);

  const { phone, email, mailTemplate: templateId } = contact;

  useEffect(() => emailjs.init("OYqEmnhZaB6k1hEGB"), []);

  useEffect(() => {
    const loadComponents = async () => {
      const loadedComponents: React.ReactNode[] = [];

      if (socials) {
        const socialEntries = Object.entries(socials);
        const componentPromises = socialEntries.map(
          async ([name, { link }]) => {
            try {
              if (link) {
                const componentPath = `../../../assets/icons/${name}.component.tsx`;
                const module = componentFiles[componentPath];

                if (module) {
                  const resolvedModule = await module();
                  // @ts-expect-error TODO: to fix
                  const Component = resolvedModule.default;

                  return (
                    <a key={name} aria-label={name} href={link}>
                      <Component color="full" />
                    </a>
                  );
                }
              }
              return null;
            } catch (error) {
              console.error(`Error loading component: ${name}`, error);
              return null;
            }
          },
        );

        const resolvedComponents = await Promise.all(componentPromises);
        loadedComponents.push(...resolvedComponents.filter(Boolean));
      }

      setComponents(loadedComponents);
    };

    loadComponents();
  }, [socials]);

  const [firstVisitDate, setFirstVisitDate] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Empêcher les soumissions multiples
      if (isSubmitting) return;

      setIsSubmitting(true);

      const firstName = e.target.firstName.value || null;
      const lastName = e.target.lastName.value || null;
      const emailFrom = e.target.email.value || null;
      const number = e.target.phone.value || null;
      const address = e.target.address.value || null;
      const firstVisit = e.target.firstVisitDate.value || null;
      const lastVisit = e.target.lastVisitDate.value || null;
      const preVisitDateTime = e.target.preVisitDateTime.value || null;
      const howKnown = e.target.howKnown.value || null;
      const visitFrequency = e.target.visitFrequency.value || null;
      const petType = e.target.petType.value || null;
      const additionalInfo = e.target.additionalInfo.value || null;
      const reply_to = e.target.email.value || null;

      const datas = {
        firstName,
        lastName,
        emailFrom,
        number,
        address,
        firstVisit,
        lastVisit,
        preVisitDateTime,
        howKnown,
        visitFrequency,
        petType,
        additionalInfo,
        reply_to,
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
        setFirstVisitDate("");
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
    [isSubmitting, templateId, dispatch, t],
  );

  const title = t("contact.title");
  const subTitle = t("contact.description");

  return (
    <ContactSectionWithZone>
      <PopUp />
      <Content>
        {title ? <Title>{title}</Title> : null}
        {subTitle ? (
          <Description
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(subTitle),
            }}
          />
        ) : null}
        <FormContainer onSubmit={handleSubmit}>
          <FormDisplay>
            <ClientInfo>
              <Logo
                src={`${import.meta.env.BASE_URL}assets/${customer}/icons/${logo}.webp`}
                alt={`logo entreprise ${logo}`}
              />
              <h2>{t("contact.infoTitle")}</h2>
              <p>
                <strong>{t("contact.phone")}:</strong> {phone}
              </p>
              <p>
                <strong>{t("contact.email")}:</strong> {email}
              </p>

              {socials && components.length > 0 ? (
                <div>
                  <p>
                    <strong>{t("contact.socials")}:</strong>
                  </p>
                  <SocialLogos>{components}</SocialLogos>
                </div>
              ) : null}

              <MapLeafletZone />
            </ClientInfo>
            <hr />
            <ContactForm>
              <Field>
                <Label htmlFor="firstName">
                  {t("contact.firstName")}{" "}
                  <span aria-label={t("contact.requiredAriaLabel")}>*</span>
                </Label>
                <Hint id="hint-firstName">{t("contact.firstNameHint")}</Hint>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder={t("contact.firstNamePlaceholder")}
                  required
                  aria-required="true"
                  aria-describedby="hint-firstName"
                  aria-label={t("contact.firstNameAriaLabel")}
                />
              </Field>

              <Field>
                <Label htmlFor="lastName">
                  {t("contact.lastName")}{" "}
                  <span aria-label={t("contact.requiredAriaLabel")}>*</span>
                </Label>
                <Hint id="hint-lastName">{t("contact.lastNameHint")}</Hint>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder={t("contact.lastNamePlaceholder")}
                  required
                  aria-required="true"
                  aria-describedby="hint-lastName"
                  aria-label={t("contact.lastNameAriaLabel")}
                />
              </Field>

              <Field>
                <Label htmlFor="email">
                  {t("contact.emailLabel")}{" "}
                  <span aria-label={t("contact.requiredAriaLabel")}>*</span>
                </Label>
                <Hint id="hint-email">{t("contact.emailHintFormat")}</Hint>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t("contact.emailPlaceholder")}
                  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                  required
                  aria-required="true"
                  aria-describedby="hint-email"
                  aria-label={t("contact.emailAriaLabel")}
                />
              </Field>

              <Field>
                <Label htmlFor="phone">
                  {t("contact.phoneLabel")}{" "}
                  <span aria-label={t("contact.requiredAriaLabel")}>*</span>
                </Label>
                <Hint id="hint-phone">{t("contact.phoneHintFormat")}</Hint>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder={t("contact.phonePlaceholder")}
                  pattern="^0[1-9]\d{8}$"
                  required
                  aria-required="true"
                  aria-describedby="hint-phone"
                  aria-label={t("contact.phoneAriaLabel")}
                />
              </Field>

              <Field>
                <Label htmlFor="address">
                  {t("contact.address")}{" "}
                  <span aria-label={t("contact.requiredAriaLabel")}>*</span>
                </Label>
                <Hint id="hint-address">{t("contact.addressHint")}</Hint>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  placeholder={t("contact.addressPlaceholder")}
                  required
                  aria-required="true"
                  aria-describedby="hint-address"
                  aria-label={t("contact.addressAriaLabel")}
                />
              </Field>

              <Field>
                <Label htmlFor="firstVisitDate">
                  {t("contact.firstVisitDate")}{" "}
                  <span aria-label={t("contact.requiredAriaLabel")}>*</span>
                </Label>
                <Hint id="hint-firstVisitDate">
                  {t("contact.firstVisitDateHint")}
                </Hint>
                <Input
                  type="date"
                  id="firstVisitDate"
                  name="firstVisitDate"
                  min={new Date().toISOString().split("T")[0]}
                  required
                  aria-required="true"
                  aria-describedby="hint-firstVisitDate"
                  aria-label={t("contact.firstVisitDateAriaLabel")}
                  value={firstVisitDate}
                  onChange={(e) => setFirstVisitDate(e.target.value)}
                />
              </Field>

              <div>
                <Field>
                  <Label htmlFor="lastVisitDate">
                    {t("contact.lastVisitDate")}{" "}
                    <span aria-label={t("contact.requiredAriaLabel")}>*</span>
                  </Label>
                  <Hint id="hint-lastVisitDate">
                    {t("contact.lastVisitDateHint")}
                  </Hint>
                  <Input
                    type="date"
                    id="lastVisitDate"
                    name="lastVisitDate"
                    min={
                      firstVisitDate || new Date().toISOString().split("T")[0]
                    }
                    required
                    aria-required="true"
                    aria-describedby="hint-lastVisitDate"
                    aria-label={t("contact.lastVisitDateAriaLabel")}
                  />
                </Field>

                <Field>
                  <Label htmlFor="preVisitDateTime">
                    {t("contact.preVisitDateTime")}{" "}
                    <span aria-label={t("contact.requiredAriaLabel")}>*</span>
                  </Label>
                  <Hint id="hint-preVisitDateTime">
                    {t("contact.preVisitDateTimeHint")}
                  </Hint>
                  <Input
                    type="datetime-local"
                    id="preVisitDateTime"
                    name="preVisitDateTime"
                    min={new Date().toISOString().slice(0, 16)}
                    required
                    aria-required="true"
                    aria-describedby="hint-preVisitDateTime"
                    aria-label={t("contact.preVisitDateTimeAriaLabel")}
                  />
                </Field>
              </div>

              <Field>
                <Label htmlFor="howKnown">
                  {t("contact.howKnown")}{" "}
                  <span aria-label={t("contact.requiredAriaLabel")}>*</span>
                </Label>
                <Hint id="hint-howKnown">{t("contact.howKnownHint")}</Hint>
                <Input
                  as="select"
                  id="howKnown"
                  name="howKnown"
                  required
                  aria-required="true"
                  aria-describedby="hint-howKnown"
                  aria-label={t("contact.howKnownAriaLabel")}
                >
                  <option value="">{t("contact.howKnownSelectOption")}</option>
                  <option value="reseaux-sociaux">
                    {t("contact.howKnownSocial")}
                  </option>
                  <option value="bouche-a-oreille">
                    {t("contact.howKnownWordOfMouth")}
                  </option>
                  <option value="recherche-internet">
                    {t("contact.howKnownInternet")}
                  </option>
                  <option value="flyer">{t("contact.howKnownFlyer")}</option>
                  <option value="autre">{t("contact.howKnownOther")}</option>
                </Input>
              </Field>

              <Field>
                <Label htmlFor="visitFrequency">
                  {t("contact.visitFrequency")}{" "}
                  <span aria-label={t("contact.requiredAriaLabel")}>*</span>
                </Label>
                <Hint id="hint-visitFrequency">
                  {t("contact.visitFrequencyHint")}
                </Hint>
                <Input
                  as="select"
                  id="visitFrequency"
                  name="visitFrequency"
                  required
                  aria-required="true"
                  aria-describedby="hint-visitFrequency"
                  aria-label={t("contact.visitFrequencyAriaLabel")}
                >
                  <option value="">{t("contact.howKnownSelectOption")}</option>
                  <option value="1-par-jour">
                    {t("contact.visitFrequency1PerDay")}
                  </option>
                  <option value="2-par-jour">
                    {t("contact.visitFrequency2PerDay")}
                  </option>
                </Input>
              </Field>

              <Field>
                <Label htmlFor="petType">
                  {t("contact.petType")}{" "}
                  <span aria-label={t("contact.requiredAriaLabel")}>*</span>
                </Label>
                <Hint id="hint-petType">{t("contact.petTypeHint")}</Hint>
                <Input
                  as="select"
                  id="petType"
                  name="petType"
                  required
                  aria-required="true"
                  aria-describedby="hint-petType"
                  aria-label={t("contact.petTypeAriaLabel")}
                >
                  <option value="">{t("contact.howKnownSelectOption")}</option>
                  <option value="chien">{t("contact.petTypeDog")}</option>
                  <option value="chat">{t("contact.petTypeCat")}</option>
                  <option value="nac">{t("contact.petTypeNac")}</option>
                  <option value="plusieurs">
                    {t("contact.petTypeMultiple")}
                  </option>
                </Input>
              </Field>

              <Field>
                <Label htmlFor="additionalInfo">
                  {t("contact.additionalInfo")}
                </Label>
                <Hint id="hint-additionalInfo">
                  {t("contact.additionalInfoHint")}
                </Hint>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  placeholder={t("contact.additionalInfoPlaceholder")}
                  aria-describedby="hint-additionalInfo"
                  aria-label={t("contact.additionalInfoAriaLabel")}
                />
              </Field>

              <Button type="submit" disabled={isSubmitting} aria-live="polite">
                {isSubmitting
                  ? t("contact.submitting")
                  : t("contact.submitButton")}
              </Button>
            </ContactForm>
          </FormDisplay>
        </FormContainer>
      </Content>
    </ContactSectionWithZone>
  );
};

export default PetSittingContact;
