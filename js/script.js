// Hamburger Menu Functionality
class HamburgerMenu {
    constructor() {
        this.hamburger = document.getElementById('hamburgerMenu');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
            
            // Close menu when clicking on a link (but NOT dropdown links)
            const navLinks = this.navMenu.querySelectorAll('a:not(.dropdown > a)');
            navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
        }
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}

// Dropdown Menu Toggle Functionality
class DropdownMenu {
    constructor() {
        this.dropdowns = document.querySelectorAll('.dropdown');
        // كشف أدق للأجهزة التي تدعم hover
        // استخدم window.innerWidth كـ fallback إضافي
        this.isHoverable = window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth > 768;
        this.init();
        // إعادة التهيئة لو تغير حجم الشاشة / تغير خصائص الإدخال
        window.addEventListener('resize', () => this.handleResize());
    }

    init() {
        // تأكد أن أي ربط سابق تم ازالته لو كان هناك إعادة تهيئة
        this.dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('a');

            // إزالة أي مستمعين قد يكونون مُضافين مسبقاً (safety)
            if (dropdownLink && dropdownLink._dropdownClickHandler) {
                dropdownLink.removeEventListener('click', dropdownLink._dropdownClickHandler);
                delete dropdownLink._dropdownClickHandler;
            }

            if (dropdownLink) {
                // ربط الحدث مع التحقق داخل المعالج
                const handler = (e) => {
                    // إذا الجهاز يدعم hover (desktop) فلا نتعامل مع click كـ toggle
                    if (this.isHoverable) {
                        return; // اترك الـ hover (CSS) يفعل عمله على الشاشات الكبيرة
                    }
                    // للأجهزة بدون hover (هاتف/تابلت): منع التنقل الافتراضي وفتح/إغلاق بالقيمة .active
                    e.preventDefault();
                    this.toggleDropdown(dropdown);
                };
                dropdownLink.addEventListener('click', handler);
                // خزّن المرجع لتتمكن من إزالته لاحقاً
                dropdownLink._dropdownClickHandler = handler;

                // accessibility: اضف aria-expanded الافتراضية
                dropdownLink.setAttribute('aria-haspopup', 'true');
                dropdownLink.setAttribute('aria-expanded', dropdown.classList.contains('active') ? 'true' : 'false');
            }
        });

        // إغلاق القوائم عند النقر خارجها (فقط على الأجهزة بدون hover)
        if (!this.isHoverable) {
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.dropdown')) {
                    this.closeAllDropdowns();
                }
            }, true);
        }
    }

    handleResize() {
        const nowHoverable = window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth > 768;
        if (nowHoverable !== this.isHoverable) {
            this.isHoverable = nowHoverable;
            // إعادة تهيئة الوصول لربط/فكّ الأحداث حسب الحاجة
            this.init();
        }
    }

    toggleDropdown(dropdown) {
        const dropdownLink = dropdown.querySelector('a');
        const isActive = dropdown.classList.contains('active');

        // إذا كان هذا الـ dropdown مفتوحاً بالفعل، أغلقه
        if (isActive) {
            dropdown.classList.remove('active');
            if (dropdownLink) dropdownLink.setAttribute('aria-expanded', 'false');
        } else {
            // وإلا، أغلق الكل أولاً ثم افتح هذا الواحد
            this.closeAllDropdowns();
            dropdown.classList.add('active');
            if (dropdownLink) dropdownLink.setAttribute('aria-expanded', 'true');
        }
    }

    closeAllDropdowns() {
        this.dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const link = dropdown.querySelector('a');
            if (link) link.setAttribute('aria-expanded', 'false');
        });
    }
}

// Language Toggle Functionality with localStorage
class LanguageManager {
    constructor() {
        // Load saved language or default to English
        this.currentLang = this.loadLanguage();
        this.init();
    }

    // Load language from localStorage or return default 'en'
    loadLanguage() {
        const savedLang = localStorage.getItem('preferredLanguage');
        return savedLang || 'en'; // Default to English
    }

    // Save language to localStorage
    saveLanguage(lang) {
        localStorage.setItem('preferredLanguage', lang);
    }

    init() {
        this.langToggle = document.getElementById('langToggle');
        this.bindEvents();
        // Apply saved language immediately
        this.updateDirection();
        this.updateContent();
        this.updateToggleButton();
    }

