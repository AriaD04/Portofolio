// Enhanced Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initializeDashboard();
    
    // Global variables
    let currentEditingId = null;
    let currentEditingType = null;
    
    // Initialize dashboard functionality
    function initializeDashboard() {
        setupNavigation();
        setupProfileManagement();
        setupExperienceManagement();
        setupEducationManagement();
        setupPortfolioManagement();
        setupMessagesManagement();
        setupSettingsManagement();
        setupModals();
        setupToasts();
        setupLogout();
        setupMobileMenu();
        
        // Load initial data
        loadDashboardData();
        
        console.log('🚀 Enhanced Admin Dashboard Initialized');
    }
    
    // Navigation Management
    function setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.admin-section');
        const pageTitle = document.getElementById('page-title');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetSection = this.getAttribute('data-section');
                
                // Update active nav link
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                // Show target section
                sections.forEach(section => section.classList.remove('active'));
                const targetElement = document.getElementById(targetSection);
                if (targetElement) {
                    targetElement.classList.add('active');
                    
                    // Update page title
                    const sectionTitle = this.querySelector('span').textContent;
                    pageTitle.textContent = sectionTitle;
                    
                    // Close mobile menu if open
                    closeMobileMenu();
                }
            });
        });
    }
    
    // Profile Management
    function setupProfileManagement() {
        const profileForm = document.getElementById('profile-form');
        const saveProfileBtn = document.getElementById('save-profile');
        const changePhotoBtn = document.getElementById('change-photo-btn');
        const profileImageInput = document.getElementById('profile-image-input');
        const currentProfilePhoto = document.getElementById('current-profile-photo');
        const sidebarAvatar = document.getElementById('sidebar-avatar');
        
        // Save profile changes
        saveProfileBtn.addEventListener('click', function() {
            const formData = new FormData(profileForm);
            const profileData = {
                greeting: document.getElementById('profile-greeting').value,
                name: document.getElementById('profile-name').value,
                subtitle: document.getElementById('profile-subtitle').value,
                description: document.getElementById('profile-description').value
            };
            
            // Simulate saving to backend
            setTimeout(() => {
                showToast('Profile updated successfully!', 'success');
                updateMainSiteProfile(profileData);
            }, 500);
        });
        
        // Change profile photo
        changePhotoBtn.addEventListener('click', function() {
            profileImageInput.click();
        });
        
        profileImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    showToast('File size must be less than 5MB', 'error');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imageUrl = e.target.result;
                    currentProfilePhoto.src = imageUrl;
                    sidebarAvatar.src = imageUrl;
                    
                    // Update header avatar
                    const headerAvatar = document.querySelector('.header-avatar');
                    if (headerAvatar) {
                        headerAvatar.src = imageUrl;
                    }
                    
                    showToast('Profile photo updated successfully!', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Experience Management
    function setupExperienceManagement() {
        const addExperienceBtn = document.getElementById('add-experience-btn');
        const experienceModal = document.getElementById('experience-modal');
        const experienceForm = document.getElementById('experience-form');
        const experienceList = document.getElementById('experience-list');
        
        addExperienceBtn.addEventListener('click', function() {
            openModal('experience-modal', 'Add New Experience');
            resetForm('experience-form');
            currentEditingId = null;
        });
        
        // Handle form submission
        document.getElementById('experience-save').addEventListener('click', function() {
            const formData = {
                title: document.getElementById('exp-title').value,
                duration: document.getElementById('exp-duration').value,
                description: document.getElementById('exp-description').value
            };
            
            if (!formData.title || !formData.duration) {
                showToast('Please fill in all required fields', 'error');
                return;
            }
            
            if (currentEditingId) {
                updateExperienceItem(currentEditingId, formData);
            } else {
                addExperienceItem(formData);
            }
            
            closeModal('experience-modal');
            showToast('Experience saved successfully!', 'success');
        });
        
        // Handle edit and delete buttons
        experienceList.addEventListener('click', function(e) {
            const button = e.target.closest('.btn-icon');
            if (!button) return;
            
            const experienceItem = button.closest('.experience-item');
            const experienceId = experienceItem.getAttribute('data-id');
            
            if (button.classList.contains('edit-btn')) {
                editExperienceItem(experienceId);
            } else if (button.classList.contains('delete-btn')) {
                confirmDelete('experience', experienceId);
            }
        });
    }
    
    // Education Management
    function setupEducationManagement() {
        const addEducationBtn = document.getElementById('add-education-btn');
        const educationModal = document.getElementById('education-modal');
        const educationForm = document.getElementById('education-form');
        const educationList = document.getElementById('education-list');
        
        addEducationBtn.addEventListener('click', function() {
            openModal('education-modal', 'Add New Education');
            resetForm('education-form');
            currentEditingId = null;
        });
        
        // Handle form submission
        document.getElementById('education-save').addEventListener('click', function() {
            const formData = {
                degree: document.getElementById('edu-degree').value,
                duration: document.getElementById('edu-duration').value,
                description: document.getElementById('edu-description').value
            };
            
            if (!formData.degree || !formData.duration) {
                showToast('Please fill in all required fields', 'error');
                return;
            }
            
            if (currentEditingId) {
                updateEducationItem(currentEditingId, formData);
            } else {
                addEducationItem(formData);
            }
            
            closeModal('education-modal');
            showToast('Education saved successfully!', 'success');
        });
        
        // Handle edit and delete buttons
        educationList.addEventListener('click', function(e) {
            const button = e.target.closest('.btn-icon');
            if (!button) return;
            
            const educationItem = button.closest('.education-item');
            const educationId = educationItem.getAttribute('data-id');
            
            if (button.classList.contains('edit-btn')) {
                editEducationItem(educationId);
            } else if (button.classList.contains('delete-btn')) {
                confirmDelete('education', educationId);
            }
        });
    }
    
    // Portfolio Management
    function setupPortfolioManagement() {
        const addPortfolioBtn = document.getElementById('add-portfolio-btn');
        const portfolioModal = document.getElementById('portfolio-modal');
        const portfolioForm = document.getElementById('portfolio-form');
        const portfolioGrid = document.getElementById('portfolio-grid');
        const portfolioImageInput = document.getElementById('portfolio-image');
        const portfolioImagePreview = document.getElementById('portfolio-image-preview');
        
        addPortfolioBtn.addEventListener('click', function() {
            openModal('portfolio-modal', 'Add New Project');
            resetForm('portfolio-form');
            portfolioImagePreview.innerHTML = '<p>No image selected</p>';
            currentEditingId = null;
        });
        
        // Handle image preview
        portfolioImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    portfolioImagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Handle form submission
        document.getElementById('portfolio-save').addEventListener('click', function() {
            const formData = {
                title: document.getElementById('portfolio-title').value,
                category: document.getElementById('portfolio-category').value,
                description: document.getElementById('portfolio-description').value,
                link: document.getElementById('portfolio-link').value
            };
            
            if (!formData.title || !formData.category) {
                showToast('Please fill in all required fields', 'error');
                return;
            }
            
            if (currentEditingId) {
                updatePortfolioItem(currentEditingId, formData);
            } else {
                addPortfolioItem(formData);
            }
            
            closeModal('portfolio-modal');
            showToast('Project saved successfully!', 'success');
        });
        
        // Handle edit and delete buttons
        portfolioGrid.addEventListener('click', function(e) {
            const button = e.target.closest('.btn-icon');
            if (!button) return;
            
            const portfolioItem = button.closest('.portfolio-item');
            const portfolioId = portfolioItem.getAttribute('data-id');
            
            if (button.classList.contains('edit-btn')) {
                editPortfolioItem(portfolioId);
            } else if (button.classList.contains('delete-btn')) {
                confirmDelete('portfolio', portfolioId);
            }
        });
    }
    
    // Messages Management
    function setupMessagesManagement() {
        const messagesList = document.getElementById('messages-list');
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        // Filter messages
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                filterMessages(filter);
            });
        });
        
        // Handle message actions
        messagesList.addEventListener('click', function(e) {
            const button = e.target.closest('.btn-icon');
            if (!button) return;
            
            const messageItem = button.closest('.message-item');
            const messageId = messageItem.getAttribute('data-id');
            
            if (button.classList.contains('mark-read-btn')) {
                markMessageAsRead(messageId);
            } else if (button.classList.contains('delete-btn')) {
                confirmDelete('message', messageId);
            }
        });
    }
    
    // Settings Management
    function setupSettingsManagement() {
        const settingsForm = document.getElementById('settings-form');
        const websiteSettingsForm = document.getElementById('website-settings-form');
        
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (newPassword && newPassword !== confirmPassword) {
                showToast('New passwords do not match', 'error');
                return;
            }
            
            // Simulate saving settings
            setTimeout(() => {
                showToast('Settings updated successfully!', 'success');
                // Clear password fields
                document.getElementById('current-password').value = '';
                document.getElementById('new-password').value = '';
                document.getElementById('confirm-password').value = '';
            }, 500);
        });
        
        websiteSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate saving website settings
            setTimeout(() => {
                showToast('Website settings updated successfully!', 'success');
            }, 500);
        });
    }
    
    // Modal Management
    function setupModals() {
        const modals = document.querySelectorAll('.modal');
        
        modals.forEach(modal => {
            const closeBtn = modal.querySelector('.modal-close');
            const cancelBtn = modal.querySelector('.btn-secondary');
            
            // Close modal on close button click
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    closeModal(modal.id);
                });
            }
            
            // Close modal on cancel button click
            if (cancelBtn) {
                cancelBtn.addEventListener('click', function() {
                    closeModal(modal.id);
                });
            }
            
            // Close modal on backdrop click
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal(modal.id);
                }
            });
        });
    }
    
    // Toast Management
    function setupToasts() {
        const toasts = document.querySelectorAll('.toast');
        
        toasts.forEach(toast => {
            const closeBtn = toast.querySelector('.toast-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    hideToast(toast);
                });
            }
        });
    }
    
    // Logout Functionality
    function setupLogout() {
        const logoutBtn = document.getElementById('logout-btn');
        const headerLogout = document.getElementById('header-logout');
        
        [logoutBtn, headerLogout].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    confirmLogout();
                });
            }
        });
    }
    
    // Mobile Menu
    function setupMobileMenu() {
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', function() {
                sidebar.classList.toggle('active');
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }
    
    // Utility Functions
    function openModal(modalId, title = '') {
        const modal = document.getElementById(modalId);
        const modalTitle = modal.querySelector('.modal-header h3');
        
        if (title && modalTitle) {
            modalTitle.textContent = title;
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function resetForm(formId) {
        const form = document.getElementById(formId);
        form.reset();
        currentEditingId = null;
    }
    
    function showToast(message, type = 'success') {
        const toast = document.getElementById(`${type}-toast`);
        const messageElement = toast.querySelector('.toast-message');
        
        messageElement.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            hideToast(toast);
        }, 4000);
    }
    
    function hideToast(toast) {
        toast.classList.remove('show');
    }
    
    function closeMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('active');
    }
    
    // CRUD Operations
    function addExperienceItem(data) {
        const experienceList = document.getElementById('experience-list');
        const newId = Date.now().toString();
        
        const experienceHTML = `
            <div class="experience-item" data-id="${newId}">
                <div class="item-content">
                    <div class="item-header">
                        <h4>${data.title}</h4>
                        <div class="item-actions">
                            <button class="btn-icon edit-btn" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon delete-btn" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <p class="item-duration">${data.duration}</p>
                    <p class="item-description">${data.description}</p>
                </div>
            </div>
        `;
        
        experienceList.insertAdjacentHTML('beforeend', experienceHTML);
    }
    
    function editExperienceItem(id) {
        const experienceItem = document.querySelector(`[data-id="${id}"]`);
        const title = experienceItem.querySelector('h4').textContent;
        const duration = experienceItem.querySelector('.item-duration').textContent;
        const description = experienceItem.querySelector('.item-description').textContent;
        
        document.getElementById('exp-title').value = title;
        document.getElementById('exp-duration').value = duration;
        document.getElementById('exp-description').value = description;
        
        currentEditingId = id;
        openModal('experience-modal', 'Edit Experience');
    }
    
    function updateExperienceItem(id, data) {
        const experienceItem = document.querySelector(`[data-id="${id}"]`);
        experienceItem.querySelector('h4').textContent = data.title;
        experienceItem.querySelector('.item-duration').textContent = data.duration;
        experienceItem.querySelector('.item-description').textContent = data.description;
    }
    
    function addEducationItem(data) {
        const educationList = document.getElementById('education-list');
        const newId = Date.now().toString();
        
        const educationHTML = `
            <div class="education-item" data-id="${newId}">
                <div class="item-content">
                    <div class="item-header">
                        <h4>${data.degree}</h4>
                        <div class="item-actions">
                            <button class="btn-icon edit-btn" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon delete-btn" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <p class="item-duration">${data.duration}</p>
                    <p class="item-description">${data.description}</p>
                </div>
            </div>
        `;
        
        educationList.insertAdjacentHTML('beforeend', educationHTML);
    }
    
    function editEducationItem(id) {
        const educationItem = document.querySelector(`[data-id="${id}"]`);
        const degree = educationItem.querySelector('h4').textContent;
        const duration = educationItem.querySelector('.item-duration').textContent;
        const description = educationItem.querySelector('.item-description').textContent;
        
        document.getElementById('edu-degree').value = degree;
        document.getElementById('edu-duration').value = duration;
        document.getElementById('edu-description').value = description;
        
        currentEditingId = id;
        openModal('education-modal', 'Edit Education');
    }
    
    function updateEducationItem(id, data) {
        const educationItem = document.querySelector(`[data-id="${id}"]`);
        educationItem.querySelector('h4').textContent = data.degree;
        educationItem.querySelector('.item-duration').textContent = data.duration;
        educationItem.querySelector('.item-description').textContent = data.description;
    }
    
    function addPortfolioItem(data) {
        const portfolioGrid = document.getElementById('portfolio-grid');
        const newId = Date.now().toString();
        
        const portfolioHTML = `
            <div class="portfolio-item" data-id="${newId}">
                <div class="portfolio-image">
                    <img src="images/profile.png" alt="${data.title}">
                    <div class="portfolio-overlay">
                        <div class="portfolio-actions">
                            <button class="btn-icon edit-btn" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon delete-btn" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="portfolio-info">
                    <h4>${data.title}</h4>
                    <p class="portfolio-category">${data.category}</p>
                    ${data.link ? `<a href="${data.link}" class="portfolio-link" target="_blank">View Project</a>` : ''}
                </div>
            </div>
        `;
        
        portfolioGrid.insertAdjacentHTML('beforeend', portfolioHTML);
    }
    
    function editPortfolioItem(id) {
        const portfolioItem = document.querySelector(`[data-id="${id}"]`);
        const title = portfolioItem.querySelector('h4').textContent;
        const category = portfolioItem.querySelector('.portfolio-category').textContent;
        const link = portfolioItem.querySelector('.portfolio-link');
        
        document.getElementById('portfolio-title').value = title;
        document.getElementById('portfolio-category').value = category;
        document.getElementById('portfolio-link').value = link ? link.href : '';
        
        currentEditingId = id;
        openModal('portfolio-modal', 'Edit Project');
    }
    
    function updatePortfolioItem(id, data) {
        const portfolioItem = document.querySelector(`[data-id="${id}"]`);
        portfolioItem.querySelector('h4').textContent = data.title;
        portfolioItem.querySelector('.portfolio-category').textContent = data.category;
        
        const linkElement = portfolioItem.querySelector('.portfolio-link');
        if (data.link) {
            if (linkElement) {
                linkElement.href = data.link;
            } else {
                const portfolioInfo = portfolioItem.querySelector('.portfolio-info');
                portfolioInfo.insertAdjacentHTML('beforeend', `<a href="${data.link}" class="portfolio-link" target="_blank">View Project</a>`);
            }
        } else if (linkElement) {
            linkElement.remove();
        }
    }
    
    function markMessageAsRead(id) {
        const messageItem = document.querySelector(`[data-id="${id}"]`);
        messageItem.classList.remove('unread');
        messageItem.classList.add('read');
        
        const markReadBtn = messageItem.querySelector('.mark-read-btn');
        if (markReadBtn) {
            markReadBtn.remove();
        }
        
        updateMessageCount();
        showToast('Message marked as read', 'success');
    }
    
    function filterMessages(filter) {
        const messages = document.querySelectorAll('.message-item');
        
        messages.forEach(message => {
            if (filter === 'all') {
                message.style.display = 'block';
            } else if (filter === 'unread') {
                message.style.display = message.classList.contains('unread') ? 'block' : 'none';
            } else if (filter === 'read') {
                message.style.display = message.classList.contains('read') ? 'block' : 'none';
            }
        });
    }
    
    function updateMessageCount() {
        const unreadMessages = document.querySelectorAll('.message-item.unread').length;
        const messageCountElement = document.getElementById('message-count');
        
        if (messageCountElement) {
            messageCountElement.textContent = unreadMessages;
            messageCountElement.style.display = unreadMessages > 0 ? 'block' : 'none';
        }
    }
    
    function confirmDelete(type, id) {
        const confirmModal = document.getElementById('confirm-modal');
        const confirmMessage = document.getElementById('confirm-message');
        const confirmOk = document.getElementById('confirm-ok');
        
        confirmMessage.textContent = `Are you sure you want to delete this ${type}?`;
        
        // Remove existing event listeners
        const newConfirmOk = confirmOk.cloneNode(true);
        confirmOk.parentNode.replaceChild(newConfirmOk, confirmOk);
        
        newConfirmOk.addEventListener('click', function() {
            deleteItem(type, id);
            closeModal('confirm-modal');
        });
        
        openModal('confirm-modal');
    }
    
    function deleteItem(type, id) {
        const item = document.querySelector(`[data-id="${id}"]`);
        if (item) {
            item.remove();
            showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`, 'success');
            
            if (type === 'message') {
                updateMessageCount();
            }
        }
    }
    
    function confirmLogout() {
        const confirmModal = document.getElementById('confirm-modal');
        const confirmMessage = document.getElementById('confirm-message');
        const confirmOk = document.getElementById('confirm-ok');
        
        confirmMessage.textContent = 'Are you sure you want to logout?';
        
        // Remove existing event listeners
        const newConfirmOk = confirmOk.cloneNode(true);
        confirmOk.parentNode.replaceChild(newConfirmOk, confirmOk);
        
        newConfirmOk.addEventListener('click', function() {
            performLogout();
        });
        
        openModal('confirm-modal');
    }
    
    function performLogout() {
        // Show loading state
        document.body.classList.add('loading');
        
        // Simulate logout process
        setTimeout(() => {
            // Clear any stored session data
            localStorage.removeItem('adminSession');
            sessionStorage.clear();
            
            // Redirect to login page
            window.location.href = 'admin-login.html';
        }, 1000);
    }
    
    function updateMainSiteProfile(profileData) {
        // This function would typically update the main site's profile data
        // For now, we'll just store it in localStorage
        localStorage.setItem('profileData', JSON.stringify(profileData));
        console.log('Profile data updated:', profileData);
    }
    
    function loadDashboardData() {
        // Load any saved profile data
        const savedProfileData = localStorage.getItem('profileData');
        if (savedProfileData) {
            const profileData = JSON.parse(savedProfileData);
            
            document.getElementById('profile-greeting').value = profileData.greeting || '';
            document.getElementById('profile-name').value = profileData.name || '';
            document.getElementById('profile-subtitle').value = profileData.subtitle || '';
            document.getElementById('profile-description').value = profileData.description || '';
        }
        
        // Update message count
        updateMessageCount();
    }
    
    // Contact Form Email Validation (for main site)
    function setupContactFormValidation() {
        // This function would be used on the main site's contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                const emailInput = this.querySelector('input[type="email"]');
                if (emailInput) {
                    const email = emailInput.value;
                    if (!email.endsWith('@gmail.com')) {
                        e.preventDefault();
                        showToast('Email must be a Gmail address (@gmail.com)', 'error');
                        return false;
                    }
                }
            });
        }
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Escape key to close modals
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
        
        // Ctrl+S to save (prevent default browser save)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            const activeSection = document.querySelector('.admin-section.active');
            if (activeSection) {
                const saveBtn = activeSection.querySelector('.btn-primary');
                if (saveBtn) {
                    saveBtn.click();
                }
            }
        }
    });
    
    // Auto-save functionality (optional)
    function setupAutoSave() {
        const forms = document.querySelectorAll('.admin-form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                input.addEventListener('input', debounce(function() {
                    // Auto-save form data to localStorage
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData);
                    localStorage.setItem(`autosave_${form.id}`, JSON.stringify(data));
                }, 1000));
            });
        });
    }
    
    // Debounce utility function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Initialize auto-save
    setupAutoSave();
    
    // Initialize contact form validation (if on main site)
    setupContactFormValidation();
    
    // Window resize handler
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.remove('active');
        }
    });
    
    // Prevent form submission on Enter key (except in textareas)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.type !== 'submit') {
            const form = e.target.closest('form');
            if (form) {
                e.preventDefault();
            }
        }
    });
    
    console.log('✅ All dashboard features initialized successfully');
});

