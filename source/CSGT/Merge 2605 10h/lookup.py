import pandas as pd

# Đọc file cleaned_result.xlsx
cleaned_df = pd.read_excel('cleaned_result.xlsx', usecols=['BS', 'MDD'])

# Đọc file chinh sua hoan tat moto Nha Trang (40539).xlsx
nha_trang_df = pd.read_excel('chinh sua hoan tat moto Nha Trang (40539).xlsx')

# Thực hiện merge dựa trên cột BS và BIENSO_DAYDU
merged_df = nha_trang_df.merge(cleaned_df, left_on='BIENSO_DAYDU', right_on='BS', how='left')

# Lọc ra các dòng không tìm thấy
not_found_df = merged_df[merged_df['MDD'].isna()]

# Lưu các dòng không tìm thấy vào file error_lookup.xlsx
not_found_df.to_excel('error_lookup.xlsx', index=False)

# Xóa các dòng không tìm thấy khỏi merged_df
merged_df = merged_df.dropna(subset=['MDD'])

# Điền dữ liệu cột MDD từ cleaned_result.xlsx vào cột Mã định danh trong nha_trang_df
nha_trang_df['Mã định danh'] = merged_df['MDD']

# Lưu lại kết quả vào file Excel mới
nha_trang_df.to_excel('chinh_sua_hoan_tat_moto_Nha_Trang_merged.xlsx', index=False)
