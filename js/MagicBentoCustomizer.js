// Magic Bento Customizer - لوحة التحكم التفاعلية
class MagicBentoCustomizer {
  constructor(containerId, magicBentoInstance) {
    this.container = document.getElementById(containerId);
    this.magicBento = magicBentoInstance;
    this.magnifierActive = false;
    
    // Make this instance globally accessible for long press
    window.magicBentoCustomizer = this;
    
    if (!this.container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }
    
    // Default settings
    this.settings = {
      enableStars: true,
      enableSpotlight: true,
      enableBorderGlow: true,
      disableAnimations: false,
      spotlightRadius: 300,
      particleCount: 12,
      enableTilt: false,
      clickEffect: true,
      enableMagnetism: true,
      glowColor: '132, 0, 255'
    };
    
    this.init();
  }
  
  init() {
    this.createCustomizerPanel();
    this.attachEventListeners();
  }
  
  createCustomizerPanel() {
    const panel = document.createElement('div');
    panel.className = 'bento-customizer-panel';
    panel.innerHTML = `
      <div class="customizer-header">
        <h3 data-ar="تخصيص البطاقات" data-en="Customize Cards">تخصيص البطاقات</h3>
        <button class="customizer-toggle" id="customizerToggle">
          <i class="fas fa-cog"></i>
        </button>
      </div>
      
      <div class="customizer-content" id="customizerContent">
        <!-- Spotlight Radius Slider -->
        <div class="customizer-control">
          <label class="control-label">
            <span data-ar="نطاق الإضاءة" data-en="Spotlight Radius">نطاق الإضاءة</span>
            <span class="control-value" id="spotlightValue">300px</span>
          </label>
          <input 
            type="range" 
            id="spotlightSlider" 
            class="control-slider"
            min="50" 
            max="800" 
            step="10" 
            value="300"
          />
        </div>
        
        <!-- Particle Count Slider -->
        <div class="customizer-control">
          <label class="control-label">
            <span data-ar="عدد الجزيئات" data-en="Particle Count">عدد الجزيئات</span>
            <span class="control-value" id="particleValue">12</span>
          </label>
          <input 
            type="range" 
            id="particleSlider" 
            class="control-slider"
            min="4" 
            max="30" 
            step="2" 
            value="12"
          />
        </div>
        
        <!-- Switches -->
        <div class="customizer-switches">
          <div class="switch-control">
            <label class="switch-label">
              <span data-ar="تأثير النجوم" data-en="Stars Effect">تأثير النجوم</span>
              <label class="switch">
                <input type="checkbox" id="starsSwitch" checked>
                <span class="switch-slider"></span>
              </label>
            </label>
          </div>
          
          <div class="switch-control">
            <label class="switch-label">
              <span data-ar="الإضاءة المتتبعة" data-en="Spotlight Effect">الإضاءة المتتبعة</span>
              <label class="switch">
                <input type="checkbox" id="spotlightSwitch" checked>
                <span class="switch-slider"></span>
              </label>
            </label>
          </div>
          
          <div class="switch-control">
            <label class="switch-label">
              <span data-ar="توهج الحدود" data-en="Border Glow">توهج الحدود</span>
              <label class="switch">
                <input type="checkbox" id="glowSwitch" checked>
                <span class="switch-slider"></span>
              </label>
            </label>
          </div>
          
          <div class="switch-control">
            <label class="switch-label">
              <span data-ar="التأثير ثلاثي الأبعاد" data-en="Tilt Effect">التأثير ثلاثي الأبعاد</span>
              <label class="switch">
                <input type="checkbox" id="tiltSwitch">
                <span class="switch-slider"></span>
              </label>
            </label>
          </div>
          
          <div class="switch-control">
            <label class="switch-label">
              <span data-ar="تأثير النقر" data-en="Click Effect">تأثير النقر</span>
              <label class="switch">
                <input type="checkbox" id="clickSwitch" checked>
                <span class="switch-slider"></span>
              </label>
            </label>
          </div>
          
          <div class="switch-control">
            <label class="switch-label">
              <span data-ar="التأثير المغناطيسي" data-en="Magnetism">التأثير المغناطيسي</span>
              <label class="switch">
                <input type="checkbox" id="magnetismSwitch" checked>
                <span class="switch-slider"></span>
              </label>
            </label>
          </div>
          
          <div class="switch-control">
            <label class="switch-label">
              <span data-ar="تعطيل كل التأثيرات" data-en="Disable Animations">تعطيل كل التأثيرات</span>
              <label class="switch">
                <input type="checkbox" id="disableSwitch">
                <span class="switch-slider"></span>
              </label>
            </label>
          </div>
        </div>
        
        <!-- Color Picker -->
        <div class="customizer-control">
          <label class="control-label">
            <span data-ar="لون التوهج" data-en="Glow Color">لون التوهج</span>
          </label>
          <div class="color-presets">
            <button class="magnifier-toggle" id="magnifierToggle" data-ar-title="تفعيل العدسة المكبرة" data-en-title="Toggle Magnifier Lens"></button>
            <button class="color-preset active" data-color="132, 0, 255" style="background: rgb(132, 0, 255)"></button>
            <button class="color-preset" data-color="0, 255, 132" style="background: rgb(0, 255, 132)"></button>
            <button class="color-preset" data-color="255, 132, 0" style="background: rgb(255, 132, 0)"></button>
            <button class="color-preset" data-color="0, 132, 255" style="background: rgb(0, 132, 255)"></button>
            <button class="color-preset" data-color="255, 0, 0" style="background: rgb(255, 0, 0)"></button>
            <button class="color-preset" data-color="255, 255, 255" style="background: rgb(255, 255, 255)"></button>
          </div>
        </div>
        
        <!-- Reset Button -->
        <button class="reset-btn" id="resetBtn">
          <i class="fas fa-undo"></i>
          <span data-ar="إعادة التعيين" data-en="Reset">إعادة التعيين</span>
        </button>
      </div>
    `;
    
    this.container.appendChild(panel);
  }
  
