import './DiagnosticConsole.js';

document.addEventListener('DOMContentLoaded', () => {
    const diagnosticConsole = document.querySelector('diagnostic-console');

    // --- Diagnostic Console Integration ---
    if (diagnosticConsole) {
        const originalConsoleLog = console.log;
        const originalConsoleError = console.error;
        const originalConsoleWarn = console.warn;

        console.log = function(...args) {
            originalConsoleLog.apply(console, args);
            diagnosticConsole.log(args.join(' '), 'log');
        };

        console.error = function(...args) {
            originalConsoleError.apply(console, args);
            diagnosticConsole.log(args.join(' '), 'error');
        };

        console.warn = function(...args) {
            originalConsoleWarn.apply(console, args);
            diagnosticConsole.log(args.join(' '), 'warn');
        };

        window.onerror = function(message, source, lineno, colno, error) {
            const errorMessage = `${message} at ${source}:${lineno}:${colno}`;
            console.error(errorMessage, error);
            return false; // Prevents the firing of the default event handler
        };

        console.log("Diagnostic console initialized.");
    }

    // --- Review Carousel --- 
    const carousel = document.querySelector('.review-carousel');
    const prevButton = document.getElementById('prev-review');
    const nextButton = document.getElementById('next-review');
    
    if (carousel && prevButton && nextButton) {
        const reviews = document.querySelectorAll('.review-item');
        const reviewCount = reviews.length;
        let currentIndex = 0;
        let autoScrollInterval;

        function updateCarousel() {
            const offset = -currentIndex * 100;
            carousel.style.transform = `translateX(${offset}%)`;
        }

        function showNextReview() {
            currentIndex = (currentIndex + 1) % reviewCount;
            updateCarousel();
        }

        function showPrevReview() {
            currentIndex = (currentIndex - 1 + reviewCount) % reviewCount;
            updateCarousel();
        }

        function startAutoScroll() {
            stopAutoScroll(); // Clear any existing interval
            autoScrollInterval = setInterval(showNextReview, 5000); // Change review every 5 seconds
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        nextButton.addEventListener('click', () => {
            showNextReview();
            stopAutoScroll();
            startAutoScroll(); // Restart the timer
        });

        prevButton.addEventListener('click', () => {
            showPrevReview();
            stopAutoScroll();
            startAutoScroll(); // Restart the timer
        });
        
        // Pause on hover
        carousel.addEventListener('mouseenter', stopAutoScroll);
        carousel.addEventListener('mouseleave', startAutoScroll);

        startAutoScroll(); // Initialize
        console.log("Review carousel initialized.");
    }

    // --- Existing Functionality ---

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Test log to show console is working
    setTimeout(() => {
        console.log("This is a test log after 2 seconds.");
        console.warn("This is a test warning.");
    }, 2000);
});
