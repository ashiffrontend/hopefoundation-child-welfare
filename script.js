/**
 * HopeFoundation Child Welfare - Premium NGO Interactive Logic
 * Pure Vanilla JavaScript (ES6) - Zero Dependencies
 * Author: Mohammad Ashif (Ashif Web Studio)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Light / Dark Mode)
  initTheme();

  // 2. Scroll Progress & Sticky Navigation
  initScrollFeatures();

  // 3. Mobile Navigation Drawer
  initMobileNav();

  // 4. Animated Counters
  initCounters();

  // 5. Scroll Reveal Animations
  initScrollReveal();

  // 6. Programs Filtering & Modals
  initPrograms();

  // 7. Interactive Spending Donut Chart & Progress Bars
  initTransparencyChart();

  // 8. Tax Receipt Demo (Verification & Preview)
  initTaxReceiptDemo();

  // 9. Interactive Donation Calculator & Modal
  initDonationCalculator();

  // 10. Volunteer Management Form
  initVolunteerForm();

  // 11. Testimonials Slider
  initTestimonialsSlider();

  // 12. Photo Gallery Lightbox
  initGalleryLightbox();

  // 13. FAQ Accordion
  initFaqAccordion();

  // 14. Contact Form Handler
  initContactForm();

  // 15. Annual Reports Download Demo
  initAnnualReports();

  // 16. Newsletter Modal
  initNewsletterModal();
});

/* ==========================================================================
   1. Theme Management
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('hf_theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Set initial theme (Default to Light)
  const activeTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(activeTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('hf_theme', next);
      showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} theme`);
    });
  }
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

/* ==========================================================================
   2. Scroll Progress & Sticky Header & Back-To-Top
   ========================================================================== */