    bindEvents() {
        this.langToggle.addEventListener('click', () => {
            this.toggleLanguage();
        });
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
        // Save to localStorage
        this.saveLanguage(this.currentLang);
        this.updateContent();
        this.updateDirection();
        this.updateToggleButton();
    }

    updateContent() {
        const elements = document.querySelectorAll('[data-ar][data-en]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLang}`);
            if (text) {
                element.textContent = text;
            }
        });
    }

    updateDirection() {
        document.documentElement.setAttribute('lang', this.currentLang);
        document.documentElement.setAttribute('dir', this.currentLang === 'ar' ? 'rtl' : 'ltr');
    }

    updateToggleButton() {
        const buttonText = this.langToggle.querySelector('span');
        buttonText.textContent = this.currentLang === 'ar' ? 'EN' : 'عر';
    }
}

// Interactive Demo Functionality
class InteractiveDemo {
    constructor() {
        this.colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
        this.currentColorIndex = 0;
        this.elementCounter = 1;
        this.init();
    }

    init() {
        this.demoArea = document.getElementById('demoArea');
        this.changeColorBtn = document.getElementById('changeColor');
        this.addElementBtn = document.getElementById('addElement');
        this.animateBtn = document.getElementById('animate');
        this.resetBtn = document.getElementById('resetDemo');
        
        this.bindEvents();
    }

    bindEvents() {
        this.changeColorBtn.addEventListener('click', () => {
            this.changeColors();
        });

        this.addElementBtn.addEventListener('click', () => {
            this.addElement();
        });

        this.animateBtn.addEventListener('click', () => {
            this.animateElements();
        });

        this.resetBtn.addEventListener('click', () => {
            this.resetDemo();
        });
    }

    changeColors() {
        const elements = this.demoArea.querySelectorAll('.demo-element');
        elements.forEach((element, index) => {
            const colorIndex = (this.currentColorIndex + index) % this.colors.length;
            element.style.backgroundColor = this.colors[colorIndex];
            element.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        });
        
        this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
    }

    addElement() {
        const newElement = document.createElement('div');
        newElement.className = 'demo-element';
        newElement.textContent = `عنصر ${this.elementCounter}`;
        newElement.style.backgroundColor = this.colors[this.currentColorIndex];
        newElement.style.opacity = '0';
        newElement.style.transform = 'scale(0)';
        
        this.demoArea.appendChild(newElement);
        
        // Animate in
        setTimeout(() => {
            newElement.style.transition = 'all 0.3s ease';
            newElement.style.opacity = '1';
            newElement.style.transform = 'scale(1)';
        }, 10);
        
        this.elementCounter++;
        this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
    }

    animateElements() {
        const elements = this.demoArea.querySelectorAll('.demo-element');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.transform = 'rotate(360deg) scale(1.2)';
                setTimeout(() => {
                    element.style.transform = 'rotate(0deg) scale(1)';
                }, 500);
            }, index * 100);
        });
    }

    resetDemo() {
        // Remove all elements except the first one
        const elements = this.demoArea.querySelectorAll('.demo-element');
        elements.forEach((element, index) => {
            if (index > 0) {
                element.style.opacity = '0';
                element.style.transform = 'scale(0)';
                setTimeout(() => {
                    element.remove();
                }, 300);
            }
        });

        // Reset the first element
        if (elements.length > 0) {
            const firstElement = elements[0];
            firstElement.style.backgroundColor = '#3498db';
            firstElement.style.transform = 'rotate(0deg) scale(1)';
            firstElement.textContent = 'عنصر تفاعلي';
        }

        // Reset counters
        this.elementCounter = 1;
        this.currentColorIndex = 0;
    }
}

// Smooth Scrolling for Navigation
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                
                // تجنب معالجة الروابط الفارغة أو التي تحتوي على # فقط
                if (!targetId || targetId === '#' || targetId.length <= 1) {
                    return;
                }
                
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Scroll Animation Observer - Optimized with lazy loading
class ScrollAnimations {
    constructor() {
        this.observedCount = 0;
        this.maxObserved = isMobileDevice ? 30 : 100; // More on desktop
        this.batchSize = 10; // Load in batches
        this.init();
    }

