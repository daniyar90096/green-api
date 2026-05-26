const API_BASE_URL = 'https://api.green-api.com';

const elements = {
    idInstance: document.getElementById('idInstance'),
    apiTokenInstance: document.getElementById('apiTokenInstance'),
    btnToggleTokenVisibility: document.getElementById('btnToggleTokenVisibility'),
    phoneMessage: document.getElementById('phoneMessage'),
    messageText: document.getElementById('messageText'),
    phoneFile: document.getElementById('phoneFile'),
    fileUrl: document.getElementById('fileUrl'),
    responseField: document.getElementById('responseField'),
    btnGetSettings: document.getElementById('btnGetSettings'),
    btnGetStateInstance: document.getElementById('btnGetStateInstance'),
    btnSendMessage: document.getElementById('btnSendMessage'),
    btnSendFileByUrl: document.getElementById('btnSendFileByUrl'),
    btnClearResponse: document.getElementById('btnClearResponse'),
};

function showResponse(methodName, data, isError = false) {
    const timestamp = new Date().toLocaleString('ru-RU');
    const status = isError ? 'ОШИБКА' : 'УСПЕХ';
    const formattedData = typeof data === 'object'
        ? JSON.stringify(data, null, 2)
        : String(data);

    const output = `=== ${methodName} | ${timestamp} | ${status} ===\n${formattedData}\n\n`;
    elements.responseField.value = output + elements.responseField.value;
}

function validateCredentials() {
    const idInstance = elements.idInstance.value.trim();
    const apiTokenInstance = elements.apiTokenInstance.value.trim();

    if (!idInstance || !apiTokenInstance) {
        alert('Пожалуйста, заполните idInstance и ApiTokenInstance');
        return null;
    }

    return { idInstance, apiTokenInstance };
}

function formatChatId(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return `${cleaned}@c.us`;
}

function generateFileName() {
    const timestamp = Date.now();
    return `file-${timestamp}.jpg`;
}

async function apiRequest(method, endpoint, body = null) {
    const credentials = validateCredentials();
    if (!credentials) return;

    const { idInstance, apiTokenInstance } = credentials;
    const url = `${API_BASE_URL}/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`;

    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            showResponse(endpoint, {
                status: response.status,
                statusText: response.statusText,
                data,
            }, true);
            return;
        }

        showResponse(endpoint, data);
    } catch (error) {
        showResponse(endpoint, `Ошибка запроса: ${error.message}`, true);
    }
}

async function getSettings() {
    await apiRequest('GET', 'getSettings');
}

async function getStateInstance() {
    await apiRequest('GET', 'getStateInstance');
}

async function sendMessage() {
    const phone = elements.phoneMessage.value.trim();
    const message = elements.messageText.value.trim();

    if (!phone || !message) {
        alert('Введите номер телефона и текст сообщения');
        return;
    }

    await apiRequest('POST', 'sendMessage', {
        chatId: formatChatId(phone),
        message,
    });
}

async function sendFileByUrl() {
    const phone = elements.phoneFile.value.trim();
    const urlFile = elements.fileUrl.value.trim();

    if (!phone || !urlFile) {
        alert('Заполните номер телефона и URL файла');
        return;
    }

    await apiRequest('POST', 'sendFileByUrl', {
        chatId: formatChatId(phone),
        urlFile,
        fileName: generateFileName(),
    });
}

function clearResponse() {
    elements.responseField.value = '';
}

function sanitizePhoneInput(event) {
    event.target.value = event.target.value.replace(/\D/g, '');
}

function toggleTokenVisibility() {
    const input = elements.apiTokenInstance;
    const button = elements.btnToggleTokenVisibility;
    const isPassword = input.type === 'password';

    input.type = isPassword ? 'text' : 'password';
    button.textContent = isPassword ? '🙈' : '👁';
}

elements.phoneMessage.addEventListener('input', sanitizePhoneInput);
elements.phoneFile.addEventListener('input', sanitizePhoneInput);

elements.btnToggleTokenVisibility.addEventListener('click', toggleTokenVisibility);

elements.btnGetSettings.addEventListener('click', getSettings);
elements.btnGetStateInstance.addEventListener('click', getStateInstance);
elements.btnSendMessage.addEventListener('click', sendMessage);
elements.btnSendFileByUrl.addEventListener('click', sendFileByUrl);
elements.btnClearResponse.addEventListener('click', clearResponse);
