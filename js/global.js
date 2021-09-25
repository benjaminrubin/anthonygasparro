var $homelinks = $(".home-link");

$(document).ready(function () {

    // Mobile Menu related

    $(".menu-toggle").click(function (e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
        $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
        $(this).toggleClass("active");
    });


    // Homepage link hover effect

    // $homelinks.mouseover(function(e) {
    //     $homelinks.not(this).addClass('home-link-faded');
    //     $(this).removeClass('home-link-faded');
    // });

    // $homelinks.mouseleave(function(e) {
    //     $homelinks.removeClass('home-link-faded');
    // });





    $sidebarWrapper = $("#sidebar-wrapper");
    // Hide Nav when page is wider than 
    // removing the navigation backdrop if screen size increases
    $(window).resize(function () {
        if ($(window).width() > 767 && $sidebarWrapper.hasClass("active")) {
            $sidebarWrapper.removeClass("active");
            $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
        }
    });



    // Scroll to top button appear
    $(document).scroll(function () {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 300) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    // Smooth scrolling using jQuery easing
    $('.scroll-to-top').click(function () {
        document.querySelector('#page-top').scrollIntoView({
            behavior: 'smooth'
        });
    });


});