import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const rawToSubjectMap = {
    "general": "General Inquiry",
    "technical": "Technical Support",
    "sales": "Sales Question",
    "feature": "Feature Request",
    "demo": "Demo",
    "other": "Other",
}

const formatSubject = (subject: string, name: string) => {
    return `[${rawToSubjectMap[subject as keyof typeof rawToSubjectMap]}] inquiry from ${name}`;
}

export async function POST(req: Request) {
    const { name, email, subject, message }: {
        name: string;
        email: string;
        subject: string;
        message: string;
    } = await req.json();


    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // STARTTLS
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

    const mailOptions = {
        from: 'inquire@studious.sh',
        to: "support@studious.sh",
        subject: formatSubject(subject, name),
        text: `Sender: ${name}\nEmail: ${email}\n\n${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return NextResponse.json({ message: "Email sent successfully" });
}