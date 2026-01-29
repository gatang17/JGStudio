import { google } from 'googleapis';

// Crear el cliente OAuth2 **una sola vez**
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'http://localhost' // redirect URI usado para generar el refresh token
);

// Configurarlo con tu refresh token
oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

// Crear cliente Gmail
const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

// API handler
export default async function handler(req, res) {
  try {
    const result = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 5
    });

    res.status(200).json({ emails: result.data.messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error leyendo Gmail', error: err.message });
  }
}
