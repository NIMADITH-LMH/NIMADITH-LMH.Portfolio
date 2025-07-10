// Animation for PDF certificates
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to PDF cards
    const pdfCards = document.querySelectorAll('.pdf-card');
    const pdfSections = document.querySelectorAll('.pdf-section-title');
    const pdfSectionDescriptions = document.querySelectorAll('.pdf-section-description');
    const pdfIntroTitle = document.querySelector('.pdf-intro-title');
    const pdfIntroText = document.querySelector('.pdf-intro-text');
    
    // Setup smooth scrolling for back to top button
    const backToTopButton = document.querySelector('.back-to-top-button');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });
    }
    
    // Initialize AOS-like animations for section titles
    if (pdfIntroTitle) {
        pdfIntroTitle.style.opacity = '0';
        pdfIntroTitle.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            pdfIntroTitle.style.transition = 'all 0.8s ease';
            pdfIntroTitle.style.opacity = '1';
            pdfIntroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (pdfIntroText) {
        pdfIntroText.style.opacity = '0';
        pdfIntroText.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            pdfIntroText.style.transition = 'all 0.8s ease';
            pdfIntroText.style.opacity = '1';
            pdfIntroText.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Apply staggered animation to section titles and descriptions
    pdfSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        section.style.transition = 'all 0.8s ease';
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(section);
    });
    
    // Animate section descriptions
    pdfSectionDescriptions.forEach((desc, index) => {
        desc.style.opacity = '0';
        desc.style.transform = 'translateY(20px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        desc.style.transition = 'all 0.8s ease';
                        desc.style.opacity = '1';
                        desc.style.transform = 'translateY(0)';
                    }, index * 100 + 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(desc);
    });
    
    // Apply appropriate delay class based on position
    pdfCards.forEach((card, index) => {
        // Calculate delay class (1-12)
        const delayClass = `delay-${(index % 12) + 1}`;
        card.classList.add(delayClass);
        
        // Add hover event listeners for additional effects
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.pdf-icon');
            if (icon) {
                icon.classList.add('pulse-animation');
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.pdf-icon');
            if (icon) {
                icon.classList.remove('pulse-animation');
            }
        });
    });
    
    // Add scroll reveal animation for cards
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation is triggered
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all PDF cards
    pdfCards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // Add subtle parallax effect on mouse move
    const sections = document.querySelectorAll('.pdf-section');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        sections.forEach(section => {
            const cards = section.querySelectorAll('.pdf-card');
            cards.forEach((card, index) => {
                const offsetX = (mouseX - 0.5) * 10;
                const offsetY = (mouseY - 0.5) * 10;
                const delayFactor = index * 0.01;
                
                // Don't apply parallax if card is being hovered
                if (!card.matches(':hover')) {
                    card.style.transition = 'transform 0.5s ease';
                    card.style.transform = `translate(${offsetX * delayFactor}px, ${offsetY * delayFactor}px)`;
                }
            });
        });
    });
});

// Add particles support for PDF cards
document.addEventListener('DOMContentLoaded', function() {
    // Get all PDF cards with card class
    const pdfCardCards = document.querySelectorAll('.pdf-card.card');
    
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
        
        // Add particles
        const particleCount = 15;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'gold-particle';
            
            // Random size between 2px and 6px
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Animation
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 1.5;
            particle.style.animation = `floatPDFParticle ${duration}s ease-in-out ${delay}s infinite`;
            
            particleContainer.appendChild(particle);
        }
        
        container.appendChild(particleContainer);
    }
    
    // Apply particles and enhanced effects to all PDF card cards
    pdfCardCards.forEach(card => {
        // Create particles on hover
        card.addEventListener('mouseenter', () => {
            createGoldParticles(card);
            
            // Show particles
            const particles = card.querySelectorAll('.gold-particle');
            particles.forEach(particle => {
                particle.style.opacity = '1';
            });
        });
        
        card.addEventListener('mouseleave', () => {
            // Hide particles
            const particles = card.querySelectorAll('.gold-particle');
            particles.forEach(particle => {
                particle.style.opacity = '0';
            });
            
            // Remove particles after transition
            setTimeout(() => {
                const particleContainer = card.querySelector('.gold-particles');
                if (particleContainer) {
                    particleContainer.remove();
                }
            }, 500);
        });
    });
});

// Mobile optimization for PDF cards
document.addEventListener('DOMContentLoaded', function() {
    // Check if it's a mobile device
    const isMobile = window.innerWidth <= 768;
    
    // Get all PDF cards
    const pdfCards = document.querySelectorAll('.pdf-card');
    
    // For mobile devices, reduce animation complexity
    if (isMobile) {
        pdfCards.forEach(card => {
            // Remove complex animations for better performance
            card.style.animation = 'fadeIn 0.3s ease-out';
            card.style.opacity = '1';
            
            // Add touch feedback
            card.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.borderColor = 'var(--gold)';
                this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = '';
                this.style.borderColor = '';
                this.style.boxShadow = '';
            });
        });
    }
});