function initScrollFeatures() {
  const progressBar = document.getElementById('scroll-progress');
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Progress bar width
    if (progressBar && docHeight > 0) {
      const progress = (scrollY / docHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Sticky header shadow
    if (header) {
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active nav link highlight
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   3. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('#mobile-drawer .nav-link');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('active');
      if (isOpen) {
        drawer.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      } else {
        drawer.classList.add('active');
        menuBtn.setAttribute('aria-expanded', 'true');
      }
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   4. Animated Statistics Counters
   ========================================================================== */
function initCounters() {
  const statsElements = document.querySelectorAll('.stat-number[data-target]');
  if (!statsElements.length) return;

  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statsElements.forEach(el => animateCounter(el));
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('statistics');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-target'));
  const prefix = el.getAttribute('data-prefix') || '';
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out expo
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const currentVal = Math.floor(easeProgress * target);

    el.textContent = `${prefix}${currentVal.toLocaleString('en-IN')}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      el.textContent = `${prefix}${target.toLocaleString('en-IN')}${suffix}`;
    }
  }

  requestAnimationFrame(updateCount);
}

/* ==========================================================================
   5. Scroll Reveal Animations
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   6. Programs Filter & Details
   ========================================================================== */
function initPrograms() {
  const filterTabs = document.querySelectorAll('.programs-filter-bar .filter-tab');
  const programCards = document.querySelectorAll('.programs-grid .program-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      programCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });

  // Learn More Click Handlers
  const learnMoreBtns = document.querySelectorAll('.btn-learn-program');
  learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.program-card');
      const title = card.querySelector('.program-title').textContent;
      const desc = card.querySelector('.program-desc').textContent;
      const impact = card.querySelector('.program-impact-metric').textContent;

      openGenericModal(title, `
        <div style="margin-top:1rem; line-height:1.7;">
          <p style="margin-bottom:1rem; color:var(--text-muted);">${desc}</p>
          <div style="background:var(--bg-surface-subtle); padding:1rem; border-radius:12px; margin-bottom:1.5rem;">
            <strong style="color:var(--primary); display:block; margin-bottom:0.25rem;">Key Performance Metric</strong>
            <span style="font-weight:600;">${impact}</span>
          </div>
          <p style="font-size:0.875rem; color:var(--text-muted); margin-bottom:1.5rem;">
            This initiative operates under strict transparent accounting protocols with community elder oversight, weekly monitoring, and quarterly audited outcomes.
          </p>
          <div style="display:flex; gap:0.75rem;">
            <a href="#donate" class="btn btn-primary" onclick="closeGenericModal()">Support This Program</a>
            <a href="#volunteer" class="btn btn-outline" onclick="closeGenericModal()">Volunteer Now</a>
          </div>
        </div>
      `);
    });
  });
}

/* ==========================================================================
   7. Interactive Spending Donut Chart & Progress Bars
   ========================================================================== */
function initTransparencyChart() {
  const chartBox = document.querySelector('.transparency-chart-box');
  const progressFills = document.querySelectorAll('.progress-fill');
  const donutSegments = document.querySelectorAll('.donut-segment');
  const centerPercent = document.getElementById('donut-center-pct');
  const centerCategory = document.getElementById('donut-center-cat');

  // Animate progress bars on scroll
  if (chartBox) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressFills.forEach(fill => {
            const width = fill.getAttribute('data-width') || '0%';
            fill.style.width = width;
          });
        }
      });
    }, { threshold: 0.2 });
    observer.observe(chartBox);
  }

  // Interactive Hover on SVG Donut segments
  donutSegments.forEach(segment => {
    segment.addEventListener('mouseenter', () => {
      const pct = segment.getAttribute('data-percent');
      const cat = segment.getAttribute('data-category');
      if (centerPercent && centerCategory) {
        centerPercent.textContent = `${pct}%`;
        centerCategory.textContent = cat;
      }
    });

    segment.addEventListener('mouseleave', () => {
      if (centerPercent && centerCategory) {
        centerPercent.textContent = '85%';
        centerCategory.textContent = 'Direct Program Aid';
      }
    });
  });
}

/* ==========================================================================
   8. Tax Receipt Demo (Verification & Preview)
   ========================================================================== */
function initTaxReceiptDemo() {
  const verifyBtn = document.getElementById('verify-tax-btn');
  const printBtn = document.getElementById('print-receipt-btn');
  const downloadBtn = document.getElementById('download-receipt-txt-btn');

  // Input fields
  const nameInput = document.getElementById('tax-donor-name');
  const receiptInput = document.getElementById('tax-receipt-no');
  const dateInput = document.getElementById('tax-donation-date');
  const emailInput = document.getElementById('tax-donor-email');

  // Display fields on preview receipt
  const prevDonorName = document.getElementById('prev-donor-name');
  const prevReceiptNo = document.getElementById('prev-receipt-no');
  const prevDate = document.getElementById('prev-date');
  const prevEmail = document.getElementById('prev-email');

  if (verifyBtn) {
    verifyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = nameInput.value.trim() || 'Anita Sharma';
      const receiptNo = receiptInput.value.trim() || 'HF-2026-9842';
      const date = dateInput.value || '2026-10-12';
      const email = emailInput.value.trim() || 'anita.sharma@example.com';

      // Update preview card
      if (prevDonorName) prevDonorName.textContent = name;
      if (prevReceiptNo) prevReceiptNo.textContent = receiptNo;
      if (prevDate) prevDate.textContent = date;
      if (prevEmail) prevEmail.textContent = email;

      showToast('Tax Receipt verified successfully!');
      
      // Highlight receipt with a subtle pulse
      const previewCard = document.getElementById('tax-receipt-preview');
      if (previewCard) {
        previewCard.style.outline = '3px solid var(--primary)';
        setTimeout(() => { previewCard.style.outline = 'none'; }, 1000);
      }
    });
  }

  // Print Receipt
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Download Sample Text Receipt
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const name = prevDonorName ? prevDonorName.textContent : 'Valued Donor';
      const receiptNo = prevReceiptNo ? prevReceiptNo.textContent : 'HF-2026-9842';
      const date = prevDate ? prevDate.textContent : '2026-10-12';
      
      const receiptContent = `========================================================
HOPEFOUNDATION CHILD WELFARE
GOVERNMENT RECOGNIZED SECTION 8 NGO
Registration No: IND-DEL-NGO-80G-2026
80G Exemption Approval: CIT(E)/DELHI/80G/2026-27/AAACT0000A
========================================================

OFFICIAL TAX EXEMPTION RECEIPT (DEMONSTRATION)
Receipt Number : ${receiptNo}
Issue Date     : ${date}
Donor Name     : ${name}
Amount         : INR 2,500.00 (Rupees Two Thousand Five Hundred Only)
Payment Mode   : Online Instant Gateway (Verified)
Purpose        : Child Welfare & Primary Education Aid

ELIGIBILITY CLAUSE:
Donations made to HopeFoundation Child Welfare qualify for 50%
deduction from taxable income under Section 80G of the Income Tax Act.

Thank you for building a brighter future with HopeFoundation!
Website: https://ashif-web-studio.vercel.app/
========================================================`;

      downloadTextFile(`HopeFoundation_Tax_Receipt_${receiptNo}.txt`, receiptContent);
      showToast('Sample Tax Receipt downloaded successfully!');
    });
  }
}

/* ==========================================================================
   9. Interactive Donation Calculator & Modal
   ========================================================================== */
function initDonationCalculator() {
  const freqTabs = document.querySelectorAll('.donation-type-tabs .freq-tab');
  const tierCards = document.querySelectorAll('.donation-tiers-grid .tier-card');
  const customInput = document.getElementById('custom-donation-amount');
  const impactSummary = document.getElementById('donation-impact-text');
  const donateBtn = document.getElementById('open-donation-modal-btn');

  let currentAmount = 2500;
  let currentFreq = 'one-time';

  function updateImpact(amount, freq) {
    let text = '';
    const multiplier = freq === 'monthly' ? 'every month' : '';
    
    if (amount < 500) {
      text = `Your contribution of ₹${amount.toLocaleString('en-IN')} ${multiplier} provides clean drinking water and stationery for 2 students.`;
    } else if (amount < 1000) {
      text = `Your contribution of ₹${amount.toLocaleString('en-IN')} ${multiplier} provides wholesome nutritious school lunches for 1 child for a full month.`;
    } else if (amount < 2500) {
      text = `Your contribution of ₹${amount.toLocaleString('en-IN')} ${multiplier} provides a complete back-to-school kit (uniform, shoes, bag, and textbooks).`;
    } else if (amount < 5000) {
      text = `Your contribution of ₹${amount.toLocaleString('en-IN')} ${multiplier} covers 1 child's complete tuition, health checks, and books for an entire term!`;
    } else {
      text = `Your generous gift of ₹${amount.toLocaleString('en-IN')} ${multiplier} funds a digital learning tablet lab, broadband, and specialized STEM tutoring.`;
    }

    if (impactSummary) {
      impactSummary.textContent = text;
    }
  }

  // Frequency Toggle
  freqTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      freqTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFreq = tab.getAttribute('data-freq');
      updateImpact(currentAmount, currentFreq);
    });
  });

  // Preset Tier Cards
  tierCards.forEach(card => {
    card.addEventListener('click', () => {
      tierCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const val = parseInt(card.getAttribute('data-amount'), 10);
      currentAmount = val;
      if (customInput) customInput.value = val;
      updateImpact(currentAmount, currentFreq);
    });
  });

  // Custom Input
  if (customInput) {
    customInput.addEventListener('input', () => {
      const val = parseInt(customInput.value, 10) || 0;
      currentAmount = val;
      tierCards.forEach(c => c.classList.remove('selected'));
      // Check if it matches a card
      tierCards.forEach(c => {
        if (parseInt(c.getAttribute('data-amount'), 10) === val) {
          c.classList.add('selected');
        }
      });
      updateImpact(currentAmount, currentFreq);
    });
  }

  // Initial update
  updateImpact(currentAmount, currentFreq);

  // Donate Button Click -> Open Modal
  if (donateBtn) {
    donateBtn.addEventListener('click', () => {
      openDonationCheckoutModal(currentAmount, currentFreq);
    });
  }
}

