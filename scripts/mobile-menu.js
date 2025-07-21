// Robust Mobile Menu Script
(function() {
    'use strict';
    
    let toggleButton, navUl;
    
    function initMobileMenu() {
        // Get elements
        toggleButton = document.querySelector('.mobile-menu-toggle');
        navUl = document.querySelector('nav ul');

        if (!toggleButton || !navUl) {
            console.warn('Mobile menu elements not found');
            return;
        }

        // Remove any existing event listeners
        toggleButton.replaceWith(toggleButton.cloneNode(true));
        toggleButton = document.querySelector('.mobile-menu-toggle');

        // Add click event to toggle button
        toggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navUl.classList.contains('active');
            
            if (isActive) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking on navigation links
        const navLinks = navUl.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-toggle')) {
                closeMenu();
            }
        });

        // Close menu on window resize if screen becomes larger
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });

        // Set body class to indicate menu is ready
        document.body.classList.add('menu-ready');
    }
    
    function openMenu() {
        if (navUl && toggleButton) {
            navUl.classList.add('active');
            toggleButton.classList.add('active');
        }
    }
    
    function closeMenu() {
        if (navUl && toggleButton) {
            navUl.classList.remove('active');
            toggleButton.classList.remove('active');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
    
    // Re-initialize if called again (for pages with dynamic content)
    window.reinitMobileMenu = initMobileMenu;
})();
