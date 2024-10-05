import os
import pyautogui
import pyperclip
import pandas as pd  # Import pandas for Excel handling
from selenium import webdriver
from selenium.webdriver.edge.options import Options as EdgeOptions
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from datetime import datetime  # For time-based Excel file creation

# Hàm 1: Đếm số lượng file trong thư mục
def count_files_in_folder(folder_path):
    return len(os.listdir(folder_path))

# Hàm 2: Đọc đường dẫn tuyệt đối của file theo loại
def get_file_path(folder_path, file_name):
    return os.path.abspath(os.path.join(folder_path, file_name))

# Hàm 3: Đọc nội dung file txt
def get_text_file_content(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()

# Hàm 4: Đọc danh sách số điện thoại từ file phone_number.txt
def get_phone_numbers(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return [line.strip() for line in file.readlines()]

# Hàm 5: Cấu hình trình duyệt và profile
def setup_webdriver():
    # Hiển thị lựa chọn trình duyệt
    print("Select browser:")
    print("1: Edge")
    print("2: Chrome")
    
    browser_choice = int(input("Please select a browser by number: "))

    if browser_choice == 1:
        browser = "edge"
        options = EdgeOptions()
        user_data_path = "C:/Users/vinhnq/AppData/Local/Microsoft/Edge/User Data"
    elif browser_choice == 2:
        browser = "chrome"
        options = ChromeOptions()
        user_data_path = "C:/Users/vinhnq/AppData/Local/Google/Chrome/User Data"
    else:
        raise ValueError("Invalid browser selection.")

    # Quét các profile có trong thư mục dữ liệu người dùng
    profiles = [name for name in os.listdir(user_data_path) if os.path.isdir(os.path.join(user_data_path, name))]
    
    # Hiển thị danh sách profile cho người dùng chọn
    print("Available profiles:")
    for i, profile in enumerate(profiles):
        print(f"{i + 1}: {profile}")
    
    profile_choice = int(input("Please select a profile by number: ")) - 1
    
    if profile_choice < 0 or profile_choice >= len(profiles):
        raise ValueError("Invalid profile selection.")
    
    selected_profile = profiles[profile_choice]
    print(f"Selected profile: {selected_profile}")
    
    # Cấu hình trình duyệt với profile đã chọn
    options.add_argument(f"user-data-dir={user_data_path}")
    options.add_argument(f"profile-directory={selected_profile}")
    
    # Khởi tạo và trả về đối tượng webdriver
    if browser == "edge":
        return webdriver.Edge(options=options)
    else:
        return webdriver.Chrome(options=options)

# Hàm 6: Mở tab chat Zalo
def open_zalo(driver, wait):
    driver.get("https://chat.zalo.me")

# Tìm kiếm số điện thoại
def find_phone(driver, wait, phone_number):
    search_input = wait.until(EC.visibility_of_element_located((By.ID, "contact-search-input")))
    search_input.clear()
    search_input.send_keys(phone_number)
    time.sleep(2)  # Giảm thời gian chờ sau khi nhập số
    search_input.send_keys(Keys.ENTER)

# Gửi tin nhắn
def send_message(driver, wait, message_folder, file_list):
    message_status = {}  # Trạng thái gửi tin nhắn

    for file_name in file_list:
        file_path = get_file_path(message_folder, file_name)
        file_extension = os.path.splitext(file_name)[1].lower()

        message_input = wait.until(EC.visibility_of_element_located((By.ID, "richInput")))

        try:
            if file_extension == ".txt":
                # Gửi tin nhắn văn bản
                text_message = get_text_file_content(file_path)
                message_input.send_keys(text_message)
                message_input.send_keys(Keys.ENTER)
                message_status[file_name] = "Đã gửi văn bản"
            elif file_extension == ".jpg":
                # Gửi hình ảnh
                image_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "div[icon='Photo_24_Line']")))
                image_button.click()
                pyperclip.copy(file_path)
                time.sleep(1)  # Chờ ngắn để đảm bảo copy
                pyautogui.hotkey('ctrl', 'v')
                time.sleep(0.5)  # Giảm thời gian chờ để không gây chậm
                pyautogui.press('enter')
                message_status[file_name] = "Đã gửi hình ảnh"
        except Exception as e:
            message_status[file_name] = "Lỗi khi gửi tin nhắn"

        time.sleep(2)  # Thời gian chờ giữa các tin nhắn

    return message_status  # Trả về trạng thái tin nhắn

