// Enhanced Mobile Menu Toggle with Dropdown Support
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const dropdowns = document.querySelectorAll('.dropdown > a');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('show');
    document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Only close if it's not a dropdown toggle
        if (!link.parentElement.classList.contains('dropdown')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('show');
            document.body.classList.remove('no-scroll');
        }
    });
});

// Mobile dropdown functionality
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) { // Only for mobile
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('active');
            
            // Close other open dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== this) {
                    otherDropdown.parentElement.classList.remove('active');
                }
            });
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('show');
        document.body.classList.remove('no-scroll');
        
        // Close all dropdowns
        dropdowns.forEach(dropdown => {
            dropdown.parentElement.classList.remove('active');
        });
    }
});



// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});



// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        if (isElementInViewport(bar)) {
            bar.style.width = percentage + '%';
        }
    });
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Run once on page load
animateSkillBars();

// Run on scroll
window.addEventListener('scroll', animateSkillBars);

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const toastContainer = document.getElementById('toastContainer');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    
    try {
        // In a real implementation, you would send this data to your server
        // For demo purposes, we'll simulate a successful submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        showToast('Message sent successfully!', 'success');
        contactForm.reset();
    } catch (error) {
        showToast('Failed to send message. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send';
    }
});

// Toast Notification Function
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type} show`;
    
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'i'}
            </div>
            <div class="toast-message">${message}</div>
            <button class="toast-close" aria-label="Close">&times;</button>
        </div>
        <div class="toast-progress"></div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto-remove toast after 5 seconds
    const autoRemove = setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with scroll animations
document.querySelectorAll('.education-item, .training-card, .timeline-item, .seminar-item, .project-card1,.workshop-grid').forEach(el => {
    observer.observe(el);
});

// Typing animation for the about section title
const typingTitle = document.getElementById('typing-title');
const titles = ["Aircraft Engineer", "Senior Maintenance Engineer","Critical Thinker", "Problem Solver", "Teamleader"];
let currentTitleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeTitle() {
    const currentTitle = titles[currentTitleIndex];
    
    if (isDeleting) {
        typingTitle.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingTitle.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        typingSpeed = 500; // Pause before typing next word
    }
    
    setTimeout(typeTitle, typingSpeed);
}

// Start typing animation after a delay
setTimeout(typeTitle, 1000);

// Floating elements animation
const floatingIcons = document.querySelectorAll('.floating-icon');

floatingIcons.forEach(icon => {
    // Randomize initial position and animation delay
    const randomX = (Math.random() * 20) - 10;
    const randomY = (Math.random() * 20) - 10;
    const randomDelay = Math.random() * 2;
    
    icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
    icon.style.animationDelay = `${randomDelay}s`;
});

// Add ripple effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .contact_form_submit').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 300);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for the scroll arrow
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // You can also add this for any anchor links on the page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});



// Workshop Section JavaScript Functionality
        class WorkshopSection {
            constructor() {
                this.workshopCards = document.querySelectorAll('.workshop-card');
                this.sectionTitle = document.querySelector('.section-title');
                this.workshopGrid = document.getElementById('workshopGrid');
                this.loading = document.getElementById('loading');
                
                this.init();
            }

            init() {
                this.setupIntersectionObserver();
                this.setupCardInteractions();
                this.setupKeyboardNavigation();
                this.simulateLoading();
            }

            // Simulate loading effect
            simulateLoading() {
                if (this.loading && this.workshopGrid) {
                    this.loading.style.display = 'block';
                    this.workshopGrid.style.opacity = '0';
                    
                    setTimeout(() => {
                        this.loading.style.display = 'none';
                        this.workshopGrid.style.opacity = '1';
                        this.workshopGrid.style.transition = 'opacity 0.5s ease';
                    }, 1000);
                }
            }

            // Setup Intersection Observer for scroll animations
            setupIntersectionObserver() {
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                }, observerOptions);

                this.workshopCards.forEach(card => {
                    observer.observe(card);
                });
            }

            // Setup card interactions
            setupCardInteractions() {
                this.workshopCards.forEach((card, index) => {
                    // Mouse enter effect
                    card.addEventListener('mouseenter', () => {
                        this.highlightCard(card);
                    });

                    // Mouse leave effect
                    card.addEventListener('mouseleave', () => {
                        this.resetCardHighlight(card);
                    });

                    // Click effect
                    card.addEventListener('click', (e) => {
                        this.selectCard(card);
                        this.createRipple(e, card);
                    });
                });
            }

            // Setup keyboard navigation
            setupKeyboardNavigation() {
                this.workshopCards.forEach((card, index) => {
                    card.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            this.selectCard(card);
                        }
                        
                        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                            e.preventDefault();
                            this.focusNextCard(index);
                        }
                        
                        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                            e.preventDefault();
                            this.focusPreviousCard(index);
                        }
                    });
                });
            }

            // Highlight card on hover
            highlightCard(card) {
                card.style.transform = 'translateY(-15px) scale(1.02)';
                card.style.zIndex = '10';
                
                const icon = card.querySelector('i');
                if (icon) {
                    icon.style.color = '#e74c3c';
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                }
            }

            // Reset card highlight
            resetCardHighlight(card) {
                card.style.transform = '';
                card.style.zIndex = '';
                
                const icon = card.querySelector('i');
                if (icon) {
                    icon.style.color = '#3498db';
                    icon.style.transform = '';
                }
            }

            // Select card
            selectCard(card) {
                // Remove previous selections
                this.workshopCards.forEach(c => c.classList.remove('selected'));
                
                // Add selection to clicked card
                card.classList.add('selected');
                
                // Get workshop data
                const workshopType = card.dataset.workshop;
                const title = card.querySelector('h3').textContent;
                
                // Show workshop details
                this.showWorkshopDetails(workshopType, title);
                
                // Add pulse animation
                card.style.animation = 'pulse 0.6s ease-out';
                setTimeout(() => {
                    card.style.animation = '';
                }, 600);
            }

           

            // Create ripple effect
            createRipple(event, card) {
                const ripple = document.createElement('div');
                const rect = card.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = event.clientX - rect.left - size / 2;
                const y = event.clientY - rect.top - size / 2;

                ripple.className = 'ripple';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.style.width = `${size}px`;
                ripple.style.height = `${size}px`;

                card.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }

            // Focus navigation
            focusNextCard(currentIndex) {
                const nextIndex = (currentIndex + 1) % this.workshopCards.length;
                this.workshopCards[nextIndex].focus();
            }

            focusPreviousCard(currentIndex) {
                const prevIndex = currentIndex === 0 ? this.workshopCards.length - 1 : currentIndex - 1;
                this.workshopCards[prevIndex].focus();
            }
        }

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            console.log('🚀 Training Workshops Section Initialized');
            
            // Initialize main workshop functionality
            const workshopSection = new WorkshopSection();
            
            // Add error handling
            window.addEventListener('error', (e) => {
                console.error('Workshop Section Error:', e.error);
            });
        });

