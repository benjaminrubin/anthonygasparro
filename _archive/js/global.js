const $homelinks = $('.home-link');
const $sidebarWrapper = $('#sidebar-wrapper');

$(document).ready(function() {
    // Mobile Menu Toggle
    $('.menu-toggle').click(function(e) {
        e.preventDefault();
        $sidebarWrapper.toggleClass('active');
        $('.menu-toggle > .fa-bars, .menu-toggle > .fa-times').toggleClass('fa-bars fa-times');
        $(this).toggleClass('active');
    });

    // Hide Nav when page is wider than 767px
    $(window).resize(function() {
        if ($(window).width() > 767 && $sidebarWrapper.hasClass('active')) {
            $sidebarWrapper.removeClass('active');
            $('.menu-toggle > .fa-bars, .menu-toggle > .fa-times').toggleClass('fa-bars fa-times');
        }
    });

    // Scroll to top button appear
    $(document).scroll(function() {
        const scrollDistance = $(this).scrollTop();
        if (scrollDistance > 300) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    // Smooth scrolling using jQuery easing
    $('.scroll-to-top').click(function() {
        document.querySelector('#page-top').scrollIntoView({
            behavior: 'smooth'
        });
    });
});