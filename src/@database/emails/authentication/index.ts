import { Email, email_address } from '../index';
import { AUTHENTICATION } from './template';

interface Props {
    email: string,
    url: string,
    code: string,
    host: string
};

export const SIGNUP = async (data: Props) => {
    const transporter = Email();
    const mailOptions = {
        from: `${email_address} <${email_address}>`,
        to: data.email,
        subject: "Confirm Email",
        html: AUTHENTICATION({
            des: "Confirm Email",
            url: data.url,
            host: data.host,
            code: data.code,
        })
    }
    await transporter.sendMail(mailOptions);
};

export const LOGIN = async (data: Props) => {
    const transporter = Email();

    const mailOptions = {
        from: `${email_address} <${email_address}>`,
        to: data.email,
        subject: `Magic Link ${data.code}`,
        html: AUTHENTICATION({
            des: "Login link",
            url: data.url,
            code: data.code,
            host: data.host
        })
    };
    await transporter.sendMail(mailOptions);
};