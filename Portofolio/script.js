// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link
    const sections = document.querySelectorAll('section');
    
    function setActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    // Smooth scrolling for navigation links (FIXED)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetUrl = this.getAttribute('href');

            // HANYA jalankan smooth scroll jika link adalah anchor internal (#)
            if (targetUrl.startsWith('#')) {
                e.preventDefault(); // Hentikan aksi default HANYA untuk link internal
                
                const targetSection = document.querySelector(targetUrl);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            // Jika link BUKAN anchor internal (seperti "article.html"), biarkan browser pindah halaman seperti biasa.
        });
    });

    // Typewriter effect
    const typewriterText = document.querySelector('.typewriter');
    if (typewriterText) {
        const texts = [
            'Creative Web Designer',
            'UI/UX Designer',
            'Graphic Designer',
            'Frontend Developer'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriterText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typewriterText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => {
                    isDeleting = true;
                }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            setTimeout(typeWriter, typingSpeed);
        }

        typeWriter();
    }

    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(button => button.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // (Kode form submission tidak berubah)
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // DIMODIFIKASI: Menambahkan .experience-item dan .education-item ke daftar elemen animasi
    const animatedElements = document.querySelectorAll('.section-title, .section-subtitle, .service-card, .portfolio-item, .stat-item, .about-text, .about-image, .contact-info, .contact-form-container, .experience-item, .education-item');
    
    animatedElements.forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('fade-in');
        } else {
            el.classList.add(index % 4 === 1 ? 'slide-in-left' : 'slide-in-right');
        }
        observer.observe(el);
    });

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 50);
    }

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Skills Animator Class
    class SkillsAnimator {
        constructor() {
            this.skillBars = document.querySelectorAll('.skill-progress');
            this.circularSkills = document.querySelectorAll('.circle-progress');
            this.isAnimated = false;
            this.init();
        }
        
        init() {
            this.createObserver();
        }
        
        createObserver() {
            const observerOptions = {
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px'
            };
            
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.isAnimated) {
                        this.animateSkills();
                        this.isAnimated = true;
                    }
                });
            }, observerOptions);
            
            const skillsSection = document.querySelector('.skills-section');
            if (skillsSection) {
                this.observer.observe(skillsSection);
            }
        }
        
        animateSkills() {
            this.animateSkillBars();
            this.animateCircularProgress();
            this.staggerSkillItems();
        }
        
        animateSkillBars() {
            this.skillBars.forEach((bar, index) => {
                const targetWidth = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, index * 200);
            });
        }
        
        animateCircularProgress() {
            this.circularSkills.forEach((skill, index) => {
                const percentage = parseInt(skill.getAttribute('data-percentage'));
                setTimeout(() => {
                    this.animateCircle(skill, percentage);
                }, index * 300);
            });
        }
        
        animateCircle(element, targetPercentage) {
            const endAngle = (targetPercentage / 100) * 360;
            let currentAngle = 0;
            const duration = 2000;
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                currentAngle = easeOutCubic * endAngle;
                
                element.style.background = `conic-gradient(from 0deg, #00ffff 0deg, #0080ff ${currentAngle}deg, rgba(255, 255, 255, 0.1) ${currentAngle}deg, rgba(255, 255, 255, 0.1) 360deg)`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }
        
        staggerSkillItems() {
            const skillItems = document.querySelectorAll('.skill-item, .circular-skill');
            skillItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.6s ease-out';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    }

    new SkillsAnimator();
});