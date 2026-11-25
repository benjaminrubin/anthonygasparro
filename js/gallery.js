// Thumbnail grid + player for the Films, Commercials and Set Stills pages.
//
// The page loads one data file before this script:
//   films.js / commercials.js  ->  `films` / `commercials` and `contentType`  (video pages)
//   stills.js                  ->  `contentArray`                             (stills page)
(function () {
    'use strict';

    var isVideo = typeof contentType !== 'undefined';
    var items = isVideo ? (contentType === 'films' ? films : commercials) : contentArray;

    var THUMBNAIL_SIZES = '(min-width: 1200px) 350px, (min-width: 992px) 290px, (min-width: 768px) 330px, 100vw';
    var STILL_SIZES = '(min-width: 1000px) 1000px, 100vw';
    var EAGER_THUMBNAILS = 6; // the rest load as they scroll into view

    function thumbnailPath(item, key) {
        return isVideo ? 'img/video_thumbnails/' + item[key] : item[key];
    }

    function plainText(html) {
        var el = document.createElement('div');
        el.innerHTML = html;
        return el.textContent.replace(/\s+/g, ' ').trim();
    }

    document.addEventListener('DOMContentLoaded', function () {
        var gallery = document.getElementById(isVideo ? 'video-gallery' : 'stills-gallery');
        var playerContainer = document.getElementById('gallery-player-container');
        if (!gallery || !playerContainer) {
            return;
        }

        var setImage = window.Site.setImage;
        var fade = window.Site.fade;

        // Populate the page with a thumbnail card for every item
        items.forEach(function (item, i) {
            var thumbnailCard = document.createElement('div');
            thumbnailCard.className = 'col-sm-12 col-md-6 col-lg-4 thumbnail-card';

            var card = document.createElement('div');
            card.className = 'card mb-4';
            card.id = i;
            card.tabIndex = 0;
            card.setAttribute('role', 'button');

            var label = plainText(item.title) + (item.subtitle ? ', ' + plainText(item.subtitle) : '');

            var image = document.createElement('img');
            image.className = 'bd-placeholder-img card-img-top';
            image.alt = label + (isVideo ? '' : ' set still');
            image.decoding = 'async';
            if (i >= EAGER_THUMBNAILS) {
                image.loading = 'lazy';
            } else if (i < 3) {
                image.fetchPriority = 'high';
            }
            setImage(image, thumbnailPath(item, 'thumbnailUrl'), THUMBNAIL_SIZES);

            // Swap to the second thumbnail on hover, if there is one
            if (item.secondThumbnailUrl) {
                image.addEventListener('mouseenter', function () {
                    setImage(image, thumbnailPath(item, 'secondThumbnailUrl'), THUMBNAIL_SIZES);
                });
                image.addEventListener('mouseleave', function () {
                    setImage(image, thumbnailPath(item, 'thumbnailUrl'), THUMBNAIL_SIZES);
                });
            }

            var cardBody = document.createElement('div');
            cardBody.className = 'card-body p-0 py-1';

            var paragraph = document.createElement('p');
            paragraph.className = 'card-text text-center mb-2 mt-1';
            paragraph.innerHTML = isVideo ? item.title + '<br/>' + item.subtitle : item.title;

            cardBody.appendChild(paragraph);
            card.appendChild(image);
            card.appendChild(cardBody);
            thumbnailCard.appendChild(card);
            gallery.appendChild(thumbnailCard);
        });

        var iframe = document.getElementById('iframe');
        var mainImage = document.getElementById('main-image');
        var projectTitle = document.getElementById('project-title');
        var projectSubtitle = document.getElementById('project-subtitle');
        var btnPrev = document.getElementById('btn-prev');
        var btnNext = document.getElementById('btn-next');
        var btnPrevMobile = document.getElementById('btn-prev-mobile');
        var btnNextMobile = document.getElementById('btn-next-mobile');
        var btnClose = document.getElementById('btn-close');
        var btnCloseMobile = document.getElementById('btn-close-mobile');

        // Index of the item shown in the player. NOTE: after a thumbnail click this is
        // the card's id as a *string* (as in the original jQuery version), so the
        // `=== 0` / `=== last` checks below only match once an arrow has been used.
        // That keeps the arrows' behaviour exactly as it was; see README "Known quirks".
        var counter;

        function setDisabled(buttons, disabled) {
            buttons.forEach(function (button) {
                button.classList.toggle('player-btn-disabled', disabled);
            });
        }

        // Fill the player with the item at `counter`
        function updatePlayer() {
            var item = items[counter];
            projectTitle.innerHTML = item.title;
            if (isVideo) {
                iframe.setAttribute('src', item.videoUrl);
                iframe.title = plainText(item.title);
                projectSubtitle.innerHTML = item.subtitle;
            } else {
                mainImage.alt = plainText(item.title) + ' set still';
                setImage(mainImage, item.imageUrl, STILL_SIZES);
            }
        }

        // Hide the previous / next arrows at the ends of the list
        function updatePlayerButtons() {
            var last = items.length - 1;
            if (isVideo) {
                if (counter === 0) {
                    setDisabled([btnPrev], true);
                    setDisabled([btnNext], items.length === 1);
                } else if (counter === last) {
                    setDisabled([btnNext], true);
                    setDisabled([btnPrev], false);
                } else {
                    setDisabled([btnPrev, btnNext], false);
                }
            } else {
                if (counter === 0) {
                    setDisabled([btnPrev, btnPrevMobile], true);
                    if (items.length === 1) {
                        setDisabled([btnNext, btnNextMobile], true);
                    }
                } else if (counter === last) {
                    setDisabled([btnNext, btnNextMobile], true);
                } else {
                    setDisabled([btnPrev, btnNext, btnPrevMobile, btnNextMobile], false);
                }
            }
        }

        function open(card) {
            counter = card.id;
            updatePlayer();
            updatePlayerButtons();
            fade(playerContainer, true, 320);
            // Jump to the player
            window.scrollTo(0, playerContainer.getBoundingClientRect().top + window.pageYOffset - 20);
        }

        function previous() {
            if (counter <= 0) {
                counter = 0;
            } else {
                counter--;
                updatePlayer();
            }
            updatePlayerButtons();
        }

        function next() {
            if (counter >= items.length - 1) {
                counter = items.length - 1;
            } else {
                counter++;
                updatePlayer();
            }
            updatePlayerButtons();
        }

        function close() {
            fade(playerContainer, false, 320);
            if (isVideo) {
                // Remove the Vimeo link so the video stops playing
                iframe.setAttribute('src', '');
            }
        }

        // Run `handler` on click, and on Enter / Space for keyboard users
        function activate(el, handler) {
            el.addEventListener('click', handler);
            el.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handler.call(el, e);
                }
            });
        }

        Array.prototype.forEach.call(gallery.querySelectorAll('.card'), function (card) {
            activate(card, function () { open(card); });
        });
        [btnPrev, btnPrevMobile].forEach(function (button) { activate(button, previous); });
        [btnNext, btnNextMobile].forEach(function (button) { activate(button, next); });
        [btnClose, btnCloseMobile].forEach(function (button) { activate(button, close); });
    });
})();
