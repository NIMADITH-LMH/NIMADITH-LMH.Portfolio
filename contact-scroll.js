// Smooth scrolling functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all links that have a hash
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Add click event listener to each link
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default behavior
            e.preventDefault();
            
            // Get the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Smooth scroll to the target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Ensure the buttons have the same size
    const cvButton = document.querySelector('.cv-button');
    const contactButton = document.querySelector('.contact-button');
    
    if (cvButton && contactButton) {
        // Function to equalize the button sizes
        const equalizeButtonSizes = () => {
            // Get computed styles
            const cvStyle = window.getComputedStyle(cvButton);
            const contactStyle = window.getComputedStyle(contactButton);
            
            // Find the larger width and height
            const maxWidth = Math.max(
                parseInt(cvStyle.width),
                parseInt(contactStyle.width)
            );
            
            const maxHeight = Math.max(
                parseInt(cvStyle.height),
                parseInt(contactStyle.height)
            );
            
            // Apply the same dimensions to both buttons
            cvButton.style.width = `${maxWidth}px`;
            contactButton.style.width = `${maxWidth}px`;
            cvButton.style.height = `${maxHeight}px`;
            contactButton.style.height = `${maxHeight}px`;
        };
        
        // Run on load and on window resize
        equalizeButtonSizes();
        window.addEventListener('resize', equalizeButtonSizes);
    }
});