    init() {
        // Optimized IntersectionObserver with better performance
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Use requestAnimationFrame for smooth animations
                    requestAnimationFrame(() => {
                        entry.target.classList.add('animate-in');
                    });
                    // Unobserve after animation to reduce overhead
                    this.observer.unobserve(entry.target);
                    this.observedCount--;
                    
                    // Load more elements if available
                    if (this.observedCount < this.batchSize) {
                        this.loadNextBatch();
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: isMobileDevice ? '0px 0px -100px 0px' : '0px 0px -50px 0px' // Larger margin on mobile
        });

        this.addAnimationStyles();
        // Start loading elements lazily
        PerformanceUtils.idleCallback(() => {
            this.observeElements();
        });
    }

    observeElements() {
        this.elementsToAnimate = document.querySelectorAll(
            '.content-card, .concept-item, .se-item, .selector-item, .function-item, .framework-card'
        );
        
        // Load first batch
        this.loadNextBatch();
    }
    
    loadNextBatch() {
        if (!this.elementsToAnimate) return;
        const startIndex = this.observedCount;
        const endIndex = Math.min(startIndex + this.batchSize, this.elementsToAnimate.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            const element = this.elementsToAnimate[i];
            if (element && !element.classList.contains('animate-on-scroll')) {
                element.classList.add('animate-on-scroll');
                this.observer.observe(element);
                this.observedCount++;
            }
        }
    }

    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .animate-on-scroll.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
}

// Code Example Highlighter
class CodeHighlighter {
    constructor() {
        this.init();
    }

    init() {
        const codeBlocks = document.querySelectorAll('.code-example code');
        codeBlocks.forEach(block => {
            this.highlightSyntax(block);
            this.addCopyButton(block.parentElement);
        });
    }

    highlightSyntax(codeBlock) {
        let html = codeBlock.innerHTML;
        
        // Highlight JavaScript keywords
        const keywords = ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'async', 'await', 'class', 'export', 'import'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            html = html.replace(regex, `<span style="color: #f39c12;">${keyword}</span>`);
        });
        
        // Highlight strings
        html = html.replace(/(["'])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span style="color: #2ecc71;">$1$2$3</span>');
        
        // Highlight comments
        html = html.replace(/(\/\/.*$)/gm, '<span style="color: #95a5a6;">$1</span>');
        
        codeBlock.innerHTML = html;
    }

    addCopyButton(codeContainer) {
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'نسخ';
        copyBtn.className = 'copy-btn';
        copyBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #3498db;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        codeContainer.style.position = 'relative';
        codeContainer.appendChild(copyBtn);
        
        codeContainer.addEventListener('mouseenter', () => {
            copyBtn.style.opacity = '1';
        });
        
        codeContainer.addEventListener('mouseleave', () => {
            copyBtn.style.opacity = '0';
        });
        
        copyBtn.addEventListener('click', () => {
            const codeText = codeContainer.querySelector('code').textContent;
            navigator.clipboard.writeText(codeText).then(() => {
                copyBtn.textContent = 'تم النسخ!';
                setTimeout(() => {
                    copyBtn.textContent = 'نسخ';
                }, 2000);
            });
        });
    }
}

// Navbar Scroll Effect
class NavbarScrollEffect {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                this.navbar.style.backdropFilter = 'blur(10px)';
            } else {
                this.navbar.style.background = '#ffffff';
                this.navbar.style.backdropFilter = 'none';
            }
        });
    }
}

// Typing Animation for Hero Section
class TypingAnimation {
    constructor() {
        this.init();
    }

    init() {
        const heroTitle = document.querySelector('.hero-content h1');
        const heroText = document.querySelector('.hero-content p');
        
        if (heroTitle && heroText) {
            this.typeText(heroTitle, heroTitle.textContent, 50);
            setTimeout(() => {
                this.typeText(heroText, heroText.textContent, 30);
            }, 1000);
        }
    }

    typeText(element, text, speed) {
        element.textContent = '';
        element.style.opacity = '1';
        let i = 0;
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
}

// Progress Bar for Reading
class ReadingProgress {
    constructor() {
        this.createProgressBar();
        this.init();
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.id = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #3498db, #2ecc71);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
    }

