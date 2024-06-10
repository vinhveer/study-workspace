import pandas as pd

# Đọc file kết quả
df_merged = pd.read_excel("merged_output.xlsx")

# Tạo một cột mới để lưu trạng thái của mỗi dòng sau khi kiểm tra các điều kiện
df_merged['Keep'] = True

# Kiểm tra điều kiện 1: ô MDD có tất cả đều số, có số 0 ở đầu, 12 số
condition_1 = df_merged['MDD'].str.match(r'^0\d{11}$')
df_merged.loc[condition_1, 'Keep'] = False

# Kiểm tra điều kiện 2: ô MDD có tất cả đều số
condition_2 = df_merged['MDD'].str.isnumeric()
df_merged.loc[condition_2 & df_merged['Keep'], 'Keep'] = False

# Kiểm tra điều kiện 3: ô MDD có cả số và chữ
condition_3 = df_merged['MDD'].str.contains(r'[a-zA-Z]') & ~condition_1 & ~condition_2
df_merged.loc[condition_3 & df_merged['Keep'], 'Keep'] = False

# Giữ lại chỉ một dòng theo thứ tự ưu tiên: Điều kiện 1 > Điều kiện 2 > Điều kiện 3
df_final = df_merged.groupby('MDD', as_index=False).first()

# Xóa cột 'Keep' vì không còn cần thiết nữa
df_final.drop(columns=['Keep'], inplace=True)

# Lưu kết quả vào file Excel mới
df_final.to_excel("filtered_merged_file_old.xlsx", index=False)
