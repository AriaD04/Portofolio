// Article Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Project data
    const projectData = {
        'cashier-website': {
            title: 'Cashier Website',
            category: 'Web Design',
            date: '2024',
            duration: '3 weeks',
            client: 'Dosen Berta Erwin Slam',
            role: 'Full Stack Developer',
            timeline: '3 weeks',
            status: 'Completed',
            description: 'A comprehensive point-of-sale system designed for small to medium businesses. This web application features inventory management, sales tracking, customer management, and detailed reporting capabilities. The system was built with a focus on user experience and efficiency.',
            technologies: ['Html', 'Css', 'Code Igniter', 'Php', 'MySQL',],
            challenges: 'The main challenge was creating an intuitive interface that could handle complex inventory operations while remaining simple enough for non-technical users. We solved this by implementing a clean, card-based design with clear visual hierarchies.',
            results: 'This final Web Programming assignment was successfully transformed into a web application that functions well. Its main achievement is a full-stack implementation that combines server-side (back-end) logic and client-side (front-end) interfaces to create interactive features and effective data management.',
            images: [
                {
                    src: 'images/Cashier Website.jpg',
                    caption: 'Main dashboard showing sales overview and quick actions'
                },
                {
                    src: 'images/Cashier Website1.jpeg',
                    caption: 'Profile management interface'
                },
            ]
        },
        'mobile-news-app': {
            title: 'Mobile News App',
            category: 'Mobile App Design',
            date: '2024',
            duration: '4 weeks',
            client: 'Dosen Hendra Kurniawan',
            role: 'UI/UX Designer',
            timeline: '4 weeks',
            status: 'Completed',
            description: 'A modern news application designed for mobile devices with a focus on readability and user engagement. The app features personalized news feeds, offline reading capabilities.',
            technologies: ['Flutter', 'Firebase'],
            challenges: 'To overcome performance challenges in image-rich responsive designs, we implemented lazy loading and asset compression optimization to keep the website fast.',
            results: 'Successfully implemented an automated news system that displays dynamic content to users. By utilizing external APIs, this application ensures a constant flow of updated news without requiring intervention and maintenance from the admin side, while successfully fulfilling the project objectives of the Mobile Device Programming task.',
            images: [
                {
                    src: 'images/Mobile News App.jpeg',
                    caption: 'Home screen for Tourism news feed'
                },
                {
                    src: 'images/Mobile News App1.jpeg',
                    caption: 'Home screen for Science news feed'
                },
            ]
        },
        'brand-logo': {
            title: 'Brand Logo Design',
            category: 'Branding',
            date: '2024',
            duration: '2 weeks',
            client: 'Dosen Nola Ritha, S.T., M.Cs',
            role: 'Designer',
            timeline: '2 weeks',
            status: 'Completed',
            description: 'A complete brand identity design for a maritime shipping company. The project included logo design, color palette, typography selection, and brand guidelines to ensure consistent application across all touchpoints.',
            technologies: ['Figma', 'Html', 'Css'],
            challenges: 'Creating a logo that represents both tradition and innovation in the shipping industry while being scalable across various media. We solved this by using clean geometric shapes with maritime elements.',
            results: 'This project was successfully completed as a fulfillment of the final assignment for the Software Project Management course. All project targets and required documentation have been achieved and submitted in accordance with the assessment criteria.',
            images: [
                {
                    src: 'images/brand kapal.jpeg',
                    caption: 'Final logo design with variations'
                },
                {
                    src: 'images/brand kapal1.png',
                    caption: 'Home Screen for the website'
                },
            ]
        },
        'brand-logo': {
            title: 'Brand Logo Design',
            category: 'Branding',
            date: '2024',
            duration: '2 weeks',
            client: 'Dosen Denny Nusyirwan, M.Scs',
            role: 'Designer',
            timeline: '6 weeks',
            status: 'Completed',
            description: 'A collaborative project undertaken by a team of 9 people to design and build Augmented Reality (AR) experiences. This project focuses on Banyan Tree Bintan, with the aim of changing the way information is delivered to be more visual and interactive through AR technology..',
            technologies: ['Figma'],
            challenges: 'The main challenge was producing 16 different Augmented Reality models to display the diverse flora and fauna typical of Banyan Tree Bintan, which required a large amount of detail and high accuracy. To overcome this, the team implemented a structured workflow and performed aggressive 3D model optimization (low-poly) to ensure each asset remained lightweight without losing important visual details..',
            results: 'The peak achievement of this project was its success in winning the Best Technology Category Champion award. This award is validation of the innovation and technical quality of the applications developed. In addition, this project has succeeded in producing 16 functional QR codes connected to AR experiences, and all of them have been handed over to Banyan Tree Bintan.',
            images: [
                {
                    src: 'images/AR.png',
                    caption: 'Final logo design with variations'
                },
                {
                    src: 'images/AR1.jpg',
                    caption: 'Sertifikat for winning best technology category'
                },
            ]
        },
        'restaurant-website': {
            title: 'Restaurant Website',
            category: 'Web Design',
            date: '2024',
            duration: '3 weeks',
            client: 'Dosen Said Thaha Ghafara',
            role: 'Web Designer & Developer',
            timeline: '3 weeks',
            status: 'Completed',
            description: 'An elegant website for a fine dining restaurant featuring online reservations, menu showcase, and event booking system. The design emphasizes the restaurant\'s sophisticated atmosphere while maintaining excellent usability.',
            technologies: ['Html', 'Css'],
            challenges: 'Balancing visual appeal with functionality. We created a custom booking interface that integrates seamlessly with the restaurant\'s existing management system.',
            results: 'This project was successfully completed as the final assignment for the Web Design course. The result is a functional and responsive website design, with an intuitive user interface (UI/UX) in accordance with modern design principles..',
            images: [
                {
                    src: 'images/Restaurant Website.png',
                    caption: 'Homepage with hero section and featured dishes'
                },
                {
                    src: 'images/Restaurant Website1.png',
                    caption: 'Interactive menu with filtering options'
                },
            ]
        }
    };

    // Get project ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project') || 'cashier-website';
    
    // Load project data
    loadProjectData(projectId);
    
    // Initialize lightbox
    initializeLightbox();
    
    // Initialize navigation
    initializeNavigation();

    function loadProjectData(projectId) {
        const project = projectData[projectId];
        if (!project) {
            console.error('Project not found:', projectId);
            return;
        }

        // Update page title
        document.title = `${project.title} - Aria Portfolio`;
        
        // Update breadcrumb
        document.getElementById('project-breadcrumb').textContent = project.title;
        
        // Update hero section
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-date').textContent = project.date;
        document.getElementById('project-category').textContent = project.category;
        document.getElementById('project-duration').textContent = project.duration;
        
        // Update main content
        document.getElementById('project-description').textContent = project.description;
        
        // Update sidebar
        document.getElementById('project-client').textContent = project.client;
        document.getElementById('project-role').textContent = project.role;
        document.getElementById('project-timeline').textContent = project.timeline;
        
        const statusElement = document.getElementById('project-status');
        statusElement.textContent = project.status;
        statusElement.className = project.status === 'Completed' ? 'status-completed' : 'status-in-progress';
        
        // Update technical details
        const techContainer = document.getElementById('project-technologies');
        techContainer.innerHTML = '';
        project.technologies.forEach(tech => {
            const techTag = document.createElement('span');
            techTag.className = 'tech-tag';
            techTag.textContent = tech;
            techContainer.appendChild(techTag);
        });
        
        document.getElementById('project-challenges').textContent = project.challenges;
        document.getElementById('project-results').textContent = project.results;
        
        // Update gallery
        const galleryContainer = document.getElementById('project-gallery');
        galleryContainer.innerHTML = '';
        project.images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.caption}" data-index="${index}">
                <div class="gallery-caption">
                    <p>${image.caption}</p>
                </div>
            `;
            galleryContainer.appendChild(galleryItem);
        });
    }

    function initializeLightbox() {
        // Create lightbox element
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img src="" alt="">
            </div>
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox-close');

        // Add click handlers to gallery images
        document.addEventListener('click', function(e) {
            if (e.target.matches('.gallery-item img')) {
                const imgSrc = e.target.src;
                const imgAlt = e.target.alt;
                
                lightboxImg.src = imgSrc;
                lightboxImg.alt = imgAlt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });

        // Close lightbox
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function initializeNavigation() {
        const projects = Object.keys(projectData);
        const currentProject = urlParams.get('project') || 'cashier-website';
        const currentIndex = projects.indexOf(currentProject);
        
        const prevBtn = document.getElementById('prev-project');
        const nextBtn = document.getElementById('next-project');
        
        // Set up previous project link
        if (currentIndex > 0) {
            const prevProject = projects[currentIndex - 1];
            prevBtn.href = `article.html?project=${prevProject}`;
            prevBtn.style.display = 'flex';
        } else {
            prevBtn.style.display = 'none';
        }
        
        // Set up next project link
        if (currentIndex < projects.length - 1) {
            const nextProject = projects[currentIndex + 1];
            nextBtn.href = `article.html?project=${nextProject}`;
            nextBtn.style.display = 'flex';
        } else {
            nextBtn.style.display = 'none';
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.gallery-item, .detail-item, .project-info-card, .related-projects').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

