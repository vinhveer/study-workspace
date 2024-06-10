import pandas as pd

# Đọc dữ liệu từ file Tổng hợp NT.xlsx
df = pd.read_excel('Tổng hợp NT.xlsx', sheet_name='bienso', header=0)

# Xác định các dòng trùng lặp dựa trên cột 'MDD'
duplicate_rows = df[df.duplicated(subset=['MDD'], keep='first')]

# Lọc ra các dòng trùng lặp và ghi vào file mới 'duplicates.xlsx'
if not duplicate_rows.empty:
    duplicate_rows.to_excel('duplicates.xlsx', index=False)
    # Loại bỏ các dòng trùng lặp để lấy chỉ dòng đầu tiên và lưu lại vào file 'cleaned_duplicates.xlsx'
    df_cleaned = df.drop_duplicates(subset=['MDD'], keep='first')
    df_cleaned.to_excel('cleaned_duplicates.xlsx', index=False)
else:
    # Nếu không có dòng trùng lặp, chỉ cần lưu lại dữ liệu vào file 'cleaned_duplicates.xlsx'
    df.to_excel('cleaned_TongHopNT.xlsx', index=False)
