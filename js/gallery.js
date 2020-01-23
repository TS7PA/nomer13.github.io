$(document).ready(function() {
    
    // ### Галереи Slick ###

    // Галерея телевизоров
    $(".gallery").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        centerMode: true,
        dots: true,
        arrows: true,
        adaptiveHeight: true,
        lazyLoad: "ondemand",
        responsive: [
            {
                breakpoint: 650,
                settings: {
                    centerMode: false,
                    slidesToShow: 1,
                    arrows: true,
                    dots: false
                }
          }]
    });

    // Галерея сертификатов
    $(".certificate-slider").slick({
        slidesToShow: 3,
        infinite: true,
        prevArrow: "<i class=\"material-icons prev2\">keyboard_arrow_left</i>",
        nextArrow: "<i class=\"material-icons next2\">keyboard_arrow_right</i>",
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    arrows: true,
                    slidesToShow: 2
                }
      }]
    });
    
    
    
});