document.addEventListener('DOMContentLoaded', function () {
    const inputFile = document.getElementById('file');
    const submitButton = document.getElementById('submit');
    const clearButton = document.getElementById('clear');
    const nextStepButton = document.getElementById('next_step');
    const tableBody = document.querySelector('tbody');
    let phoneNumbers = [];

    function readFile(file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            phoneNumbers = e.target.result.split('\n').map(num => num.trim()).filter(num => num);
            renderTable(phoneNumbers, "Chưa lưu");
        };
        reader.readAsText(file);
    }

    function renderTable(numbers, status) {
        document.getElementById('submit').classList.remove('d-none');
        tableBody.innerHTML = '';
        numbers.forEach((num, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${num}</td>
                <td><span class="badge bg-secondary">${status}</span></td>
            `;
            tableBody.appendChild(row);
        });
    }

    function loadStoredPhoneNumbers() {
        const storedPhoneNumbers = JSON.parse(localStorage.getItem('phoneNumbers'));
        if (storedPhoneNumbers && storedPhoneNumbers.length > 0) {
            renderTable(storedPhoneNumbers, "Đã lưu");
            showNextStepButton();
            submitButton.classList.add('d-none');
            countPhoneNumbers();
        } else {
            // Nếu không có số điện thoại nào lưu, hiển thị thông báo
            const noDataRow = document.createElement('tr');
            noDataRow.innerHTML = `
                <td colspan="3" class="text-center">Chưa có dữ liệu</td>
            `;
            tableBody.innerHTML = ''; // Xóa nội dung hiện tại
            tableBody.appendChild(noDataRow); // Thêm thông báo vào bảng
        }
    }


    function showNextStepButton() {
        nextStepButton.classList.remove('d-none');
        clearButton.classList.remove('d-none');
    }

    inputFile.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            readFile(file);
        }
    });

    submitButton.addEventListener('click', function () {
        if (phoneNumbers.length > 0) {
            localStorage.setItem('phoneNumbers', JSON.stringify(phoneNumbers));
            alert('Số điện thoại đã được lưu vào local storage!');
            renderTable(phoneNumbers, "Đã lưu");
            countPhoneNumbers();
            showNextStepButton();
        } else {
            alert('Vui lòng tải lên file chứa số điện thoại!');
        }
    });

    clearButton.addEventListener('click', function () {
        localStorage.removeItem('phoneNumbers');
        phoneNumbers = [];
        tableBody.innerHTML = '';
        document.getElementById('submit').classList.add('d-none');
        nextStepButton.classList.add('d-none');
        clearButton.classList.add('d-none');
        alert('Đã xóa tất cả số điện thoại!');
        countPhoneNumbers();
    });

    // Đếm số điện thoại có trong local storage
    function countPhoneNumbers() {
        const storedPhoneNumbers = JSON.parse(localStorage.getItem('phoneNumbers'));
        if (storedPhoneNumbers && storedPhoneNumbers.length > 0) {
            document.getElementById('count_phone').innerHTML = storedPhoneNumbers.length;
        } else {
            document.getElementById('count_phone').innerHTML = 'Không có dữ liệu';
        }
    }

    loadStoredPhoneNumbers();
});
