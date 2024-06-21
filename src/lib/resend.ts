import { Resend } from "resend";

import ContactMail from "../design-system/emails/src/basicEmail.component";

export const resend = new Resend(process.env.REACT_APP_RESEND_API_KEY);

export const sendEmail = async (datas) => {
  try {
    await resend.emails.send({
      from: "alexandre.monschein@gmail.com",
      to: "contact@webtrine.fr",
      subject: datas.subject,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${resend.key}`,
      },
      react: ContactMail(datas),
    });
  } catch (e) {
    console.warn(">>> error", e);
  }
};
