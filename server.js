
import express from 'express';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// 1. Database Connection (Resilient - won't crash server if DB is missing)
const MONGODB_URI = 'mongodb://127.0.0.1:27017/portfolio';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('\x1b[32m%s\x1b[0m', '📁 DATABASE: CONNECTED'))
  .catch(() => console.log('\x1b[33m%s\x1b[0m', '📁 DATABASE: OFFLINE (Local MongoDB not detected)'));

const Message = mongoose.model('Message', new mongoose.Schema({
  name: String,
  email: String,
  reason: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
}));

// 2. Email Configuration
const MY_GMAIL = 'shaswatshaswat620@gmail.com';
const APP_PASSWORD = 'txgw zmhu wlgj swyw'.replace(/\s/g, ''); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MY_GMAIL,
    pass: APP_PASSWORD
  }
});

// 3. Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'online', timestamp: new Date() });
});

// 4. Contact Form Handler
app.post('/api/contact', async (req, res) => {
  const { name, email, reason, message } = req.body;
  
  console.log(`\n\x1b[36m--- NEW TRANSMISSION RECEIVED ---\x1b[0m`);
  console.log(`FROM: ${name} (${email})`);
  console.log(`MISSION: ${reason}`);

  try {
    // Save to Database (if connected)
    const entry = new Message({ name, email, reason, message });
    await entry.save().catch(err => console.log('⚠️ DB Save Skipped:', err.message));

    // Send Email
    const mailOptions = {
      from: `"Portfolio Portal" <${MY_GMAIL}>`,
      to: MY_GMAIL,
      replyTo: email,
      subject: `🚀 INCOMING: ${name} - ${reason}`,
      html: `
        <div style="background: #050505; color: #ffffff; padding: 40px; font-family: sans-serif; border-radius: 20px; border: 1px solid #1a1a1a;">
          <h1 style="color: #00f2ff; font-size: 24px; border-bottom: 1px solid #222; padding-bottom: 15px;">New Message from Portfolio</h1>
          <p style="font-size: 16px; margin: 20px 0;"><strong>Sender:</strong> ${name}</p>
          <p style="font-size: 16px; margin: 10px 0;"><strong>Email:</strong> ${email}</p>
          <p style="font-size: 16px; margin: 10px 0;"><strong>Reason:</strong> ${reason}</p>
          <div style="background: #111; padding: 25px; border-radius: 12px; border-left: 4px solid #00f2ff; margin: 25px 0;">
            <p style="line-height: 1.6; color: #ccc;">${message}</p>
          </div>
          <p style="color: #444; font-size: 10px; text-transform: uppercase; letter-spacing: 2px;">Secured by Shaswat Neural Node</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('\x1b[32m%s\x1b[0m', '✅ TRANSMISSION DELIVERED TO GMAIL');
    res.status(200).json({ success: true });

  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ TRANSMISSION FAILED:', error.message);
    res.status(500).json({ success: false, details: error.message });
  }
});

// 5. Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.clear();
  console.log('\x1b[36m%s\x1b[0m', '===============================================');
  console.log('\x1b[36m%s\x1b[0m', '   SHASWAT PORTFOLIO BACKEND | v2.0-STABLE     ');
  console.log('\x1b[36m%s\x1b[0m', '===============================================');
  console.log(`\n🟢 STATUS: ONLINE`);
  console.log(`📍 ADDRESS: http://127.0.0.1:${PORT}`);
  console.log(`📩 TARGET: ${MY_GMAIL}`);
  console.log(`\n\x1b[33m%s\x1b[0m`, '👉 KEEP THIS WINDOW OPEN TO RECEIVE MESSAGES');
  console.log('\x1b[36m%s\x1b[0m', '-----------------------------------------------\n');
});
