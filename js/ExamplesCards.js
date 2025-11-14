// Example Cards - بطاقات الأمثلة القابلة للسحب
class ExamplesCards {
  constructor() {
    this.examples = [
      {
        id: 'html-basic',
        title: 'HTML',
        titleAr: 'مثال HTML',
        desc: 'Basic HTML structure',
        descAr: 'هيكل HTML أساسي',
        icon: '📄',
        type: 'html',
        html: `<div class="example-box">
  <h1>مرحبا بك</h1>
  <p>هذا مثال HTML بسيط</p>
  <button id="myBtn">اضغط هنا</button>
</div>`,
        css: `.example-box {
  text-align: center;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  color: white;
}

.example-box h1 {
  font-size: 2rem;
  margin-bottom: 15px;
}

.example-box button {
  padding: 12px 30px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.example-box button:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}`,
        js: `document.getElementById('myBtn').addEventListener('click', function() {
  alert('مرحبا! تم النقر على الزر');
});`
      },
      {
        id: 'css-gradient',
        title: 'CSS',
        titleAr: 'مثال CSS',
        desc: 'Beautiful gradients',
        descAr: 'تدرجات جميلة',
        icon: '🎨',
        type: 'css',
        html: `<div class="gradient-container">
  <div class="gradient-box">
    <h2>تدرجات رائعة</h2>
    <p>CSS Gradients</p>
  </div>
</div>`,
        css: `.gradient-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.gradient-box {
  padding: 40px 60px;
  background: linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
  background-size: 300% 300%;
  animation: gradientMove 5s ease infinite;
  border-radius: 20px;
  text-align: center;
  color: white;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}

.gradient-box h2 {
  font-size: 2rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

@keyframes gradientMove {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}`,
        js: ``
      },
      {
        id: 'js-counter',
        title: 'JavaScript',
        titleAr: 'مثال JavaScript',
        desc: 'Interactive counter',
        descAr: 'عداد تفاعلي',
        icon: '⚡',
        type: 'javascript',
        html: `<div class="counter-container">
  <h2>العداد التفاعلي</h2>
  <div class="counter-display" id="counter">0</div>
  <div class="counter-buttons">
    <button onclick="decreaseCounter()">−</button>
    <button onclick="resetCounter()">↻</button>
    <button onclick="increaseCounter()">+</button>
  </div>
</div>`,
        css: `.counter-container {
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
}

.counter-container h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.counter-display {
  font-size: 5rem;
  font-weight: bold;
  margin: 30px 0;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
}

.counter-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.counter-buttons button {
  width: 60px;
  height: 60px;
  font-size: 2rem;
  border: none;
  background: white;
  color: #667eea;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: bold;
}

.counter-buttons button:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 20px rgba(0,0,0,0.3);
}`,
        js: `let count = 0;

function increaseCounter() {
  count++;
  updateDisplay();
}

function decreaseCounter() {
  count--;
  updateDisplay();
}

function resetCounter() {
  count = 0;
  updateDisplay();
}

function updateDisplay() {
  document.getElementById('counter').textContent = count;
}`
      },
      {
        id: 'animation',
        title: 'Animation',
        titleAr: 'مثال Animation',
        desc: 'CSS animations',
        descAr: 'رسوم متحركة CSS',
        icon: '🎬',
        type: 'animation',
        html: `<div class="animation-stage">
  <div class="animated-box">
    <div class="box-content">
      <h3>رسوم متحركة</h3>
      <p>CSS Animation</p>
    </div>
  </div>
</div>`,
        css: `.animation-stage {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border-radius: 15px;
}

.animated-box {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: float 3s ease-in-out infinite;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.box-content {
  text-align: center;
  color: white;
}

.box-content h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(5deg);
  }
  75% {
    transform: translateY(-10px) rotate(-5deg);
  }
}`,
        js: ``
      },
      {
        id: 'form-example',
        title: 'Form',
        titleAr: 'مثال Form',
        desc: 'Interactive form',
        descAr: 'نموذج تفاعلي',
        icon: '📝',
        type: 'form',
        html: `<div class="form-container">
  <h2>نموذج تسجيل</h2>
  <form id="myForm">
    <input type="text" id="username" placeholder="الاسم" required>
    <input type="email" id="email" placeholder="البريد الإلكتروني" required>
    <button type="submit">إرسال</button>
  </form>
  <div id="result"></div>
</div>`,
        css: `.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
}

.form-container h2 {
  text-align: center;
  margin-bottom: 30px;
}

.form-container input {
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-container button {
  width: 100%;
  padding: 15px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.form-container button:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 20px rgba(0,0,0,0.3);
}

#result {
  margin-top: 20px;
  padding: 15px;
  background: rgba(255,255,255,0.2);
  border-radius: 10px;
  text-align: center;
}`,
        js: `document.getElementById('myForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  
  document.getElementById('result').innerHTML = 
    '<strong>تم التسجيل بنجاح!</strong><br>' +
    'الاسم: ' + username + '<br>' +
    'البريد: ' + email;
});`
      }
    ];
    
    this.init();
  }
  