    init() {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            document.getElementById('reading-progress').style.width = scrolled + '%';
        });
    }
}

// Tech Skills Interactive Effects
class TechSkillsInteraction {
    constructor() {
        this.init();
    }

    init() {
        this.addTechItemInteractions();
        this.addExpertiseCategoryAnimations();
    }

    addTechItemInteractions() {
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach(item => {
            item.addEventListener('click', () => {
                this.showTechInfo(item);
            });
            
            item.addEventListener('mouseenter', () => {
                this.highlightRelatedTech(item);
            });
            
            item.addEventListener('mouseleave', () => {
                this.resetTechHighlight();
            });
        });
        
        // Add interactions for certification items
        const certItems = document.querySelectorAll('.cert-item');
        certItems.forEach(item => {
            item.addEventListener('click', () => {
                this.showTechInfo(item);
            });
        });
    }

    showTechInfo(techItem) {
        const techName = techItem.textContent;
        const techInfo = this.getTechInfo(techName);
        
        // Create info popup
        const popup = document.createElement('div');
        popup.className = 'tech-info-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <h4>${techName}</h4>
                <p>${techInfo}</p>
                <button class="close-popup">×</button>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Add styles
        popup.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const popupContent = popup.querySelector('.popup-content');
        popupContent.style.cssText = `
            background: linear-gradient(135deg, #2c3e50, #34495e);
            color: white;
            padding: 2rem;
            border-radius: 10px;
            max-width: 400px;
            text-align: center;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
        
        // Animate in
        setTimeout(() => {
            popup.style.opacity = '1';
            popupContent.style.transform = 'scale(1)';
        }, 10);
        
        // Close functionality
        const closeBtn = popup.querySelector('.close-popup');
        closeBtn.addEventListener('click', () => {
            popup.style.opacity = '0';
            setTimeout(() => popup.remove(), 300);
        });
        
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.opacity = '0';
                setTimeout(() => popup.remove(), 300);
            }
        });
    }

    getTechInfo(techName) {
        const techInfoMap = {
            'HTML': 'لغة ترميز النصوص التشعبية - أساس بناء صفحات الويب',
            'CSS': 'أوراق الأنماط المتتالية - لتصميم وتنسيق صفحات الويب',
            'JavaScript': 'لغة البرمجة الأساسية للويب - تضيف التفاعلية والديناميكية',
            'React': 'مكتبة JavaScript لبناء واجهات المستخدم التفاعلية',
            'TypeScript': 'إضافة الأنواع الثابتة لـ JavaScript لتطوير أكثر أماناً',
            'Dart': 'لغة برمجة حديثة من Google لتطوير التطبيقات',
            'Flutter': 'إطار عمل لتطوير التطبيقات متعددة المنصات',
            'Native Platforms': 'تطوير التطبيقات الأصلية للمنصات المختلفة',
            'Mobile Apps': 'تطبيقات الهاتف المحمول - Android و iOS',
            'Python': 'لغة برمجة قوية ومرنة للذكاء الاصطناعي وعلم البيانات',
            'PyTorch': 'مكتبة التعلم العميق والشبكات العصبية',
            'Neural Networks': 'الشبكات العصبية الاصطناعية - محاكاة الدماغ البشري',
            'Machine Learning': 'تعلم الآلة - تدريب الحاسوب على التعلم من البيانات',
            'Fine-tuning': 'ضبط دقيق للنماذج - تحسين أداء النماذج المدربة مسبقاً',
            'Prompt Engineering': 'هندسة التلقين - فن صياغة الأوامر للذكاء الاصطناعي',
            'AI Expert': 'خبير في الذكاء الاصطناعي وتطبيقاته المختلفة',
            'Google Colab': 'منصة Google للبرمجة والتعلم الآلي في السحابة',
            'ML Fundamentals': 'أساسيات تعلم الآلة والخوارزميات الذكية',
            'Linux Expert': 'خبير أنظمة لينكس - إدارة الخوادم والشبكات',
            'PowerShell': 'أتمتة المهام وإدارة أنظمة ويندوز',
            'Bash Scripting': 'كتابة السكريبتات وأتمتة المهام في لينكس',
            'Network Security': 'أمن الشبكات والحماية من التهديدات',
            'Ethical Hacking': 'الاختراق الأخلاقي واختبار الاختراق',
            'CCT': 'شهادة تقني الشبكات المعتمد من سيسكو',
            'CEH': 'شهادة الهاكر الأخلاقي المعتمد',
            'CompTIA Security+': 'شهادة أساسيات الأمن السيبراني',
            'CISSP': 'شهادة محترف أمن نظم المعلومات المعتمد'
        };
        
        return techInfoMap[techName] || 'تقنية متقدمة في مجال التطوير والبرمجة';
    }

    highlightRelatedTech(hoveredItem) {
        const allTechItems = document.querySelectorAll('.tech-item');
        allTechItems.forEach(item => {
            if (item !== hoveredItem) {
                item.style.opacity = '0.5';
            }
        });
    }

    resetTechHighlight() {
        const allTechItems = document.querySelectorAll('.tech-item');
        allTechItems.forEach(item => {
            item.style.opacity = '1';
        });
    }

    addExpertiseCategoryAnimations() {
        const categories = document.querySelectorAll('.expertise-category');
        categories.forEach((category, index) => {
            category.style.animationDelay = `${index * 0.2}s`;
            category.classList.add('fade-in-category');
        });
        
        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            .fade-in-category {
                opacity: 0;
                transform: translateY(30px);
                animation: fadeInCategory 0.6s ease forwards;
            }
            
            @keyframes fadeInCategory {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Magic Bento Cards Functionality
class MagicBentoCards {
    constructor() {
        this.grid = document.getElementById('bentoGrid');
        this.cards = document.querySelectorAll('.bento-card');
        this.init();
    }

    init() {
        if (!this.grid) return;

        this.cards.forEach(card => {
            // Mouse move for gradient effect
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
            
            // Click effect
            card.addEventListener('click', (e) => this.handleClick(e, card));
            
            // Hover particles
            card.addEventListener('mouseenter', () => this.createParticles(card));
        });

        // Global spotlight effect
        document.addEventListener('mousemove', (e) => this.updateGlobalSpotlight(e));
    }

    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        
        card.style.setProperty('--mouse-x', `${percentX}%`);
        card.style.setProperty('--mouse-y', `${percentY}%`);
    }

    handleMouseLeave(card) {
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
    }

    handleClick(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(132, 0, 255, 0.6), transparent);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple-expand 0.6s ease-out forwards;
        `;
        
        card.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    createParticles(card) {
        const particleCount = 8;
        const rect = card.getBoundingClientRect();
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = `${Math.random() * rect.width}px`;
                particle.style.top = `${Math.random() * rect.height}px`;
                particle.style.animationDelay = `${Math.random() * 2}s`;
                
                card.appendChild(particle);
                
                setTimeout(() => particle.remove(), 3000);
            }, i * 100);
        }
    }

    updateGlobalSpotlight(e) {
        if (!this.grid) return;
        
        const gridRect = this.grid.getBoundingClientRect();
        const inGrid = e.clientX >= gridRect.left && e.clientX <= gridRect.right &&
                      e.clientY >= gridRect.top && e.clientY <= gridRect.bottom;
        
        if (!inGrid) return;
        
        this.cards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const centerX = cardRect.left + cardRect.width / 2;
            const centerY = cardRect.top + cardRect.height / 2;
            const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
            
            const maxDistance = 400;
            const intensity = Math.max(0, (maxDistance - distance) / maxDistance);
            
            card.style.filter = `brightness(${1 + intensity * 0.3})`;
        });
    }
}

