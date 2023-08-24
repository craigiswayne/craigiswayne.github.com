/*jslint browser: true */
'use strict';

const Resume = {};

(function($) {
  function navbarOffset() {
    return parseInt($('body').css('padding-top'));
  }

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {

      if (location.pathname.replace(/^\//, '') !== this.pathname.replace(/^\//, '') || location.hostname !== this.hostname) {
        return false;
      }

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

      /**
       * Target not found :(
       */
      if( !target.length ){
        return false;
      }

      let scrollTop = target.offset().top - navbarOffset();
      $('html, body').animate({
        scrollTop: scrollTop
      }, 1000, "easeInOutExpo");

      return false;
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

  $('[data-toggle="tooltip"]').tooltip();
})(jQuery);