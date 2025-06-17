// Animation for Experience & Education page
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to timeline content boxes
    const timelineContents = document.querySelectorAll('.timeline-content');
    const pageTitle = document.querySelector('.experience-page-title');
    const pageSubtitle = document.querySelector('.page-subtitle');
    const introText = document.querySelector('.experience-intro-text');
    const glassElements = document.querySelectorAll('.glass');
    const glassElements = document.querySelectorAll('.glass');
    
    // Enhanced create gold particle effect
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
        const particleCount = 20; // Increased particle count
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
            
            // Styling
            particle.style.position = 'absolute';
            particle.style.backgroundColor = 'rgba(240, 165, 0, 0.5)'; // Increased opacity
            particle.style.borderRadius = '50%';
            particle.style.opacity = '0';
            particle.style.boxShadow = '0 0 15px rgba(240, 165, 0, 0.9)'; // Enhanced glow
            
            // Animation
            const duration = Math.random() * 4 + 3;
            const delay = Math.random() * 2;
            particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
            
            particleContainer.appendChild(particle);
        }
        
        // Add particle animation keyframes if they don't exist
        if (!document.querySelector('#gold-particle-animation')) {
            const style = document.createElement('style');
            style.id = 'gold-particle-animation';
            style.innerHTML = `
                @keyframes floatParticle {
                    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                    20% { opacity: 0.9; }
                    80% { opacity: 0.9; }
                    100% { transform: translateY(-30px) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        container.appendChild(particleContainer);
    }
    
    // Apply glow effect to all glass elements
    glassElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            // Create gold particles for all glass elements
            createGoldParticles(element);
            
            // Enhanced gold glow effect
            element.style.boxShadow = '0 15px 40px rgba(240, 165, 0, 0.25)';
            element.style.border = '1px solid rgba(240, 165, 0, 0.4)';
            element.style.transform = 'translateY(-5px) scale(1.01)';
            
            // Show particles
            const particles = element.querySelectorAll('.gold-particle');
            particles.forEach(particle => {
                particle.style.opacity = '1';
            });
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = '';
            element.style.border = '';
            element.style.transform = '';
            
            // Hide particles
            const particles = element.querySelectorAll('.gold-particle');
            particles.forEach(particle => {
                particle.style.opacity = '0';
            });
        });
    });
    
    // Initialize AOS-like animations for page title and subtitle
    if (pageTitle) {
        pageTitle.style.opacity = '0';
        pageTitle.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            pageTitle.style.transition = 'all 0.8s ease';
            pageTitle.style.opacity = '1';
            pageTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (pageSubtitle) {
        pageSubtitle.style.opacity = '0';
        pageSubtitle.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            pageSubtitle.style.transition = 'all 0.8s ease';
            pageSubtitle.style.opacity = '1';
            pageSubtitle.style.transform = 'translateY(0)';
        }, 500);
    }
    
    if (introText) {
        introText.style.opacity = '0';
        introText.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            introText.style.transition = 'all 0.8s ease';
            introText.style.opacity = '1';
            introText.style.transform = 'translateY(0)';
        }, 700);
    }
    
    // Apply staggered animation to timeline content
    timelineContents.forEach((content, index) => {
        // Set initial state and transition
        content.style.opacity = '0';
        content.style.transform = 'translateY(30px) scale(0.95)';
        content.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Add hover effect
        content.addEventListener('mouseenter', () => {
            content.style.transform = 'translateX(5px) scale(1.01)';
            content.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
            content.style.borderLeft = '5px solid var(--gold)';
            
            // Add subtle pulse to gold border
            const pulseAnimation = document.createElement('style');
            pulseAnimation.innerHTML = `
                @keyframes goldPulse {
                    0% { border-color: rgba(240, 165, 0, 0.7); }
                    50% { border-color: rgba(240, 165, 0, 1); }
                    100% { border-color: rgba(240, 165, 0, 0.7); }
                }
            `;
            document.head.appendChild(pulseAnimation);
            content.style.animation = 'goldPulse 2s infinite';
        });
        
        content.addEventListener('mouseleave', () => {
            content.style.transform = 'translateX(0) scale(1)';
            content.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
            content.style.borderLeft = '3px solid var(--gold)';
            content.style.animation = 'none';
        });
    });
    
    // Add scroll reveal animation for timeline content
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Calculate delay based on index
                const delay = 800 + (i * 200);
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, delay);
                
                // Unobserve after animation is triggered
                contentObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all timeline contents
    timelineContents.forEach(content => {
        // Initially set opacity to 0 and translate down
        content.style.opacity = '0';
        content.style.transform = 'translateY(30px)';
        content.style.transition = 'all 0.8s ease';
        
        contentObserver.observe(content);
    });
    
    // Add a "Back to Top" button
    const footer = document.querySelector('footer');
    
    if (footer) {
        const backToTopDiv = document.createElement('div');
        backToTopDiv.className = 'back-to-top';
        
        const backToTopButton = document.createElement('a');
        backToTopButton.className = 'back-to-top-button';
        backToTopButton.href = '#';
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-arrow-up';
        
        const text = document.createElement('span');
        text.textContent = 'Back to Top';
        
        backToTopButton.appendChild(icon);
        backToTopButton.appendChild(text);
        backToTopDiv.appendChild(backToTopButton);
        
        // Insert before footer
        footer.parentNode.insertBefore(backToTopDiv, footer);
        
        // Add click event for smooth scrolling
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });
    }
    
    // Add subtle parallax effect on mouse move
    const container = document.querySelector('.timeline-container');
    
    if (container) {
        // Add golden glow effect to timeline container
        container.addEventListener('mouseenter', () => {
            container.style.boxShadow = '0 15px 40px rgba(240, 165, 0, 0.2)';
            container.style.border = '1px solid rgba(240, 165, 0, 0.3)';
            container.style.background = 'rgba(26, 45, 66, 0.7)';
            
            // Create gold particles
            createGoldParticles(container);
            
            // Show particles
            const particles = container.querySelectorAll('.gold-particle');
            particles.forEach(particle => {
                particle.style.opacity = '1';
            });
        });
        
        container.addEventListener('mouseleave', () => {
            container.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            container.style.border = '1px solid rgba(240, 165, 0, 0.1)';
            container.style.background = 'var(--navy-light)';
            
            // Hide particles
            const particles = container.querySelectorAll('.gold-particle');
            particles.forEach(particle => {
                particle.style.opacity = '0';
            });
        });
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const cards = container.querySelectorAll('.timeline-content');
            cards.forEach((card, index) => {
                const offsetX = (mouseX - 0.5) * 8;
                const offsetY = (mouseY - 0.5) * 8;
                const delayFactor = index * 0.01;
                
                // Don't apply parallax if card is being hovered
                if (!card.matches(':hover')) {
                    card.style.transition = 'transform 0.5s ease';
                    card.style.transform = `translate(${offsetX * delayFactor}px, ${offsetY * delayFactor}px)`;
                }
            });
        });
    }
});
