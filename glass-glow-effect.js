// Gold glow effect and particles for glass elements

document.addEventListener('DOMContentLoaded', function() {
    // Get all glass elements
    const glassElements = document.querySelectorAll('.glass');
    
    // Create gold particle effect
    function createGoldParticles(container) {
        // Remove any existing particle container
        const existingParticles = container.querySelector('.gold-particles');
        if (existingParticles) {
            existingParticles.remove();
        }
        
        // Create particle container
        const particleContainer = document.createElement('div');
        particleContainer.className = 'gold-particles';
        particleContainer.style.position = 'absolute';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '0';
        particleContainer.style.overflow = 'hidden';
        particleContainer.style.borderRadius = '12px';
        
        // Add particles
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'gold-particle';
            
            // Random size between 3px and 8px
            const size = Math.random() * 5 + 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Animation
            const duration = Math.random() * 4 + 3;
            const delay = Math.random() * 2;
            particle.style.animation = `floatGoldParticle ${duration}s ease-in-out ${delay}s infinite`;
            
            particleContainer.appendChild(particle);
        }
        
        container.appendChild(particleContainer);
    }
    
    // Apply particles and enhanced effects to all glass elements
    glassElements.forEach(element => {
        // Add gold shimmer effect
        element.classList.add('gold-shimmer');
        
        // Create particles on hover
        element.addEventListener('mouseenter', () => {
            createGoldParticles(element);
            
            // Show particles
            const particles = element.querySelectorAll('.gold-particle');
            particles.forEach(particle => {
                particle.style.opacity = '1';
            });
        });
        
        element.addEventListener('mouseleave', () => {
            // Hide particles
            const particles = element.querySelectorAll('.gold-particle');
            particles.forEach(particle => {
                particle.style.opacity = '0';
            });
            
            // Remove particles after transition
            setTimeout(() => {
                const particleContainer = element.querySelector('.gold-particles');
                if (particleContainer) {
                    particleContainer.remove();
                }
            }, 500);
        });
    });
});

// Mobile performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Check if it's a mobile device
    const isMobile = window.innerWidth <= 768;
    const isLowPerformance = window.innerWidth <= 480;
    
    if (isMobile) {
        // Get all glass elements
        const glassElements = document.querySelectorAll('.glass');
        
        glassElements.forEach(element => {
            // For very low-performance devices, simplify effects even more
            if (isLowPerformance) {
                element.style.backdropFilter = 'none';
                element.style.webkitBackdropFilter = 'none';
                element.style.background = 'rgba(26, 45, 66, 0.9)';
            }
            
            // Remove event listeners to avoid performance issues
            const newElement = element.cloneNode(true);
            element.parentNode.replaceChild(newElement, element);
        });
    }
});