  init() {
    this.createExamplesSection();
    this.setupDragAndDrop();
  }
  
  createExamplesSection() {
    // Find the code editor section
    const editorSection = document.querySelector('.code-editor-section');
    if (!editorSection) return;
    
    // Create examples section
    const examplesSection = document.createElement('div');
    examplesSection.className = 'examples-section';
    
    // Check if mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const mobileHint = isMobile ? '<p style="text-align: center; color: #a0a0a0; font-size: 0.9rem; margin-top: 10px;" data-ar="👆 اسحب البطاقة وأفلتها في المحرر أو منطقة العرض" data-en="👆 Drag the card and drop it in the editor or preview area">👆 اسحب البطاقة وأفلتها في المحرر أو منطقة العرض</p>' : '';
    
    examplesSection.innerHTML = `
      <div class="container">
        <h2 style="text-align: center; margin-bottom: 15px; color: #8400ff;" data-ar="أمثلة جاهزة - اسحب وأفلت في المحرر" data-en="Ready Examples - Drag & Drop to Editor">
          أمثلة جاهزة - اسحب وأفلت في المحرر
        </h2>
        ${mobileHint}
        <div class="examples-container" id="examplesContainer"></div>
      </div>
    `;
    
    // Insert before editor
    editorSection.parentNode.insertBefore(examplesSection, editorSection);
    
    // Render cards
    this.renderCards();
  }
  
  renderCards() {
    const container = document.getElementById('examplesContainer');
    if (!container) return;
    
    const currentLang = document.documentElement.getAttribute('lang') || 'ar';
    
    this.examples.forEach(example => {
      const card = document.createElement('div');
      card.className = 'example-card';
      card.draggable = true;
      card.dataset.exampleId = example.id;
      
      const title = currentLang === 'ar' ? example.titleAr : example.title;
      const desc = currentLang === 'ar' ? example.descAr : example.desc;
      
      card.innerHTML = `
        <div class="example-card-badge">${example.type}</div>
        <div class="example-card-icon">${example.icon}</div>
        <div class="example-card-title">${title}</div>
        <div class="example-card-desc">${desc}</div>
      `;
      
      container.appendChild(card);
    });
  }
  
