import pandas as pd
import re

# Đường dẫn tới file merge_output.xlsx
file_path = 'merged_output.xlsx'

# Hàm làm sạch cột BS
def clean_bs(bs):
    try:
        bs = re.sub(r'\W+', '', str(bs))  # Xóa hết dấu, chỉ để lại ký tự chữ và số
        if len(bs) <= 8:
            bs = bs[:4] + '-' + bs[4:]
        elif len(bs) > 8:
            bs = bs[:4] + '-' + bs[4:7] + '.' + bs[7:]
        return bs.upper()  # Chuyển thành chữ in hoa
    except Exception as e:
        raise ValueError(f"Error cleaning BS value '{bs}': {e}")

# Đọc file merge_output.xlsx
try:
    df = pd.read_excel(file_path)
except Exception as e:
    print(f"Error reading {file_path}: {e}")

# Làm sạch dữ liệu trong file
for index, row in df.iterrows():
    try:
        df.at[index, 'BS'] = clean_bs(row['BS'])
        df.at[index, 'MDD'] = str(row['MDD']).upper()  # Chuyển cột MDD thành chữ in hoa
    except ValueError as e:
        print(f"Data cleaning error at row {index}: {e}")

# Lưu lại file merge_output.xlsx sau khi làm sạch dữ liệu
try:
    df.to_excel(file_path, index=False)
except Exception as e:
    print(f"Error saving cleaned {file_path}: {e}")
