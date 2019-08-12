var $homelinks = $(".home-link");

$(document).ready(function() {

    // Mobile Menu related

    $(".menu-toggle").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
        $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
        $(this).toggleClass("active");
    });


    // Homepage link hover effect


    $homelinks.mouseover(function(e) {

        var $curr = $(this);
        setTimeout(function() {
            $homelinks.not(this).addClass('home-link-faded');
            $curr.removeClass('home-link-faded');
        }, 300);

    });

    $homelinks.mouseleave(function(e) {
        $homelinks.removeClass('home-link-faded');
    });

});