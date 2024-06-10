import pandas as pd

# Đọc hai file Excel
df_merged = pd.read_excel(r"D:\Desktop\filtered_merged_file_all.xlsx")
df_check = pd.read_excel(r"D:\Desktop\Tách dư file gốc vs PC08 (kiểm tra).xlsx")

# Tạo một set chứa các giá trị BS trong file kiểm tra
bs_set = set(df_check['BS'])

# Tạo một cột mới 'Ghi Chú' trong DataFrame của file kiểm tra
df_check['Ghi Chú'] = ''

# Điền thông tin vào cột 'Ghi Chú' cho các dòng có giá trị BS tồn tại trong cả hai file
for bs in bs_set:
    if bs in df_merged['BS'].values:
        # Lấy các chỉ mục của các dòng có giá trị BS trong file kiểm tra
        indices = df_check.index[df_check['BS'] == bs].tolist()
        # Điền thông tin vào cột 'Ghi Chú'
        df_check.loc[indices, 'Ghi Chú'] = 'BS tồn tại trong cả hai file'

# Lưu kết quả vào file Excel mới
df_check.to_excel(r"D:\Desktop\Tách dư file gốc vs PC08 (kiểm tra)_updated.xlsx", index=False)
