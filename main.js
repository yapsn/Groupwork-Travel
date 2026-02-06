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
        // testError(); // Uncomment to test error logging
    }, 2000);
});
