const path = require('path');
const mailer = require('nodemailer');
const email_tamplate = require('./email_tamplate');
require('dotenv').config();

const EMAIL = process.env.EMAIL;
const PASS_KEY = process.env.PASS_KEY;

async function send_mail(req, res) {
    const { company_email, company_name , Position} = req.body;

    const transporter = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: EMAIL,
            pass: PASS_KEY
        },
        from: EMAIL,
    })
    
    const filePath = path.join(__dirname, '..','public', 'Ankit_FullStack_2-Years.pdf');
    console.log('File path:', filePath);


    const mail_options = {
        from: EMAIL,
        to: company_email,
        subject: `'Application for ${Position}`,
        text: email_tamplate(company_name, Position),
        attachments: [{
            filename: "Ankit_tiwari_FullStack_2_Years.pdf",
            path: filePath,
            contentType: 'application/pdf'
        }]
    }

    try {
        const info = await transporter.sendMail(mail_options);
        console.log('Email Sent: ' + info.response);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email: ', error);
        res.status(500).send('Error sending mail: ');
    }
}

module.exports = {send_mail};