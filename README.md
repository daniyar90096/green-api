# GREEN-API Test Page

Тестовая HTML-страница для работы с методами GREEN-API.

## Реализованные методы

- **getSettings** — получение настроек инстанса
- **getStateInstance** — получение состояния инстанса
- **sendMessage** — отправка текстового сообщения
- **sendFileByUrl** — отправка файла по URL

## Структура проекта

```
green-api-project/
├── index.html      # HTML-разметка страницы
├── styles.css      # Стили оформления
├── app.js          # Логика вызовов GREEN-API
└── README.md       # Документация
```

## Запуск локально

1. Скачайте все файлы из репозитория.
2. Откройте `index.html` в любом современном браузере.

Либо используйте локальный сервер:

```bash
# Через Python
python -m http.server 8000

# Через Node.js (http-server)
npx http-server
```

Затем откройте `http://localhost:8000` в браузере.

## Использование

1. Войдите в личный кабинет [GREEN-API](https://console.green-api.com/) и создайте новый инстанс на бесплатном аккаунте разработчика.
2. Отсканируйте QR-код и подключите свой номер телефона к инстансу.
3. Откройте страницу в браузере и введите параметры подключения:
   - **idInstance**
   - **ApiTokenInstance**
4. Нажимайте на кнопки методов API:
   - `getSettings` — выводит настройки инстанса.
   - `getStateInstance` — выводит текущее состояние инстанса.
   - `sendMessage` — введите номер телефона получателя (формат: `79001234567`) и текст сообщения, затем нажмите кнопку.
   - `sendFileByUrl` — введите номер телефона, URL файла и имя файла, затем нажмите кнопку.
5. Ответы методов появятся в правой части страницы в поле «Ответ» (только для чтения).

## Публикация на GitHub Pages

1. Создайте репозиторий на GitHub и закоммитьте файлы.
2. Перейдите в Settings → Pages.
3. В разделе Source выберите ветку `main` и папку `/ (root)`.
4. Сохраните изменения — страница станет доступна по адресу `https://<username>.github.io/<repo-name>/`.

## Технологии

- HTML5
- CSS3
- Vanilla JavaScript (без зависимостей)
- GREEN-API REST API

## Документация GREEN-API

- [Официальная документация](https://green-api.com/docs/)
- [getSettings](https://green-api.com/docs/api/account/GetSettings/)
- [getStateInstance](https://green-api.com/docs/api/account/GetStateInstance/)
- [sendMessage](https://green-api.com/docs/api/sending/SendMessage/)
- [sendFileByUrl](https://green-api.com/docs/api/sending/SendFileByUrl/)
