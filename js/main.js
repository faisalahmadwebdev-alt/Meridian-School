/* =============================================
   THE MERIDIAN SCHOOL TORDHER — Main Scripts
   ============================================= */

// ---------- Hero Slideshow ----------
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 1) {
        let i = 0;
        setInterval(() => {
            slides[i].classList.remove('active');
            i = (i + 1) % slides.length;
            slides[i].classList.add('active');
        }, 5500);
    }

    // ---------- Scroll Reveal ----------
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));

    // ---------- Active Nav Link ----------
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-list a').forEach(link => {
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });

    // ---------- Counter Animation ----------
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
});

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(target * eased) + '+';
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + '+';
    }
    requestAnimationFrame(tick);
}

// ---------- Admission Form ----------
function submitAdmission(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('student_name');

    alert(
        '✅ JazakAllah, ' + name + '!\n\n' +
        'Your admission inquiry has been received by The Meridian School Tordher.\n\n' +
        'Our admission office will contact you within 24 hours on the phone number provided.\n\n' +
        'For urgent queries, please call:\n📞 0316 6388855'
    );
    e.target.reset();
    return false;
}

// ---------- Contact Form ----------
function submitContact(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    alert(
        '✅ Shukriya, ' + data.get('name') + '!\n\n' +
        'Your message has been received. We will get back to you shortly.\n\n' +
        'The Meridian School Tordher\n📞 0316 6388855'
    );
    e.target.reset();
    return false;
}