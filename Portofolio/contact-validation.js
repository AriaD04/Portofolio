// Contact Form Email Validation for Main Site
document.addEventListener('DOMContentLoaded', function() {
    setupContactFormValidation();
    
    function setupContactFormValidation() {
        // Find contact form on the main site
        const contactForm = document.querySelector('#contact form, .contact-form, form[action*="contact"]');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                const emailInput = this.querySelector('input[type="email"], input[name="email"], #email');
                
                if (emailInput) {
                    const email = emailInput.value.trim();
                    
                    // Check if email ends with @gmail.com
                    if (!email.endsWith('@gmail.com')) {
                        e.preventDefault();
                        
                        // Show error message
                        showEmailError(emailInput, 'Email must be a Gmail address (@gmail.com)');
                        return false;
                    } else {
                        // Clear any existing error
                        clearEmailError(emailInput);
                    }
                }
            });
            
            // Real-time validation
            const emailInput = contactForm.querySelector('input[type="email"], input[name="email"], #email');
            if (emailInput) {
                emailInput.addEventListener('blur', function() {
                    const email = this.value.trim();
                    if (email && !email.endsWith('@gmail.com')) {
                        showEmailError(this, 'Email must be a Gmail address (@gmail.com)');
                    } else {
                        clearEmailError(this);
                    }
                });
                
                emailInput.addEventListener('input', function() {
                    const email = this.value.trim();
                    if (email.endsWith('@gmail.com')) {
                        clearEmailError(this);
                    }
                });
            }
        }
    }
    
    function showEmailError(input, message) {
        // Remove existing error
        clearEmailError(input);
        
        // Add error styling
        input.style.borderColor = '#ef4444';
        input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'email-error-message';
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        errorElement.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        
        // Insert error message after input
        input.parentNode.insertBefore(errorElement, input.nextSibling);
        
        // Focus on input
        input.focus();
    }
    
    function clearEmailError(input) {
        // Reset input styling
        input.style.borderColor = '';
        input.style.boxShadow = '';
        
        // Remove error message
        const errorElement = input.parentNode.querySelector('.email-error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // Add CSS for error styling if not already present
    if (!document.querySelector('#contact-validation-styles')) {
        const style = document.createElement('style');
        style.id = 'contact-validation-styles';
        style.textContent = `
            .email-error-message {
                animation: errorSlideIn 0.3s ease-out;
            }
            
            @keyframes errorSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            input[type="email"]:invalid {
                border-color: #ef4444 !important;
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('📧 Contact form email validation initialized');
});

