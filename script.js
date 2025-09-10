// Toggle Mobile Menu
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  menuToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });




  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      // Close mobile menu if open
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Back to Top Button
  const backToTopButton = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Gallery Filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryGrid = document.querySelector('.gallery-grid');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');
      renderGallery(filter);
    });
  });

  // Form Submission to WhatsApp
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    const whatsappMessage = `مرحبا، أنا ${name}، رقم هاتفي: ${phone}، أرغب في طلب خدمة: ${service}، التفاصيل: ${message}`;

    window.open(`https://wa.me/+96560707610?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  });

  // Modal for Gallery Images
  window.openModal = function (img) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');

    modal.style.display = 'flex';
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;

    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
  }

  window.closeModal = function () {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');

    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }

  // Close modal when clicking outside the image
  const modal = document.getElementById('modal');
  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Animate sections on scroll
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));


// Testimonials slider logic

// document.addEventListener('DOMContentLoaded', function() {
//   const track = document.querySelector('.testi-track');
//   const items = document.querySelectorAll('.testi-item');
//   const prevBtn = document.querySelector('.testi-nav.prev');
//   const nextBtn = document.querySelector('.testi-nav.next');
//   const dotsContainer = document.querySelector('.testi-dots');
  
//   let currentIndex = 0;
//   let autoSlideInterval;
  
//   // إنشاء مؤشرات التتبع
//   function createDots() {
//       // مسح أي نقاط موجودة مسبقاً
//       dotsContainer.innerHTML = '';
      
//       items.forEach((_, i) => {
//           const dot = document.createElement('div');
//           dot.classList.add('testi-dot');
//           if (i === currentIndex) dot.classList.add('active');
//           dot.addEventListener('click', () => {
//               goToSlide(i);
//           });
//           dotsContainer.appendChild(dot);
//       });
//   }
  
//   // تحديث المؤشرات
//   function updateDots() {
//       const dots = document.querySelectorAll('.testi-dot');
//       dots.forEach((dot, i) => {
//           if (i === currentIndex) {
//               dot.classList.add('active');
//           } else {
//               dot.classList.remove('active');
//           }
//       });
//   }
  
//   // الانتقال إلى شهادة محددة
//   function goToSlide(index) {
//       // إخفاء جميع الشهادات
//       items.forEach(item => {
//           item.classList.remove('active');
//       });
      
//       // تحديث المؤشر الحالي
//       currentIndex = index;
      
//       // إظهار الشهادة الجديدة
//       items[currentIndex].classList.add('active');
      
//       // تحديث المؤشرات
//       updateDots();
      
//       // إعادة ضبط السلايد التلقائي
//       resetAutoSlide();
//   }
  
//   // الانتقال إلى الشهادة السابقة
//   function goPrev() {
//       const newIndex = (currentIndex - 1 + items.length) % items.length;
//       goToSlide(newIndex);
//   }
  
//   // الانتقال إلى الشهادة التالية
//   function goNext() {
//       const newIndex = (currentIndex + 1) % items.length;
//       goToSlide(newIndex);
//   }
  
//   // بدء السلايد التلقائي
//   function startAutoSlide() {
//       autoSlideInterval = setInterval(goNext, 5000);
//   }
  
//   // إعادة ضبط السلايد التلقائي
//   function resetAutoSlide() {
//       clearInterval(autoSlideInterval);
//       startAutoSlide();
//   }
  
//   // إضافة تأثيرات التمرير بالسحب على الأجهزة المحمولة
//   let startX = 0;
//   let endX = 0;
  
//   if (track) {
//       track.addEventListener('touchstart', (e) => {
//           startX = e.touches[0].clientX;
//       }, {passive: true});
      
//       track.addEventListener('touchend', (e) => {
//           endX = e.changedTouches[0].clientX;
//           handleSwipe();
//       }, {passive: true});
//   }
  
//   function handleSwipe() {
//       const diff = startX - endX;
//       const swipeThreshold = 50;
      
//       if (Math.abs(diff) > swipeThreshold) {
//           if (diff > 0) {
//               goNext();
//           } else {
//               goPrev();
//           }
//       }
//   }
  
//   // تهيئة السلايدر
//   function initSlider() {
//       // إنشاء النقاط أولاً
//       createDots();
      
//       // إضافة مستمعي الأحداث للأزرار
//       if (prevBtn) prevBtn.addEventListener('click', goPrev);
//       if (nextBtn) nextBtn.addEventListener('click', goNext);
      
//       // التأكد من أن الشهادة الأولى مرئية
//       goToSlide(0);
      
//       // بدء السلايد التلقائي
//       startAutoSlide();
      
//       // إيقاف السلايد التلقائي عند hover
//       if (track) {
//           track.addEventListener('mouseenter', () => {
//               clearInterval(autoSlideInterval);
//           });
          
//           // استئناف السلايد التلقائي عند مغادرة الماوس
//           track.addEventListener('mouseleave', () => {
//               startAutoSlide();
//           });
//       }
//   }
  
//   // بدء التشغيل عند تحميل الصفحة
//   initSlider();
// });



  // Dynamic Gallery from config
  function renderGallery(filter) {
    if (!galleryGrid) return;
    const cfg = getConfig();
    const items = (cfg.gallery || []);
    const frag = document.createDocumentFragment();
    items.filter(it => filter === 'all' || !filter || it.category === filter)
      .forEach(it => {
        const wrap = document.createElement('div');
        wrap.className = `gallery-item ${it.category}`;
        wrap.setAttribute('data-category', it.category);
        wrap.innerHTML = `
          <img src="${it.src}" alt="${it.alt}" class="gallery-image" loading="lazy" onclick="openModal(this)">
          <div class="gallery-overlay">
            <h4>${it.title || ''}</h4>
            <p>${it.subtitle || ''}</p>
          </div>`;
        frag.appendChild(wrap);
      });
    galleryGrid.innerHTML = '';
    galleryGrid.appendChild(frag);
  }


  // Config loader and applier
  function getConfig() {
    try {
      const saved = localStorage.getItem('site_config');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return (window.SITE_DEFAULT_CONFIG || {});
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el && typeof text === 'string') el.textContent = text;
  }

  function applyConfig(cfg) {
    if (!cfg) return;
    // Business contact
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(a => a.setAttribute('href', `tel:${cfg.business?.phone || '60707610'}`));
    const waLinks = document.querySelectorAll('a[href*="wa.me"]');
    waLinks.forEach(a => {
      const url = new URL(a.href);
      url.pathname = `/${encodeURIComponent(cfg.business?.whatsapp || '+96560707610')}`;
      a.href = url.toString();
    });
    // Hero texts
    setText('heroTitle', cfg.hero?.title);
    setText('heroSubtitle', cfg.hero?.subtitle);
    setText('heroTagline', cfg.hero?.tagline);
    // Promo USPs
    const uspList = document.getElementById('promoUsps');
    if (uspList && Array.isArray(cfg.promo?.usps)) {
      uspList.innerHTML = cfg.promo.usps.map(item => `<li>${item}</li>`).join('');
    }
    // FAQ
    const faqList = document.getElementById('faqList');
    if (faqList && Array.isArray(cfg.faq)) {
      faqList.innerHTML = cfg.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('');
    }
  }

  const __cfg = getConfig();
  applyConfig(__cfg);
  // initial gallery render
  renderGallery('all');

  // Before/After slider
  const baRange = document.getElementById("baRange");
  const baOverlay = document.getElementById("baOverlay");
  const baSliderLine = document.getElementById("baSliderLine");

  baRange.addEventListener("input", function () {
    let value = this.value;
    baOverlay.style.width = value + "%";
    baSliderLine.style.left = value + "%";
  });

})
