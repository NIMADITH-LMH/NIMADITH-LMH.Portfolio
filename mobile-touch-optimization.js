// Enhanced Mobile Touch Optimizations for Complete Mobile Compatibility
document.addEventListener('DOMContentLoaded', function() {
    // Add 300ms delay removal for mobile browsers
    document.documentElement.classList.add('no-touch-delay');
    
    // Detect touch devices and mobile browsers
    const isTouchDevice = ('ontouchstart' in window) || 
                        (navigator.maxTouchPoints > 0) || 
                        (navigator.msMaxTouchPoints > 0);
    
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isTouchDevice || isMobileDevice) {
        document.body.classList.add('touch-device');
        document.body.classList.add('mobile-device');
        
        // Enhanced touch feedback for all interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .pdf-card, .card, .project-card, .skill, .nav-link, .contact-nav-btn, .cv-button, .send-button, .blog-read-more');
        
        interactiveElements.forEach(element => {
            // Add touch start feedback
            element.addEventListener('touchstart', function(e) {
                this.classList.add('touch-active');
                
                // Add haptic feedback if available
                if ('vibrate' in navigator) {
                    navigator.vibrate(10);
                }
            }, { passive: true });
            
            // Remove touch feedback
            element.addEventListener('touchend', function(e) {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            }, { passive: true });
            
            // Handle touch cancel
            element.addEventListener('touchcancel', function(e) {
                this.classList.remove('touch-active');
            }, { passive: true });
        });
        
        // Enhanced swipe navigation between sections
        let touchStartX = 0;
        let touchStartY = 0;
        let isScrolling = false;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isScrolling = false;
        }, { passive: true });
        
        document.addEventListener('touchmove', function(e) {
            if (!isScrolling) {
                const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
                const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
                
                if (deltaY > deltaX) {
                    isScrolling = true;
                }
            }
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            if (isScrolling) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const deltaX = touchEndX - touchStartX;
            const threshold = 100;
            
            if (Math.abs(deltaX) > threshold) {
                const sections = document.querySelectorAll('.section');
                const currentSection = getCurrentSection();
                const currentIndex = Array.from(sections).indexOf(currentSection);
                
                if (deltaX > 0 && currentIndex > 0) {
                    // Swipe right - go to previous section
                    sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
                } else if (deltaX < 0 && currentIndex < sections.length - 1) {
                    // Swipe left - go to next section
                    sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
                }
            }
        }, { passive: true });
        
        // Mobile navigation improvements
        enhanceMobileNavigation();
        
        // Mobile form optimizations
        enhanceMobileFormHandling();
        
        // Mobile scroll optimizations
        enhanceMobileScrolling();
    }
    
    // Fix for iOS viewport height issues (100vh)
    function setViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set on initial load
    setViewportHeight();
    
    // Reset on resize or orientation change
    window.addEventListener('resize', debounce(setViewportHeight, 100));
    window.addEventListener('orientationchange', function() {
        setTimeout(setViewportHeight, 100);
    });
    
    // Prevent zoom on input focus for iOS
    if (isMobileDevice) {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                if (this.style.fontSize !== '16px') {
                    this.style.fontSize = '16px';
                }
            });
        });
    }
    
    // Performance optimizations for mobile
    if (isMobileDevice) {
        // Reduce animation complexity on mobile
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                *, *::before, *::after {
                    animation-duration: 0.2s !important;
                    animation-delay: 0s !important;
                    transition-duration: 0.2s !important;
                    transition-delay: 0s !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// Helper function to get current section
function getCurrentSection() {
    const sections = document.querySelectorAll('.section');
    let currentSection = sections[0];
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
        }
    });
    
    return currentSection;
}

// Enhanced mobile navigation
function enhanceMobileNavigation() {
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add mobile menu toggle if screen is very small
    if (window.innerWidth < 480) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        
        nav.insertBefore(menuToggle, nav.firstChild);
        
        let isMenuOpen = false;
        menuToggle.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            nav.classList.toggle('menu-open', isMenuOpen);
            this.innerHTML = isMenuOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                isMenuOpen = false;
                nav.classList.remove('menu-open');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // Enhanced nav link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', debounce(updateActiveNavLink, 10));
}

// Enhanced mobile form handling
function enhanceMobileFormHandling() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add mobile-specific input behaviors
        input.addEventListener('focus', function() {
            // Scroll input into view on mobile
            if (window.innerWidth < 768) {
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
        
        // Add input validation feedback
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    });
}

// Enhanced mobile scrolling
function enhanceMobileScrolling() {
    // Smooth scroll behavior for mobile
    document.addEventListener('touchmove', function(e) {
        // Enable momentum scrolling on iOS
        if (e.target.closest('.section')) {
            e.target.style.webkitOverflowScrolling = 'touch';
        }
    }, { passive: true });
    
    // Prevent bounce effect on iOS
    document.addEventListener('touchmove', function(e) {
        if (e.target === document.body) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
