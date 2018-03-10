(function ($) {

    $('.page-hero--arrow > a').on('click', function(e) {
        e.preventDefault();

        $('html,body').animate({
            scrollTop: $('.page-hero').next().offset().top
        }, 500, null, function (t) {
            return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
        });

    });


})(require('jquery'));