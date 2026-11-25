// Builds the "+" page gallery from img/more/1.jpeg ... img/more/<GALLERY_SIZE>.jpeg
(function () {
    'use strict';

    var GALLERY_SIZE = 59;
    var EAGER_IMAGES = 2; // the rest load as they scroll into view
    var SIZES = '(min-width: 992px) 58vw, (min-width: 768px) 83vw, 100vw';

    document.addEventListener('DOMContentLoaded', function () {
        var gallery = document.getElementById('more-gallery');

        for (var i = 1; i <= GALLERY_SIZE; i++) {
            var image = document.createElement('img');
            image.className = 'img-fluid my-4 mx-auto';
            image.alt = 'Production design by Anthony Gasparro, photograph ' + i;
            image.decoding = 'async';
            if (i > EAGER_IMAGES) {
                image.loading = 'lazy';
            }
            window.Site.setImage(image, 'img/more/' + i + '.jpeg', SIZES);
            gallery.appendChild(image);
        }
    });
})();
