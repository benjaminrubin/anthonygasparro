let counter;

$(document).ready(function() {
    // Populate the page with thumbnail cards of all the images
    for (let i = 0; i < contentArray.length; i++) {
        const thumbnailCard = document.createElement('div');
        const thumbClasses = ['col-sm-12', 'col-md-6', 'col-lg-4', 'thumbnail-card'];
        thumbnailCard.classList.add(...thumbClasses);

        const card = document.createElement('div');
        const cardClasses = ['card', 'mb-4', 'shadow-sm'];
        card.classList.add(...cardClasses);
        card.id = i;

        const image = document.createElement('img');
        const imageClasses = ['bd-placeholder-img', 'card-img-top'];
        image.classList.add(...imageClasses);
        image.src = contentArray[i].thumbnailUrl;
        image.alt = `thumbnail ${i}`;

        const cardBody = document.createElement('div');
        const cardBodyClasses = ['card-body', 'p-0', 'py-1'];
        cardBody.classList.add(...cardBodyClasses);

        const paragraph = document.createElement('p');
        const parClasses = ['card-text', 'text-center', 'mb-2', 'mt-1'];
        paragraph.classList.add(...parClasses);
        paragraph.innerHTML = contentArray[i].title;

        cardBody.appendChild(paragraph);
        card.appendChild(image);
        card.appendChild(cardBody);
        thumbnailCard.appendChild(card);
        document.getElementById('stills-gallery').appendChild(thumbnailCard);
    }

    const $projectTitle = $('#project-title');
    const $mainImage = $('#main-image');
    const $btnPrev = $('#btn-prev');
    const $btnNext = $('#btn-next');
    const $btnClose = $('#btn-close');

    // Update gallery player to contain information relevant to thumbnail clicked
    function updatePlayer() {
        $mainImage.attr('src', contentArray[counter].imageUrl);
        $projectTitle.html(contentArray[counter].title);
    }

    // Disable previous button or next button when at the edges of the contentArray array
    function updatePlayerButtons() {
        if (counter === 0) {
            $btnPrev.addClass('player-btn-disabled');
            if (contentArray.length === 1) {
                $btnNext.addClass('player-btn-disabled');
            }
        } else if (counter === contentArray.length - 1) {
            $btnNext.addClass('player-btn-disabled');
        } else {
            $btnPrev.removeClass('player-btn-disabled');
            $btnNext.removeClass('player-btn-disabled');
        }
    }

    // Click on thumbnail
    $('.card').click(function() {
        counter = $(this).get(0).id;
        console.log(`Counter is ${counter}`);
        console.log(contentArray[counter]);

        updatePlayer();
        updatePlayerButtons();

        if ($('#gallery-player-container').css('display') === 'none') {
            $('#gallery-player-container').fadeIn(320);
        }

        $('html, body').animate({
            scrollTop: $('#gallery-player-container').offset().top - 20
        }, -200);
    });

    // Click on previous button
    $btnPrev.click(function() {
        if (counter <= 0) {
            counter = 0;
            $btnPrev.prop('disabled', true);
        } else {
            counter--;
            $btnNext.prop('disabled', false);
            updatePlayer();
        }
        updatePlayerButtons();
    });

    // Click on next button
    $btnNext.click(function() {
        if (counter >= contentArray.length - 1) {
            counter = contentArray.length - 1;
            $btnNext.prop('disabled', true);
        } else {
            counter++;
            $btnPrev.prop('disabled', false);
            updatePlayer();
        }
        updatePlayerButtons();
    });

    // Clicking on close button will close the video player
    $btnClose.click(function() {
        $('#gallery-player-container').fadeOut(320);
    });
});