/* UNIFIED STAR ANIMATION CONTROLLER - PORTFOLIO WIDE */

class StarAnimationSystem {
    constructor() {
        this.activeElements = new Set();
        this.animationSettings = {
            particleCount: 12,
            animationDuration: 3000,
            shootingStarInterval: 8000
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startAmbientAnimations();
    }

    setupEventListeners() {
        // Add star animations to all interactive elements
        const interactiveElements = document.querySelectorAll(`
            .card,
            .project-card,
            .pdf-card,
            .timeline-content,
            .skill,
            .blog-post,
            .contact-card,
            .nav-item,
            .tech-item,
            .experience-card
        `);

        interactiveElements.forEach(element => {
            this.setupElementStars(element);
        });
    }

    setupElementStars(element) {
        // Make element position relative if not already
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.position === 'static') {
            element.style.position = 'relative';
        }

        // Create star particles container
        const starContainer = document.createElement('div');
        starContainer.className = 'star-particles';
        element.appendChild(starContainer);

        // Add hover event listeners
        element.addEventListener('mouseenter', () => {
            this.activateStars(element, starContainer);
        });

        element.addEventListener('mouseleave', () => {
            this.deactivateStars(element, starContainer);
        });

        // Add touch events for mobile
        element.addEventListener('touchstart', () => {
            this.activateStars(element, starContainer);
        });

        element.addEventListener('touchend', () => {
            setTimeout(() => {
                this.deactivateStars(element, starContainer);
            }, 1000);
        });
    }

    createStarParticles(container, count = this.animationSettings.particleCount) {
        // Clear existing particles
        container.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = this.getRandomStarClass();
            
            // Random positioning
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            
            // Random animation delay
            const delay = Math.random() * 2;
            particle.style.animationDelay = `${delay}s`;
            
            container.appendChild(particle);
        }
    }

    getRandomStarClass() {
        const shapes = ['star-particle', 'star-particle star-shape'];
        const sizes = ['small', 'medium', 'large'];
        
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        
        return `${shape} ${size}`;
    }

    activateStars(element, container) {
        if (this.activeElements.has(element)) return;
        
        this.activeElements.add(element);
        
        // Create particles
        this.createStarParticles(container);
        
        // Add animation classes
        container.classList.add('stars-active');
        
        // Random animation type
        const animations = ['stars-float', 'stars-twinkle', 'constellation'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        container.classList.add(randomAnimation);
        
        // Occasional shooting star
        if (Math.random() < 0.3) {
            this.createShootingStar(container);
        }
    }

    deactivateStars(element, container) {
        this.activeElements.delete(element);
        
        // Fade out particles
        container.classList.remove('stars-active', 'stars-float', 'stars-twinkle', 'constellation');
        
        // Clean up after animation
        setTimeout(() => {
            if (!this.activeElements.has(element)) {
                container.innerHTML = '';
            }
        }, 1000);
    }

    createShootingStar(container) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        // Random starting position
        const startX = Math.random() * 50;
        const startY = 50 + Math.random() * 50;
        shootingStar.style.left = `${startX}%`;
        shootingStar.style.top = `${startY}%`;
        
        container.appendChild(shootingStar);
        
        // Remove after animation
        setTimeout(() => {
            if (container.contains(shootingStar)) {
                container.removeChild(shootingStar);
            }
        }, 2000);
    }

    startAmbientAnimations() {
        // Occasional ambient shooting stars across the page
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                this.createAmbientShootingStar();
            }
        }, this.animationSettings.shootingStarInterval);
    }

    createAmbientShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.position = 'fixed';
        shootingStar.style.zIndex = '1000';
        shootingStar.style.pointerEvents = 'none';
        
        // Random starting position from edges
        const side = Math.floor(Math.random() * 4);
        switch(side) {
            case 0: // top
                shootingStar.style.left = `${Math.random() * 100}%`;
                shootingStar.style.top = '-10px';
                break;
            case 1: // right
                shootingStar.style.left = '110%';
                shootingStar.style.top = `${Math.random() * 100}%`;
                break;
            case 2: // bottom
                shootingStar.style.left = `${Math.random() * 100}%`;
                shootingStar.style.top = '110%';
                break;
            case 3: // left
                shootingStar.style.left = '-10px';
                shootingStar.style.top = `${Math.random() * 100}%`;
                break;
        }
        
        document.body.appendChild(shootingStar);
        
        // Remove after animation
        setTimeout(() => {
            if (document.body.contains(shootingStar)) {
                document.body.removeChild(shootingStar);
            }
        }, 3000);
    }

    // Method to manually trigger stars on specific elements
    triggerStarsOnElement(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            const container = element.querySelector('.star-particles');
            if (container) {
                this.activateStars(element, container);
                setTimeout(() => {
                    this.deactivateStars(element, container);
                }, 3000);
            }
        });
    }

    // Performance optimization - reduce particles on mobile
    adjustForMobile() {
        if (window.innerWidth <= 768) {
            this.animationSettings.particleCount = 6;
            this.animationSettings.animationDuration = 2000;
        }
    }
}

// Initialize the star animation system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        window.starSystem = new StarAnimationSystem();
        
        // Adjust for mobile
        window.starSystem.adjustForMobile();
        
        // Re-adjust on window resize
        window.addEventListener('resize', () => {
            window.starSystem.adjustForMobile();
        });
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StarAnimationSystem;
}
