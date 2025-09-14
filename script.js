// Portfolio Interactive Features
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupScrollAnimations();
        this.setupParticles();
        this.setupTypingEffect();
        this.setupRoleRotation();
        this.setupSmoothScrolling();
        this.setupMouseParallax();
        this.setupHeroAnimations();
        this.setupInteractiveShapes();
        this.setupContactForm();
    }

    // Navigation functionality
    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-menu a');

        // Navbar scroll effect - keep transparent
        window.addEventListener('scroll', () => {
            // Keep navbar transparent at all times
            navbar.style.background = 'rgba(15, 23, 42, 0.05)';
            navbar.style.backdropFilter = 'blur(5px)';
        });

        // Active link highlighting
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // Mobile menu functionality
    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenuToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
            });

            // Close menu when clicking on nav links
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }

    // Enhanced scroll animations
    setupScrollAnimations() {
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100); // Stagger animations
                }
            });
        }, observerOptions);

        animateElements.forEach(element => {
            observer.observe(element);
        });

        // Add floating animation to elements
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
        });

        // Add pulse animation to elements
        const pulseElements = document.querySelectorAll('.pulse-element');
        pulseElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.3}s`;
        });
    }

    // Scroll-triggered animations
    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animateElements = document.querySelectorAll('.skill-card, .project-card, .contact-item');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        // Carousel functionality
        this.setupCarousels();
    }

    // Carousel functionality
    setupCarousels() {
        class Carousel {
            constructor(container) {
                this.container = container;
                this.items = container.querySelectorAll('.carousel-item');
                this.indicators = container.querySelectorAll('.indicator');
                this.prevBtn = container.querySelector('.prev-btn');
                this.nextBtn = container.querySelector('.next-btn');
                this.currentIndex = 0;
                this.autoPlayInterval = null;
                
                this.init();
            }
            
            init() {
                if (this.items.length <= 1) return;
                
                // Set first item as active
                this.showItem(0);
                
                // Add event listeners
                this.prevBtn?.addEventListener('click', () => this.prevItem());
                this.nextBtn?.addEventListener('click', () => this.nextItem());
                
                this.indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => this.showItem(index));
                });
                
                // Auto play
                this.startAutoPlay();
                
                // Pause on hover
                this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
                this.container.addEventListener('mouseleave', () => this.startAutoPlay());
            }
            
            showItem(index) {
                // Remove active class from all items and indicators
                this.items.forEach(item => item.classList.remove('active'));
                this.indicators.forEach(indicator => indicator.classList.remove('active'));
                
                // Add active class to current item and indicator
                this.items[index]?.classList.add('active');
                this.indicators[index]?.classList.add('active');
                
                this.currentIndex = index;
            }
            
            nextItem() {
                const nextIndex = (this.currentIndex + 1) % this.items.length;
                this.showItem(nextIndex);
            }
            
            prevItem() {
                const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
                this.showItem(prevIndex);
            }
            
            startAutoPlay() {
                if (this.items.length <= 1) return;
                this.autoPlayInterval = setInterval(() => {
                    this.nextItem();
                }, 4000);
            }
            
            stopAutoPlay() {
                if (this.autoPlayInterval) {
                    clearInterval(this.autoPlayInterval);
                    this.autoPlayInterval = null;
                }
            }
        }

        // Initialize all carousels
        const carousels = document.querySelectorAll('.carousel-container');
        carousels.forEach(carousel => {
            new Carousel(carousel);
        });
    }

    // Dynamic particle system
    setupParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        hero.appendChild(particlesContainer);

        // Create floating particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 10 + 5}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }

        // Add particle animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Enhanced typing effect for hero section
    setupTypingEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter-text');
        
        typewriterElements.forEach((element, index) => {
            const text = element.getAttribute('data-text') || element.textContent;
            console.log('Setting up typewriter for text:', text);
            element.innerHTML = '';
            element.style.borderRight = 'none';
            element.style.animation = 'none';
            
            setTimeout(() => {
                this.typeWriter(element, text, 0, 80);
            }, 2000 + (index * 500)); // Delay for each element
        });
    }

    // Typewriter animation function
    typeWriter(element, text, i, speed) {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1);
            i++;
            setTimeout(() => this.typeWriter(element, text, i, speed), speed);
        } else {
            // Add blinking cursor effect
            element.style.borderRight = '3px solid #dc143c';
            element.style.animation = 'blink 1s step-end infinite';
            console.log('Typewriter completed for:', text);
        }
    }

    // Role rotation animation
    setupRoleRotation() {
        const roleElement = document.querySelector('.rotating-role');
        if (!roleElement) return;

        const roles = ['Front-end', 'Back-end', 'Fullstack'];
        let currentIndex = 0;

        // Initialize with fade-in class
        roleElement.classList.add('fade-in');

        setInterval(() => {
            // Add fade-out effect with smooth transition
            roleElement.classList.remove('fade-in');
            roleElement.classList.add('fade-out');
            
            setTimeout(() => {
                // Change text and add fade-in effect
                currentIndex = (currentIndex + 1) % roles.length;
                roleElement.textContent = roles[currentIndex];
                roleElement.classList.remove('fade-out');
                roleElement.classList.add('fade-in');
            }, 200); // Faster transition
        }, 1500); // Faster interval for quicker role changes
    }

    // Smooth scrolling for all anchor links
    setupSmoothScrolling() {
        const allLinks = document.querySelectorAll('a[href^="#"]');
        
        allLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Mouse parallax effect
    setupMouseParallax() {
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const shapes = document.querySelectorAll('.floating-shapes .shape');
        const particles = document.querySelectorAll('.particles .particle');
        
        if (!hero) return;
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Hero content parallax (more pronounced movement)
             if (heroContent) {
                 const moveX = (mouseX - 0.5) * 50;
                 const moveY = (mouseY - 0.5) * 50;
                 heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
             }
            
            // Floating shapes parallax (more pronounced)
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.5;
                const moveX = (mouseX - 0.5) * 30 * speed;
                const moveY = (mouseY - 0.5) * 30 * speed;
                shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX}deg)`;
            });
            
            // Particles parallax (light movement)
            particles.forEach((particle, index) => {
                const speed = (index % 3 + 1) * 0.3;
                const moveX = (mouseX - 0.5) * 15 * speed;
                const moveY = (mouseY - 0.5) * 15 * speed;
                particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }

    // Hero section animations
    setupHeroAnimations() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Add sparkle effect on button hover
        const buttons = document.querySelectorAll('.hero-buttons .btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', this.createSparkles.bind(this));
        });
    }

    // Modern Contact form functionality
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
            
            // Add modern input animations and validation
            const inputGroups = contactForm.querySelectorAll('.input-group');
            inputGroups.forEach(group => {
                const input = group.querySelector('input, textarea');
                const label = group.querySelector('label');
                
                if (input && label) {
                    // Set placeholder for floating label effect
                    input.setAttribute('placeholder', ' ');
                    
                    input.addEventListener('focus', () => this.handleInputFocus(input, group));
                    input.addEventListener('blur', () => this.handleInputBlur(input, group));
                    input.addEventListener('input', () => this.handleInputChange(input, group));
                }
            });
            
            // Add form validation
            this.setupFormValidation(contactForm);
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('.submit-btn');
        
        // Validate form
        if (!this.validateForm(form)) {
            this.showFormMessage('กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง', 'error');
            return;
        }
        
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'กำลังส่ง...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            this.showFormMessage('ขอบคุณครับ! ข้อความของคุณถูกส่งเรียบร้อยแล้ว', 'success');
            
            // Reset form and button
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Reset input groups
            const inputGroups = form.querySelectorAll('.input-group');
            inputGroups.forEach(group => {
                group.classList.remove('focused', 'filled');
            });
        }, 1500);
    }

    handleInputFocus(input, group) {
        group.classList.add('focused');
    }

    handleInputBlur(input, group) {
        group.classList.remove('focused');
        if (input.value.trim()) {
            group.classList.add('filled');
        } else {
            group.classList.remove('filled');
        }
    }

    handleInputChange(input, group) {
        if (input.value.trim()) {
            group.classList.add('filled');
        } else {
            group.classList.remove('filled');
        }
        
        // Real-time validation
        this.validateInput(input, group);
    }

    setupFormValidation(form) {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                const group = input.closest('.input-group');
                this.validateInput(input, group);
            });
        });
    }

    validateInput(input, group) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error
        const existingError = group.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        group.classList.remove('error');
        
        // Validate based on input type
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'กรุณากรอกข้อมูลนี้';
        } else if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'กรุณากรอกอีเมลให้ถูกต้อง';
            }
        } else if (input.name === 'name' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร';
        } else if (input.name === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'ข้อความต้องมีอย่างน้อย 10 ตัวอักษร';
        }
        
        if (!isValid) {
            group.classList.add('error');
            const errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            errorEl.textContent = errorMessage;
            errorEl.style.cssText = `
                color: #ef4444;
                font-size: 0.85rem;
                margin-top: 5px;
                animation: fadeIn 0.3s ease;
            `;
            group.appendChild(errorEl);
        }
        
        return isValid;
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            const group = input.closest('.input-group');
            if (!this.validateInput(input, group)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    showFormMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.2rem;">${type === 'success' ? '✅' : '❌'}</span>
                <span>${message}</span>
            </div>
        `;
        messageEl.style.cssText = `
            position: fixed;
            top: 30px;
            right: 30px;
            padding: 1.2rem 2rem;
            background: ${type === 'success' 
                ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.95), rgba(16, 185, 129, 0.95))' 
                : 'linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95))'};
            color: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid ${type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
            z-index: 10000;
            font-family: 'Kanit', sans-serif;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            max-width: 400px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(messageEl);
        
        // Animate in
        setTimeout(() => {
            messageEl.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove message after 4 seconds
        setTimeout(() => {
            messageEl.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 400);
        }, 4000);
    }

    // Interactive floating shapes
    setupInteractiveShapes() {
        const shapes = document.querySelectorAll('.floating-shapes .shape');
        
        shapes.forEach((shape, index) => {
            shape.addEventListener('mouseenter', () => {
                shape.style.transform = 'scale(1.5) rotate(180deg)';
                shape.style.background = 'linear-gradient(45deg, rgba(255, 107, 107, 0.3), rgba(238, 90, 36, 0.3))';
                shape.style.boxShadow = '0 0 30px rgba(255, 107, 107, 0.5)';
            });
            
            shape.addEventListener('mouseleave', () => {
                shape.style.transform = '';
                shape.style.background = '';
                shape.style.boxShadow = '';
            });
            
            // Add click effect
            shape.addEventListener('click', () => {
                this.createRippleEffect(shape);
            });
        });
    }

    // Create sparkle effect
    createSparkles(event) {
        const button = event.target;
        const rect = button.getBoundingClientRect();
        
        for (let i = 0; i < 6; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #ffd700;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                animation: sparkleAnim 1s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
        
        // Add sparkle animation to head if not exists
        if (!document.querySelector('#sparkle-style')) {
            const style = document.createElement('style');
            style.id = 'sparkle-style';
            style.textContent = `
                @keyframes sparkleAnim {
                    0% {
                        opacity: 1;
                        transform: scale(0) rotate(0deg);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(1) rotate(180deg) translateY(-20px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Create ripple effect
    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 215, 0, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: 100px;
            height: 100px;
            left: 50%;
            top: 50%;
            margin-left: -50px;
            margin-top: -50px;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Add ripple animation to head if not exists
        if (!document.querySelector('#ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Interactive skill cards
    setupSkillCards() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) rotateY(5deg)';
                card.style.boxShadow = '0 20px 40px rgba(220, 20, 60, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateY(0)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            });
        });
    }

    // Loading screen
    setupLoadingScreen() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <p>กำลังโหลด...</p>
            </div>
        `;
        
        const loaderStyles = `
            .loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #0f172a, #1e293b);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }
            
            .loader-content {
                text-align: center;
                color: #000000;
            }
            
            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 3px solid rgba(220, 20, 60, 0.3);
                    border-top: 3px solid #dc143c;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = loaderStyles;
        document.head.appendChild(style);
        document.body.appendChild(loader);
        
        // Hide loader after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 1000);
        });
    }
}

// Initialize the portfolio app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    app.setupLoadingScreen();
    app.setupMouseParallax();
    app.setupSkillCards();
});

// Add some utility functions
const utils = {
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Random number generator
    random: (min, max) => {
        return Math.random() * (max - min) + min;
    }
};

// Export for use in other scripts

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        new Carousel(carousel);
    });
    
    // Initialize certificate page functionality if on certificate page
    if (document.querySelector('.certificate-gallery')) {
        initCertificatePage();
    }
});

// Certificate Page Functionality
function initCertificatePage() {
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const certificateItems = document.querySelectorAll('.certificate-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            certificateItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
     

     
     // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animate certificates on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initially hide certificates for animation
    certificateItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Hero stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.textContent);
                let currentNumber = 0;
                const increment = finalNumber / 50;
                
                const timer = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= finalNumber) {
                        target.textContent = finalNumber + '+';
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(currentNumber) + '+';
                    }
                }, 30);
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Carousel functionality
function changeSlide(button, direction) {
    const container = button.closest('.carousel-container');
    const items = container.querySelectorAll('.carousel-item');
    const indicators = container.querySelectorAll('.indicator');
    let currentIndex = Array.from(items).findIndex(item => item.classList.contains('active'));
    
    // Remove active class from current item and indicator
    items[currentIndex].classList.remove('active');
    indicators[currentIndex].classList.remove('active');
    
    // Calculate new index
    currentIndex += direction;
    if (currentIndex >= items.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = items.length - 1;
    
    // Add active class to new item and indicator
    items[currentIndex].classList.add('active');
    indicators[currentIndex].classList.add('active');
    
    // Pause all videos except the active one
    items.forEach((item, index) => {
        if (item.tagName === 'VIDEO') {
            if (index === currentIndex) {
                item.currentTime = 0; // Reset video to start
                item.play().catch(error => {
                    console.log('Video autoplay blocked:', error);
                }); // Play the active video with error handling
            } else {
                item.pause();
            }
        }
    });
}

function currentSlide(indicator, slideIndex) {
    const container = indicator.closest('.carousel-container');
    const items = container.querySelectorAll('.carousel-item');
    const indicators = container.querySelectorAll('.indicator');
    const currentIndex = slideIndex - 1; // Convert to 0-based index
    
    // Remove active class from all items and indicators
    items.forEach(item => item.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    
    // Add active class to selected item and indicator
    items[currentIndex].classList.add('active');
    indicators[currentIndex].classList.add('active');
    
    // Pause all videos except the active one
    items.forEach((item, index) => {
        if (item.tagName === 'VIDEO') {
            if (index === currentIndex) {
                item.currentTime = 0; // Reset video to start
                item.play().catch(error => {
                    console.log('Video autoplay blocked:', error);
                }); // Play the active video with error handling
            } else {
                item.pause();
            }
        }
    });
}

// Auto-pause videos when they're not visible and play active videos
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.carousel-item video');
    videos.forEach(video => {
        video.addEventListener('play', () => {
            // Pause other videos in the same carousel
            const container = video.closest('.carousel-container');
            const otherVideos = container.querySelectorAll('.carousel-item video');
            otherVideos.forEach(otherVideo => {
                if (otherVideo !== video) {
                    otherVideo.pause();
                }
            });
        });
        
        // Play video if it's in an active carousel item
        if (video.closest('.carousel-item').classList.contains('active')) {
            video.currentTime = 0;
            video.play().catch(error => {
                console.log('Video autoplay blocked on page load:', error);
            });
        }
    });
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, utils };
}