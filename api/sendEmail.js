import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  try {
    const msg = {
      to: process.env.SENDGRID_FROM_EMAIL,  // tu correo
      from: process.env.SENDGRID_FROM_EMAIL, // desde tu correo también
      subject: `Correo de prueba de ${name}`,
      text: `Mensaje de ${email}: ${message}`,
    };

    await sgMail.send(msg);

    res.status(200).json({ message: 'Correo enviado correctamente ✅' });
  } catch (err) {
    console.error('Error enviando correo:', err);
    res.status(500).json({ message: 'Error enviando correo' });
  }
}
