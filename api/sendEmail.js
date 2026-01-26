import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  try {
    const msg = {
      to: process.env.SENDGRID_FROM_EMAIL,    // tu correo verificado
      from: process.env.SENDGRID_FROM_EMAIL,  // tu correo verificado
      subject: `Correo de prueba de ${name}`,
      text: `Mensaje de ${email}: ${message}`,
    };

    await sgMail.send(msg);

    res.status(200).json({ message: 'Correo enviado correctamente ✅' });
  } catch (err) {
    console.error('Error enviando correo:', err.response ? err.response.body : err);
    res.status(500).json({ 
      message: 'Error enviando correo', 
      error: err.response ? err.response.body : err.message 
    });
  }
}
