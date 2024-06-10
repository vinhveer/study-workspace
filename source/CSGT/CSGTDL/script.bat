@echo off
setlocal enabledelayedexpansion

REM Thư mục chứa các file cần đổi tên
set "folder_path=D:\Desktop\CSGTDL\AFTER TRI"

REM Hậu tố cần thêm vào tên file
set "suffix=_Update by Tri"

cd /d "%folder_path%"

for %%f in (*.*) do (
    set "filename=%%~nf"
    set "extension=%%~xf"
    ren "%%f" "!filename!%suffix%!extension!"
)

echo Đã thêm hậu tố vào các file trong thư mục %folder_path%.
pause
