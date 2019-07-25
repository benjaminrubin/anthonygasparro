var counter;

// Array containing info on all commercials:

var commercials = [
    {
        title: "Geico",
        subtitle: "dir. Hank Perlman",
        thumbnailUrl: "thumb_1.png",
        videoUrl: "https://player.vimeo.com/video/328484283?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    },
    {
        title: "Samsung",
        subtitle: "dir. Brian Beletic",
        thumbnailUrl: "thumb_2.png",
        videoUrl: "https://player.vimeo.com/video/334341942?title=0&byline=0&portrait=0",
        padding: "56.34% 0 0 0",
    },
    {
        title: "Time Warner Cable",
        subtitle: "dir. Steve Miller",
        thumbnailUrl: "thumb_3.png",
        videoUrl: "https://player.vimeo.com/video/192165706?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    },
    {
        title: "Lexus",
        subtitle: "dir. Stacy Wall",
        thumbnailUrl: "thumb_4.png",
        videoUrl: "https://player.vimeo.com/video/104029902?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    },
    {
        title: "Geico",
        subtitle: "dir. Hank Perlman",
        thumbnailUrl: "thumb_5.png",
        videoUrl: "https://player.vimeo.com/video/266609122?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    },
    {
        title: "Allstate",
        subtitle: "dir. Stacy Wall",
        thumbnailUrl: "thumb_6.png",
        videoUrl: "https://player.vimeo.com/video/125599908?title=0&byline=0&portrait=0",
        padding: "75% 0 0 0",
    },
    {
        title: "NBA2K",
        subtitle: "dir. Stacy Wall",
        thumbnailUrl: "thumb_7.png",
        videoUrl: "https://player.vimeo.com/video/276988057?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    },
    {
        title: "Ikea",
        subtitle: "dir. Phil Morrison",
        thumbnailUrl: "thumb_8.png",
        videoUrl: "https://player.vimeo.com/video/151716966?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    },
    {
        title: "T-mobile",
        subtitle: "dir. Stacy Wall",
        thumbnailUrl: "thumb_9.png",
        videoUrl: "https://player.vimeo.com/video/119568146?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    },
    {
        title: "Amazon",
        subtitle: "dir. Randy Krallman",
        thumbnailUrl: "thumb_10.png",
        videoUrl: "https://player.vimeo.com/video/155679415?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    },
    {
        title: "Chase",
        subtitle: "dir. Brian Beletic",
        thumbnailUrl: "thumb_11.png",
        videoUrl: "https://player.vimeo.com/video/125756771?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    },
    {
        title: "Verizon Fios",
        subtitle: "dir. Kevin Thomas",
        thumbnailUrl: "thumb_12.png",
        videoUrl: "https://player.vimeo.com/video/217038871?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    },
    {
        title: "Verizon Fios",
        subtitle: "dir. David Gray",
        thumbnailUrl: "thumb_13.png",
        videoUrl: "https://player.vimeo.com/video/187477094?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    },
    {
        title: "Espn",
        subtitle: "dir. Stacy Wall",
        thumbnailUrl: "thumb_14.png",
        videoUrl: "https://player.vimeo.com/video/117670621?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    },
    {
        title: "Tide",
        subtitle: "dir. Matt Smuckler",
        thumbnailUrl: "thumb_15.png",
        videoUrl: "https://player.vimeo.com/video/125708809?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    },
    {
        title: "Adidas",
        subtitle: "dir. Stacy Wall",
        thumbnailUrl: "thumb_16.png",
        videoUrl: "https://player.vimeo.com/video/125717536?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    },
    {
        title: "Audi",
        subtitle: "dir. Stacy Wall",
        thumbnailUrl: "thumb_17.png",
        videoUrl: "https://player.vimeo.com/video/117690334?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    },
    {
        title: "Air Jordan",
        subtitle: "dir. Stacy Wall",
        thumbnailUrl: "thumb_18.png",
        videoUrl: "https://player.vimeo.com/video/117690335?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    },
    {
        title: "MasterCard",
        subtitle: "dir. Jun Diaz",
        thumbnailUrl: "thumb_19.png",
        videoUrl: "https://player.vimeo.com/video/187990149?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    },
    {
        title: "Sony",
        subtitle: "dir. Stacy Wall",
        thumbnailUrl: "thumb_20.png",
        videoUrl: "https://player.vimeo.com/video/125598930?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    },
    {
        title: "Nike China",
        subtitle: "dir. Stacy Wall",
        thumbnailUrl: "thumb_21.png",
        videoUrl: "https://player.vimeo.com/video/125701890?title=0&byline=0&portrait=0",
        padding: "56.25% 0 0 0",
    }];




var i = 0;



$(document).ready(function () {

    // Populate the page with thumbnail cards of all the videos


    for(i in commercials) {
        // console.log(item);

        var thumbnailCard = document.createElement("div");
        let thumbClasses = [ 'col-sm-12', 'col-md-6', 'col-lg-4', 'thumbnail-card'];

        thumbnailCard.classList.add(...thumbClasses);

        var card = document.createElement("div");
        let cardClasses = ['card', 'mb-4', 'shadow-sm']
        card.classList.add(...cardClasses);
        card.id = i;

        var image = document.createElement("img");
        let imageClasses = ['bd-placeholder-img', 'card-img-top'];
        image.classList.add(...imageClasses);
        image.src = "img/video_thumbnails/" + commercials[i].thumbnailUrl;
        image.alt = "thumbnail " + i;

        var cardBody = document.createElement("div");
        cardBodyClasses = ['card-body', 'p-0', 'py-1'];
        cardBody.classList.add(...cardBodyClasses);

        var paragraph = document.createElement("p");
        let parClasses = ['card-text', 'text-center', 'mb-2', 'mt-1'];
        paragraph.classList.add(...parClasses);
        paragraph.innerHTML = commercials[i].title + "<br/>" + commercials[i].subtitle;


        cardBody.appendChild(paragraph);    
        card.appendChild(image);
        card.appendChild(cardBody);
        thumbnailCard.appendChild(card);
        document.getElementById("video-gallery").appendChild(thumbnailCard);
        i++;
    }








    // Update video player to contain information relevant to thumbnail clicked

    function updatePlayer() {

        // Replace vimeo link in iframe
        $("#iframe").attr("src", commercials[counter].videoUrl);

        // Replace director name
        $("#project-subtitle").html(commercials[counter].subtitle);

        // Replace project title
        $("#project-title").html(commercials[counter].title);

        // Update the padding of the player
        $(".iframe-container").attr("padding", commercials[counter].padding);

    }

    // Disable previous button or next button when at the edges of the commercials array

    function updatePlayerButtons() {

        // If counter is set below or equal to zero
        if (counter == 0) {
            // Disable previous button
            $("#btn-prev").prop('disabled', true);
        }

        // If counter is equal to the size of commercials array
        else if (counter == commercials.length - 1) {
            $("#btn-next").prop('disabled', true);
        }

        // Enable all buttons
        else {
            $("#btn-prev").prop('disabled', false);
            $("#btn-next").prop('disabled', false);
        }
    }

    // Click on thumbnail
    $(".card").click(function () {

        counter = $(this).get(0).id;
        console.log("Counter is " + counter);
        console.log(commercials[counter]);

        // Populate player with relevant information
        updatePlayer();

        // Update the display of the buttons
        updatePlayerButtons();

        // Fade in the gallery if not displayed
        if ($("#gallery-player-container").css('display') == "none") {
            $("#gallery-player-container").fadeIn(320);
        }

        // Jump to the top of the page
        $('html, body').animate({
            scrollTop: $("#gallery-player-container").offset().top - 20
        }, -200);

    });


    // Click on previous button
    $("#btn-prev").click(function () {
        if (counter <= 0) {
            counter = 0;
            //disable previous button
            $("#btn-prev").prop('disabled', true);

        } else {
            counter--;
            $("#btn-next").prop('disabled', false);
            updatePlayer();
        }

        updatePlayerButtons();

    });

    // Click on next button
    $("#btn-next").click(function () {
        if (counter >= commercials.length - 1) {
            counter = commercials.length - 1;
            $("#btn-next").prop('disabled', true);
        }
        else {
            counter++;
            $("#btn-prev").prop('disabled', false);
            updatePlayer();
        }

        updatePlayerButtons();
    });

    // Clicking on close button will close the video player
    $("#btn-close").click(function () {
        $("#gallery-player-container").fadeOut(320);
    });


});


