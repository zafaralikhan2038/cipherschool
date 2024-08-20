import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "alphax.team.07@gmail.com",
    pass: "jshzxmbcgclaqlpk",
  },
});

export const sendUserDetailOnMail = async (user) => {
  const mailOptions = {
    from: {
      name: "Zafar Ali Khan",
      address: process.env.ADMIN_EMAIL,
    },
    to: user.email,
    subject: "Welcome To Online Test Portal",
    text: `Hi ${user.name},\n\nThank you for registering at Online Test Portal. We are excited to have you on board!\n\nBest regards,\nYour App Team`,
    html: `<p>Hi ${user.name},</p><p>Thank you for registering at <strong>Online Test Portal</strong>. We are excited to have you on board!</p><p>Best regards,<br>Online Test Portal</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Registration email sent successfully");
  } catch (error) {
    console.error("Failed to send registration email:", error);
    throw new Error("Failed to send registration email");
  }
};
