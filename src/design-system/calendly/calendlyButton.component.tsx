import { useCalendlyEventListener } from "react-calendly";
import { useTranslation } from "react-i18next";
import { CalendlyButton as CalendlyButtonStyle } from "./calendlyButton.styled";

const CalendlyButton = ({ url }) => {
  const { t } = useTranslation();

  useCalendlyEventListener({
    onDateAndTimeSelected: () => console.warn(">>> onDateAndTimeSelected"),
    onEventTypeViewed: () => console.warn(">>> onEventTypeViewed"),
    onEventScheduled: (e) =>
      console.warn(">>> onEventScheduled", e.data.payload),
  });

  return (
    <CalendlyButtonStyle
      url={url}
      rootElement={document.getElementById("root")}
      text={t("calendly.buttonText")}
    />
  );
};

export default CalendlyButton;
