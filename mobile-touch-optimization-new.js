// COMPREHENSIVE MOBILE TOUCH OPTIMIZATION

document.addEventListener('DOMContentLoaded', function() {
    // Detect if device is touch-enabled
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // Initialize mobile optimizations
        initMobileOptimizations();
        setupTouchInteractions();
        handleViewportChanges();
        optimizeScrolling();
        setupOrientationChange();
    }
    
    function initMobileOptimizations() {
        // Remove :hover styles on touch devices to prevent sticky hover states
        if (isTouchDevice) {
            // Add no-hover class to disable hover effects
            document.body.classList.add('no-hover');
        }
        
        // Prevent zoom on input focus (iOS)
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', preventZoom);
            input.addEventListener('blur', restoreZoom);
        });
        
        // Add touch delay prevention
        const interactiveElements = document.querySelectorAll('a, button, .pdf-card, .card, .project-card, .nav-link');
        interactiveElements.forEach(element => {
            element.style.touchAction = 'manipulation';
            element.classList.add('no-touch-delay');
        });
    }
    
    function setupTouchInteractions() {
        // Enhanced touch feedback for all interactive elements
        const touchElements = document.querySelectorAll(`
            .card, .project-card, .pdf-card, .skill, 
            button, .cv-button, .send-button, .view-project, .pdf-link, .nav-link,
            .contact-links a, .footer-links a
        `);
        
        touchElements.forEach(element => {
            // Touch start - add pressed state
            element.addEventListener('touchstart', function(e) {
                this.classList.add('touch-active');
            }, { passive: true });
            
            // Touch end - remove pressed state
            element.addEventListener('touchend', function(e) {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            }, { passive: true });
            
            // Touch cancel - remove pressed state
            element.addEventListener('touchcancel', function(e) {
                this.classList.remove('touch-active');
            }, { passive: true });
        });
        
        // Special handling for navigation scroll
        setupSmoothScrolling();
        
        // Enhanced PDF card interactions
        setupPDFCardInteractions();
        
        // Contact form mobile enhancements
        setupContactFormMobile();
    }
    
    function setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Calculate offset for mobile navigation
                    const navHeight = document.querySelector('.main-nav').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight - 10;
                    
                    // Smooth scroll with mobile optimization
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Add haptic feedback if available
                    if (navigator.vibrate) {
                        navigator.vibrate(50);
                    }
                }
            });
        });
    }
    
    function setupPDFCardInteractions() {
        const pdfCards = document.querySelectorAll('.pdf-card');
        
        pdfCards.forEach(card => {
            const link = card.querySelector('.pdf-link');
            
            if (link) {
                // Make entire card clickable on mobile
                card.addEventListener('click', function(e) {
                    if (e.target === card || !e.target.closest('.pdf-link')) {
                        e.preventDefault();
                        
                        // Add visual feedback
                        card.style.transform = 'scale(0.95)';
                        
                        setTimeout(() => {
                            card.style.transform = '';
                            // Open PDF
                            window.open(link.getAttribute('href'), '_blank');
                        }, 100);
                    }
                });
            }
        });
    }
    
    function setupContactFormMobile() {
        const form = document.querySelector('#messageForm');
        const inputs = form?.querySelectorAll('input, textarea');
        
        if (form && inputs) {
            inputs.forEach(input => {
                // Auto-resize textarea on mobile
                if (input.tagName === 'TEXTAREA') {
                    input.addEventListener('input', function() {
                        this.style.height = 'auto';
                        this.style.height = Math.min(this.scrollHeight, 200) + 'px';
                    });
                }
                
                // Improve mobile keyboard experience
                input.addEventListener('focus', function() {
                    // Slight delay to ensure keyboard is open
                    setTimeout(() => {
                        this.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center',
                            inline: 'nearest'
                        });
                    }, 300);
                });
            });
        }
    }
    
    function handleViewportChanges() {
        // Fix viewport height issues on mobile browsers
        function setVH() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setVH();
        
        // Update on resize/orientation change
        window.addEventListener('resize', debounce(setVH, 100));
        window.addEventListener('orientationchange', () => {
            setTimeout(setVH, 500); // Delay for orientation change completion
        });
    }
    
    function setupOrientationChange() {
        window.addEventListener('orientationchange', function() {
            // Prevent scroll position jumping on orientation change
            const currentScroll = window.pageYOffset;
            
            setTimeout(() => {
                window.scrollTo(0, currentScroll);
                
                // Recalculate navigation heights
                const sections = document.querySelectorAll('.section');
                sections.forEach(section => {
                    section.style.minHeight = 'auto';
                });
                
                // Force repaint
                document.body.style.height = '100.1%';
                setTimeout(() => {
                    document.body.style.height = '';
                }, 10);
            }, 500);
        });
    }
    
    function optimizeScrolling() {
        // Optimize scroll performance on mobile
        let ticking = false;
        
        function updateScrollPosition() {
            // Update navigation active state
            updateNavigationState();
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        }, { passive: true });
        
        // Prevent horizontal scrolling
        document.addEventListener('touchmove', function(e) {
            if (e.touches.length > 1) {
                e.preventDefault(); // Prevent pinch zoom
            }
        }, { passive: false });
    }
    
    function updateNavigationState() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        const navHeight = document.querySelector('.main-nav').offsetHeight;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    function preventZoom() {
        // Prevent zoom on input focus by temporarily increasing font size
        const currentFontSize = window.getComputedStyle(this).fontSize;
        if (parseFloat(currentFontSize) < 16) {
            this.style.fontSize = '16px';
            this.dataset.originalFontSize = currentFontSize;
        }
    }
    
    function restoreZoom() {
        // Restore original font size
        if (this.dataset.originalFontSize) {
            this.style.fontSize = this.dataset.originalFontSize;
            delete this.dataset.originalFontSize;
        }
    }
    
    // Utility function for debouncing
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Initialize performance observer for mobile optimization
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'layout-shift' && entry.value > 0.1) {
                    // Handle layout shifts on mobile
                    console.log('Layout shift detected:', entry.value);
                }
            }
        });
        
        try {
            observer.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
            // Ignore if not supported
        }
    }
    
    // Add CSS class for touch devices
    if (isTouchDevice) {
        document.documentElement.classList.add('touch-device');
    }
    
    // Initialize swipe gestures for navigation (optional enhancement)
    setupSwipeGestures();
    
    function setupSwipeGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].clientX;
            touchEndY = e.changedTouches[0].clientY;
            
            // Check if it's a horizontal swipe
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                // Horizontal swipe detected
                if (deltaX > 0) {
                    // Swipe right - go to previous section
                    navigateToSection('prev');
                } else {
                    // Swipe left - go to next section
                    navigateToSection('next');
                }
            }
        }, { passive: true });
    }
    
    function navigateToSection(direction) {
        const sections = Array.from(document.querySelectorAll('.section'));
        const currentSection = sections.find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom > 100;
        });
        
        if (currentSection) {
            const currentIndex = sections.indexOf(currentSection);
            let targetIndex;
            
            if (direction === 'next') {
                targetIndex = Math.min(currentIndex + 1, sections.length - 1);
            } else {
                targetIndex = Math.max(currentIndex - 1, 0);
            }
            
            if (targetIndex !== currentIndex) {
                const targetSection = sections[targetIndex];
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                
                window.scrollTo({
                    top: targetSection.offsetTop - navHeight - 10,
                    behavior: 'smooth'
                });
                
                // Add haptic feedback
                if (navigator.vibrate) {
                    navigator.vibrate(30);
                }
            }
        }
    }
});

// Additional mobile-specific CSS classes
const mobileStyles = `
    .touch-active {
        transform: scale(0.95) !important;
        opacity: 0.8 !important;
        transition: all 0.1s ease !important;
    }
    
    .no-hover:hover {
        /* Disable hover effects on touch devices */
    }
    
    @media (max-width: 768px) {
        .mobile-hidden {
            display: none !important;
        }
        
        .mobile-only {
            display: block !important;
        }
        
        .mobile-center {
            text-align: center !important;
        }
        
        .mobile-full-width {
            width: 100% !important;
        }
    }
`;

// Inject mobile styles
if (!document.querySelector('#mobile-touch-styles')) {
    const style = document.createElement('style');
    style.id = 'mobile-touch-styles';
    style.textContent = mobileStyles;
    document.head.appendChild(style);
}
