// Asha777 Casino - Main JavaScript File

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Duplicate ticker content for continuous animation
    const tickerContent = document.querySelector('.ticker-content');
    if (tickerContent) {
        tickerContent.innerHTML += tickerContent.innerHTML;
    }

    // Add mobile menu toggle functionality
    const body = document.body;
    
    // Get menu toggle button (now part of HTML)
    const menuToggle = document.querySelector('.menu-toggle');
    
    // Get sidebar element
    const sidebar = document.querySelector('.sidebar');
    
    // Toggle sidebar on menu button click
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent click from propagating
            sidebar.classList.toggle('active');
            
            // Change icon based on sidebar state
            if (sidebar.classList.contains('active')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 992) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnMenuToggle = menuToggle && menuToggle.contains(event.target);
            
            if (!isClickInsideSidebar && !isClickOnMenuToggle && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                if (menuToggle) {
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        }
    });

    // Game card hover effects
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Game category filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter game cards
                const allGameCards = document.querySelectorAll('.game-card');
                
                allGameCards.forEach(card => {
                    if (filterValue === 'all') {
                        // Show all cards
                        card.style.display = 'flex';
												card.style.flexDirection = 'column';
                    } else {
                        // Get the categories for this card
                        const cardCategories = card.getAttribute('data-category');
                        
                        // Check if card has the selected category
                        if (cardCategories && cardCategories.includes(filterValue)) {
                            card.style.display = 'flex';
														card.style.flexDirection = 'column';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // Promotional cards hover effects
    const promoCards = document.querySelectorAll('.promo-card');
    promoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 7px 15px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Update current exchange rates in ticker (for demonstration)
    function updateExchangeRates() {
        const rates = [
            { currency: 'USD', min: 110, max: 111 },
            { currency: 'EUR', min: 119, max: 121 },
            { currency: 'GBP', min: 140, max: 142 }
        ];

        const exchangeRateElements = document.querySelectorAll('.ticker-content span');
        
        rates.forEach(rate => {
            const randomRate = (Math.random() * (rate.max - rate.min) + rate.min).toFixed(1);
            const rateElement = Array.from(exchangeRateElements).find(el => el.textContent.includes(rate.currency));
            
            if (rateElement) {
                rateElement.textContent = `💵 ${rate.currency}: ${randomRate} BDT`;
            }
        });
    }

    // Update exchange rates every 30 seconds
    setInterval(updateExchangeRates, 30000);

    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Toggle current question
            this.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });

    // Handle initial state (if we want some sections open by default)
    // Uncomment below to have the first FAQ open by default
    /*
    if (faqQuestions.length > 0) {
        faqQuestions[0].classList.add('active');
        faqQuestions[0].nextElementSibling.classList.add('active');
    }
    */
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
}); 

// Copy bonus code functionality
document.addEventListener('DOMContentLoaded', function() {
    const copyButtons = document.querySelectorAll('.copy-code');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the closest bonus-code container
            const codeContainer = this.closest('.bonus-code');
            
            // Get the code value from the container
            const codeValue = codeContainer.querySelector('.code-value').textContent.trim();
            
            // Create a temporary textarea element to copy the text
            const textarea = document.createElement('textarea');
            textarea.value = codeValue;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            
            // Select and copy the text
            textarea.select();
            document.execCommand('copy');
            
            // Remove the temporary textarea
            document.body.removeChild(textarea);
            
            // Visual feedback that the code was copied
            const originalIcon = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i>';
            
            // Reset the button after a short delay
            setTimeout(() => {
                this.innerHTML = originalIcon;
            }, 2000);
        });
    });
});
