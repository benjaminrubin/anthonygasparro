// Behaviour shared by every page: mobile menu, scroll-to-top button,
// and two small helpers (fade, setImage) used by the gallery scripts.
(function () {
    'use strict';

    // Same curve as jQuery's default "swing" easing
    var SWING = 'cubic-bezier(0.37, 0, 0.63, 1)';

    // Fade an element in or out, like jQuery's fadeIn / fadeOut.
    function fade(el, show, duration) {
        var shown = el._fadeShown;
        if (shown === undefined) {
            shown = getComputedStyle(el).display !== 'none';
        }
        if (shown === show) {
            return;
        }
        el._fadeShown = show;

        var from = show && !el._fadeAnimation ? 0 : parseFloat(getComputedStyle(el).opacity);
        if (el._fadeAnimation) {
            el._fadeAnimation.cancel();
        }
        if (show) {
            el.style.display = 'block';
        }

        var animation = el.animate(
            [{ opacity: from }, { opacity: show ? 1 : 0 }],
            { duration: duration, easing: SWING, fill: 'forwards' }
        );
        el._fadeAnimation = animation;
        animation.onfinish = function () {
            if (!show) {
                el.style.display = 'none';
            }
            el._fadeAnimation = null;
            animation.cancel();
        };
    }

    // Point an <img> at the optimized copy of `path` listed in js/image-manifest.js
    // (see tools/optimize-images.py), or at the original file when it has no entry.
    function setImage(img, path, sizes) {
        var entry = (window.IMAGE_MANIFEST || {})[path];
        if (entry && entry.srcset && sizes) {
            img.sizes = sizes;
            img.srcset = entry.srcset;
        } else {
            img.removeAttribute('srcset');
            img.removeAttribute('sizes');
        }
        if (entry) {
            // Lay the image out exactly as the original file would be: same natural
            // size, same proportions, with its space reserved before it loads.
            img.width = entry.w;
            img.height = entry.h;
            img.style.aspectRatio = entry.w + ' / ' + entry.h;
            img.style.height = 'auto'; // never let the height attribute stretch the image
            img.src = entry.src;
        } else {
            img.removeAttribute('width');
            img.removeAttribute('height');
            img.style.aspectRatio = '';
            img.style.height = '';
            img.src = path;
        }
    }

    window.Site = { fade: fade, setImage: setImage };

    document.addEventListener('DOMContentLoaded', function () {
        var sidebar = document.getElementById('sidebar-wrapper');
        var menuToggle = document.querySelector('.menu-toggle');
        var scrollToTop = document.querySelector('.scroll-to-top');

        function swapMenuIcon() {
            var icon = menuToggle.querySelector('.fa-bars, .fa-times');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        }

        if (sidebar && menuToggle) {
            // Mobile menu toggle
            menuToggle.addEventListener('click', function (e) {
                e.preventDefault();
                var open = sidebar.classList.toggle('active');
                swapMenuIcon();
                menuToggle.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', open);
            });

            // Close the menu when the page becomes wider than 767px
            window.addEventListener('resize', function () {
                if (document.documentElement.clientWidth > 767 && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    swapMenuIcon();
                    menuToggle.setAttribute('aria-expanded', false);
                }
            });
        }

        if (scrollToTop) {
            // Show the button once the page is scrolled down
            window.addEventListener('scroll', function () {
                fade(scrollToTop, window.pageYOffset > 300, 400);
            }, { passive: true });

            var backToTop = function () {
                var top = document.getElementById('page-top');
                if (top) {
                    top.scrollIntoView({ behavior: 'smooth' });
                }
            };
            scrollToTop.addEventListener('click', backToTop);
            scrollToTop.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    backToTop();
                }
            });
        }
    });
})();
