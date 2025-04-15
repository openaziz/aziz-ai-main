@echo off
:: عبدالعزيز AI - سكريبت التثبيت لنظام Windows
:: هذا السكريبت يقوم بتثبيت جميع التبعيات وتشغيل المشروع

echo.
echo  _         _                _              _        _    ___ 
echo ^| ^|       ^| ^|              ^| ^|            (_)      ^| ^|  ^|_ _^|
echo ^| ^|__   __^| ^|  __ _  ____ _^| ^|  __ _  ____ _ ____  ^| ^|   ^| ^| 
echo ^|  _ \ / _  ^| / _  ^|/ _  ^| ^| ^| / _  ^|/ _  ^| ^|_  /  ^| ^|   ^| ^| 
echo ^| ^|_) ^| (_^| ^|^| (_^| ^| (_^| ^| ^| ^|^| (_^| ^| (_^| ^| ^|/ /   ^|_^|  _^| ^|_
echo ^|_.__/ \__,_^| \__,_^|\__,_^|_^|_^| \__,_^|\__,_^|_/___^|  (_) ^|_____^|
echo.
echo سكريبت تثبيت منصة عبدالعزيز AI
echo =====================================
echo.

:: التحقق من وجود Node.js
echo [1/5] التحقق من وجود Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [خطأ] لم يتم العثور على Node.js. يرجى تثبيته أولاً.
    echo يمكنك تنزيله من: https://nodejs.org/
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [✓] تم العثور على Node.js (الإصدار: %NODE_VERSION%)

:: التحقق من وجود npm
echo [2/5] التحقق من وجود npm...
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [خطأ] لم يتم العثور على npm. يرجى تثبيته أولاً.
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo [✓] تم العثور على npm (الإصدار: %NPM_VERSION%)

:: تثبيت التبعيات
echo [3/5] تثبيت التبعيات...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [خطأ] فشل في تثبيت التبعيات.
    exit /b 1
)

echo [✓] تم تثبيت جميع التبعيات بنجاح

:: إنشاء ملف الإعدادات إذا لم يكن موجودًا
echo [4/5] التحقق من ملفات الإعدادات...

if not exist ".env" (
    echo [!] إنشاء ملف .env...
    (
        echo # إعدادات API
        echo OPENAI_API_KEY=
        echo CLAUDE_API_KEY=
        echo GEMINI_API_KEY=
        echo.
        echo # إعدادات التطبيق
        echo PORT=3000
        echo NODE_ENV=development
    ) > .env
    echo [✓] تم إنشاء ملف .env
    echo [!] يرجى تعديل ملف .env وإضافة مفاتيح API الخاصة بك
) else (
    echo [✓] ملف .env موجود بالفعل
)

:: تشغيل المشروع
echo [5/5] تشغيل المشروع...
echo [✓] تم الانتهاء من الإعداد بنجاح!
echo =====================================
echo لتشغيل المشروع، استخدم الأمر: npm start
echo ثم افتح المتصفح وانتقل إلى: http://localhost:3000
echo =====================================
echo شكرًا لاستخدامك منصة عبدالعزيز AI!

:: اسأل المستخدم إذا كان يريد تشغيل المشروع الآن
set /p choice=هل تريد تشغيل المشروع الآن؟ (y/n): 
if /i "%choice%"=="y" (
    call npm start
)
