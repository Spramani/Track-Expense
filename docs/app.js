// ==========================================================================
// TrackExpense Web App Interactions, Lightbox & Marketing Animations
// ==========================================================================

// 1. Initialize Lucide Icons
function initLucide() {
    if (window.lucide) {
        lucide.createIcons();
    }
}
initLucide();

// 2. Sticky Navbar with Glass Blur on Scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 3. Smooth 3D Perspective Tilt on Hero Phone Mockup
const phoneFrame = document.querySelector('.phone-frame');
const heroMockup = document.querySelector('.hero-mockup');

if (heroMockup && phoneFrame && window.innerWidth > 968) {
    heroMockup.addEventListener('mousemove', (e) => {
        const rect = heroMockup.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Gentle tilt calculations
        const rotateY = (x / (rect.width / 2)) * 14;
        const rotateX = -(y / (rect.height / 2)) * 14;
        
        phoneFrame.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;
    });

    heroMockup.addEventListener('mouseleave', () => {
        phoneFrame.style.transform = `rotateY(-12deg) rotateX(4deg) scale(1)`;
    });
}

// 4. Hero Screen Switcher (Toggle between Dashboard & Transactions)
const heroToggleBtns = document.querySelectorAll('.hero-toggle-btn');
const heroPhoneImg = document.getElementById('heroPhoneImg');
const heroBadgeBalance = document.getElementById('heroBadgeBalance');
const heroBadgeSplit = document.getElementById('heroBadgeSplit');

if (heroToggleBtns.length && heroPhoneImg) {
    heroToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;

            heroToggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const screen = btn.getAttribute('data-screen');

            // 1. Smooth fade out
            heroPhoneImg.classList.add('is-transitioning');

            // 2. Change image & floating badges midway through fade
            setTimeout(() => {
                if (screen === 'transactions') {
                    heroPhoneImg.src = 'assets/screenshots/ss-04-transactions.png';
                    heroPhoneImg.alt = 'TrackExpense Transactions Ledger';
                    if (heroBadgeBalance) {
                        heroBadgeBalance.innerHTML = `
                            <div class="badge-icon-box"><i data-lucide="trending-down" style="width: 20px; height: 20px; color: #FF6B6B;"></i></div>
                            <div>
                                <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500;">Net Cash Flow</div>
                                <div style="font-size: 1rem; color: #FF6B6B; font-weight: 700;">-$10,535.92</div>
                            </div>
                        `;
                    }
                    if (heroBadgeSplit) {
                        heroBadgeSplit.innerHTML = `
                            <div class="badge-icon-box"><i data-lucide="file-spreadsheet" style="width: 20px; height: 20px; color: var(--primary-indigo);"></i></div>
                            <div>
                                <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500;">History Ledger</div>
                                <div style="font-size: 1rem; color: #FFFFFF; font-weight: 700;">30 Entries Filtered</div>
                            </div>
                        `;
                    }
                } else {
                    heroPhoneImg.src = 'assets/screenshots/ss-01-dashboard.png';
                    heroPhoneImg.alt = 'TrackExpense Dashboard';
                    if (heroBadgeBalance) {
                        heroBadgeBalance.innerHTML = `
                            <div class="badge-icon-box"><i data-lucide="wallet" class="text-mint" style="width: 20px; height: 20px;"></i></div>
                            <div>
                                <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500;">Net Balance</div>
                                <div style="font-size: 1rem; color: var(--accent-mint); font-weight: 700;">₹1,00,000</div>
                            </div>
                        `;
                    }
                    if (heroBadgeSplit) {
                        heroBadgeSplit.innerHTML = `
                            <div class="badge-icon-box"><i data-lucide="users" style="width: 20px; height: 20px; color: var(--primary-indigo);"></i></div>
                            <div>
                                <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500;">Group Settlement</div>
                                <div style="font-size: 1rem; color: #FFFFFF; font-weight: 700;">Trip Split Active</div>
                            </div>
                        `;
                    }
                }
                initLucide();

                // 3. Smooth fade back in
                requestAnimationFrame(() => {
                    heroPhoneImg.classList.remove('is-transitioning');
                });
            }, 180);
        });
    });
}

// 5. Staggered Scroll Reveal Animations for Cards
const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }, index * 60);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .cta-card, .faq-item, .why-us-card').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
    observer.observe(el);
});

// 6. Interactive FAQ Accordion Click Behavior
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const p = item.querySelector('p');
        if (p) {
            const isHidden = p.style.display === 'none' || window.getComputedStyle(p).display === 'none';
            p.style.display = isHidden ? 'block' : 'none';
        }
    });
});

