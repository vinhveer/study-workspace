document.addEventListener('DOMContentLoaded', function () {
    const clearMessagesButton = document.getElementById('clearMessages');
    const nextStepButton = document.getElementById('nextStep');
    const tableBody = document.getElementById('messageBody');
    const messageInput = document.getElementById('message');
    const imageMessageInput = document.getElementById('imageMessage');
    const addTextMessageButton = document.getElementById('addTextMessage');
    const addImageMessageButton = document.getElementById('addImageMessage');

    let db;

    // Khởi tạo IndexedDB
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
            renderMessageTable(); // Render bảng khi DB mở thành công
            checkMessagesExist(); // Kiểm tra xem có tin nhắn nào trong DB
        };

        request.onerror = function (event) {
            console.error("Lỗi mở cơ sở dữ liệu:", event.target.errorCode);
        };
    }

    // Kiểm tra xem có tin nhắn nào trong IndexedDB không
    function checkMessagesExist() {
        getMessages(function (messages) {
            if (messages.length > 0) {
                clearMessagesButton.classList.remove('d-none');
                nextStepButton.classList.remove('d-none');
            } else {
                clearMessagesButton.classList.add('d-none');
                nextStepButton.classList.add('d-none');
            }
        });
    }

    // Lưu tin nhắn vào IndexedDB
    function saveMessage(message) {
        const transaction = db.transaction(['messages'], 'readwrite');
        const objectStore = transaction.objectStore('messages');
        objectStore.add(message);
    }

    // Lấy tất cả tin nhắn từ IndexedDB
    function getMessages(callback) {
        const transaction = db.transaction(['messages'], 'readonly');
        const objectStore = transaction.objectStore('messages');
        const request = objectStore.getAll();

        request.onsuccess = function (event) {
            callback(event.target.result);
        };
    }

    function renderMessageTable() {
        getMessages(function (messages) {
            tableBody.innerHTML = '';
            
            messages.forEach((msg, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>
                        ${msg.type === 'text' ? msg.content : `<img src="${msg.content}" alt="Image" style="width: 50px; height: auto;" />`}
                    </td>
                    <td>
                        <button class="btn btn-danger remove-message" data-id="${msg.id}">Xóa</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            // Xóa tin nhắn
            document.querySelectorAll('.remove-message').forEach(button => {
                button.addEventListener('click', function () {
                    const id = this.getAttribute('data-id');
                    deleteMessage(id);
                });
            });
        });
    }

    // Xóa tin nhắn
    function deleteMessage(id) {
        const transaction = db.transaction(['messages'], 'readwrite');
        const objectStore = transaction.objectStore('messages');
        objectStore.delete(Number(id));
        renderMessageTable();
        checkMessagesExist(); // Kiểm tra lại sau khi xóa tin nhắn
    }

    // Xóa tất cả tin nhắn
    clearMessagesButton.addEventListener('click', function () {
        const transaction = db.transaction(['messages'], 'readwrite');
        const objectStore = transaction.objectStore('messages');
        objectStore.clear();
        renderMessageTable();
        alert('Đã xóa tất cả tin nhắn!');
        checkMessagesExist(); // Kiểm tra lại sau khi xóa tất cả tin nhắn
    });

    // Thêm tin nhắn dạng chữ
    addTextMessageButton.addEventListener('click', function () {
        const message = messageInput.value.trim();
        if (message) {
            const newMessage = { type: 'text', content: message };
            saveMessage(newMessage);
            renderMessageTable();
            messageInput.value = ''; // Reset input
            checkMessagesExist(); // Kiểm tra lại sau khi thêm tin nhắn
        } else {
            alert('Vui lòng nhập tin nhắn!');
        }
    });

    // Thêm tin nhắn dạng hình ảnh
    addImageMessageButton.addEventListener('click', function () {
        const imageFile = imageMessageInput.files[0];
        if (imageFile) {
            const reader = new FileReader();

            reader.onload = function(event) {
                const imageUrl = event.target.result; // Đường dẫn hình ảnh dưới dạng Data URL
                const newMessage = { type: 'image', content: imageUrl };
                saveMessage(newMessage);
                renderMessageTable();
                imageMessageInput.value = ''; // Reset input
                checkMessagesExist(); // Kiểm tra lại sau khi thêm tin nhắn
            };

            reader.onerror = function(error) {
                console.error("Error reading file:", error);
            };

            reader.readAsDataURL(imageFile); // Đọc tệp hình ảnh dưới dạng Data URL
        } else {
            alert('Vui lòng chọn hình ảnh!');
        }
    });

    // Mở cơ sở dữ liệu khi tài liệu được tải
    openDatabase();
});
