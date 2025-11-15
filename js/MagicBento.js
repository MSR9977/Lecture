// Magic Bento - Vanilla JavaScript Version
// تحويل من React إلى JavaScript عادي

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

const cardData = [
  {
    color: '#060010',
    title: 'Analytics',
    titleAr: 'تحليلات',
    description: 'Track user behavior',
    descriptionAr: 'تتبع سلوك المستخدمين',
    label: 'Insights',
    labelAr: 'رؤى'
  },
  {
    color: '#060010',
    title: 'Dashboard',
    titleAr: 'لوحة التحكم',
    description: 'Centralized data view',
    descriptionAr: 'عرض البيانات المركزية',
    label: 'Overview',
    labelAr: 'نظرة عامة'
  },
  {
    color: '#060010',
    title: 'Collaboration',
    titleAr: 'التعاون',
    description: 'Work together seamlessly',
    descriptionAr: 'العمل معاً بسلاسة',
    label: 'Teamwork',
    labelAr: 'عمل جماعي'
  },
  {
    color: '#060010',
    title: 'Automation',
    titleAr: 'الأتمتة',
    description: 'Streamline workflows',
    descriptionAr: 'تبسيط سير العمل',
    label: 'Efficiency',
    labelAr: 'كفاءة'
  },
  {
    color: '#060010',
    title: 'Integration',
    titleAr: 'التكامل',
    description: 'Connect favorite tools',
    descriptionAr: 'ربط الأدوات المفضلة',
    label: 'Connectivity',
    labelAr: 'اتصال'
  },
  {
    color: '#060010',
    title: 'Security',
    titleAr: 'الأمان',
    description: 'Enterprise-grade protection',
    descriptionAr: 'حماية على مستوى المؤسسات',
    label: 'Protection',
    labelAr: 'حماية'
  }
];

// Helper functions
const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = radius => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

// Simple animation library (replacement for GSAP)
const animate = {
  to: (element, props) => {
    const duration = props.duration || 0.3;
    const ease = props.ease || 'ease';
    
    const transitions = [];
    Object.keys(props).forEach(key => {
      if (key !== 'duration' && key !== 'ease' && key !== 'onComplete') {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        transitions.push(cssKey);
      }
    });
    
    element.style.transition = transitions.map(t => `${t} ${duration}s ${ease}`).join(', ');
    
    requestAnimationFrame(() => {
      Object.keys(props).forEach(key => {
        if (key !== 'duration' && key !== 'ease' && key !== 'onComplete') {
          if (key === 'x') element.style.transform = `translateX(${props[key]}px)`;
          else if (key === 'y') element.style.transform = `translateY(${props[key]}px)`;
          else if (key === 'scale') element.style.transform = `scale(${props[key]})`;
          else if (key === 'rotateX') element.style.transform = `rotateX(${props[key]}deg)`;
          else if (key === 'rotateY') element.style.transform = `rotateY(${props[key]}deg)`;
          else if (key === 'rotation') element.style.transform = `rotate(${props[key]}deg)`;
          else element.style[key] = props[key];
        }
      });
      
      if (props.onComplete) {
        setTimeout(props.onComplete, duration * 1000);
      }
    });
  }
};

// ParticleCard class
class ParticleCard {
  constructor(element, options = {}) {
    this.element = element;
    this.particles = [];
    this.timeouts = [];
    this.isHovered = false;
    this.memoizedParticles = [];
    this.particlesInitialized = false;
    
    this.options = {
      particleCount: options.particleCount || DEFAULT_PARTICLE_COUNT,
      glowColor: options.glowColor || DEFAULT_GLOW_COLOR,
      enableTilt: options.enableTilt !== undefined ? options.enableTilt : false,
      clickEffect: options.clickEffect !== undefined ? options.clickEffect : true,
      enableMagnetism: options.enableMagnetism !== undefined ? options.enableMagnetism : false,
      disableAnimations: options.disableAnimations || false
    };
    
    this.init();
  }
  
  init() {
    if (this.options.disableAnimations) return;
    
    this.element.addEventListener('mouseenter', () => this.handleMouseEnter());
    this.element.addEventListener('mouseleave', () => this.handleMouseLeave());
    this.element.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.element.addEventListener('click', (e) => this.handleClick(e));
  }
  
  initializeParticles() {
    if (this.particlesInitialized || !this.element) return;
    
    const rect = this.element.getBoundingClientRect();
    this.memoizedParticles = Array.from({ length: this.options.particleCount }, () =>
      createParticleElement(Math.random() * rect.width, Math.random() * rect.height, this.options.glowColor)
    );
    this.particlesInitialized = true;
  }
  