// Add ripple animation to CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-expand {
        from {
            width: 10px;
            height: 10px;
            opacity: 1;
        }
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Performance optimization utilities
const PerformanceUtils = {
    // Debounce function for limiting function calls
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for limiting function calls
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Use requestIdleCallback with fallback
    idleCallback(callback) {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(callback, { timeout: 2000 });
        } else {
            setTimeout(callback, 1);
        }
    },
    
    // Lazy initialize component
    lazyInit(componentClass, delay = 0) {
        if (delay > 0) {
            setTimeout(() => new componentClass(), delay);
        } else {
            this.idleCallback(() => new componentClass());
        }
    }
};

// Detect mobile device for adaptive performance
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

// Initialize all components with smart loading
document.addEventListener('DOMContentLoaded', () => {
    // Essential components - load immediately
    new HamburgerMenu();
    new DropdownMenu();
    new LanguageManager();
    new SmoothScroll();
    new NavbarScrollEffect();
    
    // Heavy components - load with lazy initialization
    // Use requestIdleCallback for non-critical components
    PerformanceUtils.idleCallback(() => {
        new InteractiveDemo();
        new ScrollAnimations();
        new CodeHighlighter();
        new ReadingProgress();
        new TechSkillsInteraction();
        new EditorResizer();
        new CodeEditor();
        new MagicBentoCards();
        
        // Add interactive effects with delay
        setTimeout(() => {
            addHoverEffects();
            addClickEffects();
        }, 100);
    });
    
    console.log('🚀 موقع البرمجة التفاعلي جاهز!');
});

