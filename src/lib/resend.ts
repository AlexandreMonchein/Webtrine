import { Resend } from "resend";

export const resend = new Resend(process.env.REACT_APP_RESEND_API_KEY);
