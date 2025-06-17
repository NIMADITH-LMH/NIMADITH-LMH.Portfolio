// Connection speed detection and optimization
document.addEventListener('DOMContentLoaded', function() {
    // Check connection speed
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    let isSlowConnection = false;
    
    if (connection) {
        // Check if the connection is slow (2G or slow-2G)
        isSlowConnection = connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g';
        
        // Check if the user has enabled data saving mode
        if (connection.saveData) {
            isSlowConnection = true;
        }
    }
    
    // Apply optimizations for slow connections
    if (isSlowConnection) {
        console.log('Slow connection detected - applying optimizations');
        
        // Disable animations
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation: none !important;
                transition: none !important;
            }
            
            .glass {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                background: rgba(26, 45, 66, 0.95) !important;
                box-shadow: none !important;
            }
            
            .pdf-card {
                box-shadow: none !important;
            }
        `;
        document.head.appendChild(style);
        
        // Remove any particle effects
        const particles = document.querySelectorAll('.gold-particles');
        particles.forEach(p => p.remove());
        
        // Simplify glass effects
        const glassElements = document.querySelectorAll('.glass');
        glassElements.forEach(el => {
            el.style.background = 'rgba(26, 45, 66, 0.95)';
        });
    }
});
