import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "zafarak2038@gmail.com",
    pass: "joacbtbyesjsvbtv",
  },
});

export const sendUserDetailOnMail = async (user) => {
  const mailOptions = {
    from: {
      name: "Zafar Ali Khan",
      address: process.env.ADMIN_EMAIL,
    },
    to: user.email,
    subject: "Welcome To Online Exam Portal",
    text: `Hi ${user.name},\n\nThank you for registering at Online Exam Portal. We are excited to have you on board!\n\nBest regards,\nYour Online Exam Portal Team`,
    html: `<p>Hi ${user.name},</p><p>Thank you for registering at <strong>Online Exam Portal</strong>. We are excited to have you on board!</p><p>Best regards,<br>Online Exam Portal</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Registration email sent successfully");
  } catch (error) {
    console.error("Failed to send registration email:", error);
    throw new Error("Failed to send registration email");
  }
};


export const sendTestSubmissionDetails = async (user, testTitle, score) => {
  const mailOptions = {
    from: {
      name: "Zafar Ali Khan",
      address: process.env.ADMIN_EMAIL,
    },
    to: user.email,
    subject: "Test Submitted Successfully",
    text: `Hi ${user.name},\n\nYou have successfully submitted the test "${testTitle}".\n\nYour Score: ${score}\n\nBest regards,\nYour Online Exam Portal Team`,
    html: `<p>Hi ${user.name},</p><p>You have successfully submitted the test <strong>${testTitle}</strong>.</p><p>Your Score: <strong>${score}</strong></p><p>Best regards,<br>Online Exam Portal</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Test submission email sent successfully");
  } catch (error) {
    console.error("Failed to send test submission email:", error);
    throw new Error("Failed to send test submission email");
  }
};