function openDonationCheckoutModal(amount, freq) {
  openGenericModal('Complete Your Contribution (Demo)', `
    <div style="margin-top:1.25rem;">
      <div style="background:var(--primary-light); padding:1rem 1.25rem; border-radius:12px; margin-bottom:1.5rem; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="font-size:0.8125rem; color:var(--text-muted); display:block;">Contribution Total</span>
          <strong style="font-size:1.5rem; color:var(--primary);">₹${amount.toLocaleString('en-IN')}</strong>
          <span style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">(${freq})</span>
        </div>
        <span style="font-size:0.75rem; background:white; color:var(--primary); font-weight:700; padding:0.25rem 0.65rem; border-radius:999px;">80G Tax Saver</span>
      </div>

      <div style="margin-bottom:1.25rem;">
        <label style="display:block; font-size:0.875rem; font-weight:600; margin-bottom:0.35rem;">Choose Demo Payment Gateway</label>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
          <button type="button" class="btn btn-outline payment-method-opt active" style="justify-content:flex-start; font-size:0.875rem;" onclick="selectPaymentOpt(this)">
            💳 UPI / QR Code
          </button>
          <button type="button" class="btn btn-outline payment-method-opt" style="justify-content:flex-start; font-size:0.875rem;" onclick="selectPaymentOpt(this)">
            🏦 Net Banking / Cards
          </button>
        </div>
      </div>

      <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:1.5rem; line-height:1.5;">
        🔒 Demo Checkout Environment: No real monetary transaction or banking credentials are requested or processed.
      </p>

      <button type="button" class="btn btn-primary btn-lg" style="width:100%;" onclick="confirmDemoPayment(${amount})">
        Confirm Demo Contribution
      </button>
    </div>
  `);
}