// Additional Interactive Effects - Optimized with event delegation
function addHoverEffects() {
    // Use event delegation for better performance
    const container = document.body;
    
    // Throttled hover handler
    const handleHover = PerformanceUtils.throttle((e) => {
        const card = e.target.closest('.content-card, .framework-card, .se-item');
        if (!card) return;
        
        if (e.type === 'mouseenter') {
            requestAnimationFrame(() => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.transition = 'transform 0.3s ease';
            });
        } else if (e.type === 'mouseleave') {
            requestAnimationFrame(() => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        }
    }, 16); // ~60fps
    
    // Use passive listeners and event delegation
    container.addEventListener('mouseenter', handleHover, { passive: true, capture: true });
    container.addEventListener('mouseleave', handleHover, { passive: true, capture: true });
}

function addClickEffects() {
    // Use event delegation for better performance
    const container = document.body;
    
    // Optimized click handler with event delegation
    const handleClick = (e) => {
        const button = e.target.closest('button, .cta-btn');
        if (!button) return;
        
        // Use requestAnimationFrame for smooth animation
        requestAnimationFrame(() => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = (e.clientX || e.touches?.[0]?.clientX || 0) - rect.left - size / 2;
            const y = (e.clientY || e.touches?.[0]?.clientY || 0) - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1000;
            `;
            
            // Ensure button has proper positioning
            if (getComputedStyle(button).position === 'static') {
                button.style.position = 'relative';
            }
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            // Clean up after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    };
    
    // Use passive listeners for better scroll performance
    container.addEventListener('click', handleClick, { passive: true });
    container.addEventListener('touchend', handleClick, { passive: true });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Utility Functions for DOM Manipulation Examples
const DOMUtils = {
    // getElementById example
    getElementByIdExample: function() {
        const element = document.getElementById('demoArea');
        console.log('Element found:', element);
        return element;
    },
    
    // querySelector example
    querySelectorExample: function() {
        const element = document.querySelector('.demo-element');
        console.log('First demo element:', element);
        return element;
    },
    
    // querySelectorAll example
    querySelectorAllExample: function() {
        const elements = document.querySelectorAll('.demo-element');
        console.log('All demo elements:', elements);
        return elements;
    },
    
    // addEventListener example
    addEventListenerExample: function() {
        const button = document.getElementById('changeColor');
        if (button) {
            button.addEventListener('click', function() {
                console.log('Button clicked!');
            });
        }
    },
    
    // Array methods examples
    arrayMethodsExample: function() {
        const numbers = [1, 2, 3, 4, 5];
        
        // map example
        const doubled = numbers.map(n => n * 2);
        console.log('Doubled:', doubled);
        
        // filter example
        const filtered = numbers.filter(n => n > 3);
        console.log('Filtered:', filtered);
        
        // reduce example
        const sum = numbers.reduce((acc, n) => acc + n, 0);
        console.log('Sum:', sum);
        
        return { doubled, filtered, sum };
    },
    
    // Async/Await example
    asyncAwaitExample: async function() {
        try {
            // Simulate API call
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
            const data = await response.json();
            console.log('Fetched data:', data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
};

// Make DOMUtils available globally for educational purposes
window.DOMUtils = DOMUtils;

// Editor Resizer Functionality
class EditorResizer {
    constructor() {
        this.resizer = document.getElementById('editorResizer');
        this.editorPanel = document.querySelector('.editor-panel');
        this.previewPanel = document.querySelector('.preview-panel');
        this.container = document.querySelector('.code-editor-container');
        this.isDragging = false;
        this.init();
    }

    init() {
        if (!this.resizer) return;

        this.resizer.addEventListener('mousedown', (e) => this.startDragging(e));
        this.resizer.addEventListener('touchstart', (e) => this.startDragging(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('touchmove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.stopDragging());
        document.addEventListener('touchend', () => this.stopDragging());
    }

    startDragging(e) {
        this.isDragging = true;
        this.resizer.classList.add('dragging');
        const isVertical = window.innerWidth <= 1024;
        document.body.style.cursor = isVertical ? 'row-resize' : 'col-resize';
        document.body.style.userSelect = 'none';
        e.preventDefault();
    }

    drag(e) {
        if (!this.isDragging) return;

        const containerRect = this.container.getBoundingClientRect();
        const isVertical = window.innerWidth <= 1024;
        
        if (isVertical) {
            // Vertical drag for mobile/tablet
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const offsetY = clientY - containerRect.top;
            const containerHeight = containerRect.height;
            
            let percentage = (offsetY / containerHeight) * 100;
            percentage = Math.max(30, Math.min(70, percentage));

            this.editorPanel.style.flex = `0 0 ${percentage}%`;
            this.previewPanel.style.flex = `0 0 ${100 - percentage}%`;
        } else {
            // Horizontal drag for desktop
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const offsetX = clientX - containerRect.left;
            const containerWidth = containerRect.width;
            
            let percentage = (offsetX / containerWidth) * 100;
            percentage = Math.max(30, Math.min(70, percentage));

            this.editorPanel.style.flex = `0 0 ${percentage}%`;
            this.previewPanel.style.flex = `0 0 ${100 - percentage}%`;
        }
        
        e.preventDefault();
    }

    stopDragging() {
        if (this.isDragging) {
            this.isDragging = false;
            this.resizer.classList.remove('dragging');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    }
}

// Code Editor Functionality
class CodeEditor {
    constructor() {
        this.currentZoom = 1;
        this.minZoom = 0.8;
        this.maxZoom = 2.5;
        this.zoomStep = 0.1;
        this.init();
    }

    init() {
        this.htmlCode = document.getElementById('htmlCode');
        this.cssCode = document.getElementById('cssCode');
        this.javascriptCode = document.getElementById('javascriptCode');
        this.previewFrame = document.getElementById('previewFrame');
        this.runBtn = document.getElementById('runCode');
        this.resetBtn = document.getElementById('resetCode');
        this.zoomInBtn = document.getElementById('zoomIn');
        this.zoomOutBtn = document.getElementById('zoomOut');
        this.editorTabs = document.querySelectorAll('.editor-tab');

        this.bindEvents();
        this.renderPreview();
    }

    bindEvents() {
        // Tab switching
        this.editorTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Zoom buttons
        this.zoomInBtn.addEventListener('click', () => {
            this.zoomIn();
        });

        this.zoomOutBtn.addEventListener('click', () => {
            this.zoomOut();
        });

        // Run button
        this.runBtn.addEventListener('click', () => {
            this.renderPreview();
        });

        // Reset button
        this.resetBtn.addEventListener('click', () => {
            this.resetCode();
        });

        // Auto-run on code change (optional - commented for better performance)
        // this.htmlCode.addEventListener('input', () => this.renderPreview());
        // this.cssCode.addEventListener('input', () => this.renderPreview());
        // this.javascriptCode.addEventListener('input', () => this.renderPreview());
    }

    switchTab(tabName) {
        // Update active tab button
        this.editorTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            }
        });

        // Update active textarea
        const textareas = document.querySelectorAll('.code-textarea');
        textareas.forEach(textarea => {
            textarea.classList.remove('active');
            if (textarea.id === `${tabName}Code`) {
                textarea.classList.add('active');
            }
        });
    }

    zoomIn() {
        if (this.currentZoom < this.maxZoom) {
            this.currentZoom += this.zoomStep;
            this.applyZoom();
            this.showZoomIndicator();
        }
    }

    zoomOut() {
        if (this.currentZoom > this.minZoom) {
            this.currentZoom -= this.zoomStep;
            this.applyZoom();
            this.showZoomIndicator();
        }
    }

    applyZoom() {
        const textareas = document.querySelectorAll('.code-textarea');
        textareas.forEach(textarea => {
            textarea.style.fontSize = (1.1 * this.currentZoom) + 'rem';
            textarea.style.lineHeight = (1.8 * this.currentZoom);
            textarea.style.padding = (2 * this.currentZoom) + 'rem';
        });
    }

    showZoomIndicator() {
        // Remove existing indicator
        const existingIndicator = document.querySelector('.zoom-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }

        // Create new indicator
        const indicator = document.createElement('div');
        indicator.className = 'zoom-indicator';
        indicator.textContent = `${Math.round(this.currentZoom * 100)}%`;
        document.body.appendChild(indicator);

        // Remove after 1 second
        setTimeout(() => {
            indicator.classList.add('fade-out');
            setTimeout(() => indicator.remove(), 300);
        }, 1000);
    }

    renderPreview() {
        const html = this.htmlCode.value;
        const css = this.cssCode.value;
        const javascript = this.javascriptCode.value;

        const completeHTML = `
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    body {
                        font-family: 'Cairo', sans-serif;
                        padding: 20px;
                    }
                    ${css}
                </style>
            </head>
            <body>
                ${html}
                <script>
                    ${javascript}
                </script>
            </body>
            </html>
        `;

        this.previewFrame.srcdoc = completeHTML;
    }

    resetCode() {
        this.htmlCode.value = `<!-- النسخة العربية -->
<div class="container-arabic">
  <h1>مرحبا بك</h1>
  <button id="clickText-ar" class="magic-button">
    <span>انقر هنا</span>
  </button>
</div>

<!-- English version -->
<div class="container-english">
  <h1>Hello World</h1>
  <button id="clickText-en" class="magic-button">
    <span>Click Me</span>
  </button>
</div>`;

        this.cssCode.value = `/* تنسيق النسخة العربية */
.container-arabic {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 20px;
  color: white;
  margin-bottom: 20px;
}

.container-arabic h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-family: 'Cairo', sans-serif;
}

/* English version styling */
.container-english {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 100%);
  border-radius: 20px;
  color: white;
  margin-bottom: 20px;
}

.container-english h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-family: 'Inter', sans-serif;
}

