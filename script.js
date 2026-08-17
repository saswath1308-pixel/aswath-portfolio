/**
 * ASWATH S — UI/UX DESIGNER PORTFOLIO
 * Interactive JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------------------
  // 01. LIVE IST CLOCK TICKER
  // -------------------------------------------------------------------------
  const timeTicker = document.getElementById('live-time');

  function updateISTClock() {
    if (!timeTicker) return;
    const now = new Date();
    // Format to Indian Standard Time (UTC+5:30)
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const timeString = new Intl.DateTimeFormat('en-GB', options).format(now);
    timeTicker.textContent = `${timeString} IST`;
  }

  updateISTClock();
  setInterval(updateISTClock, 1000);

  // -------------------------------------------------------------------------
  // 02. CURSOR FOLLOWER & GLOW (DESKTOP)
  // -------------------------------------------------------------------------
  const cursorDot = document.getElementById('cursor-dot');
  const cursorGlow = document.getElementById('cursor-glow');

  if (window.matchMedia('(pointer: fine)').matches && cursorDot && cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      const { clientX: x, clientY: y } = e;
      cursorDot.style.left = `${x}px`;
      cursorDot.style.top = `${y}px`;

      cursorGlow.animate({
        left: `${x}px`,
        top: `${y}px`
      }, { duration: 500, fill: 'forwards' });
    });
  }

  // -------------------------------------------------------------------------
  // 03. RADIAL CARD GLOW ON HOVER
  // -------------------------------------------------------------------------
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // -------------------------------------------------------------------------
  // 04. TOAST NOTIFICATION & COPY TO CLIPBOARD
  // -------------------------------------------------------------------------
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('active');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('active');
    }, 3000);
  }

  // Copy email triggers
  const copyButtons = document.querySelectorAll('[data-email], .copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'saswath1308@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email copied: ${email}`);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  });

  // -------------------------------------------------------------------------
  // 05. SKILLS & ARSENAL FILTER TABS
  // -------------------------------------------------------------------------
  const filterTabs = document.querySelectorAll('.filter-tabs .tab-btn');
  const bentoCards = document.querySelectorAll('.bento-card');
  const skillBadges = document.querySelectorAll('.skill-badge');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      if (filter === 'all') {
        bentoCards.forEach(c => c.style.display = 'block');
        skillBadges.forEach(b => b.style.opacity = '1');
      } else if (filter === 'tools') {
        bentoCards.forEach(c => {
          c.style.display = c.getAttribute('data-category') === 'tools' ? 'block' : 'none';
        });
      } else if (filter === 'design') {
        bentoCards.forEach(c => {
          c.style.display = c.getAttribute('data-category') === 'design' ? 'block' : 'none';
        });
        skillBadges.forEach(b => {
          b.style.opacity = b.getAttribute('data-category') === 'design' ? '1' : '0.2';
        });
      } else if (filter === 'strategy') {
        bentoCards.forEach(c => {
          c.style.display = (c.getAttribute('data-category') === 'strategy' || c.getAttribute('data-category') === 'design') ? 'block' : 'none';
        });
        skillBadges.forEach(b => {
          b.style.opacity = b.getAttribute('data-category') === 'strategy' ? '1' : '0.2';
        });
      }
    });
  });

  // -------------------------------------------------------------------------
  // 06. RESUME MODAL CONTROL
  // -------------------------------------------------------------------------
  const resumeModal = document.getElementById('resume-modal');
  const openResumeHero = document.getElementById('open-resume-hero');
  const openResumeNav = document.getElementById('resume-nav-btn');
  const openResumeDock = document.getElementById('dock-resume-btn');
  const closeResumeBtn = document.getElementById('close-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');

  function openResume() {
    if (resumeModal) {
      resumeModal.showModal();
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.close();
      document.body.style.overflow = '';
    }
  }

  if (openResumeHero) openResumeHero.addEventListener('click', openResume);
  if (openResumeNav) openResumeNav.addEventListener('click', openResume);
  if (openResumeDock) openResumeDock.addEventListener('click', openResume);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);

  // Light dismiss on backdrop click
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      const rect = resumeModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeResume();
      }
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // -------------------------------------------------------------------------
  // 07. CASE STUDY DEEP DIVE MODAL
  // -------------------------------------------------------------------------
  const caseStudyModal = document.getElementById('case-study-modal');
  const csTag = document.getElementById('cs-modal-tag');
  const csTitle = document.getElementById('cs-modal-title');
  const csBody = document.getElementById('cs-modal-body');
  const closeCsBtn = document.getElementById('close-case-study-modal');

  const caseStudiesData = {
    'seaways-app': {
      tag: 'CASE STUDY // MOBILE APP PROTOTYPE',
      title: 'Seaways — Cruise Trip Booking & Shore Rental App',
      content: `
        <div class="case-study-detail">
          <div class="cs-hero-summary glass-card" style="padding: 1.5rem; margin-bottom: 2rem; border-color: rgba(0,85,255,0.3);">
            <h4 style="color: var(--accent-cyan); margin-bottom: 0.5rem;">Project Overview</h4>
            <p style="color: var(--text-secondary); line-height: 1.7;">
              Seaways is an all-in-one luxury cruise booking and vacation planning mobile application. 
              The objective was to eliminate traditional booking friction, make complex multi-day itinerary customization straightforward, 
              and provide an engaging shore rental reservation experience.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
            <div class="glass-card" style="padding: 1.25rem;">
              <h5 style="color: var(--accent-cyan); font-size: 0.8125rem; text-transform: uppercase; margin-bottom: 0.4rem;">Role</h5>
              <p>Lead UI/UX Designer (End-to-End)</p>
            </div>
            <div class="glass-card" style="padding: 1.25rem;">
              <h5 style="color: var(--accent-cyan); font-size: 0.8125rem; text-transform: uppercase; margin-bottom: 0.4rem;">Timeline</h5>
              <p>Concept to Prototype</p>
            </div>
            <div class="glass-card" style="padding: 1.25rem;">
              <h5 style="color: var(--accent-cyan); font-size: 0.8125rem; text-transform: uppercase; margin-bottom: 0.4rem;">Tools Used</h5>
              <p>Figma, ProtoPie, Miro</p>
            </div>
          </div>

          <h3 style="font-family: var(--font-display); font-size: 1.35rem; margin-bottom: 0.75rem;">1. Problem Definition</h3>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">
            Existing cruise booking platforms are notoriously cluttered on mobile devices, often presenting overwhelming tabular data for cabin options and buried add-on excursion costs. Travelers frequently abandon cart before completing their booking.
          </p>

          <h3 style="font-family: var(--font-display); font-size: 1.35rem; margin-bottom: 0.75rem;">2. User Research & Personas</h3>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">
            Conducted user interviews with 10 frequent vacationers. Key takeaways revealed that 80% wanted visual 360° cabin previews and transparent, modular pricing for shore excursions before committing to a booking.
          </p>

          <h3 style="font-family: var(--font-display); font-size: 1.35rem; margin-bottom: 0.75rem;">3. User Flow & Wireframing</h3>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">
            Designed a streamlined 4-step booking funnel: <strong>Destination Discovery → Ship & Date Selection → Visual Cabin Selector → Instant Excursion Add-ons → Secure Checkout</strong>.
          </p>

          <h3 style="font-family: var(--font-display); font-size: 1.35rem; margin-bottom: 0.75rem;">4. Key Features & Visual Design</h3>
          <ul style="list-style: disc; margin-left: 1.5rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 2rem;">
            <li><strong>Interactive Deck & Cabin Visualizer:</strong> Allows users to preview exact deck locations and ocean view orientations.</li>
            <li><strong>Dynamic Shore Excursion Cart:</strong> Add activities (scuba diving, island tours) with real-time price breakdown.</li>
            <li><strong>Offline Trip Companion:</strong> Digital boarding passes and onboard schedule accessible without network connectivity.</li>
          </ul>

          <div style="text-align: center; padding: 2rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
            <p style="color: var(--accent-cyan); font-weight: 600; margin-bottom: 0.5rem;">Interactive Figma Prototype</p>
            <p style="color: var(--text-muted); font-size: 0.875rem;">Built with full component variants, auto-layout 5.0, and high-fidelity smart animations.</p>
          </div>
        </div>
      `
    },
    'seaways-landing': {
      tag: 'CASE STUDY // WEB & CONVERSION UX',
      title: 'Seaways — High-Converting Cruise Booking Landing Page',
      content: `
        <div class="case-study-detail">
          <div class="cs-hero-summary glass-card" style="padding: 1.5rem; margin-bottom: 2rem; border-color: rgba(0,85,255,0.3);">
            <h4 style="color: var(--accent-cyan); margin-bottom: 0.5rem;">Conversion-Focused Landing Experience</h4>
            <p style="color: var(--text-secondary); line-height: 1.7;">
              Designed and optimized a responsive web landing page targeting first-time and luxury cruise seekers. 
              The layout prioritizes immediate destination search, high-impact destination imagery, transparent pricing, and social proof.
            </p>
          </div>

          <h3 style="font-family: var(--font-display); font-size: 1.35rem; margin-bottom: 0.75rem;">1. Information Architecture & Hierarchy</h3>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">
            Structured the page using the <strong>AIDA (Attention, Interest, Desire, Action)</strong> framework:
            Hero with global search bar → Featured cruise deals → Visual ship tours → Customer testimonials → FAQs & Sticky booking bar.
          </p>

          <h3 style="font-family: var(--font-display); font-size: 1.35rem; margin-bottom: 0.75rem;">2. Conversion Rate Optimization (CRO)</h3>
          <ul style="list-style: disc; margin-left: 1.5rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">
            <li>Zero-friction search filter with smart date picker and destination autocomplete.</li>
            <li>Prominent comparison grid highlighting cabin inclusions and transparent fees.</li>
            <li>Social proof badges and verified guest ratings integrated near all primary CTA buttons.</li>
          </ul>

          <h3 style="font-family: var(--font-display); font-size: 1.35rem; margin-bottom: 0.75rem;">3. Responsive Design Execution</h3>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 2rem;">
            Crafted fluid breakpoints for Mobile (375px), Tablet (768px), and Desktop (1440px) to ensure seamless readability and thumb-friendly touch targets on portable devices.
          </p>
        </div>
      `
    },
    'grocery-app': {
      tag: 'PIRAI INFOTECH // INTERNSHIP PROJECT',
      title: 'Grocery Retail Mobile Application',
      content: `
        <div class="case-study-detail">
          <div class="cs-hero-summary glass-card" style="padding: 1.5rem; margin-bottom: 2rem;">
            <h4 style="color: var(--accent-cyan); margin-bottom: 0.5rem;">Role & Scope</h4>
            <p style="color: var(--text-secondary); line-height: 1.7;">
              During my internship at Pirai Infotech, I designed the mobile app user experience for a grocery retail solution. 
              Focused on fast category browsing, intelligent recurring order shortcuts, and a 1-tap cart checkout flow.
            </p>
          </div>

          <h3 style="font-family: var(--font-display); font-size: 1.35rem; margin-bottom: 0.75rem;">Key Contributions</h3>
          <ul style="list-style: disc; margin-left: 1.5rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">
            <li>Designed intuitive visual category navigation with custom icon sets and promotional hero banners.</li>
            <li>Implemented a sticky mini-cart drawer reducing checkout drop-off rates.</li>
            <li>Built modular design system components in Figma following Atomic Design principles for seamless handover to the engineering team.</li>
          </ul>
        </div>
      `
    },
    'medsocio-app': {
      tag: 'EDXL LEARNING & INNOVATION // INTERNSHIP PROJECT',
      title: 'Medsocio Healthcare Mobile Application',
      content: `
        <div class="case-study-detail">
          <div class="cs-hero-summary glass-card" style="padding: 1.5rem; margin-bottom: 2rem;">
            <h4 style="color: var(--accent-cyan); margin-bottom: 0.5rem;">Healthcare Network UX</h4>
            <p style="color: var(--text-secondary); line-height: 1.7;">
              At EdXL, I led the UX/UI interface design for Medsocio — a specialized mobile networking and clinical discussion application for medical professionals, doctors, and students.
            </p>
          </div>

          <h3 style="font-family: var(--font-display); font-size: 1.35rem; margin-bottom: 0.75rem;">Design Highlights</h3>
          <ul style="list-style: disc; margin-left: 1.5rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">
            <li><strong>Strict Accessibility Standards:</strong> Clean contrast ratios, high-legibility typography, and accessible touch targets for busy healthcare workers.</li>
            <li><strong>Case Study & Feed Hierarchy:</strong> Designed structured feed cards for peer review of anonymized medical case studies.</li>
            <li><strong>Doctor Verification Flow:</strong> Created a step-by-step onboarding flow for credentials verification.</li>
          </ul>
        </div>
      `
    }
  };

  const caseStudyTriggers = document.querySelectorAll('.open-case-study');
  caseStudyTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const caseKey = trigger.getAttribute('data-case');
      const data = caseStudiesData[caseKey];
      if (data && caseStudyModal) {
        if (csTag) csTag.textContent = data.tag;
        if (csTitle) csTitle.textContent = data.title;
        if (csBody) csBody.innerHTML = data.content;
        caseStudyModal.showModal();
        document.body.style.overflow = 'hidden';
        if (window.lucide) window.lucide.createIcons();
      }
    });
  });

  if (closeCsBtn && caseStudyModal) {
    closeCsBtn.addEventListener('click', () => {
      caseStudyModal.close();
      document.body.style.overflow = '';
    });

    caseStudyModal.addEventListener('click', (e) => {
      const rect = caseStudyModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        caseStudyModal.close();
        document.body.style.overflow = '';
      }
    });
  }

  // -------------------------------------------------------------------------
  // 08. FLOATING DOCK ACTIVE OBSERVER
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const dockLinks = document.querySelectorAll('.floating-dock .dock-item[href]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        dockLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));

  // Initialize Lucide Icons on load
  if (window.lucide) {
    window.lucide.createIcons();
  }

});
