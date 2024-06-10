import pandas as pd
import os
import re

# Đường dẫn tới thư mục chứa các file Excel
folder_path = 'AFTER'
required_columns = {'BS', 'CCCD', 'CMND', 'QD'}

# Đọc và gộp tất cả các file Excel lại thành một DataFrame
combined_df = pd.DataFrame()
for file in os.listdir(folder_path):
    if file.endswith('.xlsx'):
        file_path = os.path.join(folder_path, file)
        try:
            df = pd.read_excel(file_path, sheet_name='Sheet1')
            
            # Kiểm tra số lượng cột
            if df.shape[1] > 4:
                print(f"The file {file} has more than three columns")
            
            # Kiểm tra tên các trường thông tin
            actual_columns = set(df.columns)
            missing_columns = required_columns - actual_columns
            if missing_columns:
                print(f"File {file} is missing columns: {', '.join(missing_columns)}")
                continue  # Bỏ qua file này và không gộp vào combined_df
            
            combined_df = pd.concat([combined_df, df])
        except Exception as e:
            print(f"Error reading {file}: {e}")

# Hàm xóa dấu trong một chuỗi và chuyển thành chữ in hoa
def remove_special_chars_and_upper(value):
    try:
        cleaned_value = re.sub(r'\W+', '', str(value))  # Xóa hết dấu, chỉ để lại ký tự chữ và số
        return cleaned_value.upper()  # Chuyển thành chữ in hoa
    except Exception as e:
        raise ValueError(f"Error removing special characters from value '{value}': {e}")

# Hàm làm sạch cột BS
def clean_bs(bs):
    try:
        if len(bs) <= 8:
            bs = bs[:4] + '-' + bs[4:]
        elif len(bs) > 8:
            bs = bs[:4] + '-' + bs[4:7] + '.' + bs[7:]
        return bs.upper()  # Chuyển thành chữ in hoa
    except Exception as e:
        raise ValueError(f"Error cleaning BS value '{bs}': {e}")

# Hàm làm sạch cột CCCD và cột QD
def clean_cccd(cccd):
    try:
        if re.search(r'[a-zA-Z]', str(cccd)):  # Nếu có chữ
            return '', str(cccd).upper()  # Chuyển dữ liệu có chữ sang cột QD và chuyển thành chữ in hoa
        else:
            cccd = str(cccd)
            if not cccd.startswith('0'):  # Nếu không có số 0 ở đầu
                cccd = '0' + cccd
            return cccd.upper(), ''
    except Exception as e:
        raise ValueError(f"Error cleaning CCCD value '{cccd}': {e}")

# Xóa dấu và chuyển thành chữ in hoa cho toàn bộ sheet
for column in combined_df.columns:
    combined_df[column] = combined_df[column].apply(remove_special_chars_and_upper)

# Áp dụng các quy tắc làm sạch cho cột BS và CCCD
for index, row in combined_df.iterrows():
    try:
        combined_df.at[index, 'BS'] = clean_bs(row['BS'])
        cccd, qd = clean_cccd(row['CCCD'])
        combined_df.at[index, 'CCCD'] = cccd
        if qd:
            combined_df.at[index, 'QD'] = qd
    except ValueError as e:
        print(f"Data cleaning error at row {index}: {e}")

# Tìm và xử lý các dòng trùng lặp
duplicates = combined_df[combined_df.duplicated(keep=False)]
unique_df = combined_df.drop_duplicates()

# Lưu các dòng trùng lặp vào file duplicate.xlsx
duplicate_path = 'duplicate.xlsx'
try:
    duplicates.to_excel(duplicate_path, index=False)
except Exception as e:
    print(f"Error saving duplicate.xlsx: {e}")

# Lưu kết quả vào file result.xlsx
result_path = 'result.xlsx'
try:
    unique_df.to_excel(result_path, index=False)
except Exception as e:
    print(f"Error saving result.xlsx: {e}")
