import nodemailer from "nodemailer";

const sendEmailOtp = async (toEmail, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: toEmail,
            subject: "Your Account Verification OTP",
            text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
        });

        console.log("OTP Email Sent");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send OTP");
    }
};

export default sendEmailOtp;