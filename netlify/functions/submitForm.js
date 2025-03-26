const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    const { team, email, attachment } = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com', // your email here
        pass: 'your-email-password',  // your email password
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: 'recipient-email@gmail.com',  // recipient email address
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
