const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const cors = require("cors")
require('dotenv').config();

const app = express();
app.use(cors())

app.use(express.json());
app.use("/", router);
app.listen(3000, () => console.log("Server running"));

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/resume", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  
  const mail = {
    from: name,
    to: process.env.EMAIL_RECIPIENT,
    subject: "Contact Form Submission",
    html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>
        `,
  };
  
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});