/**
 * Imagin'Art Suite — Showcase Website Scripts
 * Smooth UX, Interactive Tabs, Video Handling, FAQ Accordion & Clipboard helpers
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Outils & Fonctionnalités — Filtres d'onglets
    const tabButtons = document.querySelectorAll('.tab-btn');
    const toolCards = document.querySelectorAll('.tool-card');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            toolCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 2. Guide d'Installation — Sélecteur d'OS (Windows / Mac)
    const installTabs = document.querySelectorAll('.install-tab-btn');
    const installPanels = document.querySelectorAll('.install-tab-content');

    installTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            installTabs.forEach(t => t.classList.remove('active'));
            installPanels.forEach(p => p.style.display = 'none');

            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.style.display = 'block';
            }
        });
    });

    // 3. FAQ Accordéon
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Fermer tous les autres pour une lecture propre
            faqItems.forEach(other => other.classList.remove('open'));
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // 4. Démo Vidéo Interactive (Play / Pause / Placeholder)
    const videoPlaceholder = document.getElementById('video-placeholder-box');
    const videoElement = document.getElementById('demo-video-player');
    const playBtn = document.getElementById('play-demo-btn');

    if (playBtn && videoElement && videoPlaceholder) {
        playBtn.addEventListener('click', () => {
            videoPlaceholder.style.display = 'none';
            videoElement.style.display = 'block';
            videoElement.play().catch(() => {
                showToast('Ajoutez votre fichier vidéo dans le dossier assets/ !');
            });
        });
    }

    // 5. Copie dans le presse-papier avec Toast
    const copyButtons = document.querySelectorAll('.copy-btn');
    const toast = document.getElementById('toast-notification');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast('Copié dans le presse-papier !');
                }).catch(() => {
                    showToast('Erreur lors de la copie');
                });
            }
        });
    });

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 6. Navigation fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
