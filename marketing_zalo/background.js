let tab_active;
let tab_zalo;

// Listener for action click - open index.html
chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({ url: "chrome-extension://" + chrome.runtime.id + "/index.html" });
});

// Listener for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('process.html')) {
        tab_active = tabId;

        // Open Zalo chat tab and focus on it
        chrome.tabs.create({ url: "https://chat.zalo.me/" }, (tab) => {
            tab_zalo = tab.id;
            if (tab_zalo) {
                chrome.scripting.executeScript({
                    target: { tabId: tab_zalo },
                    files: ['content.js']
                }, () => {
                    chrome.tabs.update(tab_zalo, { active: true }, () => {
                        chrome.tabs.sendMessage(tab_zalo, { action: "clickSearchInput" });
                    });
                });

                chrome.tabs.sendMessage(tab_active, { message: "changeDOM", newText: "Đã mở chat.zalo.me" });
            }
        });

        console.log("Tab active: ", tabId);

        // Read phone numbers, initialize database, then retrieve messages
        readPhoneNumbers(() => {
            chrome.tabs.sendMessage(tab_active, { message: "changeDOM", newText: "Đang đọc danh sách số điện thoại..." });
            openDatabase(() => {
                chrome.tabs.sendMessage(tab_active, { message: "changeDOM", newText: "Đã mở cơ sở dữ liệu" });
                getAllMessages(() => {
                    chrome.tabs.sendMessage(tab_active, { message: "changeDOM", newText: "Đã đọc danh sách tin nhắn" });
                });
            });
        });
    }
});

// Function to read phone numbers from chrome.storage.local
function readPhoneNumbers(callback) {
    chrome.storage.local.get(['phoneNumbers'], function (result) {
        if (chrome.runtime.lastError) {
            console.error("Error accessing chrome.storage:", chrome.runtime.lastError);
            chrome.tabs.sendMessage(tab_active, { message: "changeDOM", newText: "Lỗi khi đọc danh sách số điện thoại" });
            return;
        }

        const phoneNumbers = result.phoneNumbers || [];
        chrome.tabs.sendMessage(tab_active, { message: "changeDOM", newText: "Đã đọc danh sách số điện thoại" });

        if (callback) callback(); // Execute callback after reading phone numbers
    });
}

let db;

// Initialize IndexedDB
function openDatabase(callback) {
    const request = indexedDB.open('messagesDB', 1);

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        const objectStore = db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('type', 'type', { unique: false });
        objectStore.createIndex('content', 'content', { unique: false });
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        console.log("Database opened successfully");
        chrome.tabs.sendMessage(tab_active, { message: "changeDOM", newText: "Cơ sở dữ liệu đã sẵn sàng" });

        if (callback) callback(); // Execute callback after opening the database
    };

    request.onerror = function (event) {
        console.error("Database error:", event.target.errorCode);
        chrome.tabs.sendMessage(tab_active, { message: "changeDOM", newText: "Lỗi khi mở cơ sở dữ liệu" });
    };
}

// Retrieve messages from IndexedDB
function getMessages(callback) {
    const transaction = db.transaction(['messages'], 'readonly');
    const objectStore = transaction.objectStore('messages');
    const messages = [];

    objectStore.openCursor().onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
            messages.push(cursor.value);
            cursor.continue();
        } else {
            callback(messages); // Execute callback with the retrieved messages
        }
    };
}

// Get all messages from the database
function getAllMessages(callback) {
    if (db) {
        getMessages(function (messages) {
            chrome.tabs.sendMessage(tab_active, { message: "changeDOM", newText: "Đã đọc danh sách tin nhắn" });
            if (callback) callback(); // Execute callback after retrieving messages
        });
    } else {
        console.error("Database is not initialized");
        chrome.tabs.sendMessage(tab_active, { message: "changeDOM", newText: "Lỗi: Cơ sở dữ liệu chưa được khởi tạo" });
    }
}