// 7. Screenshot Carousel Controls
const galleryTrack = document.querySelector('.gallery-track');
const prevBtn = document.querySelector('.carousel-nav-btn.prev');
const nextBtn = document.querySelector('.carousel-nav-btn.next');

if (galleryTrack && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        galleryTrack.scrollBy({ left: -320, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        galleryTrack.scrollBy({ left: 320, behavior: 'smooth' });
    });
}

// 8. Interactive Screenshot Lightbox Modal Data & Controller
const screensData = [
    {
        id: 0,
        tag: "Overview",
        title: "Net Balance & Smart Insights",
        img: "assets/screenshots/ss-01-dashboard.png",
        desc: "The home command center displaying your unified net worth, real-time income vs expense progress, and automated AI financial insights.",
        bullets: [
            "Unified Net Balance auto-converted into your default currency.",
            "Smart Insights calculating daily spending average & monthly run-rate.",
            "Quick-action floating buttons for Camera Receipt Scan, Group Split, and Instant Add.",
            "Live breakdown of pending receivables ('To Receive') and payables ('To Give')."
        ]
    },
    {
        id: 1,
        tag: "Ledger",
        title: "Cash Flow & Transaction History",
        img: "assets/screenshots/ss-04-transactions.png",
        desc: "A crystal-clear chronological ledger with monthly cash flow cards, member attribution, and flexible timeline filtering.",
        bullets: [
            "Net Cash Flow header summarizing total monthly income vs total expenses.",
            "Horizontal month chips with individual month spend totals.",
            "Visual transaction badges for Income, Expense, Get, and Will Give.",
            "Direct access to live currency conversion and CSV/PDF export."
        ]
    },
    {
        id: 2,
        tag: "Analytics",
        title: "Spending Velocity & Category Donut",
        img: "assets/screenshots/ss-02-analytics.png",
        desc: "Comprehensive visual analytics highlighting your exact spending breakdown and day-by-day velocity curve.",
        bullets: [
            "Interactive Category Expense Donut Chart with percentage distributions.",
            "Daily Spending Trend graph tracking burn-rate across the month.",
            "Toggle seamlessly between Charts and Category Budgets.",
            "Filter trends by month or full calendar year with instant refresh."
        ]
    },
    {
        id: 3,
        tag: "Search & Filter",
        title: "Multi-Parameter Filter Sheet",
        img: "assets/screenshots/ss-12-filter.png",
        desc: "Deep filter capabilities to pinpoint any transaction by type, payment source, custom category, or date window.",
        bullets: [
            "Filter by 4 transaction types: Income, Expense, Get, and Will Give.",
            "Select specific Payment Sources: Cash, Bank / UPI, and Credit Card.",
            "Category filters including Food, Travel, Shopping, Bills, Medical, and more.",
            "Custom Date Range selector with 1-tap presets and 'All Time' view."
        ]
    },
    {
        id: 4,
        tag: "Multi-Currency",
        title: "Live Currency Converter",
        img: "assets/screenshots/ss-05-currency.png",
        desc: "Real-time exchange rate engine supporting global currencies with instant conversion calculations.",
        bullets: [
            "Live exchange rates for USD, EUR, INR, GBP, AED, JPY, CAD, and more.",
            "Quick denomination buttons (₹1, ₹10, ₹50, ₹100, ₹500, ₹1000) for rapid math.",
            "Shows both direct and inverse rates with timestamped rate refreshes.",
            "Dynamically applies exchange rates across all app balances."
        ]
    },
    {
        id: 5,
        tag: "Fast Entry",
        title: "4-Way Transaction Selector",
        img: "assets/screenshots/ss-06-add-expense.png",
        desc: "Designed for speed. Log any income, expense, lent, or borrowed amount in under 3 seconds flat.",
        bullets: [
            "Color-coded 4-way selector: Income, Expense, Get (Lent), Will Give (Borrowed).",
            "Huge numeric display with immediate currency symbol feedback.",
            "Grid of preset visual category cards with custom category manager.",
            "Haptic feedback and smart keyboard auto-focus on open."
        ]
    },
    {
        id: 6,
        tag: "Vision OCR",
        title: "Receipt Scanning & Metadata",
        img: "assets/screenshots/ss-07-categories.png",
        desc: "Attach camera receipt photos, configure custom payment accounts, and schedule recurring bills.",
        bullets: [
            "Apple Vision on-device OCR automatically extracts totals from paper receipts.",
            "Attach photos directly from iPhone camera or photo library.",
            "Assign payment method: Cash, Bank / UPI, or Credit Cards.",
            "Optional recurring transaction toggle for subscriptions and rent."
        ]
    },
    {
        id: 7,
        tag: "Bill Split",
        title: "Trip Groups & Bill Splitting",
        img: "assets/screenshots/ss-03-groups.png",
        desc: "Manage shared expenses for roommates, trips, and dinners without confusion or manual calculations.",
        bullets: [
            "'Quick Split' for one-time restaurant and movie bills.",
            "'New Group' for multi-day vacations (e.g., Goa Trip 🏖️) and roommate rent.",
            "Automatic minimum-transfer calculation showing who owes whom.",
            "1-tap settlement recording with history log."
        ]
    },
    {
        id: 8,
        tag: "Financial Goals",
        title: "Savings Goals Tracker",
        img: "assets/screenshots/ss-08-savings-goals.png",
        desc: "Set and track targets for vacations, emergency funds, dream gadgets, or vehicle purchases.",
        bullets: [
            "Target amount and target date tracking with visual milestone rings.",
            "Log incremental savings deposits toward individual goals.",
            "Keeps your savings segregated from daily discretionary spending.",
            "Motivational progress alerts as milestones are reached."
        ]
    },
    {
        id: 9,
        tag: "Utilities",
        title: "Tools & Utilities Hub",
        img: "assets/screenshots/ss-09-more-hub.png",
        desc: "Centralized quick access to savings goals, exchange rates, category presets, and user settings.",
        bullets: [
            "Clean grid layout providing 1-tap navigation to core power tools.",
            "Currency rates portal with manual refresh and historical rates.",
            "Personalized savings goals overview.",
            "Direct link into security, profile, and export preferences."
        ]
    },
    {
        id: 10,
        tag: "Privacy & Security",
        title: "Profile & Biometric Security",
        img: "assets/screenshots/ss-09-profile.png",
        desc: "Comprehensive profile controls, Apple Face ID / Touch ID security lock, and one-tap CSV export.",
        bullets: [
            "Biometric App Lock via Apple Face ID & Touch ID.",
            "Theme selector: System, Light, and Dark Aurora modes.",
            "Export complete transaction ledger as clean CSV for Excel or Google Sheets.",
            "100% private: permanent zero-trace account and data deletion in 1 tap."
        ]
    },
    {
        id: 11,
        tag: "Branding",
        title: "Dark Aurora Brand Splash",
        img: "assets/screenshots/ss-11-launch.png",
        desc: "Native iOS 17+ dark aurora design language: Smart Money • Simplified.",
        bullets: [
            "Glowing neon wallet emblem with dark aurora ambient gradients.",
            "Optimized launch speed (< 0.5s cold start) on iOS devices.",
            "Designed from the ground up for modern OLED iPhone displays.",
            "Version 1.0 App Store ready."
        ]
    }
];