def sent_add_friends(driver, wait):
    try:
        # Kiểm tra xem lời mời kết bạn đã được gửi hay chưa
        friend_request_banner = wait.until(EC.presence_of_element_located(
            (By.XPATH, "//span[contains(@class, 'banner-stranger__title') and contains(text(), 'Bạn đã gửi yêu cầu kết bạn và đang chờ người này đồng ý')]")
        ))
        
        if friend_request_banner:
            return "Chưa chấp nhận yêu cầu kết bạn"  # Trả về kết quả trạng thái kết bạn

    except Exception as e:
        try:
            # Tìm nút "Kết bạn" bằng class cụ thể
            add_friend_button = wait.until(EC.element_to_be_clickable(
                (By.CSS_SELECTOR, "div.z--btn--v2.btn-neutral.small.--rounded")))
            add_friend_button.click()

            # Chờ nút "Gửi kết bạn" khả dụng và nhấn vào
            send_friend_request = wait.until(EC.element_to_be_clickable(
                (By.CSS_SELECTOR, "div[data-id='btn_AddFrd_Add']")))
            send_friend_request.click()

            return "Đã gửi yêu cầu kết bạn"
        except Exception as e:
            return "Đã kết bạn"  # Trả về kết quả trạng thái kết bạn

def check_blocked_message(driver, wait):
    try:
        # Adjust the XPath to find the correct element based on its class and content
        blocked_message = wait.until(EC.presence_of_element_located(
            (By.XPATH, "//div[contains(@class, 'card-with-reaction-v2')]//span[contains(text(), 'Bạn chưa thể gửi tin nhắn đến người này vì người này chặn không nhận tin nhắn từ người lạ.')]")
        ))

        if blocked_message:
            return "Bị chặn"
    except:
        # Nếu không tìm thấy thông báo chặn
        return "Không bị chặn"

# Hàm 7: Xuất file Excel
def export_to_excel(report_data, file_list, file_date):
    columns = ['SĐT', 'Trạng thái kết bạn', 'Chặn người lạ']
    
    # Add dynamic columns for each file in the message folder
    for file_name in file_list:
        columns.append(f"File: {file_name}")

    df = pd.DataFrame(report_data, columns=columns)
    
    # Tạo file Excel theo ngày và giờ
    file_name = f"zalo_report_{file_date}.xlsx"
    df.to_excel(file_name, index=False)
    print(f"Đã xuất báo cáo Excel: {file_name}")

# Hàm chính để chạy chương trình
def run_messaging_app():
    os.system('taskkill /F /IM msedge.exe')

    # Đường dẫn thư mục và file
    message_folder = "C:/Users/vinhnq/Desktop/mkt_zalo/message"
    phone_number_file = "C:/Users/vinhnq/Desktop/mkt_zalo/phone_number.txt"

    # Lấy danh sách file và số điện thoại
    file_list = os.listdir(message_folder)
    phone_numbers = get_phone_numbers(phone_number_file)

    # Khởi tạo trình duyệt và thời gian chờ
    driver = setup_webdriver()
    wait = WebDriverWait(driver, 5)

    # Lưu trữ dữ liệu cho báo cáo
    report_data = []

    try:
        # Mở Zalo
        open_zalo(driver, wait)

        # Lặp qua từng số điện thoại và gửi tin nhắn
        for phone_number in phone_numbers:
            print("Đang thực hiện trên số điện thoại:", phone_number)
            find_phone(driver, wait, phone_number)
            friend_status = sent_add_friends(driver, wait)
            block_status = check_blocked_message(driver, wait)

            # Gửi tin nhắn và lấy trạng thái gửi
            message_status = send_message(driver, wait, message_folder, file_list)

            # Lưu trạng thái kết bạn và chặn tin nhắn
            row_data = [phone_number, friend_status, block_status]

            # Thêm trạng thái file vào báo cáo
            for file_name in file_list:
                row_data.append(message_status.get(file_name, "Không gửi"))

            report_data.append(row_data)

    finally:
        # Tạo file Excel báo cáo theo ngày và giờ
        file_date = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        export_to_excel(report_data, file_list, file_date)
        driver.quit()

# Gọi chương trình chính
if __name__ == "__main__":
    run_messaging_app()
