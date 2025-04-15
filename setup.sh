#!/bin/bash

# عبدالعزيز AI - سكريبت التثبيت
# هذا السكريبت يقوم بتثبيت جميع التبعيات وتشغيل المشروع

# تعيين الألوان للطباعة
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# طباعة شعار المشروع
echo -e "${BLUE}"
echo "  _         _                _              _        _    ___ "
echo " | |       | |              | |            (_)      | |  |_ _|"
echo " | |__   __| |  __ _  ____ _| |  __ _  ____ _ ____  | |   | | "
echo " |  _ \ / _  | / _  |/ _  | | | / _  |/ _  | |_  /  | |   | | "
echo " | |_) | (_| || (_| | (_| | | || (_| | (_| | |/ /   |_|  _| |_"
echo " |_.__/ \__,_| \__,_|\__,_|_|_| \__,_|\__,_|_/___|  (_) |_____|"
echo -e "${NC}"
echo -e "${GREEN}سكريبت تثبيت منصة عبدالعزيز AI${NC}"
echo -e "${YELLOW}=====================================${NC}"

# التحقق من وجود Node.js
echo -e "${BLUE}[1/5]${NC} التحقق من وجود Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}[خطأ]${NC} لم يتم العثور على Node.js. يرجى تثبيته أولاً."
    echo -e "يمكنك تنزيله من: ${BLUE}https://nodejs.org/${NC}"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}[✓]${NC} تم العثور على Node.js (الإصدار: $NODE_VERSION)"

# التحقق من وجود npm
echo -e "${BLUE}[2/5]${NC} التحقق من وجود npm..."
if ! command -v npm &> /dev/null; then
    echo -e "${RED}[خطأ]${NC} لم يتم العثور على npm. يرجى تثبيته أولاً."
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}[✓]${NC} تم العثور على npm (الإصدار: $NPM_VERSION)"

# تثبيت التبعيات
echo -e "${BLUE}[3/5]${NC} تثبيت التبعيات..."
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}[خطأ]${NC} فشل في تثبيت التبعيات."
    exit 1
fi

echo -e "${GREEN}[✓]${NC} تم تثبيت جميع التبعيات بنجاح"

# إنشاء ملف الإعدادات إذا لم يكن موجودًا
echo -e "${BLUE}[4/5]${NC} التحقق من ملفات الإعدادات..."

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}[!]${NC} إنشاء ملف .env..."
    cat > .env << EOL
# إعدادات API
OPENAI_API_KEY=
CLAUDE_API_KEY=
GEMINI_API_KEY=

# إعدادات التطبيق
PORT=3000
NODE_ENV=development
EOL
    echo -e "${GREEN}[✓]${NC} تم إنشاء ملف .env"
    echo -e "${YELLOW}[!]${NC} يرجى تعديل ملف .env وإضافة مفاتيح API الخاصة بك"
else
    echo -e "${GREEN}[✓]${NC} ملف .env موجود بالفعل"
fi

# تشغيل المشروع
echo -e "${BLUE}[5/5]${NC} تشغيل المشروع..."
echo -e "${GREEN}[✓]${NC} تم الانتهاء من الإعداد بنجاح!"
echo -e "${YELLOW}=====================================${NC}"
echo -e "لتشغيل المشروع، استخدم الأمر: ${BLUE}npm start${NC}"
echo -e "ثم افتح المتصفح وانتقل إلى: ${BLUE}http://localhost:3000${NC}"
echo -e "${YELLOW}=====================================${NC}"
echo -e "${GREEN}شكرًا لاستخدامك منصة عبدالعزيز AI!${NC}"

# اسأل المستخدم إذا كان يريد تشغيل المشروع الآن
read -p "هل تريد تشغيل المشروع الآن؟ (y/n): " choice
if [[ "$choice" =~ ^[Yy]$ ]]; then
    npm start
fi
