const fs = require('fs');
const axios = require('axios');
const { google } = require('googleapis');
const key = require('./service_account.json'); // переконайся, що файл існує

// Створюємо JWT-клієнт
const jwtClient = new google.auth.JWT({
  email: key.client_email,
  key: key.private_key,
  scopes: ['https://www.googleapis.com/auth/indexing']
});

// Очищаємо URL з файлу
const urls = fs.readFileSync('urls.txt', 'utf-8')
  .split('\n')
  .map(line => line.trim().replace(/[\u200B-\u200D\uFEFF]/g, ''))
  .filter(line => line !== '');
  
(async () => {
  try {
    // Авторизуємо JWT
    const tokens = await jwtClient.authorize();

    // Генеруємо унікальний boundary для multipart
    const boundary = 'batch_' + Date.now();

    // Формуємо тіло запиту
    const body = urls.map(url => {
      return (
        `--${boundary}\n` +
        'Content-Type: application/http\n' +
        'Content-ID: <item>\n\n' +
        'POST /v3/urlNotifications:publish HTTP/1.1\n' +
        'Content-Type: application/json\n\n' +
        JSON.stringify({ url, type: 'URL_UPDATED' }) +
        '\n'
      );
    }).join('') + `--${boundary}--`;

    // Відправляємо запит
    const response = await axios.post(
      'https://indexing.googleapis.com/batch',
      body,
      {
        headers: {
          'Content-Type': `multipart/mixed; boundary=${boundary}`,
          Authorization: `Bearer ${tokens.access_token}`
        }
      }
    );

    console.log('Response:', response.data);
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
})();