function parameter_2_int(string) {

    return parseInt(string.substring(0, string.indexOf("px")));
}
function getScrollbarWidth() {
    var outer = document.createElement('div');
    var inner = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    inner.style.width = '100%';
    outer.appendChild(inner);
    document.body.appendChild(outer);
    var widthWithoutScrollbar = outer.offsetWidth;
    outer.style.overflow = 'scroll';
    var widthWithScrollbar = inner.offsetWidth;
    document.body.removeChild(outer);

    return (widthWithoutScrollbar - widthWithScrollbar);
}
function isRetina() {
    var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
                      (min--moz-device-pixel-ratio: 1.5),\
                      (-o-min-device-pixel-ratio: 3/2),\
                      (min-resolution: 1.5dppx)";
 
    if (window.devicePixelRatio > 1)
        return true;
 
    if (window.matchMedia && window.matchMedia(mediaQuery).matches)
        return true;
 
    return false;
};
function isApple() {
    var platform = navigator.platform;

    if (platform == "MacIntel"
        || platform == "iPhone"
        || platform == "iPod"
        || platform == "iPad") {
        return true;
    }
    else return false;
}
$(document).ready(function(){
    var slider0amount = $(".slider0").children().length;
    $(".slider0").slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        draggable: false,
        accessibility: false,
        arrows: false,
        autoplaySpeed: 2000,
        responsive: [
    {
      breakpoint: 1180,
      settings: {
        slidesToShow: 5
      }
    }]
    });
    $(".smooth_link").click(function() {
        var elementClick = $(this).attr("href");
        var nav_padding = parameter_2_int($("#navbar_nav").css("paddingTop")) +
            parameter_2_int($("#navbar_nav").css("paddingBottom"));
        var destination = ($(window).width() < (768 - getScrollbarWidth())) ?
            ($(elementClick).offset().top - $("#navbar_nav").height() -	nav_padding) : $(elementClick).offset().top;
        $("html, body").animate({ scrollTop: destination }, 1500);

        return false;
    });
    if ($(window).width() < (768 - getScrollbarWidth())) {
        $("header").css({
            height: $(window).height() + "px",
            backgroundPosition: "50% bottom"
        });
        if ($(window).width() > $(window).height()) {
            $(".header_title").css({
                    fontSize: "42px",
                    lineHeight: "42px",
                    paddingBottom: "28px",
                    paddingTop: ($(window).height() - 160)/2 + "px"
                });
                $(".header_description").css({
                    fontSize: "22px",
                    marginBottom: "32px"
                });
                $(".header_navigation_button").css({
                    position: "static"
                });
                if ($(window).height() < 320) {
                    $(".header_navigation_button").addClass("hidden");
                } else {
                    $(".header_navigation_button").removeClass("hidden");
                }
        } else {
            if ($(window).height() < 768) {
                $(".header_title").css({
                    fontSize: "42px",
                    lineHeight: "42px",
                    padding: "84px 0 28px 0",
                    paddingTop: ($(window).height() - 290)/2 + "px"
                });
                $(".header_description").css({
                    fontSize: "22px",
                    marginBottom: ""
                });
                $(".header_navigation_button").css({
                    position: ""
                });
            } else {
                $("header").css({
                    height: "",
                    backgroundPosition: ""
                });
                $(".header_title").css({
                    fontSize: "",
                    lineHeight: "",
                    padding: ""
                });
                $(".header_description").css({
                    fontSize: "",
                    marginBottom: ""
                });
                $(".header_navigation_button").css({
                    position: ""
                });
            }
        }
    } else {
        $("header").css({
            height: "",
            backgroundPosition: ""
        });
        $(".header_title").css({
                    fontSize: "",
                    lineHeight: "",
                    padding: ""
                });
                $(".header_description").css({
                    fontSize: "",
                    marginBottom: ""
                });
                $(".header_navigation_button").css({
                    position: ""
                }).removeClass("hidden");
    }
    $(".portfolio_menu_row li").click(function() {
        var clickedItemId = $(this).prop("id");
        console.log(clickedItemId);
        console.log($(this).parent().prop("className"));
        $(this).parent().children().removeClass("menu_item_clicked");
        $(this).addClass("menu_item_clicked");
        if (clickedItemId == "portfolio_all") {
            $(".portfolio_items_row").children().removeClass("hidden");
        } else {
            $(".portfolio_items_row").children().addClass("hidden");
            $(".portfolio_items_row").children("."+clickedItemId).removeClass("hidden");
        }
    });

    /*Slider 0*/
    $('.slider0').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      var current = $(this).slick("slickCurrentSlide");
      var slidesShowing = $(this).slick("slickGetOption", "slidesToShow");
      var childrenAmount = slider0amount;
      var t = current + slidesShowing + 3;
      $(".slider0 .slick-track").children(":nth-child(" + t + ")").css("opacity", "");
    });
    $('.slider0').on('afterChange', function(event, slick, currentSlide, nextSlide){
      var current = $(this).slick("slickCurrentSlide");
      var slidesShowing = $(this).slick("slickGetOption", "slidesToShow");
      var childrenAmount = slider0amount;
      var t = current + slidesShowing + 3;
      $(".slider0 .slick-track").children(":nth-child(" + t + ")").css("opacity", 1);
    });
    /*Slider 0*/
    if (isRetina() && isApple()) {
        $(".contact_navigation_button").css("padding", "22px 26px");
        if ($(window).width() < 768) {
            $('.navbar-collapse').on('shown.bs.collapse', function() {
                $("#bs-example-navbar-collapse-1 ul").addClass("centered_nav");
            });
            $('.navbar-collapse').on('hide.bs.collapse', function() {
                $("#bs-example-navbar-collapse-1 ul").removeClass("centered_nav");
            });
        } else {
            $("#bs-example-navbar-collapse-1 ul").removeClass("centered_nav");
        }

    }
});
$(window).resize(function() {
    if (isRetina() && isApple()) {
        $(".contact_navigation_button").css("padding", "22px 26px");
        if ($(window).width() < 768) {
            $('.navbar-collapse').on('shown.bs.collapse', function() {
                $("#bs-example-navbar-collapse-1 ul").addClass("centered_nav");
            });
            $('.navbar-collapse').on('hide.bs.collapse', function() {
                $("#bs-example-navbar-collapse-1 ul").removeClass("centered_nav");
            });
        } else {
            $("#bs-example-navbar-collapse-1 ul").removeClass("centered_nav");
        }

    }
    if ($(window).width() < (768 - getScrollbarWidth())) {
        $("header").css({
            height: $(window).height() + "px",
            backgroundPosition: "50% bottom"
        });
        if ($(window).width() > $(window).height()) {
            $(".header_title").css({
                    fontSize: "42px",
                    lineHeight: "42px",
                    paddingBottom: "28px",
                    paddingTop: ($(window).height() - 160)/2 + "px"
                });
                $(".header_description").css({
                    fontSize: "22px",
                    marginBottom: "32px"
                });
                $(".header_navigation_button").css({
                    position: "static"
                });
                if ($(window).height() < 320) {
                    $(".header_navigation_button").addClass("hidden");
                } else {
                    $(".header_navigation_button").removeClass("hidden");
                }
        } else {
            if ($(window).height() < 768) {
                $(".header_title").css({
                    fontSize: "42px",
                    lineHeight: "42px",
                    padding: "84px 0 28px 0",
                    paddingTop: ($(window).height() - 290)/2 + "px"
                });
                $(".header_description").css({
                    fontSize: "22px",
                    marginBottom: ""
                });
                $(".header_navigation_button").css({
                    position: ""
                });
            } else {
                $("header").css({
                    height: "",
                    backgroundPosition: ""
                });
                $(".header_title").css({
                    fontSize: "",
                    lineHeight: "",
                    padding: ""
                });
                $(".header_description").css({
                    fontSize: "",
                    marginBottom: ""
                });
                $(".header_navigation_button").css({
                    position: ""
                });
            }
        }
    } else {
        $("header").css({
            height: "",
            backgroundPosition: ""
        });
        $(".header_title").css({
                    fontSize: "",
                    lineHeight: "",
                    padding: ""
                });
                $(".header_description").css({
                    fontSize: "",
                    marginBottom: ""
                });
                $(".header_navigation_button").css({
                    position: ""
                }).removeClass("hidden");
    }
});