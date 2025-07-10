// Simple Animation Controller
// Applies consistent hover effects throughout the portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Add simple animation classes to all hoverable elements
    const hoverElements = [
        '.project-card',
        '.skill',
        '.pdf-card',
        '.card',
        '.blog-post',
        '.timeline-content',
        '.cv-button',
        '.contact-button',
        '.send-button'
    ];

    hoverElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add('hover-effect');
        });
    });

    // Add fade-in animation to cards with stagger effect
    const cards = document.querySelectorAll('.project-card, .pdf-card, .skill');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });

    // Smooth scroll behavior for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add simple loading state for better perceived performance
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Performance optimization: Use requestAnimationFrame for smooth animations
function optimizeAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        body.loaded .hover-effect {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                       box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
}

// Initialize optimizations
document.addEventListener('DOMContentLoaded', optimizeAnimations);