  setupDragAndDrop() {
    const cards = document.querySelectorAll('.example-card');
    const htmlTextarea = document.querySelector('textarea[placeholder*="HTML"], textarea[placeholder*="تحرير"], #htmlCode');
    const cssTextarea = document.querySelector('textarea[placeholder*="CSS"], textarea[placeholder*="تنسيق"], #cssCode');
    const jsTextarea = document.querySelector('textarea[placeholder*="JavaScript"], textarea[placeholder*="برمجة"], #jsCode, #javascriptCode');
    const preview = document.querySelector('.preview-frame, iframe, #preview');
    
    const dropZones = [htmlTextarea, cssTextarea, jsTextarea, preview].filter(z => z);
    
    // Variables for touch drag
    let touchDraggedCard = null;
    let touchClone = null;
    let currentDropZone = null;
    
    cards.forEach(card => {
      // Mouse drag events
      card.addEventListener('dragstart', (e) => {
        card.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', card.dataset.exampleId);
      });
      
      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
      });
      
      // Touch events for mobile
      card.addEventListener('touchstart', (e) => {
        touchDraggedCard = card;
        card.classList.add('dragging');
        
        // Haptic feedback (vibration)
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
        
        // Create clone for visual feedback
        touchClone = card.cloneNode(true);
        touchClone.style.position = 'fixed';
        touchClone.style.zIndex = '10000';
        touchClone.style.pointerEvents = 'none';
        touchClone.style.opacity = '0.8';
        touchClone.style.width = card.offsetWidth + 'px';
        touchClone.style.height = card.offsetHeight + 'px';
        touchClone.style.transition = 'none';
        touchClone.style.transform = 'scale(1.05)';
        
        const touch = e.touches[0];
        touchClone.style.left = (touch.clientX - card.offsetWidth / 2) + 'px';
        touchClone.style.top = (touch.clientY - card.offsetHeight / 2) + 'px';
        
        document.body.appendChild(touchClone);
        
        // Prevent scrolling while dragging
        document.body.style.overflow = 'hidden';
      }, { passive: true });
      
      card.addEventListener('touchmove', (e) => {
        if (!touchDraggedCard || !touchClone) return;
        
        const touch = e.touches[0];
        touchClone.style.left = (touch.clientX - touchClone.offsetWidth / 2) + 'px';
        touchClone.style.top = (touch.clientY - touchClone.offsetHeight / 2) + 'px';
        
        // Check which drop zone we're over
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        
        // Remove drag-over from all zones
        dropZones.forEach(zone => zone.classList.remove('drag-over'));
        
        // Find the drop zone
        let foundZone = null;
        if (elementBelow) {
          foundZone = dropZones.find(zone => 
            zone === elementBelow || zone.contains(elementBelow)
          );
        }
        
        if (foundZone) {
          foundZone.classList.add('drag-over');
          currentDropZone = foundZone;
        } else {
          currentDropZone = null;
        }
      }, { passive: true });
      
      card.addEventListener('touchend', (e) => {
        if (!touchDraggedCard) return;
        
        card.classList.remove('dragging');
        
        // Restore scrolling
        document.body.style.overflow = '';
        
        // Remove clone
        if (touchClone) {
          touchClone.remove();
          touchClone = null;
        }
        
        // Remove drag-over from all zones
        dropZones.forEach(zone => zone.classList.remove('drag-over'));
        
        // Insert example if dropped on a zone
        if (currentDropZone) {
          // Haptic feedback on successful drop
          if (navigator.vibrate) {
            navigator.vibrate([30, 50, 30]);
          }
          
          const exampleId = touchDraggedCard.dataset.exampleId;
          const example = this.examples.find(ex => ex.id === exampleId);
          
          if (example) {
            this.insertExample(example);
          }
        }
        
        touchDraggedCard = null;
        currentDropZone = null;
      }, { passive: true });
      
      // Cancel drag on touch cancel
      card.addEventListener('touchcancel', () => {
        if (touchDraggedCard) {
          touchDraggedCard.classList.remove('dragging');
          document.body.style.overflow = '';
        }
        
        if (touchClone) {
          touchClone.remove();
          touchClone = null;
        }
        
        dropZones.forEach(zone => zone.classList.remove('drag-over'));
        
        touchDraggedCard = null;
        currentDropZone = null;
      }, { passive: true });
    });
    
    // Setup drop zones for mouse
    dropZones.forEach(zone => {
      zone.classList.add('drop-zone');
      
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        zone.classList.add('drag-over');
      });
      
      zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
      });
      
      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        zone.classList.remove('drag-over');
        
        const exampleId = e.dataTransfer.getData('text/plain');
        const example = this.examples.find(ex => ex.id === exampleId);
        
        if (example) {
          this.insertExample(example);
        }
      });
    });
  }
  
  insertExample(example) {
    const htmlTextarea = document.querySelector('textarea[placeholder*="HTML"], textarea[placeholder*="تحرير"], #htmlCode');
    const cssTextarea = document.querySelector('textarea[placeholder*="CSS"], textarea[placeholder*="تنسيق"], #cssCode');
    const jsTextarea = document.querySelector('textarea[placeholder*="JavaScript"], textarea[placeholder*="برمجة"], #jsCode, #javascriptCode');
    
    if (htmlTextarea) {
      htmlTextarea.value = example.html;
      // Trigger input event for any listeners
      htmlTextarea.dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (cssTextarea) {
      cssTextarea.value = example.css;
      cssTextarea.dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (jsTextarea) {
      jsTextarea.value = example.js;
      jsTextarea.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Trigger preview update with a delay
    setTimeout(() => this.updatePreview(), 100);
    
    // Show notification
    this.showNotification('تم إضافة المثال بنجاح! ✨');
  }
  
  updatePreview() {
    // Try to trigger the editor's render method if it exists
    if (window.codeEditor && window.codeEditor.renderPreview) {
      window.codeEditor.renderPreview();
      return;
    }
    
    // Find the preview button and click it
    const previewBtn = document.querySelector('button[onclick*="renderPreview"], .preview-btn, #previewBtn');
    if (previewBtn) {
      previewBtn.click();
      return;
    }
    
    // Manually update preview if button not found
    const htmlTextarea = document.querySelector('textarea[placeholder*="HTML"], textarea[placeholder*="تحرير"], #htmlCode');
    const cssTextarea = document.querySelector('textarea[placeholder*="CSS"], textarea[placeholder*="تنسيق"], #cssCode');
    const jsTextarea = document.querySelector('textarea[placeholder*="JavaScript"], textarea[placeholder*="برمجة"], #jsCode');
    const preview = document.querySelector('.preview-frame, iframe, #preview');
    
    if (preview && htmlTextarea && cssTextarea && jsTextarea) {
      const htmlContent = `
        <!DOCTYPE html>
        <html dir="rtl">
        <head>
          <meta charset="UTF-8">
          <style>${cssTextarea.value}</style>
        </head>
        <body>
          ${htmlTextarea.value}
          <script>${jsTextarea.value}<\/script>
        </body>
        </html>
      `;
      
      if (preview.tagName === 'IFRAME') {
        preview.srcdoc = htmlContent;
      } else if (preview.contentWindow) {
        const doc = preview.contentWindow.document;
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
    }
  }
  
  showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 10000;
      animation: slideIn 0.5s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.5s ease';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }
  
  updateLanguage(lang) {
    const container = document.getElementById('examplesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    this.renderCards();
  }
}

// Add animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ExamplesCards;
}
