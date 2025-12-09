document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Category Observer for animations
    const categories = document.querySelectorAll('.category-1, .category-2, .category-3');
    if (categories.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, {threshold: 0.1});
        
        categories.forEach(category => {
            observer.observe(category);
        });
    }

    // Project Navigation Handler
    function handleProjectNavigation() {
        const hash = window.location.hash.substring(1);
        if (!hash) return;

        const categoryMap = {
            'blackbox': '.category-1',
            'rc-aircraft': '.category-2',
            'quadcopter': '.category-3'
        };

        const targetSelector = categoryMap[hash];
        if (!targetSelector) return;

        const targetSection = document.querySelector(targetSelector);
        if (!targetSection) return;

        // Calculate position with more accurate offset
        const headerHeight = document.querySelector('header').offsetHeight;
        const scrollPosition = targetSection.offsetTop - headerHeight - 20;

        // Smooth scroll with additional checks
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: Math.max(0, scrollPosition),
                behavior: 'smooth'
            });
        } else {
            // Fallback for older browsers
            window.scrollTo(0, Math.max(0, scrollPosition));
        }

        // Enhanced highlight effect
        targetSection.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.5)';
        targetSection.style.transition = 'box-shadow 0.5s ease';
        
        setTimeout(() => {
            targetSection.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        }, 3000);

        // Add URL history entry without scrolling again
        if (history.replaceState) {
            history.replaceState(null, null, `#${hash}`);
        }
    }

    // Initialize navigation when page loads
    setTimeout(handleProjectNavigation, 100); // Small delay to ensure DOM is ready
    
    // Also handle hash changes if user navigates using browser back/forward
    window.addEventListener('hashchange', handleProjectNavigation);

    // Blog Article Handling (for future use)
    const handleBlogArticles = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        
        if (!category) return;
        
        const articles = document.querySelectorAll('.blog-article');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (articles.length > 0 && navLinks.length > 0) {
            articles.forEach(article => {
                article.classList.toggle('active', 
                    article.getAttribute('data-category') === category
                );
            });
            
            navLinks.forEach(link => {
                link.classList.toggle('active',
                    link.getAttribute('data-category') === category
                );
            });
        }
    };

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////


    
    // Smooth scroll to section on page load if hash exists
window.addEventListener('DOMContentLoaded', function() {
    // Check if there's a hash in the URL
    if (window.location.hash) {
        // Remove the # from the hash
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Small delay to ensure page is fully loaded
            setTimeout(function() {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
});

// Optional: Add smooth scrolling for all anchor links within the same page
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

    // Initialize blog articles if present
    if (document.querySelector('.blog-article')) {
        handleBlogArticles();
    }
});