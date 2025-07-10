// Mobile touch optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Add 300ms delay removal for mobile browsers
    document.documentElement.classList.add('no-touch-delay');
    
    // Detect touch devices
    const isTouchDevice = ('ontouchstart' in window) || 
                        (navigator.maxTouchPoints > 0) || 
                        (navigator.msMaxTouchPoints > 0);
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // Add active state for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .pdf-card, .card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
            
            // Prevent click delay
            element.addEventListener('touchend', function(e) {
                if (this.getAttribute('href') && !this.getAttribute('href').startsWith('#')) {
                    return; // Don't interfere with actual links
                }
                e.preventDefault();
                this.click();
            });
        });
    }
    
    // Fix for iOS viewport height issues (100vh)
    function setViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set on initial load
    setViewportHeight();
    
    // Reset on resize or orientation change
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
});
