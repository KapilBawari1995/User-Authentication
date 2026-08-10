// import nodemailer from "nodemailer";

// import { Resend } from "resend";

// const sendEmailOtp = async (toEmail, otp) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: process.env.EMAIL_HOST,
//             port: 587,
//             secure: false,
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: toEmail,
//             subject: "Your Account Verification OTP",
//             text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
//         });

//         console.log("OTP Email Sent");
//     } catch (error) {
//         console.log(error);
//         throw new Error("Failed to send OTP");
//     }
// };
// export default sendEmailOtp;



// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// const sendEmailOtp = async (toEmail, otp) => {
//     try {
//         await resend.emails.send({
//             from: process.env.RESEND_FROM_EMAIL,
//             to: toEmail,
//             subject: "Your Account Verification OTP",
//             text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
//         });

//         console.log("OTP Email Sent");
//     } catch (error) {
//         console.log(error);
//         throw new Error("Failed to send OTP");
//     }
// };

// export default sendEmailOtp;


import axios from "axios";

const sendEmailOtp = async (toEmail, otp) => {
    try {
        await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    email: process.env.EMAIL_USER,
                },
                to: [
                    {
                        email: toEmail,
                    },
                ],
                subject: "Your Account Verification OTP",
                textContent: `Your OTP is ${otp}. It is valid for 10 minutes.`,
            },
            {
                headers: {
                    accept: "application/json",
                    "api-key": process.env.BREVO_API_KEY,
                    "content-type": "application/json",
                },
            }
        );

        console.log("OTP Email Sent");
    } catch (error) {
        console.log(
            "BREVO ERROR:",
            error.response?.data || error.message
        );

        throw new Error("Failed to send OTP");
    }
};

export default sendEmailOtp;