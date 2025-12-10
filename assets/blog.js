document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
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
    
    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
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

    // ============================================
    // CATEGORY OBSERVER FOR ANIMATIONS
    // ============================================
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

    // ============================================
    // PROJECT NAVIGATION SCROLL HANDLER
    // ============================================
    function handleProjectNavigation() {
        const hash = window.location.hash.substring(1);
        if (!hash) return;

        // If real ID exists, do NOT override (prevents wrong scroll)
        if (document.getElementById(hash)) {
            return;
        }

        const categoryMap = {
            'Maintenance': '.category-1',
            'Safety': '.category-2',
            'Technical': '.category-3'
        };

        const targetSelector = categoryMap[hash];
        if (!targetSelector) return;

        const targetSection = document.querySelector(targetSelector);
        if (!targetSection) return;

        const headerHeight = document.querySelector('header').offsetHeight;
        let scrollPosition = targetSection.offsetTop - headerHeight - 20;

        if (scrollPosition < 0) scrollPosition = 0;

        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });

        targetSection.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.5)';
        targetSection.style.transition = 'box-shadow 0.5s ease';
        
        setTimeout(() => {
            targetSection.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        }, 3000);
    }

    setTimeout(handleProjectNavigation, 100);
    window.addEventListener('hashchange', handleProjectNavigation);

    // ============================================
    // BLOG ARTICLE FILTER HANDLER
    // ============================================
    const handleBlogArticles = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        
        if (!category) return;
        
        const articles = document.querySelectorAll('.blog-article');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (articles.length > 0 && navLinks.length > 0) {
            articles.forEach(article => {
                article.classList.toggle(
                    'active',
                    article.getAttribute('data-category') === category
                );
            });
            
            navLinks.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('data-category') === category
                );
            });
        }
    };

    // ============================================
    // FIXED SMOOTH SCROLL LOGIC (WORKS FOR SECTION 1)
    // ============================================
    function calculateScrollPosition(targetElement) {
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;

        // Prevent overscroll for Section 1
        let yOffset = elementTop - headerHeight - 10;
        if (yOffset < 0) yOffset = 0;

        return yOffset;
    }

    // ============================================
    // SMOOTH SCROLL ON PAGE LOAD
    // ============================================
    function smoothScrollToHash() {
        const hash = window.location.hash;
        if (!hash) return;

        const targetId = hash.replace('#', '');
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        const yOffset = calculateScrollPosition(targetElement);

        setTimeout(() => {
            window.scrollTo({
                top: yOffset,
                behavior: 'smooth'
            });
        }, 200);
    }

    setTimeout(smoothScrollToHash, 150);
    window.addEventListener('hashchange', smoothScrollToHash);

    // ============================================
    // SMOOTH SCROLL FOR INTERNAL LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').replace('#', '');
            const targetElement = document.getElementById(targetId);
            if (!targetElement) return;

            const yOffset = calculateScrollPosition(targetElement);

            window.scrollTo({
                top: yOffset,
                behavior: 'smooth'
            });

            history.pushState(null, null, `#${targetId}`);
        });
    });

    // Initialize blog articles if present
    if (document.querySelector('.blog-article')) {
        handleBlogArticles();
    }
});