  handleMouseEnter() {
    this.isHovered = true;
    this.animateParticles();
    
    if (this.options.enableTilt) {
      animate.to(this.element, {
        rotateX: 5,
        rotateY: 5,
        duration: 0.3
      });
    }
  }
  
  handleMouseLeave() {
    this.isHovered = false;
    this.clearAllParticles();
    
    if (this.options.enableTilt) {
      this.element.style.transform = '';
    }
    
    if (this.options.enableMagnetism) {
      this.element.style.transform = '';
    }
  }
  
  handleMouseMove(e) {
    if (!this.options.enableTilt && !this.options.enableMagnetism) return;
    
    const rect = this.element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    if (this.options.enableTilt) {
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    
    if (this.options.enableMagnetism) {
      const magnetX = (x - centerX) * 0.05;
      const magnetY = (y - centerY) * 0.05;
      this.element.style.transform = `translate(${magnetX}px, ${magnetY}px)`;
    }
  }
  
  handleClick(e) {
    if (!this.options.clickEffect) return;
    
    const rect = this.element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const maxDistance = Math.max(
      Math.hypot(x, y),
      Math.hypot(x - rect.width, y),
      Math.hypot(x, y - rect.height),
      Math.hypot(x - rect.width, y - rect.height)
    );
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      width: ${maxDistance * 2}px;
      height: ${maxDistance * 2}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(${this.options.glowColor}, 0.4) 0%, rgba(${this.options.glowColor}, 0.2) 30%, transparent 70%);
      left: ${x - maxDistance}px;
      top: ${y - maxDistance}px;
      pointer-events: none;
      z-index: 1000;
      transform: scale(0);
      opacity: 1;
      transition: transform 0.8s ease-out, opacity 0.8s ease-out;
    `;
    
    this.element.appendChild(ripple);
    
    requestAnimationFrame(() => {
      ripple.style.transform = 'scale(1)';
      ripple.style.opacity = '0';
    });
    
    setTimeout(() => ripple.remove(), 800);
  }
  
  animateParticles() {
    if (!this.element || !this.isHovered) return;
    
    if (!this.particlesInitialized) {
      this.initializeParticles();
    }
    
    this.memoizedParticles.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!this.isHovered || !this.element) return;
        
        const clone = particle.cloneNode(true);
        this.element.appendChild(clone);
        this.particles.push(clone);
        
        // Simple fade in
        clone.style.opacity = '0';
        clone.style.transform = 'scale(0)';
        requestAnimationFrame(() => {
          clone.style.transition = 'all 0.3s ease-out';
          clone.style.opacity = '1';
          clone.style.transform = 'scale(1)';
        });
        
        // Floating animation
        const moveX = (Math.random() - 0.5) * 100;
        const moveY = (Math.random() - 0.5) * 100;
        const rotation = Math.random() * 360;
        
        setTimeout(() => {
          clone.style.transition = 'all 2s ease-in-out infinite';
          clone.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotation}deg)`;
        }, 300);
        
      }, index * 100);
      
      this.timeouts.push(timeoutId);
    });
  }
  
  clearAllParticles() {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
    
    this.particles.forEach(particle => {
      particle.style.transition = 'all 0.3s ease-in';
      particle.style.opacity = '0';
      particle.style.transform = 'scale(0)';
      setTimeout(() => particle.remove(), 300);
    });
    this.particles = [];
  }
}

// GlobalSpotlight class
class GlobalSpotlight {
  constructor(gridElement, options = {}) {
    this.gridElement = gridElement;
    this.spotlight = null;
    this.isInsideSection = false;
    
    this.options = {
      enabled: options.enabled !== undefined ? options.enabled : true,
      spotlightRadius: options.spotlightRadius || DEFAULT_SPOTLIGHT_RADIUS,
      glowColor: options.glowColor || DEFAULT_GLOW_COLOR,
      disableAnimations: options.disableAnimations || false
    };
    
    if (!this.options.disableAnimations && this.options.enabled) {
      this.init();
    }
  }
  
