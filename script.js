document.addEventListener('DOMContentLoaded', function() {
    // === ANIMATION AU DÉFILEMENT ===
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        });
    };

    // Appliquer les classes hidden au chargement
    document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right').forEach(el => {
        el.classList.add('hidden');
    });

    // Écouter le défilement pour animer
    window.addEventListener('scroll', animateOnScroll);
    
    // Déclencher une fois au chargement
    setTimeout(animateOnScroll, 100);

    // === ONGLETS DE PRÉVISUALISATION ===
    const initTabs = () => {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        // Cacher tous les contenus d'onglets sauf le premier
        tabContents.forEach((content, index) => {
            if (index !== 0) {
                content.classList.add('hidden');
            }
        });
        
        // Marquer le premier onglet comme actif
        if (tabButtons.length > 0) {
            tabButtons[0].classList.add('active');
        }
        
        // Ajouter les écouteurs d'événements aux onglets
        tabButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                // Désactiver tous les onglets
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.add('hidden'));
                
                // Activer l'onglet cliqué
                button.classList.add('active');
                if (tabContents[index]) {
                    tabContents[index].classList.remove('hidden');
                }
            });
        });
    };

    // Initialiser les onglets
    initTabs();

    // === FAQ ACCORDION ===
    const initFaq = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            // Ajouter la classe collapsed par défaut
            item.classList.add('collapsed');
            
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Fermer toutes les autres FAQ
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.add('collapsed');
                        otherItem.classList.remove('active');
                    }
                });
                
                // Basculer l'état de l'élément actuel
                item.classList.toggle('collapsed');
                item.classList.toggle('active');
            });
        });
    };

    // Initialiser la FAQ
    initFaq();

    // === COMPTEUR À REBOURS ===
    const initCountdown = () => {
        const countdownElement = document.querySelector('.countdown-timer');
        if (!countdownElement) return;
        
        // Définir la date d'expiration (24 heures à partir de maintenant)
        const now = new Date();
        const expiration = new Date(now.getTime() + 24 *23 *57* 1000);
    
        const updateCountdown = () => {
            const currentTime = new Date();
            const diff = expiration - currentTime;
            
            if (diff <= 0) {
                // Le temps est écoulé
                countdownElement.innerHTML = `
                    <div class="time-unit">
                        <div class="count">0</div>
                        <div class="label">Heures</div>
                    </div>
                    <div class="time-unit">
                        <div class="count">0</div>
                        <div class="label">Minutes</div>
                    </div>
                    <div class="time-unit">
                        <div class="count">0</div>
                        <div class="label">Secondes</div>
                    </div>
                `;
                return;
            }
            
            // Calculer les heures, minutes et secondes
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // Mettre à jour l'affichage
            countdownElement.innerHTML = `
                <div class="time-unit">
                    <div class="count">${hours.toString().padStart(2, '0')}</div>
                    <div class="label">Heures</div>
                </div>
                <div class="time-unit">
                    <div class="count">${minutes.toString().padStart(2, '0')}</div>
                    <div class="label">Minutes</div>
                </div>
                <div class="time-unit">
                    <div class="count">${seconds.toString().padStart(2, '0')}</div>
                    <div class="label">Secondes</div>
                </div>
            `;
        };
        
        // Mettre à jour chaque seconde
        updateCountdown();
        setInterval(updateCountdown, 1000);
    };

    // Initialiser le compteur
    initCountdown();

    // === BOUTON CTA FLOTTANT ===
    const initFloatingCta = () => {
        const floatingCta = document.querySelector('.floating-cta');
        if (!floatingCta) return;
        
        // Afficher le CTA flottant après 3 secondes
        setTimeout(() => {
            floatingCta.style.display = 'block';
        }, 3000);
        
        // Masquer le CTA lorsqu'on atteint le formulaire de commande
        window.addEventListener('scroll', () => {
            const orderSection = document.querySelector('.order-section');
            if (!orderSection) return;
            
            const orderSectionTop = orderSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (orderSectionTop < windowHeight) {
                floatingCta.style.display = 'none';
            } else {
                floatingCta.style.display = 'block';
            }
        });
    };

    // Initialiser le CTA flottant
    initFloatingCta();

    // === NOTIFICATIONS FICTIVES ===
    const initFakeNotifications = () => {
        // Liste de noms fictifs pour les notifications
        const names = [
           'Jean T.',
            'Marie L.',
            'Thomas D.',
            'Sophie B.',
            'Pierre M.',
            'Laura C.',
            'Nicolas P.',
            'Céline R.',
            'Alexandre G.',
            'Émilie V.',
            'Julien S.',
            'Camille F.',
            'David H.',
            'Aurélie K.',
            'François N.'  
        ];
        
        // Liste de villes fictives
        const cities = [
      'bonabéri',
            'douala',
            'yaoundé',
            'bué',
            'Bafoussame',
            'lomé',
            'abidjan',
            'cotonou',  
        ];
        
        // Créer l'élément de notification et l'ajouter au DOM
        const notificationContainer = document.createElement('div');
        notificationContainer.style.cssText = `
            position: fixed;
            left: 20px;
            bottom: 20px;
            max-width: 300px;
            background-color: white;
            border-left: 4px solid var(--primary-color);
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.5s ease;
        `;
        document.body.appendChild(notificationContainer);
        
        // Fonction pour afficher une notification
        const showNotification = () => {
            // Sélectionner un nom et une ville aléatoires
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            
            // Déterminer le type de notification
            const notificationTypes = [
                `<strong>${randomName}</strong> de ${randomCity} vient de télécharger le guide`,
                `<strong>${randomName}</strong> vient d'acheter le guide Premium`,
                `<strong>${randomName}</strong> de ${randomCity} à télécharger son guide et ses bonus`
            ];
            
            const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
            
            // Mettre à jour le contenu de la notification
            notificationContainer.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <div style="width: 40px; height: 40px; background-color: var(--secondary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                        ${randomName.charAt(0)}
                    </div>
                    <div>
                        <p style="margin: 0; font-size: 14px;">${randomNotification}</p>
                        <p style="margin: 0; font-size: 12px; color: var(--text-light);">Il y a quelques instants</p>
                    </div>
                </div>
            `;
            
            // Afficher la notification
            notificationContainer.style.transform = 'translateY(0)';
            notificationContainer.style.opacity = '1';
            
            // Cacher la notification après 5 secondes
            setTimeout(() => {
                notificationContainer.style.transform = 'translateY(100px)';
                notificationContainer.style.opacity = '0';
            }, 5000);
        };
        
        // Afficher la première notification après 5 secondes
        setTimeout(() => {
            showNotification();
            
            // Puis afficher des notifications aléatoires toutes les 30-60 secondes
            setInterval(() => {
                showNotification();
            }, Math.random() * 30000 + 30000); // Entre 30 et 60 secondes
        }, 5000);
    };

    // Initialiser les notifications fictives
    initFakeNotifications();

    // === VALIDATION DU FORMULAIRE ===
    const initFormValidation = () => {
        const paymentForm = document.getElementById('payment-form');
        if (!paymentForm) return;
        
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Exemple simple de validation
            const emailInput = paymentForm.querySelector('input[type="email"]');
            if (emailInput) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    alert('Veuillez entrer une adresse e-mail valide.');
                    return;
                }
            }
            
            // Simuler l'envoi du formulaire
            const submitButton = paymentForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = 'Traitement en cours...';
                
                // Simuler un délai de traitement
                setTimeout(() => {
                    alert('Félicitations ! Votre commande a été traitée avec succès. Vous recevrez un e-mail de confirmation sous peu.');
                    // Rediriger vers une page de remerciement (à modifier selon vos besoins)
                    // window.location.href = 'merci.html';
                }, 2000);
            }
        });
    };

    // Initialiser la validation du formulaire
    initFormValidation();

    // === TÉMOIGNAGES ROTATION ===
    const initTestimonialRotation = () => {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        if (testimonialCards.length <= 1) return;
        
        let currentIndex = 0;
        
        // Fonction pour faire pivoter les témoignages sur mobile
        const rotateTestimonials = () => {
            if (window.innerWidth <= 768) {
                testimonialCards.forEach((card, index) => {
                    if (index === currentIndex) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                currentIndex = (currentIndex + 1) % testimonialCards.length;
            } else {
                // Sur desktop, afficher tous les témoignages
                testimonialCards.forEach(card => {
                    card.style.display = 'block';
                });
            }
        };
        
        // Initialiser l'affichage
        rotateTestimonials();
        
        // Faire pivoter toutes les 5 secondes
        setInterval(rotateTestimonials, 5000);
        
        // Réinitialiser lors du redimensionnement de la fenêtre
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                testimonialCards.forEach(card => {
                    card.style.display = 'block';
                });
            } else {
                rotateTestimonials();
            }
        });
    };

    // Initialiser la rotation des témoignages
    initTestimonialRotation();

    // === STATISTIQUES ANIMATION ===
    const initStatsAnimation = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        if (!statNumbers.length) return;
        
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };
        
        const animateStats = () => {
            statNumbers.forEach(stat => {
                if (isInViewport(stat) && !stat.hasAttribute('data-animated')) {
                    stat.setAttribute('data-animated', 'true');
                    
                    const targetValue = parseInt(stat.textContent, 10);
                    let currentValue = 0;
                    const duration = 2000; // 2 secondes
                    const stepTime = 50; // 50ms par étape
                    const steps = duration / stepTime;
                    const increment = targetValue / steps;
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        
                        if (currentValue >= targetValue) {
                            stat.textContent = targetValue;
                            clearInterval(counter);
                        } else {
                            stat.textContent = Math.floor(currentValue);
                        }
                    }, stepTime);
                }
            });
        };
        
        // Animer au défilement
        window.addEventListener('scroll', animateStats);
        
        // Vérifier une fois au chargement
        setTimeout(animateStats, 500);
    };

    // Initialiser l'animation des statistiques
    initStatsAnimation();

    // === NAVIGATION SMOOTH SCROLL ===
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Calculer la position de défilement
                    const offset = 80; // Offset pour la navigation fixe si nécessaire
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    // Faire défiler en douceur
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Initialiser le défilement en douceur
    initSmoothScroll();

    // === NAVIGATION STICKY ===
    const initStickyNav = () => {
        const navbar = document.querySelector('.nav-bar');
        if (!navbar) return;
        
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        const makeNavSticky = () => {
            const scrollPosition = window.scrollY;
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight - 100;
            
            if (scrollPosition > heroBottom) {
                navbar.classList.add('sticky');
                navbar.style.position = 'fixed';
                navbar.style.top = '0';
                navbar.style.left = '0';
                navbar.style.width = '100%';
                navbar.style.backgroundColor = 'var(--secondary-color)';
                navbar.style.boxShadow = 'var(--box-shadow)';
                navbar.style.padding = '10px 20px';
                navbar.style.zIndex = '1000';
                navbar.style.transition = 'var(--transition)';
                
                // Ajouter un espace en haut du body pour éviter le saut
                document.body.style.paddingTop = navbar.offsetHeight + 'px';
            } else {
                navbar.classList.remove('sticky');
                navbar.style.position = 'relative';
                navbar.style.backgroundColor = 'transparent';
                navbar.style.boxShadow = 'none';
                navbar.style.padding = '10px 0';
                
                // Réinitialiser le padding du body
                document.body.style.paddingTop = '0';
            }
        };
        
        // Vérifier lors du défilement
        window.addEventListener('scroll', makeNavSticky);
        
        // Vérifier une fois au chargement
        makeNavSticky();
    };

    // Initialiser la barre de navigation collante
    initStickyNav();

    // === SÉCURISATION DE LA SECTION DE COMMANDE ===
    const initOrderSecurity = () => {
        const orderForm = document.querySelector('.order-form');
        if (!orderForm) return;
        
        // Ajouter dynamiquement un indicateur de sécurité SSL
        const securityElement = document.createElement('div');
        securityElement.className = 'security-badge';
        securityElement.innerHTML = `
            <div style="display: flex; align-items: center; margin-top: 20px; padding: 10px; background-color: #f8f9fa; border-radius: 5px;">
                <span style="margin-right: 10px; font-size: 20px; color: var(--success-color);">🔒</span>
                <span style="font-size: 14px; color: var(--text-color);">Vos informations sont protégées par un certificat SSL 256-bit</span>
            </div>
        `;
        
        orderForm.appendChild(securityElement);
    };

    // Initialiser la sécurité de commande
    initOrderSecurity();
});
