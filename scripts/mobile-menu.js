// Robust Mobile Menu Script
(function() {
    'use strict';
    
    let toggleButton, navUl;
    
    function initMobileMenu() {
        // Get elements
        toggleButton = document.querySelector('.mobile-menu-toggle');
        navUl = document.querySelector('nav ul');
        
        // Debug: Check if elements exist
        console.log('Toggle button:', toggleButton);
        console.log('Nav UL:', navUl);

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
            console.log('Menu toggle clicked');
            
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
        console.log('Mobile menu initialized successfully');
    }
    
    function openMenu() {
        if (navUl && toggleButton) {
            navUl.classList.add('active');
            toggleButton.classList.add('active');
            console.log('Menu opened');
        }
    }
    
    function closeMenu() {
        if (navUl && toggleButton) {
            navUl.classList.remove('active');
            toggleButton.classList.remove('active');
            console.log('Menu closed');
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
