import pandas as pd
import os

# Đường dẫn tới thư mục chứa các file Excel
folder_path = 'ALL/'

# Danh sách các file Excel trong thư mục
excel_files = [f for f in os.listdir(folder_path) if f.endswith('.xlsx')]

# Danh sách để lưu trữ các dataframe
dfs = []

# Duyệt qua từng file Excel và chỉ lấy dữ liệu từ sheet đầu tiên
for file in excel_files:
    file_path = os.path.join(folder_path, file)
    # Đọc sheet đầu tiên của file Excel
    df = pd.read_excel(file_path, sheet_name=0)
    
    # Kiểm tra xem cột "MDD" và "BS" có tồn tại không
    if 'MDD' in df.columns and 'BS' in df.columns:
        # Chọn các cột "MDD" và "BS"
        df_selected = df[['BS', 'MDD']]
        # Thêm dataframe đã chọn vào danh sách
        dfs.append(df_selected)
    else:
        print(f"Các cột 'MDD' và 'BS' không tồn tại trong file: {file}")

# Gộp tất cả các dataframe lại thành một
if dfs:  # Kiểm tra xem danh sách dfs có trống không
    merged_df = pd.concat(dfs, ignore_index=True)
    # Lưu kết quả gộp vào một file Excel mới
    merged_df.to_excel('merged_output.xlsx', index=False)
else:
    print("Không có dữ liệu để gộp.")
