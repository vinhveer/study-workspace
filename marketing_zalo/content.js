chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "changeDOM") {
        // Thay đổi nội dung của phần tử với id "status"
        const statusElement = document.getElementById("status");
        if (statusElement) {
            // Tạo một phần tử div mới để chứa thông báo mới
            const newStatus = document.createElement("div");
            newStatus.innerText = request.newText; // Thêm nội dung mới vào div
            statusElement.appendChild(newStatus); // Thêm div vào phần tử "status"
        }
    }

    if (request.action === "clickSearchInput") {
        // Kiểm tra tab zalo (https://chat.zalo.me/)
        if (window.location.href.includes("chat.zalo.me")) {
            setTimeout(() => {
                const searchInput = document.querySelector('[id="contact-search-input"]');
                if (searchInput) {
                    searchInput.click(); // Ấn vào input tìm kiếm
                    setTimeout(() => {
                        const firstItem = document.querySelector(".gridv2.conv-item");
                        if (firstItem) {
                            firstItem.click(); // Ấn vào item đầu tiên trong danh sách
                        }
                    }, 500); // Đợi 500ms để danh sách hiện lên
                } else {
                    console.error("Không tìm thấy phần tử 'contact-search-input'");
                }
            }, 500); // Đợi 500ms để tab "Danh bạ" load xong
        }
    }
});
