import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ message: 'Method Not Allowed' }));
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) {}
  } else if (!body) {
    return new Promise((resolve) => {
      let data = '';
      req.on('data', chunk => { data += chunk; });
      req.on('end', async () => {
        try { body = JSON.parse(data); } catch (e) { body = {}; }
        await handleContact(body, res, resolve);
      });
    });
  }

  return await handleContact(body, res, () => {});
}

async function handleContact(body, res, resolve) {
  const { name, email, message } = body || {};
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
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: "Inquiry received and email sent successfully!" }));
  } catch (error) {
    console.error("Error sending email:", error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: "Failed to send email." }));
  }
  resolve();
}
