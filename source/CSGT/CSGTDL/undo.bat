@echo off
setlocal enabledelayedexpansion

REM Thư mục chứa các file cần đổi tên
set "folder_path=D:\Desktop\CSGTDL\AFTER TRI"

REM Hậu tố cần xóa khỏi tên file
set "suffix=_Update by Duyen"

cd /d "%folder_path%"

for %%f in (*.*) do (
    set "filename=%%~nf"
    set "extension=%%~xf"
    if "!filename!" neq "!filename:%suffix%=!" (
        set "newfilename=!filename:%suffix%=!"
        ren "%%f" "!newfilename!!extension!"
    )
)

echo Đã xóa hậu tố khỏi các file trong thư mục %folder_path%.
pause
