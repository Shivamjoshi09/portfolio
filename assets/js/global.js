document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
        });
    }

    // Mobile Navigation Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animated bars for hamburger
            const bars = menuToggle.querySelectorAll('.bar');
            if (menuToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    menuToggle.click();
                }
            });
        });
    }

    // Scroll Navbar effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        // Sticky Header effect
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Home Page Only: Scroll-based Active Navigation states
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', () => {
            let currentSectionId = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                const hrefAttr = link.getAttribute('href');
                if (hrefAttr === `#${currentSectionId}` || hrefAttr === `index.html#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Intersection Observer for scroll-reveal animations (present on all pages)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // If this is a skills card, trigger progress bar animation inside
                    if (entry.target.classList.contains('skills-card')) {
                        const progresses = entry.target.querySelectorAll('.skill-progress');
                        progresses.forEach(progress => {
                            progress.style.transform = 'scaleX(1)';
                        });
                    }
                    
                    // Once animation is played, we can unobserve
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // Free Audit CTA Scroll Handling (Contact Page Specific)
    const auditCtaBtn = document.getElementById('audit-cta-btn');
    if (auditCtaBtn) {
        auditCtaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            if (nameInput) {
                nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => nameInput.focus(), 800);
            }
        });
    }

    // Form Submission Handling (Contact Page Specific)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('.form-submit-btn');
        const successModal = document.getElementById('success-modal');
        const modalClose = document.getElementById('modal-close');
        const modalBtnClose = document.getElementById('modal-btn-close');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                alert('Please fill out all required fields.');
                return;
            }

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.setAttribute('disabled', 'true');

            // Simulate API request (1.8s delay)
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.removeAttribute('disabled');
                
                // Show Success Modal
                if (successModal) {
                    successModal.classList.add('active');
                }
                
                // Reset the form
                contactForm.reset();
            }, 1800);
        });

        // Close Modal Functions
        const closeModal = () => {
            if (successModal) {
                successModal.classList.remove('active');
            }
        };

        if (modalClose) modalClose.addEventListener('click', closeModal);
        if (modalBtnClose) modalBtnClose.addEventListener('click', closeModal);
        
        if (successModal) {
            successModal.addEventListener('click', (e) => {
                if (e.target === successModal) {
                    closeModal();
                }
            });
        }
    }

    // Set Footer Current Year Automatically
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