let currentScreenIndex = 0;
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTag = document.getElementById('lightboxTag');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const lightboxBullets = document.getElementById('lightboxBullets');
const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
const lightboxNextBtn = document.getElementById('lightboxNextBtn');
const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

function renderLightboxScreen(index) {
    if (index < 0) index = screensData.length - 1;
    if (index >= screensData.length) index = 0;
    currentScreenIndex = index;
    
    const data = screensData[currentScreenIndex];
    if (!data) return;

    if (lightboxImg) lightboxImg.src = data.img;
    if (lightboxTag) lightboxTag.innerText = data.tag;
    if (lightboxTitle) lightboxTitle.innerText = data.title;
    if (lightboxDesc) lightboxDesc.innerText = data.desc;
    
    if (lightboxBullets) {
        lightboxBullets.innerHTML = data.bullets.map(b => `
            <li><i data-lucide="check-circle-2"></i> <span>${b}</span></li>
        `).join('');
    }
    initLucide();
}

function openLightbox(index) {
    renderLightboxScreen(index);
    if (lightboxModal) {
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    if (lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Attach click listeners to gallery cards
document.querySelectorAll('.gallery-card').forEach((card, idx) => {
    card.addEventListener('click', () => {
        openLightbox(idx);
    });
});

if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', () => renderLightboxScreen(currentScreenIndex - 1));
if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', () => renderLightboxScreen(currentScreenIndex + 1));

if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) closeLightbox();
    });
}