  attachEventListeners() {
    // Toggle panel
    const toggle = document.getElementById('customizerToggle');
    const content = document.getElementById('customizerContent');
    let isOpen = true;
    
    toggle?.addEventListener('click', () => {
      isOpen = !isOpen;
      content.style.display = isOpen ? 'block' : 'none';
      toggle.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    });
    
    // Spotlight Radius Slider
    const spotlightSlider = document.getElementById('spotlightSlider');
    const spotlightValue = document.getElementById('spotlightValue');
    
    spotlightSlider?.addEventListener('input', (e) => {
      const value = e.target.value;
      spotlightValue.textContent = `${value}px`;
      this.settings.spotlightRadius = parseInt(value);
      this.updateMagicBento();
    });
    
    // Particle Count Slider
    const particleSlider = document.getElementById('particleSlider');
    const particleValue = document.getElementById('particleValue');
    
    particleSlider?.addEventListener('input', (e) => {
      const value = e.target.value;
      particleValue.textContent = value;
      this.settings.particleCount = parseInt(value);
      this.updateMagicBento();
    });
    
    // Switches
    const switches = {
      starsSwitch: 'enableStars',
      spotlightSwitch: 'enableSpotlight',
      glowSwitch: 'enableBorderGlow',
      tiltSwitch: 'enableTilt',
      clickSwitch: 'clickEffect',
      magnetismSwitch: 'enableMagnetism',
      disableSwitch: 'disableAnimations'
    };
    
    Object.entries(switches).forEach(([id, setting]) => {
      const element = document.getElementById(id);
      element?.addEventListener('change', (e) => {
        this.settings[setting] = e.target.checked;
        this.updateMagicBento();
      });
    });
    
    // Magnifier Toggle Button - Simple Click Toggle
    const magnifierBtn = document.querySelector('#magnifierToggle');
    if (magnifierBtn) {
      // Update button title based on current language
      const updateButtonTitle = () => {
        const currentLang = localStorage.getItem('preferredLanguage') || 
                           document.documentElement.getAttribute('lang') || 'en';
        const titleAttr = currentLang === 'ar' ? 'data-ar-title' : 'data-en-title';
        const title = magnifierBtn.getAttribute(titleAttr) || '';
        magnifierBtn.setAttribute('title', title);
      };
      
      // Initial title update
      updateButtonTitle();
      
      // Toggle magnifier on click
      magnifierBtn.addEventListener('click', () => {
        this.magnifierActive = !this.magnifierActive;
        magnifierBtn.classList.toggle('active', this.magnifierActive);
        
        // Update title based on state and language
        const currentLang = localStorage.getItem('preferredLanguage') || 
                           document.documentElement.getAttribute('lang') || 'en';
        if (this.magnifierActive) {
          magnifierBtn.setAttribute('title', currentLang === 'ar' ? 'إيقاف العدسة المكبرة' : 'Deactivate Magnifier Lens');
        } else {
          magnifierBtn.setAttribute('title', currentLang === 'ar' ? 'تفعيل العدسة المكبرة' : 'Activate Magnifier Lens');
        }
        
        // Toggle magnifier in MagicBento instance
        if (this.magicBento && this.magicBento.toggleMagnifier) {
          this.magicBento.toggleMagnifier(this.magnifierActive);
        }
        
        // Haptic feedback on mobile
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
      });
      
      // Store update function for language changes
      this.updateMagnifierButtonTitle = updateButtonTitle;
    }
    
    // Color Presets
    const colorPresets = document.querySelectorAll('.color-preset');
    colorPresets.forEach(preset => {
      preset.addEventListener('click', () => {
        colorPresets.forEach(p => p.classList.remove('active'));
        preset.classList.add('active');
        this.settings.glowColor = preset.dataset.color;
        this.updateMagicBento();
      });
    });
    
    // Reset Button
    const resetBtn = document.getElementById('resetBtn');
    resetBtn?.addEventListener('click', () => {
      this.resetSettings();
      this.magnifierActive = false;
      const magnifierToggle = document.getElementById('magnifierToggle');
      magnifierToggle?.classList.remove('active');
      if (this.magicBento && this.magicBento.toggleMagnifier) {
        this.magicBento.toggleMagnifier(false);
      }
    });
  }
  
