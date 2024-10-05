document.addEventListener('DOMContentLoaded', function () {
    const count_person = document.getElementById('count_person');
    const count_messages = document.getElementById('count_message');
    const successAlert = document.getElementById('successAlert');
    const dangerAlert = document.getElementById('dangerAlert');
    const startButton = document.getElementById('startButton');

    function CountPhoneNumber() {
        const storedPhoneNumbers = JSON.parse(localStorage.getItem('phoneNumbers'));
        if (storedPhoneNumbers && storedPhoneNumbers.length > 0) {
            count_person.innerHTML = storedPhoneNumbers.length;
        } else {
            count_person.innerHTML = 0;
        }
    }

    let db;

    // Initialize IndexedDB
    function openDatabase() {
        const request = indexedDB.open('messagesDB', 1);

        request.onupgradeneeded = function (event) {
            db = event.target.result;
            const objectStore = db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('type', 'type', { unique: false });
            objectStore.createIndex('content', 'content', { unique: false });
        };

        request.onsuccess = function (event) {
            db = event.target.result;
            CountMessages(); // Count messages when the database is successfully opened
        };

        request.onerror = function (event) {
            console.error("Database error:", event.target.errorCode);
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
                callback(messages);
            }
        };
    }

    // Count the number of messages in IndexedDB
    function CountMessages() {
        if (db) {
            getMessages(function (messages) {
                count_messages.innerHTML = messages.length;
                updateStatus();
            });
        }
    }

    function updateStatus() {
        const phoneCount = parseInt(count_person.innerHTML, 10);
        const messageCount = parseInt(count_messages.innerHTML, 10);

        if (phoneCount > 0 && messageCount > 0) {
            successAlert.classList.remove('d-none');
            successAlert.innerHTML = "Số điện thoại và tin nhắn đã có trên hệ thống";
            startButton.classList.remove('d-none');
            dangerAlert.classList.add('d-none');
        } else {
            successAlert.classList.add('d-none');
            startButton.classList.add('d-none');
            dangerAlert.classList.remove('d-none');

            if (phoneCount === 0 && messageCount === 0) {
                dangerAlert.innerHTML = "Số điện thoại và tin nhắn hiện chưa được thiết lập.";
            } else if (phoneCount === 0) {
                dangerAlert.innerHTML = "Số điện thoại không có trên hệ thống. Vui lòng import lại.";
            } else if (messageCount === 0) {
                dangerAlert.innerHTML = "Tin nhắn hiện chưa được thiết lập. Vui lòng thiết lập.";
            }
        }
    }

    // Initialize the database and count data
    openDatabase();
    CountPhoneNumber();
});
