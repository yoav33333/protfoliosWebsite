const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    const { team, email, attachment } = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ftc.megiddo@gmail.com', // your email here
        pass: 'MegiddoLions_12797',  // your email password
      },
    });

    const mailOptions = {
      from: 'ftc.megiddo@gmail.com',
      to: 'yoav.2009.goren@gmail.com',  // recipient email address
      subject: 'New Portfolio Submission',
      text: `Team: ${team}\nEmail: ${email}\nAttachment: ${attachment}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Form submitted successfully!' }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error sending email.' }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
};
