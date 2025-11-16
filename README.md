# 🎓 Programming Academy | أكاديمية البرمجة

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://lecture-page.netlify.app)

## 🌐 Live Demo
**[Visit the Page](https://lecture-page.netlify.app)** | **[Interactive Card Demo](https://lecture-page.netlify.app/about.html)**

---

## 📖 Project Description

Interactive Programming Academy - منصة تعليمية شاملة تحتوي على:

### 🎯 المزايا الرئيسية:
- ✅ أساسيات البرمجة
- ✅ مفاهيم هندسة البرمجيات
- ✅ دروس JavaScript تفاعلية
- ✅ محرر أكواد تفاعلي (CodePen style)
- ✅ **بطاقة تفاعلية بفيزياء واقعية (Lanyard Card)** 🎫
- ✅ تصميم متجاوب (Responsive)
- ✅ دعم متعدد اللغات (عربي/إنجليزي)

### 🎨 التقنيات المستخدمة:
- HTML5, CSS3, JavaScript
- React + Vite (للبطاقة التفاعلية)
- Three.js (رسومات 3D)
- React Three Fiber
- Rapier Physics Engine
- Tailwind CSS
- Font Awesome Icons

---

## 🎫 البطاقة التفاعلية (Lanyard Card)

صفحة **About Me** تحتوي على بطاقة تفاعلية مع:
- 🎮 سحب وإفلات واقعي
- 🌍 محاكاة جاذبية
- 🎨 حبل مطاطي فيزيائي
- ⚙️ تحكم كامل في الإعدادات
- 📱 متجاوب على جميع الأجهزة

---

## 📁 هيكل المشروع

```
Lecture/
├── INDEX.html                 # الصفحة الرئيسية
├── about.html                 # صفحة البطاقة التفاعلية (redirect)
├── about-lanyard/             # تطبيق Lanyard المبني
│   ├── about.html            # التطبيق التفاعلي
│   └── assets/               # ملفات JS, CSS, صور
├── css/                       # ملفات التنسيق
├── js/                        # ملفات JavaScript
├── assets/                    # الصور والوسائط
├── lanyard/                   # مشروع React (للتطوير)
│   ├── src/
│   │   ├── components/
│   │   │   └── Lanyard.jsx   # مكون البطاقة
│   │   └── App.jsx           # التطبيق الرئيسي
│   └── package.json
├── netlify.toml              # إعدادات Netlify
├── NETLIFY_DEPLOY.md         # دليل الرفع اليدوي
└── NETLIFY_SETUP.md          # دليل الربط مع GitHub

```

---

## 🚀 التشغيل المحلي

### المشروع الأساسي:
```bash
# افتح أي ملف HTML في المتصفح
open INDEX.html
```

### تطبيق Lanyard (للتطوير):
```bash
cd lanyard
pnpm install
pnpm dev
```

---

## 🌐 النشر على Netlify

### الطريقة الأولى: ربط GitHub (موصى به)
اتبع الدليل في: **[NETLIFY_SETUP.md](./NETLIFY_SETUP.md)**

### الطريقة الثانية: Netlify CLI
```bash
pnpm install -g netlify-cli
netlify login
netlify deploy --prod
```

### الطريقة الثالثة: رفع يدوي
اتبع الدليل في: **[NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md)**

---

## 🔄 سير العمل (Workflow)

```bash
# 1. عدّل الملفات
vim INDEX.html

# 2. احفظ التغييرات
git add .
git commit -m "تحديث الصفحة"

# 3. ارفع على GitHub
git push origin main

# ✨ الموقع يتحدث تلقائياً على Netlify!
```

---

## 👨‍💻 المطور

**Mohammed Saud Al-Rumaihi | محمد سعود الرميحي**
- 🎓 Software Engineer - Second Year
- 🛡️ Cyber Security Graduate (CCT)
- 🌐 [GitHub](https://github.com/MSR9977)

---

## 📄 License

MIT License - Free to use and modify

---

## 🙏 Credits

- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **Rapier** - Physics engine
- **Netlify** - Hosting platform

---

**Made with ❤️ in Saudi Arabia | صنع بحب في السعودية**