  init() {
    if (!this.gridElement) return;
    
    // Create spotlight element
    this.spotlight = document.createElement('div');
    this.spotlight.className = 'global-spotlight';
    this.spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${this.options.glowColor}, 0.15) 0%,
        rgba(${this.options.glowColor}, 0.08) 15%,
        rgba(${this.options.glowColor}, 0.04) 25%,
        rgba(${this.options.glowColor}, 0.02) 40%,
        rgba(${this.options.glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      transition: opacity 0.3s ease, left 0.1s ease, top 0.1s ease;
      will-change: opacity, transform;
    `;
    document.body.appendChild(this.spotlight);
    
    // Throttled mouse move handler for better performance
    const throttledMouseMove = this.throttle((e) => this.handleMouseMove(e), 16); // ~60fps
    
    // Event listeners with passive option
    document.addEventListener('mousemove', throttledMouseMove, { passive: true });
    document.addEventListener('mouseleave', () => this.handleMouseLeave(), { passive: true });
  }
  
  // Throttle utility for performance
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  handleMouseMove(e) {
    if (!this.spotlight || !this.gridElement) return;
    
    const section = this.gridElement.closest('.bento-section');
    const rect = section?.getBoundingClientRect();
    const mouseInside = rect && 
      e.clientX >= rect.left && 
      e.clientX <= rect.right && 
      e.clientY >= rect.top && 
      e.clientY <= rect.bottom;
    
    this.isInsideSection = mouseInside || false;
    const cards = this.gridElement.querySelectorAll('.magic-bento-card');
    
    if (!mouseInside) {
      this.spotlight.style.opacity = '0';
      cards.forEach(card => {
        card.style.setProperty('--glow-intensity', '0');
      });
      return;
    }
    
    const { proximity, fadeDistance } = calculateSpotlightValues(this.options.spotlightRadius);
    let minDistance = Infinity;
    
    cards.forEach(card => {
      const cardRect = card.getBoundingClientRect();
      const centerX = cardRect.left + cardRect.width / 2;
      const centerY = cardRect.top + cardRect.height / 2;
      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - 
        Math.max(cardRect.width, cardRect.height) / 2;
      const effectiveDistance = Math.max(0, distance);
      
      minDistance = Math.min(minDistance, effectiveDistance);
      
      let glowIntensity = 0;
      if (effectiveDistance <= proximity) {
        glowIntensity = 1;
      } else if (effectiveDistance <= fadeDistance) {
        glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
      }
      
      updateCardGlowProperties(card, e.clientX, e.clientY, glowIntensity, this.options.spotlightRadius);
    });
    
    this.spotlight.style.left = `${e.clientX}px`;
    this.spotlight.style.top = `${e.clientY}px`;
    
    const targetOpacity = minDistance <= proximity ? 0.8 :
      minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0;
    
    this.spotlight.style.opacity = targetOpacity.toString();
  }
  
  handleMouseLeave() {
    this.isInsideSection = false;
    const cards = this.gridElement?.querySelectorAll('.magic-bento-card');
    cards?.forEach(card => {
      card.style.setProperty('--glow-intensity', '0');
    });
    if (this.spotlight) {
      this.spotlight.style.opacity = '0';
    }
  }
  
  destroy() {
    if (this.spotlight) {
      this.spotlight.remove();
    }
  }
}

// Main MagicBento class
class MagicBento {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }
    
    this.options = {
      textAutoHide: options.textAutoHide !== undefined ? options.textAutoHide : true,
      enableStars: options.enableStars !== undefined ? options.enableStars : true,
      enableSpotlight: options.enableSpotlight !== undefined ? options.enableSpotlight : true,
      enableBorderGlow: options.enableBorderGlow !== undefined ? options.enableBorderGlow : true,
      disableAnimations: options.disableAnimations || false,
      spotlightRadius: options.spotlightRadius || DEFAULT_SPOTLIGHT_RADIUS,
      particleCount: options.particleCount || DEFAULT_PARTICLE_COUNT,
      enableTilt: options.enableTilt !== undefined ? options.enableTilt : false,
      glowColor: options.glowColor || DEFAULT_GLOW_COLOR,
      clickEffect: options.clickEffect !== undefined ? options.clickEffect : true,
      enableMagnetism: options.enableMagnetism !== undefined ? options.enableMagnetism : true
    };
    
    this.isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    this.shouldDisableAnimations = this.options.disableAnimations || this.isMobile;
    
    this.gridElement = null;
    this.spotlight = null;
    this.particleCards = [];
    
    this.init();
    this.setupResponsive();
  }
  
  init() {
    // Create grid
    this.gridElement = document.createElement('div');
    this.gridElement.className = 'card-grid bento-section';
    
    // Get current language
    const currentLang = document.documentElement.getAttribute('lang') || 'ar';
    
    // Create cards
    cardData.forEach((card, index) => {
      const cardElement = this.createCard(card, index, currentLang);
      this.gridElement.appendChild(cardElement);
    });
    
    this.container.appendChild(this.gridElement);
    
    // Initialize spotlight
    if (this.options.enableSpotlight) {
      this.spotlight = new GlobalSpotlight(this.gridElement, {
        enabled: this.options.enableSpotlight,
        spotlightRadius: this.options.spotlightRadius,
        glowColor: this.options.glowColor,
        disableAnimations: this.shouldDisableAnimations
      });
    }
    
    // Setup drag and drop
    this.setupDragAndDrop();
    
    // Setup global long press for magnifier
    this.setupGlobalLongPress();
    
    // Adjust font sizes after grid is rendered
    setTimeout(() => {
      this.adjustFontSizes();
      this.setupResizeObserver();
    }, 100);
  }
  
  createCard(card, index, lang) {
    const cardElement = document.createElement('div');
    
    let className = 'magic-bento-card';
    if (this.options.textAutoHide) className += ' magic-bento-card--text-autohide';
    if (this.options.enableBorderGlow) className += ' magic-bento-card--border-glow';
    if (this.options.enableStars) className += ' particle-container';
    
    cardElement.className = className;
    cardElement.style.backgroundColor = card.color;
    cardElement.style.setProperty('--glow-color', this.options.glowColor);
    
    // Use bilingual content
    const title = lang === 'ar' ? card.titleAr : card.title;
    const description = lang === 'ar' ? card.descriptionAr : card.description;
    const label = lang === 'ar' ? card.labelAr : card.label;
    
    cardElement.innerHTML = `
      <div class="magic-bento-card__header">
        <div class="magic-bento-card__label" data-ar="${card.labelAr}" data-en="${card.label}">${label}</div>
      </div>
      <div class="magic-bento-card__content">
        <h2 class="magic-bento-card__title" data-ar="${card.titleAr}" data-en="${card.title}">${title}</h2>
        <p class="magic-bento-card__description" data-ar="${card.descriptionAr}" data-en="${card.description}">${description}</p>
      </div>
    `;
    
    // Initialize ParticleCard if enabled
    if (this.options.enableStars && !this.shouldDisableAnimations) {
      const particleCard = new ParticleCard(cardElement, {
        particleCount: this.options.particleCount,
        glowColor: this.options.glowColor,
        enableTilt: this.options.enableTilt,
        clickEffect: this.options.clickEffect,
        enableMagnetism: this.options.enableMagnetism,
        disableAnimations: this.shouldDisableAnimations
      });
      this.particleCards.push(particleCard);
    }
    
    return cardElement;
  }
  
  setupResponsive() {
    window.addEventListener('resize', () => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      
      if (wasMobile !== this.isMobile) {
        this.shouldDisableAnimations = this.options.disableAnimations || this.isMobile;
      }
      
      // Adjust font sizes on resize
      this.adjustFontSizes();
    });
  }
  
  adjustFontSizes() {
    if (!this.gridElement) return;
    
    const cards = this.gridElement.querySelectorAll('.magic-bento-card');
    
    cards.forEach(card => {
      const cardWidth = card.offsetWidth;
      const cardHeight = card.offsetHeight;
      
      // Skip if card has no dimensions yet
      if (cardWidth === 0 || cardHeight === 0) return;
      
      // Calculate optimal font size based on card dimensions
      const baseFontSize = Math.min(cardWidth, cardHeight) * 0.08;
      const titleFontSize = Math.max(12, Math.min(baseFontSize * 1.2, 32));
      const descFontSize = Math.max(10, Math.min(baseFontSize * 0.8, 20));
      const labelFontSize = Math.max(9, Math.min(baseFontSize * 0.6, 16));
      
      // Apply font sizes
      const title = card.querySelector('.magic-bento-card__title');
      const description = card.querySelector('.magic-bento-card__description');
      const label = card.querySelector('.magic-bento-card__label');
      
      if (title) {
        title.style.fontSize = `${titleFontSize}px`;
      }
      if (description) {
        description.style.fontSize = `${descFontSize}px`;
      }
      if (label) {
        label.style.fontSize = `${labelFontSize}px`;
      }
    });
  }
  
  setupResizeObserver() {
    if (!this.gridElement || !window.ResizeObserver) return;
    
    // Throttle resize observer for better performance on mobile
    let resizeTimeout = null;
    const throttleDelay = this.isMobile ? 300 : 100; // Longer delay on mobile
    
    const resizeObserver = new ResizeObserver(() => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = setTimeout(() => {
        this.adjustFontSizes();
      }, throttleDelay);
    });
    
    const cards = this.gridElement.querySelectorAll('.magic-bento-card');
    cards.forEach(card => resizeObserver.observe(card));
    
    // Store observer for cleanup
    this.resizeObserver = resizeObserver;
  }
  
  setupDragAndDrop() {
    if (!this.gridElement) return;
    
    let draggedElement = null;
    let touchStartX = 0;
    let touchStartY = 0;
    
    const cards = this.gridElement.querySelectorAll('.magic-bento-card');
    
    cards.forEach(card => {
      // Make draggable
      card.setAttribute('draggable', 'true');
      
      // Mouse drag events
      card.addEventListener('dragstart', (e) => {
        draggedElement = card;
        card.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      
      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        draggedElement = null;
      });
      
      card.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (card !== draggedElement) {
          card.classList.add('drag-over');
        }
      });
      
      card.addEventListener('dragleave', () => {
        card.classList.remove('drag-over');
      });
      
      card.addEventListener('drop', (e) => {
        e.preventDefault();
        card.classList.remove('drag-over');
        
        if (draggedElement && card !== draggedElement) {
          // Swap cards
          const allCards = Array.from(this.gridElement.querySelectorAll('.magic-bento-card'));
          const draggedIndex = allCards.indexOf(draggedElement);
          const targetIndex = allCards.indexOf(card);
          
          if (draggedIndex < targetIndex) {
            card.parentNode.insertBefore(draggedElement, card.nextSibling);
          } else {
            card.parentNode.insertBefore(draggedElement, card);
          }
        }
      });
      
      // Touch events for mobile with throttling for better performance
      let touchMoveLastUpdate = 0;
      const touchThrottleDelay = 50; // Throttle touch move events on mobile
      
      card.addEventListener('touchstart', (e) => {
        draggedElement = card;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        card.classList.add('dragging');
      }, { passive: true });
      
      card.addEventListener('touchmove', (e) => {
        if (!draggedElement) return;
        
        // Throttle touch move for better performance
        const now = Date.now();
        if (now - touchMoveLastUpdate < touchThrottleDelay) {
          return;
        }
        touchMoveLastUpdate = now;
        
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        
        // Get element at touch position
        card.style.pointerEvents = 'none';
        const elementBelow = document.elementFromPoint(touchX, touchY);
        card.style.pointerEvents = 'auto';
        
        // Clear all drag-over states
        this.gridElement.querySelectorAll('.drag-over').forEach(el => {
          el.classList.remove('drag-over');
        });
        
        // Add drag-over to element below if it's a card
        if (elementBelow && elementBelow.classList.contains('magic-bento-card')) {
          elementBelow.classList.add('drag-over');
        }
      }, { passive: true });
      
      card.addEventListener('touchend', (e) => {
        if (!draggedElement) return;
        
        const touchX = e.changedTouches[0].clientX;
        const touchY = e.changedTouches[0].clientY;
        
        card.style.pointerEvents = 'none';
        const elementBelow = document.elementFromPoint(touchX, touchY);
        card.style.pointerEvents = 'auto';
        
        card.classList.remove('dragging');
        this.gridElement.querySelectorAll('.drag-over').forEach(el => {
          el.classList.remove('drag-over');
        });
        
        if (elementBelow && elementBelow.classList.contains('magic-bento-card') && elementBelow !== card) {
          // Swap cards
          const allCards = Array.from(this.gridElement.querySelectorAll('.magic-bento-card'));
          const draggedIndex = allCards.indexOf(card);
          const targetIndex = allCards.indexOf(elementBelow);
          
          if (draggedIndex < targetIndex) {
            elementBelow.parentNode.insertBefore(card, elementBelow.nextSibling);
          } else {
            elementBelow.parentNode.insertBefore(card, elementBelow);
          }
        }
        
        draggedElement = null;
      }, { passive: true });
    });
  }
  
  updateLanguage(lang) {
    const cards = this.gridElement.querySelectorAll('.magic-bento-card');
    cards.forEach(card => {
      const label = card.querySelector('.magic-bento-card__label');
      const title = card.querySelector('.magic-bento-card__title');
      const description = card.querySelector('.magic-bento-card__description');
      
      if (label) label.textContent = label.getAttribute(`data-${lang}`);
      if (title) title.textContent = title.getAttribute(`data-${lang}`);
      if (description) description.textContent = description.getAttribute(`data-${lang}`);
    });
    
    // Update press indicator text if it exists
    if (this.pressText) {
      const translations = {
        ar: { hold: 'استمر...', activate: 'تفعيل', deactivate: 'إيقاف', activated: '✓ فُعِّلت!', deactivated: '✓ أُوقِفت!' },
        en: { hold: 'Hold...', activate: 'Activate', deactivate: 'Deactivate', activated: '✓ Activated!', deactivated: '✓ Deactivated!' }
      };
      
      // Only update if not in active state
      if (!this.pressIndicator || !this.pressIndicator.classList.contains('active')) {
        this.pressText.textContent = translations[lang].hold;
      }
    }
  }
  
  toggleMagnifier(enabled) {
    if (!this.gridElement) return;
    
    if (enabled) {
      this.createMagnifierLens();
    } else {
      this.removeMagnifierLens();
    }
  }
  
  createMagnifierLens() {
    // Allow magnifier on mobile but with reduced performance impact
    // User explicitly requested it, so we'll optimize instead of disable
    
    // Create magnifier lens container
    this.magnifierLens = document.createElement('div');
    this.magnifierLens.className = 'magnifier-lens';
    
    // Create inner magnified content container
    this.magnifierContent = document.createElement('div');
    this.magnifierContent.className = 'magnifier-content';
    this.magnifierLens.appendChild(this.magnifierContent);
    
    document.body.appendChild(this.magnifierLens);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Adaptive throttling based on device type for better performance
    const isMobile = window.innerWidth <= 768;
    let lastUpdate = 0;
    const throttleDelay = isMobile ? 50 : 8; // Much longer delay on mobile (20fps vs 120fps)
    
    this.handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Update lens position immediately (smooth following)
      this.magnifierLens.style.left = `${x}px`;
      this.magnifierLens.style.top = `${y}px`;
      
      // Throttle content updates for better performance
      const now = Date.now();
      if (now - lastUpdate > throttleDelay) {
        lastUpdate = now;
        this.updateMagnifiedContent(x, y);
      }
    };
    
    // Touch move handler with throttling for mobile
    let touchLastUpdate = 0;
    this.handleTouchMove = (e) => {
      const touch = e.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;
      
      // Update position immediately
      this.magnifierLens.style.left = `${x}px`;
      this.magnifierLens.style.top = `${y}px`;
      
      // Throttle content updates on mobile
      const now = Date.now();
      if (now - touchLastUpdate > throttleDelay) {
        touchLastUpdate = now;
        this.updateMagnifiedContent(x, y);
      }
    };
    
    // Update magnified content method
    this.updateMagnifiedContent = (x, y) => {
      // Get element under the lens
      this.magnifierLens.style.pointerEvents = 'none';
      const elementBelow = document.elementFromPoint(x, y);
      this.magnifierLens.style.pointerEvents = 'auto';
      
      // Check if hovering over clickable element
      const isClickable = elementBelow && (
        elementBelow.tagName === 'BUTTON' ||
        elementBelow.tagName === 'A' ||
        elementBelow.tagName === 'INPUT' ||
        elementBelow.tagName === 'SELECT' ||
        elementBelow.tagName === 'TEXTAREA' ||
        elementBelow.onclick ||
        elementBelow.classList.contains('clickable') ||
        elementBelow.closest('button') ||
        elementBelow.closest('a') ||
        window.getComputedStyle(elementBelow).cursor === 'pointer'
      );
      
      // Show/hide cursor based on clickable element
      if (isClickable) {
        document.body.style.cursor = 'pointer';
        this.magnifierLens.style.opacity = '0.5';
        this.magnifierLens.style.pointerEvents = 'none';
      } else {
        document.body.style.cursor = 'none';
        this.magnifierLens.style.opacity = '1';
        this.magnifierLens.style.pointerEvents = 'none';
      }
      
      // Find the best target element to magnify
      let targetElement = elementBelow;
      
      // Try to find a meaningful parent (like a card, section, or container)
      const card = elementBelow?.closest('.magic-bento-card');
      const section = elementBelow?.closest('section');
      const container = elementBelow?.closest('.container');
      
      // Prefer card, then section, then container, then the element itself
      if (card) {
        targetElement = card;
      } else if (section) {
        targetElement = section;
      } else if (container) {
        targetElement = container;
      } else if (!targetElement) {
        targetElement = document.body;
      }
      
      if (targetElement && targetElement !== this.magnifierLens) {
        // Get the actual element's bounding rect
        const targetRect = targetElement.getBoundingClientRect();
        
        // Adaptive zoom based on screen size - Lower on mobile for better performance
        const isMobile = window.innerWidth <= 768;
        const scale = isMobile ? 2.5 : 4.5; // Reduced magnification on mobile
        
        // Adaptive lens radius based on actual lens size
        let lensRadius = 125; // Default for 250px lens
        if (window.innerWidth <= 480) {
          lensRadius = 60; // 120px / 2
        } else if (window.innerWidth <= 768) {
          lensRadius = 85; // 170px / 2
        }
        
        // Calculate exact position relative to target
        const relativeX = x - targetRect.left;
        const relativeY = y - targetRect.top;
        
        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
          // Clone and magnify (only when needed)
          const clone = targetElement.cloneNode(true);
          clone.style.transform = `scale(${scale})`;
          clone.style.transformOrigin = '0 0';
          clone.style.position = 'absolute';
          
          // Calculate offset to center the exact point under cursor in the lens
          const offsetX = lensRadius - (relativeX * scale);
          const offsetY = lensRadius - (relativeY * scale);
          
          clone.style.left = `${offsetX}px`;
          clone.style.top = `${offsetY}px`;
          clone.style.pointerEvents = 'none';
          clone.style.width = targetRect.width + 'px';
          clone.style.height = targetRect.height + 'px';
          
          // Clear and update content
          this.magnifierContent.innerHTML = '';
          this.magnifierContent.appendChild(clone);
        });
      } else {
        this.magnifierContent.innerHTML = '';
      }
    };
    
    // Add event listeners
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('touchmove', this.handleTouchMove, { passive: true });
    
    // Hide lens when mouse leaves window
    this.handleMouseLeave = () => {
      this.magnifierLens.style.opacity = '0';
    };
    
    this.handleMouseEnter = () => {
      this.magnifierLens.style.opacity = '1';
    };
    
    document.addEventListener('mouseleave', this.handleMouseLeave);
    document.addEventListener('mouseenter', this.handleMouseEnter);
  }
  
  removeMagnifierLens() {
    if (this.magnifierLens) {
      this.magnifierLens.remove();
      this.magnifierLens = null;
    }
    
    if (this.magnifierContent) {
      this.magnifierContent = null;
    }
    
    // Restore cursor
    document.body.style.cursor = '';
    
    if (this.handleMouseMove) {
      document.removeEventListener('mousemove', this.handleMouseMove);
      this.handleMouseMove = null;
    }
    
    if (this.handleTouchMove) {
      document.removeEventListener('touchmove', this.handleTouchMove);
      this.handleTouchMove = null;
    }
    
    if (this.handleMouseLeave) {
      document.removeEventListener('mouseleave', this.handleMouseLeave);
      this.handleMouseLeave = null;
    }
    
    if (this.handleMouseEnter) {
      document.removeEventListener('mouseenter', this.handleMouseEnter);
      this.handleMouseEnter = null;
    }
    
    if (this.updateMagnifiedContent) {
      this.updateMagnifiedContent = null;
    }
  }
  
  setupGlobalLongPress() {
    let pressTimer = null;
    let pressStartX = 0;
    let pressStartY = 0;
    let hasMoved = false;
    const longPressDuration = 4000; // 4 seconds
    const moveThreshold = 15; // pixels
    
    // Helper function to get current language
    const getCurrentLanguage = () => {
      return document.documentElement.getAttribute('lang') || 'ar';
    };
    
    // Translation texts
    const translations = {
      ar: {
        hold: 'استمر...',
        activate: 'تفعيل',
        deactivate: 'إيقاف',
        activated: '✓ فُعِّلت!',
        deactivated: '✓ أُوقِفت!'
      },
      en: {
        hold: 'Hold...',
        activate: 'Activate',
        deactivate: 'Deactivate',
        activated: '✓ Activated!',
        deactivated: '✓ Deactivated!'
      }
    };
    
    // Create global press indicator
    const pressIndicator = document.createElement('div');
    pressIndicator.className = 'global-press-indicator';
    
    // Add text inside indicator with data attributes for translation
    const pressText = document.createElement('div');
    pressText.className = 'press-indicator-text';
    pressText.setAttribute('data-ar', 'استمر...');
    pressText.setAttribute('data-en', 'Hold...');
    pressText.textContent = translations[getCurrentLanguage()].hold;
    pressIndicator.appendChild(pressText);
    
    document.body.appendChild(pressIndicator);
    this.pressIndicator = pressIndicator;
    this.pressText = pressText;
    
    // Function to update text based on language
    const updatePressText = (type) => {
      const lang = getCurrentLanguage();
      const texts = translations[lang];
      
      switch(type) {
        case 'hold':
          pressText.textContent = texts.hold;
          break;
        case 'activate':
          pressText.textContent = texts.activate;
          pressText.classList.remove('deactivate');
          break;
        case 'deactivate':
          pressText.textContent = texts.deactivate;
          pressText.classList.add('deactivate');
          break;
        case 'activated':
          pressText.textContent = texts.activated;
          break;
        case 'deactivated':
          pressText.textContent = texts.deactivated;
          break;
      }
    };
    
    const startGlobalPress = (x, y) => {
      pressStartX = x;
      pressStartY = y;
      hasMoved = false;
      
      // Position indicator at press point
      pressIndicator.style.left = `${x}px`;
      pressIndicator.style.top = `${y}px`;
      pressIndicator.classList.add('active');
      
      // Update text based on current state and language
      const customizer = window.magicBentoCustomizer;
      if (customizer && customizer.magnifierActive) {
        updatePressText('deactivate');
      } else {
        updatePressText('activate');
      }
      
      // Start animation
      pressIndicator.style.animation = `globalPressExpand ${longPressDuration}ms linear forwards`;
      
      pressTimer = setTimeout(() => {
        // Toggle magnifier after 4 seconds
        if (customizer) {
          customizer.magnifierActive = !customizer.magnifierActive;
          this.toggleMagnifier(customizer.magnifierActive);
          
          // Update button state
          const magnifierBtn = document.querySelector('#magnifierToggle');
          if (magnifierBtn) {
            magnifierBtn.classList.toggle('active', customizer.magnifierActive);
          }
        }
        
        // Success feedback
        pressIndicator.classList.add('success');
        updatePressText(customizer.magnifierActive ? 'activated' : 'deactivated');
        
        // Haptic feedback
        if (navigator.vibrate) {
          navigator.vibrate([50, 30, 50]);
        }
        
        setTimeout(() => {
          cancelGlobalPress();
        }, 800);
      }, longPressDuration);
    };
    
    const cancelGlobalPress = () => {
      if (pressTimer) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
      pressIndicator.classList.remove('active', 'success');
      pressIndicator.style.animation = '';
    };
    
    const checkMove = (x, y) => {
      const deltaX = Math.abs(x - pressStartX);
      const deltaY = Math.abs(y - pressStartY);
      if (deltaX > moveThreshold || deltaY > moveThreshold) {
        hasMoved = true;
        cancelGlobalPress();
      }
    };
    
    // Mouse events
    document.addEventListener('mousedown', (e) => {
      // Ignore if clicking on interactive elements
      if (e.target.closest('button, a, input, select, textarea, .switch')) {
        return;
      }
      startGlobalPress(e.clientX, e.clientY);
    });
    
    document.addEventListener('mousemove', (e) => {
      if (pressTimer) {
        checkMove(e.clientX, e.clientY);
      }
    });
    
    document.addEventListener('mouseup', cancelGlobalPress);
    
    // Touch events
    document.addEventListener('touchstart', (e) => {
      // Ignore if touching interactive elements
      if (e.target.closest('button, a, input, select, textarea, .switch')) {
        return;
      }
      const touch = e.touches[0];
      startGlobalPress(touch.clientX, touch.clientY);
    });
    
    document.addEventListener('touchmove', (e) => {
      if (pressTimer) {
        const touch = e.touches[0];
        checkMove(touch.clientX, touch.clientY);
      }
    });
    
    document.addEventListener('touchend', cancelGlobalPress);
    document.addEventListener('touchcancel', cancelGlobalPress);
  }
  
  destroy() {
    // Clean up magnifier
    this.removeMagnifierLens();
    
    // Clean up press indicator
    if (this.pressIndicator) {
      this.pressIndicator.remove();
      this.pressIndicator = null;
    }
    
    // Clean up resize observer
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    
    if (this.spotlight) {
      this.spotlight.destroy();
    }
    this.particleCards = [];
    if (this.gridElement) {
      this.gridElement.remove();
    }
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MagicBento;
}
