import pandas as pd
import os

# Đường dẫn tuyệt đối đến file
file_yeu_cau_path = 'D:/Desktop/CSGTDL/chinh sua hoan tat moto Nha Trang (40539).xlsx'
merge_output_path = 'D:/Desktop/CSGTDL/merged_output.xlsx'

# Kiểm tra xem file có tồn tại hay không trước khi đọc
if os.path.exists(file_yeu_cau_path) and os.path.exists(merge_output_path):
    print("Reading file_yeu_cau.xlsx...")
    file_yeu_cau = pd.read_excel(file_yeu_cau_path)
    print("Reading merge_output.xlsx...")
    merge_output = pd.read_excel(merge_output_path)
    
    # Thực hiện các bước xử lý dữ liệu
    print("Merging data...")
    merged_data = pd.merge(file_yeu_cau, merge_output, how='left', left_on='BIENSO_DAYDU', right_on='BS')

    # Tạo file với các biển số có nhiều kết quả
    print("Finding duplicate entries...")
    duplicate_entries = merged_data[merged_data.duplicated('BIENSO_DAYDU', keep=False)]
    print(f"Number of duplicate entries found: {len(duplicate_entries)}")
    duplicate_entries.to_excel('D:/Desktop/CSGTDL/duplicate_entries.xlsx', index=False)
    print("Duplicate entries saved to D:/Desktop/CSGTDL/duplicate_entries.xlsx")

    # Giữ các biển số có một kết quả duy nhất
    print("Finding non-duplicate entries...")
    unique_entries = merged_data[~merged_data.duplicated('BIENSO_DAYDU', keep=False)]
    print(f"Number of unique entries found: {len(unique_entries)}")

    # Lưu kết quả không trùng lặp vào file yêu cầu
    unique_entries.to_excel('D:/Desktop/CSGTDL/file_yeu_cau_merged.xlsx', index=False)
    print("Unique entries saved to D:/Desktop/CSGTDL/file_yeu_cau_merged.xlsx")

    print("Processing completed successfully.")
else:
    print("One or both of the files do not exist at the provided path.")
