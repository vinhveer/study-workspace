import pandas as pd
import re

# Đọc dữ liệu từ file Cleaned.xlsx
df = pd.read_excel('Cleaned.xlsx')

# Hàm làm sạch dữ liệu biển số
def clean_bs(bs):
    try:
        # Loại bỏ dấu '-' và '.' và chuyển thành chữ in hoa
        cleaned_bs = re.sub(r'[-.]', '', bs).upper()
        
        # Xử lý theo độ dài của biển số
        if len(cleaned_bs) <= 8:
            cleaned_bs = cleaned_bs[:4] + '-' + cleaned_bs[4:]
        else:
            cleaned_bs = cleaned_bs[:4] + '-' + cleaned_bs[4:7] + '.' + cleaned_bs[7:]
        
        return cleaned_bs
    except Exception as e:
        print(f"Error cleaning BS: {bs}, Error: {e}")
        return bs

# Hàm làm sạch dữ liệu MDD
def clean_mdd(mdd):
    try:
        # Chuyển đổi MDD thành chuỗi
        mdd_str = str(mdd)
        
        # Kiểm tra nếu độ dài > 10 và toàn bộ là số
        if len(mdd_str) > 10 and re.match(r'^\d+$', mdd_str):
            # Thêm số 0 ở đầu nếu thiếu
            if not mdd_str.startswith('0'):
                mdd_str = '0' + mdd_str
        
        return mdd_str
    except Exception as e:
        print(f"Error cleaning MDD: {mdd}, Error: {e}")
        return mdd

# Áp dụng các hàm làm sạch dữ liệu cho từng cột
df['BS'] = df['BS'].apply(clean_bs)
df['MDD'] = df['MDD'].apply(clean_mdd)

# Lưu kết quả vào file cleaned_result.xlsx
df.to_excel('cleaned_result.xlsx', index=False)