window.selectPaymentOpt = function(btn) {
  document.querySelectorAll('.payment-method-opt').forEach(b => b.classList.remove('active', 'btn-primary'));
  btn.classList.add('active');
};

window.confirmDemoPayment = function(amount) {
  const demoTxnId = 'TXN-' + Math.floor(100000 + Math.random() * 900000);
  closeGenericModal();
  openGenericModal('Contribution Successful! 🎉', `
    <div style="text-align:center; padding:1.5rem 0;">
      <div style="width:64px; height:64px; border-radius:50%; background:var(--success-light); color:var(--success); display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem auto; font-size:2rem;">
        ✓
      </div>
      <h3 style="font-size:1.35rem; font-weight:700; margin-bottom:0.5rem;">Thank You for Empowering Children!</h3>
      <p style="font-size:0.9375rem; color:var(--text-muted); margin-bottom:1.5rem; line-height:1.6;">
        Your simulated gift of <strong>₹${amount.toLocaleString('en-IN')}</strong> has been registered. A demo 80G tax receipt has been generated under Transaction ID: <code style="font-family:var(--font-mono); font-weight:700; color:var(--primary);">${demoTxnId}</code>.
      </p>
      <a href="#tax-receipt" class="btn btn-primary" onclick="closeGenericModal()">View In Tax Receipt Generator</a>
    </div>
  `);
};

/* ==========================================================================
   10. Volunteer Management Form & Success Modal
   ========================================================================== */
function initVolunteerForm() {
  const form = document.getElementById('volunteer-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('vol-name').value.trim();
    const email = document.getElementById('vol-email').value.trim();
    const phone = document.getElementById('vol-phone').value.trim();
    const city = document.getElementById('vol-city').value.trim();
    const skill = document.getElementById('vol-skill').value;
    const availability = document.getElementById('vol-availability').value;
    const message = document.getElementById('vol-message').value.trim();

    if (!name || !email || !phone || !city) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const volId = 'VOL-2026-' + Math.floor(100 + Math.random() * 900);

    // Open Success Modal
    openGenericModal('Welcome to HopeFoundation! 🤝', `
      <div style="text-align:center; padding:1rem 0;">
        <div style="width:68px; height:68px; border-radius:50%; background:var(--primary-light); color:var(--primary); display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem auto; font-size:1.75rem;">
          🌟
        </div>
        <h3 style="font-size:1.35rem; font-weight:700; margin-bottom:0.5rem;">Application Received, ${name}!</h3>
        <p style="font-size:0.9375rem; color:var(--text-muted); margin-bottom:1.25rem; line-height:1.6;">
          Your volunteer profile has been logged in our cohort registry under Volunteer ID: <strong style="color:var(--primary); font-family:var(--font-mono);">${volId}</strong>.
        </p>

        <div style="background:var(--bg-surface-subtle); border:1px solid var(--border-color); border-radius:12px; padding:1.25rem; text-align:left; margin-bottom:1.5rem; font-size:0.875rem;">
          <div style="margin-bottom:0.5rem;"><strong>Assigned Track:</strong> ${skill}</div>
          <div style="margin-bottom:0.5rem;"><strong>Availability:</strong> ${availability}</div>
          <div><strong>Community Chapter:</strong> ${city} Hub</div>
        </div>

        <p style="font-size:0.8125rem; color:var(--text-muted); margin-bottom:1.5rem;">
          Our coordinator will connect with you via email (${email}) within 48 business hours with the orientation package.
        </p>

        <button type="button" class="btn btn-primary" onclick="closeGenericModal()">Got It, Thank You!</button>
      </div>
    `);

    form.reset();
  });
}

/* ==========================================================================
   11. Testimonials Slider
   ========================================================================== */
function initTestimonialsSlider() {
  const track = document.getElementById('testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prev-testimonial-btn');
  const nextBtn = document.getElementById('next-testimonial-btn');
  const dotsContainer = document.getElementById('testimonial-dots');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoPlayInterval = null;

  // Create dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    if (currentIndex >= totalSlides) currentIndex = 0;
    if (currentIndex < 0) currentIndex = totalSlides - 1;
    updateSlider();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // Auto play
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 6000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  startAutoPlay();
  track.parentElement.addEventListener('mouseenter', stopAutoPlay);
  track.parentElement.addEventListener('mouseleave', startAutoPlay);
}

/* ==========================================================================
   12. Photo Gallery Lightbox
   ========================================================================== */
function initGalleryLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  if (!items.length || !modal) return;

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = items[currentIndex];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-title')?.textContent || '';
    const sub = item.querySelector('.gallery-sub')?.textContent || '';

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || title;
    lightboxCaption.textContent = `${title} — ${sub}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % items.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    openLightbox(currentIndex);
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ==========================================================================
   13. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const triggers = document.querySelectorAll('.faq-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parent = trigger.closest('.faq-item');
      const content = parent.querySelector('.faq-content');
      const isActive = parent.classList.contains('active');

      // Close all others
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parent) {
          item.classList.remove('active');
          item.querySelector('.faq-content').style.maxHeight = null;
          item.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isActive) {
        parent.classList.remove('active');
        content.style.maxHeight = null;
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        parent.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   14. Contact Form Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-msg').value.trim();

    if (!name || !email || !message) {
      showToast('Please enter your name, email, and message.', 'error');
      return;
    }

    showToast(`Thank you, ${name}! Your inquiry has been sent to our desk.`);
    form.reset();
  });
}

/* ==========================================================================
   15. Annual Reports Download Demo
   ========================================================================== */
function initAnnualReports() {
  const reportBtns = document.querySelectorAll('.btn-download-report');

  reportBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const year = btn.getAttribute('data-year') || '2026';
      
      const reportContent = `========================================================
HOPEFOUNDATION CHILD WELFARE
ANNUAL AUDITED IMPACT & GOVERNANCE REPORT ${year}
========================================================
Organization: HopeFoundation Child Welfare
Registration: Section 8 Non-Profit Co. (CIN: U85300DL2018NPL334455)
Auditors    : M/s V. S. Agarwal & Associates, Chartered Accountants
Status      : Unqualified Clean Audit Opinion

1. FINANCIAL HIGHLIGHTS (${year}):
- Direct Program Expenditure: 85.0%
- Community Village Development: 10.0%
- Administrative & Compliance: 5.0%
- Total Funds Deployed: INR 24.8 Million

2. MISSION REACH:
- Children Enrolled in Remedial Learning: 10,480
- Wholesome Midday Meals Served: 1,840,000+
- Digital Tablet Centers Established: 48
- Pediatric Healthcare Camps Hosted: 112

3. GOVERNANCE NOTE:
100% of individual public donations directly support beneficiary programs.
Zero founder dividend policy in effect.

Prepared by: HopeFoundation Board of Trustees
Developer Portfolio Reference: https://ashif-web-studio.vercel.app/
========================================================`;

      downloadTextFile(`HopeFoundation_Annual_Report_${year}.txt`, reportContent);
      showToast(`Annual Report ${year} downloaded successfully!`);
    });
  });
}

/* ==========================================================================
   16. Newsletter Modal (Non-intrusive)
   ========================================================================== */
function initNewsletterModal() {
  const hasSeenNewsletter = sessionStorage.getItem('hf_newsletter_seen');
  if (hasSeenNewsletter) return;

  // Show after 16 seconds of peaceful reading
  setTimeout(() => {
    if (!document.querySelector('.app-modal.active')) {
      const modal = document.getElementById('newsletter-modal');
      if (modal) {
        modal.classList.add('active');
        sessionStorage.setItem('hf_newsletter_seen', 'true');
      }
    }
  }, 16000);

  const form = document.getElementById('newsletter-modal-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value.trim();
      if (email) {
        document.getElementById('newsletter-modal').classList.remove('active');
        showToast('Subscribed! Welcome to HopeFoundation quarterly gazette.');
      }
    });
  }
}

/* ==========================================================================
   Shared Helpers: Toast Notifications & Generic Modal
   ========================================================================== */
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const icon = type === 'error' ? '⚠️' : '✓';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function openGenericModal(title, htmlContent) {
  let modal = document.getElementById('generic-app-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'generic-app-modal';
    modal.className = 'app-modal';
    modal.innerHTML = `
      <div class="app-modal-dialog">
        <span class="modal-close-icon" onclick="closeGenericModal()">&times;</span>
        <h3 id="generic-modal-title" style="font-family:var(--font-serif); font-size:1.5rem; font-weight:700; color:var(--text-main); margin-bottom:0.5rem;"></h3>
        <div id="generic-modal-body"></div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeGenericModal();
    });
  }

  document.getElementById('generic-modal-title').textContent = title;
  document.getElementById('generic-modal-body').innerHTML = htmlContent;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

window.closeGenericModal = function() {
  const modal = document.getElementById('generic-app-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.closeNewsletterModal = function() {
  const modal = document.getElementById('newsletter-modal');
  if (modal) {
    modal.classList.remove('active');
    sessionStorage.setItem('hf_newsletter_seen', 'true');
  }
};

function downloadTextFile(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