  updateMagicBento() {
    // Destroy existing instance
    if (this.magicBento) {
      this.magicBento.destroy();
    }
    
    // Create new instance with updated settings
    const container = document.getElementById('magicBentoContainer');
    if (container) {
      container.innerHTML = '';
      this.magicBento = new MagicBento('magicBentoContainer', this.settings);
      
      // Update language if needed - get from localStorage or default to 'en'
      const currentLang = localStorage.getItem('preferredLanguage') || 
                         document.documentElement.getAttribute('lang') || 'en';
      setTimeout(() => {
        this.magicBento.updateLanguage(currentLang);
        
        // Reapply magnifier if it was active
        if (this.magnifierActive && this.magicBento.toggleMagnifier) {
          this.magicBento.toggleMagnifier(true);
        }
      }, 100);
    }
  }
  
  resetSettings() {
    // Reset to defaults
    this.settings = {
      enableStars: true,
      enableSpotlight: true,
      enableBorderGlow: true,
      disableAnimations: false,
      spotlightRadius: 300,
      particleCount: 12,
      enableTilt: false,
      clickEffect: true,
      enableMagnetism: true,
      glowColor: '132, 0, 255'
    };
    
    // Update UI
    document.getElementById('spotlightSlider').value = 300;
    document.getElementById('spotlightValue').textContent = '300px';
    document.getElementById('particleSlider').value = 12;
    document.getElementById('particleValue').textContent = '12';
    
    document.getElementById('starsSwitch').checked = true;
    document.getElementById('spotlightSwitch').checked = true;
    document.getElementById('glowSwitch').checked = true;
    document.getElementById('tiltSwitch').checked = false;
    document.getElementById('clickSwitch').checked = true;
    document.getElementById('magnetismSwitch').checked = true;
    document.getElementById('disableSwitch').checked = false;
    
    // Reset color
    document.querySelectorAll('.color-preset').forEach(p => p.classList.remove('active'));
    document.querySelector('.color-preset[data-color="132, 0, 255"]').classList.add('active');
    
    // Update MagicBento
    this.updateMagicBento();
  }
  
  updateLanguage(lang) {
    const elements = this.container.querySelectorAll('[data-ar][data-en]');
    elements.forEach(element => {
      element.textContent = element.getAttribute(`data-${lang}`);
    });
    
    // Update magnifier button title
    const magnifierBtn = document.querySelector('#magnifierToggle');
    if (magnifierBtn) {
      const titleAttr = lang === 'ar' ? 'data-ar-title' : 'data-en-title';
      const baseTitle = magnifierBtn.getAttribute(titleAttr) || '';
      
      // Update title based on current state
      if (this.magnifierActive) {
        magnifierBtn.setAttribute('title', lang === 'ar' ? 'إيقاف العدسة المكبرة' : 'Deactivate Magnifier Lens');
      } else {
        magnifierBtn.setAttribute('title', baseTitle || (lang === 'ar' ? 'تفعيل العدسة المكبرة' : 'Activate Magnifier Lens'));
      }
    }
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MagicBentoCustomizer;
}
