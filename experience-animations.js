// Simple Animation for Experience & Education page (consistent with other sections)
document.addEventListener('DOMContentLoaded', function() {
    // Add simple hover animations to timeline content boxes
    const timelineContents = document.querySelectorAll('.timeline-content');
    const cardElements = document.querySelectorAll('.card');
    
    // Simple hover effects for timeline content (consistent with other sections)
    timelineContents.forEach((content) => {
        // Simple hover effect similar to other sections
        content.addEventListener('mouseenter', () => {
            content.style.transform = 'translateY(-8px) scale(1.02)';
            content.style.boxShadow = '0 10px 30px rgba(240, 165, 0, 0.3)';
        });
        
        content.addEventListener('mouseleave', () => {
            content.style.transform = 'translateY(0) scale(1)';
            content.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
        });
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
    
    // Simple hover effect for timeline container (consistent with other sections)
    if (container) {
        container.addEventListener('mouseenter', () => {
            container.style.transform = 'translateY(-8px) scale(1.02)';
            container.style.boxShadow = '0 10px 30px rgba(240, 165, 0, 0.3)';
        });
        
        container.addEventListener('mouseleave', () => {
            container.style.transform = 'translateY(0) scale(1)';
            container.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
    }
});
