import pandas as pd

# Đọc dữ liệu từ hai file Excel
df_duplicate = pd.read_excel("duplicate.xlsx", dtype=str)
df_result = pd.read_excel("result.xlsx", dtype=str)

# Gộp hai DataFrame lại với nhau
df_merged = pd.concat([df_duplicate, df_result])

# Tạo một cột mới là MDD và gán giá trị từ các cột CCCD, CMND, QD theo thứ tự ưu tiên
def prioritize_MDD(row):
    if pd.notna(row['CCCD']):
        return row['CCCD']
    elif pd.notna(row['CMND']):
        return row['CMND']
    elif pd.notna(row['QD']):
        return row['QD']
    else:
        return None

df_merged['MDD'] = df_merged.apply(prioritize_MDD, axis=1)

# Xóa các cột CCCD, CMND, QD sau khi đã gộp vào cột MDD
df_merged.drop(columns=['CCCD', 'CMND', 'QD'], inplace=True)

# Lưu kết quả vào một file Excel mới
df_merged.to_excel("merged_file.xlsx", index=False)
