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
        $homelinks.not(this).addClass('home-link-faded');
        $(this).removeClass('home-link-faded');
    });

    $homelinks.mouseleave(function(e) {
        $homelinks.removeClass('home-link-faded');
    });

});