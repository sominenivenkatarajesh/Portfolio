import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body || {};
  console.log(`New Inquiry: ${name} (${email}): ${message}`);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sominenivenkatarajesh@gmail.com',
      pass: 'cofo hilt sioa rgkd'
    }
  });

  const mailOptions = {
    from: email,
    to: 'sominenivenkatarajesh@gmail.com',
    subject: `Portfolio Contact: Message from ${name}`,
    text: `You have received a new message from your portfolio website contact form.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Inquiry received and email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
}
