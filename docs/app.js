// ==========================================================================
// TrackExpense Web App Interactions & Animations
// ==========================================================================

// 1. Initialize Lucide Icons
if (window.lucide) {
    lucide.createIcons();
}

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

// 4. Staggered Scroll Reveal Animations for Cards
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
            }, index * 80);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .cta-card, .faq-item').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
    observer.observe(el);
});

// 5. Interactive FAQ Accordion Click Behavior
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const p = item.querySelector('p');
        if (p) {
            const isHidden = p.style.display === 'none';
            p.style.display = isHidden ? 'block' : 'none';
        }
    });
});

// 6. Screenshot Carousel Controls
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

// 7. Mobile View Mode & Automated Marketing Tour Controller
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
    // 1. Force mobile view
    setMobileMode(true);
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 2. 3-Second Countdown
    tourCountdown.style.display = 'flex';
    for (let i = 3; i >= 1; i--) {
        countdownNumber.innerText = i;
        await sleep(1000);
    }
    countdownNumber.innerText = '🎥';
    await sleep(600);
    tourCountdown.style.display = 'none';

    // 3. Show live recording tour banner
    tourBanner.style.display = 'flex';
    tourStatusText.innerText = '🎬 Hero: Smart Personal Finance';
    await sleep(3500);

    // 4. Smooth scroll to Features
    const featuresEl = document.getElementById('features');
    if (featuresEl) {
        tourStatusText.innerText = '🎬 Core Features: Multi-Currency & Analytics';
        featuresEl.scrollIntoView({ behavior: 'smooth' });
        await sleep(4000);
    }

    // 5. Smooth scroll to 11-Screen Showcase Carousel
    const screenshotsEl = document.getElementById('screenshots');
    if (screenshotsEl) {
        tourStatusText.innerText = '🎬 11-Screen Walkthrough Carousel';
        screenshotsEl.scrollIntoView({ behavior: 'smooth' });
        await sleep(2000);

        // Slide through all 11 screens step-by-step
        if (galleryTrack) {
            for (let s = 1; s <= 10; s++) {
                galleryTrack.scrollBy({ left: 270, behavior: 'smooth' });
                tourStatusText.innerText = `🎬 Screen ${s + 1} of 11 in Action`;
                await sleep(1800);
            }
        }
        await sleep(1500);
    }

    // 6. Smooth scroll to Download CTA
    const downloadEl = document.getElementById('download');
    if (downloadEl) {
        tourStatusText.innerText = '🎬 Download on App Store';
        downloadEl.scrollIntoView({ behavior: 'smooth' });
        await sleep(3000);
    }

    // 7. Smooth scroll to Privacy & Terms
    const policyEl = document.getElementById('policy');
    if (policyEl) {
        tourStatusText.innerText = '🎬 100% Private & Biometric Lock';
        policyEl.scrollIntoView({ behavior: 'smooth' });
        await sleep(3500);
    }

    // 8. Smooth scroll to Support & FAQ
    const supportEl = document.getElementById('support');
    if (supportEl) {
        tourStatusText.innerText = '🎬 Support Center & FAQ';
        supportEl.scrollIntoView({ behavior: 'smooth' });
        await sleep(1500);

        // Toggle first FAQ
        const firstFaq = document.querySelector('.faq-item');
        if (firstFaq) {
            firstFaq.click();
            await sleep(2500);
        }
    }

    // 9. Smooth scroll to Footer
    const footerEl = document.querySelector('footer');
    if (footerEl) {
        footerEl.scrollIntoView({ behavior: 'smooth' });
        await sleep(2000);
    }

    // 10. Tour finished notification
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