// Keyboard navigation
window.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') renderLightboxScreen(currentScreenIndex - 1);
    if (e.key === 'ArrowRight') renderLightboxScreen(currentScreenIndex + 1);
});

// 9. Mobile View Mode & Automated Marketing Tour Controller
const toggleMobileBtn = document.getElementById('toggleMobileBtn');
const mobileBtnText = document.getElementById('mobileBtnText');
const startTourBtn = document.getElementById('startTourBtn');
const tourCountdown = document.getElementById('tourCountdown');
const countdownNumber = document.getElementById('countdownNumber');
const tourBanner = document.getElementById('tourBanner');
const tourStatusText = document.getElementById('tourStatusText');

function setMobileMode(enabled) {
    if (enabled) {
        document.body.classList.add('mobile-mode');
        if (mobileBtnText) mobileBtnText.innerText = 'Desktop View';
    } else {
        document.body.classList.remove('mobile-mode');
        if (mobileBtnText) mobileBtnText.innerText = 'Mobile View';
    }
}

if (toggleMobileBtn) {
    toggleMobileBtn.addEventListener('click', () => {
        const isMobile = document.body.classList.contains('mobile-mode');
        setMobileMode(!isMobile);
    });
}

// Auto-activate mobile mode if requested via URL (?mobile=1 or ?tour=1)
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('mobile') === '1' || urlParams.get('tour') === '1') {
    setMobileMode(true);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runAutomatedRecordingTour() {
    setMobileMode(true);
    window.scrollTo({ top: 0, behavior: 'instant' });

    tourCountdown.style.display = 'flex';
    for (let i = 3; i >= 1; i--) {
        countdownNumber.innerText = i;
        await sleep(1000);
    }
    countdownNumber.innerText = '🎥';
    await sleep(600);
    tourCountdown.style.display = 'none';

    tourBanner.style.display = 'flex';
    tourStatusText.innerText = '🎬 Hero: Smart Personal Finance';
    await sleep(3500);

    const showcaseEl = document.querySelector('.banner-showcase-section');
    if (showcaseEl) {
        tourStatusText.innerText = '🎬 3D Showcase: Designed for iOS 17+';
        showcaseEl.scrollIntoView({ behavior: 'smooth' });
        await sleep(3500);
    }

    const featuresEl = document.getElementById('features');
    if (featuresEl) {
        tourStatusText.innerText = '🎬 Core Features: Multi-Currency & Analytics';
        featuresEl.scrollIntoView({ behavior: 'smooth' });
        await sleep(4000);
    }

    const screenshotsEl = document.getElementById('screenshots');
    if (screenshotsEl) {
        tourStatusText.innerText = '🎬 12-Screen Walkthrough Carousel';
        screenshotsEl.scrollIntoView({ behavior: 'smooth' });
        await sleep(2000);

        if (galleryTrack) {
            for (let s = 1; s <= 11; s++) {
                galleryTrack.scrollBy({ left: 270, behavior: 'smooth' });
                tourStatusText.innerText = `🎬 Screen ${s + 1} of 12 in Action`;
                await sleep(1600);
            }
        }
        await sleep(1500);
    }

    const downloadEl = document.getElementById('download');
    if (downloadEl) {
        tourStatusText.innerText = '🎬 Download on App Store';
        downloadEl.scrollIntoView({ behavior: 'smooth' });
        await sleep(3000);
    }

    const policyEl = document.getElementById('policy');
    if (policyEl) {
        tourStatusText.innerText = '🎬 100% Private & Biometric Lock';
        policyEl.scrollIntoView({ behavior: 'smooth' });
        await sleep(3500);
    }

    const supportEl = document.getElementById('support');
    if (supportEl) {
        tourStatusText.innerText = '🎬 Support Center & FAQ';
        supportEl.scrollIntoView({ behavior: 'smooth' });
        await sleep(1500);

        const firstFaq = document.querySelector('.faq-item');
        if (firstFaq) {
            firstFaq.click();
            await sleep(2500);
        }
    }

    const footerEl = document.querySelector('footer');
    if (footerEl) {
        footerEl.scrollIntoView({ behavior: 'smooth' });
        await sleep(2000);
    }

    tourStatusText.innerText = '✅ Tour Complete! You can stop recording.';
    await sleep(4500);
    tourBanner.style.display = 'none';
}

if (startTourBtn) {
    startTourBtn.addEventListener('click', runAutomatedRecordingTour);
}

if (urlParams.get('tour') === '1') {
    setTimeout(runAutomatedRecordingTour, 1200);
}
