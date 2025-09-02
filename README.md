# google-indexing-api-bulk-projectseo

Скрипт для масової відправки URL у **Google Indexing API**.  
Дозволяє швидко повідомляти Google про оновлення чи видалення сторінок без ручного додавання у Search Console.

---

## Вимоги

- [Node.js](https://nodejs.org/en/download/) (версія 22+ рекомендована)
- Ключ сервісного акаунта Google (`service_account.json`)
- Попередньо увімкнений [Indexing API у Google Cloud](https://developers.google.com/search/apis/indexing-api/v3/prereqs)

---

## Налаштування доступу

1. Увімкни Indexing API у Google Cloud та створи **service account**.
2. Завантаж JSON-ключ і збережи його як `service_account.json` у корінь проєкту.
3. Додай email із `client_email` (у JSON) як **delegated owner** до свого сайту у Search Console.

---

## Ініціалізація проекту

```bash
node npm install
```

---

## Встановлення залежностей

Встанови потрібні пакети командою:

```bash
node npm install axios googleapis
```

---

## Використання

1. Додай URL у файл `urls.txt` (по одному в рядок).

   > Рекомендовано очистити файл від зайвих пробілів чи прихованих символів (наприклад, `\u200b`).

2. Запусти скрипт:

```bash
node index.js
```

або

```bash
node npm start
```

---

## Обмеження (Quotas)

- **До 100 URL** в одному batch-запиті.
- **200 URL на день** за замовчуванням (ліміт можна підняти через Google Cloud Console)
