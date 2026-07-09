import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_pz2fhCt6_ABjzTgEueTf54qvRscMzMmcZ");

type sendEmailProps = {
    to: string,
    subject: string,
    html: string,
}
export async function sendEmail({ to, subject, html }: sendEmailProps) {

    const res = await resend.emails.send({
        from: "TREKOMI <support@techbooth.in>",
        to,
        subject,
        html,
    });

    return res;

}