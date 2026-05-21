@echo off
chcp 65001 >nul
title 西语专四听力转写工具

echo ============================================
echo   西语专四听力音频转写工具
echo   使用 F:\Python312 运行
echo ============================================
echo.

:: 设置 Python 路径
set "PYTHON=F:\Python312\python.exe"
set "PATH=F:\Python312;F:\Python312\Scripts;%PATH%"

:: 检查 Python
if not exist %PYTHON% (
    echo [ERROR] 未找到 F:\Python312\python.exe
    echo 请确认 Python 已安装到 F:\Python312
    pause
    exit /b 1
)
echo [OK] Python 已找到

:: 检查 faster-whisper
%PYTHON% -c "import faster_whisper" 2>nul
if %errorlevel% neq 0 (
    echo [安装] 正在安装 faster-whisper (语音识别引擎)...
    %PYTHON% -m pip install faster-whisper -i https://pypi.tuna.tsinghua.edu.cn/simple
    if %errorlevel% neq 0 (
        echo [ERROR] 安装失败
        pause
        exit /b 1
    )
    echo [OK] faster-whisper 安装完成
)

echo.
echo [运行] 开始转写音频...
echo 注意：首次运行会自动下载约 3GB 的语音识别模型
echo 请保持网络通畅，耐心等待
echo.

cd /d "%~dp0"
%PYTHON% transcribe_audio.py

echo.
pause