/* Magic Button Styling - أنيق وأسود */
.magic-button {
  position: relative;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  border: 2px solid #333;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.magic-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.magic-button:hover {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border-color: #555;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.6);
  transform: translateY(-2px);
}

.magic-button:hover::before {
  width: 300px;
  height: 300px;
}

.magic-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
}

/* أنيميشن عند النقر - Animation on click */
.magic-button.clicked {
  animation: pulse 0.5s ease;
  background: linear-gradient(135deg, #8400ff 0%, #6200cc 100%);
  border-color: #8400ff;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}`;


        this.javascriptCode.value = `// يمكنك كتابة أكوادك هنا
console.log('محرر الأكواد التفاعلي جاهز!');

// تفاعل الزر العربي - Arabic button interaction
const arabicBtn = document.getElementById('clickText-ar');
if (arabicBtn) {
  arabicBtn.addEventListener('click', function() {
    console.log('تم النقر على الزر العربي');
    
    // إضافة أنيميشن
    this.classList.add('clicked');
    
    // تغيير النص
    const span = this.querySelector('span');
    const originalText = span.textContent;
    span.textContent = 'تم النقر! ✨';
    
    // إعادة النص بعد ثانية
    setTimeout(() => {
      this.classList.remove('clicked');
      span.textContent = originalText;
    }, 1000);
  });
}

// English button interaction
const englishBtn = document.getElementById('clickText-en');
if (englishBtn) {
  englishBtn.addEventListener('click', function() {
    console.log('English button clicked!');
    
    // Add animation
    this.classList.add('clicked');
    
    // Change text
    const span = this.querySelector('span');
    const originalText = span.textContent;
    span.textContent = 'Clicked! ✨';
    
    // Reset after 1 second
    setTimeout(() => {
      this.classList.remove('clicked');
      span.textContent = originalText;
    }, 1000);
  });
}`;

        this.renderPreview();
    }
}