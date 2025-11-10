# 📝 Blogging Platform API

منصة بسيطة لإدارة المدونات باستخدام Node.js وExpress وMySQL. توفر واجهة RESTful API لإنشاء، عرض، تحديث، وحذف المقالات.

## 🚀 الميزات

- 📄 عرض جميع المقالات أو البحث بالعنوان
- 🔍 عرض مقال محدد باستخدام ID
- ➕ إنشاء مقال جديد
- 📝 تحديث مقال موجود
- ❌ حذف مقال

## 🛠️ المتطلبات

- Node.js >= 18
- MySQL Server
- ملف `.env` يحتوي على إعدادات الاتصال بقاعدة البيانات

## 📦 التثبيت

```bash
npm install
```

## 🔐 إعداد البيئة

أنشئ ملف `.env` في جذر المشروع وأضف إعدادات الاتصال:

```env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=blogging_platform_api
```

## 🗃️ إعداد قاعدة البيانات

```sql
CREATE DATABASE blogging_platform_api;
USE blogging_platform_api;
CREATE TABLE blogs (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     contents TEXT NOT NULL,
     created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO blogs (title, contents) VALUES
	('First Blog Post', 'This is the content of the first blog post.'),
	('Second Blog Post', 'This is the content of the second blog post.');
```

## ▶️ التشغيل

```bash
npm run dev
```

السيرفر يعمل على: [http://localhost:3000](http://localhost:3000/)

## 📮 نقاط النهاية (Endpoints)

### ✅ GET /blogs
عرض جميع المقالات
دعم البحث بالعنوان: `/blogs?title=first`

### ✅ GET /blogs/:id
عرض مقال محدد

### ✅ POST /blogs
إنشاء مقال جديد

### ✅ PUT /blogs/:id
تحديث مقال موجود

### ✅ DELETE /blogs/:id
حذف مقال

## 📂 هيكل المشروع

```
├── database.js         # وظائف التعامل مع قاعدة البيانات
├── index.ts            # نقطة تشغيل السيرفر
├── .env                # إعدادات الاتصال بقاعدة البيانات
├── package.json
└── README.md
```
