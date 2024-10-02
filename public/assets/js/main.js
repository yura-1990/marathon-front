/** ===============

 .. Preloader
 .. Menu
 .. Number rotator
 .. Skillbar
 .. Tab
 .. Accordion
 .. Isotope
 .. Prettyphoto
 .. Slick_slider 

 =============== */


jQuery(function($) {

  "use strict";


/*------------------------------------------------------------------------------*/
/* Fixed-header
/*------------------------------------------------------------------------------*/

$(window).on("scroll",function(){
    if ( matchMedia( 'only screen and (min-width: 1200px)' ).matches ) 
    {
        if ($(window).scrollTop() >= 50 ) {

            $('.prt-stickable-header').addClass('fixed-header');
        }
        else {

            $('.prt-stickable-header').removeClass('fixed-header');
        }
    }
});



/*------------------------------------------------------------------------------*/
/* Menu
/*------------------------------------------------------------------------------*/
        
        var menu = {
        initialize: function() {
            this.Menuhover();
        },

        Menuhover : function(){
            var getNav = $("nav.main-menu"),
                getWindow = $(window).width(),
                getHeight = $(window).height(),
                getIn = getNav.find("ul.menu").data("in"),
                getOut = getNav.find("ul.menu").data("out");
            
            if ( matchMedia( 'only screen and (max-width: 1200px)' ).matches ) {
                                                     
                // Enable click event
                $("nav.main-menu ul.menu").each(function(){
                    
                    // Dropdown Fade Toggle
                    $("a.mega-menu-link", this).on('click', function (e) {
                        e.preventDefault();
                        var t = $(this);
                        t.toggleClass('active').next('ul').toggleClass('active');
                    });   

                    // Megamenu style
                    $(".megamenu-fw", this).each(function(){
                        $(".col-menu", this).each(function(){
                            $(".title", this).off("click");
                            $(".title", this).on("click", function(){
                                $(this).closest(".col-menu").find(".content").stop().toggleClass('active');
                                $(this).closest(".col-menu").toggleClass("active");
                                return false;
                                e.preventDefault();
                                
                            });

                        });
                    });  
                    
                }); 
            }
        },
    };

    
    $('.btn-show-menu-mobile').on('click', function(e){
        $(this).toggleClass('is-active'); 
        $('.menu-mobile').toggleClass('show'); 
        return false;
        e.preventDefault();  
    });

    // Initialize
    $(document).ready(function(){
        menu.initialize();

    });
 

    var $bannerSlider = jQuery('.banner_slider');
    var $bannerFirstSlide = $('div.slide:first-child');

    $bannerSlider.on('init', function (e, slick) {
      var $firstAnimatingElements = $bannerFirstSlide.find('[data-animation]');
      slideanimate($firstAnimatingElements);
    });
    $bannerSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
      var $animatingElements = $('div.slick-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
      slideanimate($animatingElements);
    });
    $bannerSlider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      dots: false,
      swipe: true,
      adaptiveHeight: true,
      responsive: [

        {
            breakpoint: 1200,
            settings: {
                arrows: false
            }
        },
        {
            breakpoint: 767,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,                
                autoplay: false,
                autoplaySpeed: 4000,
                swipe: true } 
            }] });

    function slideanimate(elements) {
      var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data('delay');
        var $animationType = 'animated ' + $this.data('animation');
        $this.css({
          'animation-delay': $animationDelay,
          '-webkit-animation-delay': $animationDelay });

        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }


/*------------------------------------------------------------------------------*/
/* Animation on scroll: Number rotator
/*------------------------------------------------------------------------------*/
    
    $("[data-appear-animation]").each(function() {
    var self      = $(this);
    var animation = self.data("appear-animation");
    var delay     = (self.data("appear-animation-delay") ? self.data("appear-animation-delay") : 0);
        
        if( $(window).width() > 959 ) {
            self.html('0');
            self.waypoint(function(direction) {
                if( !self.hasClass('completed') ){
                    var from     = self.data('from');
                    var to       = self.data('to');
                    var interval = self.data('interval');
                    self.numinate({
                        format: '%counter%',
                        from: from,
                        to: to,
                        runningInterval: 2000,
                        stepUnit: interval,
                        onComplete: function(elem) {
                            self.addClass('completed');
                        }
                    });
                }
            }, { offset:'85%' });
        } else {
            if( animation == 'animateWidth' ) {
                self.css('width', self.data("width"));
            }
        }
    });
 
/*------------------------------------------------------------------------------*/
/* Skillbar
/*------------------------------------------------------------------------------*/
    
    $('.prt-progress-bar').each(function() {
        $(this).find('.progress-bar').width(0);
    });

    $('.prt-progress-bar').each(function() {

        $(this).find('.progress-bar').animate({
            width: $(this).attr('data-percent')
        }, 2000);
    });


    // Part of the code responsible for loading percentages:

    $('.progress-bar-percent[data-percentage]').each(function () {

        var progress = $(this);
        var percentage = Math.ceil($(this).attr('data-percentage'));

            $({countNum: 0}).animate({countNum: percentage}, {
                duration: 2000,
                easing:'linear',
                step: function() {
                // What todo on every count
                    var pct = '';
                    if(percentage === "0"){
                        pct = Math.floor(this.countNum) + '%';
                    }else{
                        pct = Math.floor(this.countNum+1) + '%';
                    }
                    progress.text(pct);
                }
            });
    });


    jQuery(".prt-circle-box").each(function () {

        var circle_box = jQuery(this);
        var fill_val = circle_box.data("fill");
        var emptyFill_val = circle_box.data("emptyfill");
        var thickness_val = circle_box.data("thickness");
        var linecap_val = circle_box.data("linecap")
        var fill_gradient = circle_box.data("gradient");
        var startangle_val = (-Math.PI / 4) * 1.5;
        if (fill_gradient != "") {
            fill_gradient = fill_gradient.split("|");
            fill_val = { gradient: [fill_gradient[0], fill_gradient[1]] };
        }
        if (typeof jQuery.fn.circleProgress == "function") {
            var digit = circle_box.data("digit");
            var before = circle_box.data("before");
            var after = circle_box.data("after");
            var digit = Number(digit);
            var short_digit = digit / 100;
            var size_val = circle_box.data("size");
            jQuery(".prt-circle", circle_box)
                .circleProgress({ value: 0, duration: 8000, size: size_val, startAngle: startangle_val, 
                    thickness: thickness_val, linecap:linecap_val, emptyFill: emptyFill_val, fill: fill_val })
                .on("circle-animation-progress", function (event, progress, stepValue) {
                    
                    circle_box.find(".prt-fid-number").html(before + Math.round(stepValue * 100) + after);
                });
        }
        circle_box.waypoint(
            function (direction) {

                if (!circle_box.hasClass("completed")) {
                    if (typeof jQuery.fn.circleProgress == "function") {
                        jQuery(".prt-circle", circle_box).circleProgress({ value: short_digit });
                    }
                    circle_box.addClass("completed");
                }
            },
            { offset: "90%" }
        );
    });



/*------------------------------------------------------------------------------*/
/* Tab
/*------------------------------------------------------------------------------*/ 

$('.prt-tabs').each(function() {
    $(this).children('.content-tab').children().hide();
    $(this).children('.content-tab').children().first().show();
    $(this).find('.tabs').children('li').on('click', function(e) {  
    var liActive = $(this).index(),
    contentActive = $(this).siblings().removeClass('active').parents('.prt-tabs').children('.content-tab').children().eq(liActive);
    contentActive.addClass('active').fadeIn('slow');
    contentActive.siblings().removeClass('active');
    $(this).addClass('active').parents('.prt-tabs').children('.content-tab').children().eq(liActive).siblings().hide();
    e.preventDefault();
    });
});

$(document).ready(function() {
    $('.prt-tabs.slider-tab > .tabs').children('li').on('click', function(e) {  
        var tab = $(this).closest('.prt-tabs > .tabs > .tab'), 
        index = $(this).closest('.prt-tabs > .tabs > li').index();
        $(this).parents('.prt-tabs').children(' .tabs').children('li.active ').removeClass('active'); 
        $(this).addClass('active'); 
        $(this).addClass('active').parents('.prt-tabs').children('.content-tab').find('.content-inner').not('.content-inner:eq(' + index + ')').slideUp();
        $(this).addClass('active').parents('.prt-tabs').children('.content-tab').find('.content-inner:eq(' + index + ')').slideDown();
        e.preventDefault();
    });
});

/*------------------------------------------------------------------------------*/
/* Accordion
/*------------------------------------------------------------------------------*/

    var allPanels = $('.accordion > .toggle').children('.toggle-content').hide();

    $('.toggle-title').on('click',function(e) {

        e.preventDefault();
        var $this = $(this);
            $this.parent().parent().find('.toggle .toggle-title a').removeClass('active');

        if ($this.next().hasClass('show')) {

            $this.next().removeClass('show');   
            $this.next().slideUp('easeInExpo');

        } else {
            $this.parent().parent().find('.toggle .toggle-content').removeClass('show');
            $this.parent().parent().find('.toggle .toggle-content').slideUp('easeInExpo');
            $this.next().toggleClass('show');
            $this.next().removeClass('show');
            $this.next().slideToggle('easeInExpo');
           $this.next().parent().children().children().addClass('active');

        }

    });


/*------------------------------------------------------------------------------*/
/* Isotope
/*------------------------------------------------------------------------------*/

   
$(function () {

    if ( $().isotope ) {           
        var $container = $('.isotope-project');
        $container.imagesLoaded(function(){
            $container.isotope({
                itemSelector: '',
                transitionDuration: '1s',
            });
        });

        $('.portfolio-filter li').on('click',function() {                           
            var selector = $(this).find("a").attr('data-filter');
            $('.portfolio-filter li').removeClass('active');
            $(this).addClass('active');
            $container.isotope({ filter: selector });
            return false;
        });
    };

});

    
/*------------------------------------------------------------------------------*/
/* Prettyphoto
/*------------------------------------------------------------------------------*/
    $(function () {

        // Normal link
        jQuery('a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]').each(function(){
            if( jQuery(this).attr('target')!='_blank' && !jQuery(this).hasClass('prettyphoto') ){
                var attr = $(this).attr('rel');
                if (typeof attr !== typeof undefined && attr !== false && attr!='prettyPhoto' ) {
                    jQuery(this).attr('data-rel','prettyPhoto');
                }
            }
        });    
        jQuery('a[data-rel^="prettyPhoto"]').prettyPhoto();
    });
    

    $(window).on('load', function(){

    function gridMasonry(){
        var grid = $(".masonry-grid")
        if( grid.length ){
            
          grid.isotope({
            itemSelector: '.masonry-grid-item',
            percentPosition: true,
            layoutMode: 'masonry',
            masonry: {
              columnWidth: '.grid-sizer',
            },
          });
            
        }
    }
    gridMasonry();
});

/*------------------------------------------------------------------------------*/
/* Slick_slider
/*------------------------------------------------------------------------------*/
    $(".slick_slider").slick({
        speed: 1000,
        infinite: true,
        arrows: false,
        dots: false,                   
        autoplay: false,
        centerMode : false,

        responsive: [{

            breakpoint: 1360,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3
            }
        },
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3
            }
        },
        {
            breakpoint: 680,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });

});

// slick_slider_center


$('.slick_slider_center').slick({
    centerMode: true,
    arrows: true,
    autoplay: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1870,
        settings: {
          arrows: false,
          autoplay: true,
          centerMode: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          autoplay: true,
          centerMode: true,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 575,
        settings: {
          arrows: false,
          autoplay: true,
          centerMode: true,
          slidesToShow: 1
        }
      }
    ]
  });


// left
   gsap.set(".animation .fadeleft-anim", { x: -100, opacity: 1 });
    gsap.to(".animation .fadeleft-anim", {
      scrollTrigger: {
        trigger: ".animation .fadeleft-anim",
        start: "top center+=300",
        markers: false
      },
      x: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 2,
      stagger: {
        each: 0.3
      }
    })

// right
   gsap.set(".animation .faderight-anim", { x: 100, opacity: 1 });
    gsap.to(".animation .faderight-anim", {
      scrollTrigger: {
        trigger: ".animation .faderight-anim",
        start: "top center+=300",
        markers: false
      },
      x: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 2,
      stagger: {
        each: 0.3
      }
    })

// fade-up
   gsap.set(".animation .fadeup-amin", { y: 100, opacity: 1 });
    gsap.to(".animation .fadeup-amin", {
      scrollTrigger: {
        trigger: ".animation .fadeup-amin",
        start: "top center+=300",
        markers: false
      },
      y: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 2,
      stagger: {
        each: 0.3
      }
    })
// zoomin

   gsap.set(".animation .zoomin-anim", { opacity: 0, scale: 0.5 });

    gsap.to(".animation .zoomin-anim", {
        scrollTrigger: {
          trigger: ".animation ",
          start: "top center+=200",
          markers: false
        },
        opacity: 1,
        scale: 1,
        duration: 2,
        stagger: {
          each: 0.3
        }
    })


/*------------------------------------------------------------------------------*/
/* services-item
/*------------------------------------------------------------------------------*/

jQuery(document).ready(function() {
   
    setTimeout(function(){
           
    }, 100);
        jQuery('.services-item').hover(function(){
        jQuery(this).toggleClass("active");
     });
     
});


/*------------------------------------------------------------------------------*/
/* services-list
/*------------------------------------------------------------------------------*/


jQuery(document).ready(function() {
   
    setTimeout(function(){
        
        
    }, 100);

    jQuery('.services-one_list:first').addClass("active");
     jQuery('.services-one_list').click(function(){
        jQuery('.services-one_list').removeClass("active");
        jQuery(this).addClass("active");
     });
     
});



/*------------------------------------------------------------------------------*/
/* image-iffect
/*------------------------------------------------------------------------------*/
gsap.registerPlugin(ScrollTrigger, SplitText);

function tm_reveal_img_animation() {
    const boxes = gsap.utils.toArray('.tm-reveal-effects-yes');
    boxes.forEach(img => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img,
                start: "top 70%",
                end: "bottom bottom",
                toggleClass: "active",
                once: true,
            }
        });
    });
}   

jQuery(window).load(function() {
    tm_reveal_img_animation(); 
    gsap.delayedCall(1, () =>
        ScrollTrigger.getAll().forEach((t) => {
            t.refresh();
        })
    );
});

/* listimgbox */

jQuery(document).ready(function() {

    jQuery('.prt_listimgbox_wrapper .prt_listimgbox_wrap').hover(function(){
       jQuery('.prt_listimgbox_wrapper .prt_listimgbox_wrap').removeClass("active");
       jQuery(this).addClass("active");
    });
});

/* footer_customheading */
jQuery(window).load(function(){
var $li = jQuery('.footer_customheading span');
$li.hide().first().show().addClass('active');

function footerloop() {
   jQuery('.footer_customheading .active').each(function(index){
       var $this = jQuery(this);
       var $next = $this.next().length > 0 ? $this.next() : $li.first();

       $this.hide().removeClass('active');
       $next.show().addClass('active');

       if( $next.index() == 0) {
          // clearInterval(myTimer);
           setTimeout(function(){
               //myTimer=setInterval(function(){loop()},1000);
           }, 3000);
       }
   });
}

setInterval(function(){footerloop()},2000);//timer running every 2 seconds


});

/*************************
Skrollr
*************************/
letterCarousel('.Frist','.big-title');

    
function letterCarousel(parent_cls,child_cls) {
    var e = jQuery(parent_cls+' '+child_cls),
    t = jQuery(window).height();
    jQuery(window).on("scroll", function() {
        if (jQuery(parent_cls).length) {
            var t = jQuery(document).scrollTop() + jQuery(window).height(),
            n = jQuery(parent_cls).offset().top;
            
            if (n <= t) {
                var i = jQuery(document).scrollTop() - n + jQuery(window).height();
                var scroll = i - 150;
                var scroll_slow = scroll + ((scroll/20)/100);
                var img_scroll = scroll_slow * 20 /100;
                e.css({
                    transform: "translateX(" + img_scroll + "px)"
                })
            }
        }
    });
}


letterCarousel('.second','.big-title');

    
function letterCarousel(parent_cls,child_cls) {
    var e = jQuery(parent_cls+' '+child_cls),
    t = jQuery(window).height();
    jQuery(window).on("scroll", function() {
        if (jQuery(parent_cls).length) {
            var t = jQuery(document).scrollTop() + jQuery(window).height(),
            n = jQuery(parent_cls).offset().top;
            
            if (n <= t) {
                var i = jQuery(document).scrollTop() - n + jQuery(window).height();
                var scroll = i - 150;
                var scroll_slow = scroll + ((scroll/20)/100);
                var img_scroll = scroll_slow * 20 /100;
                e.css({
                    transform: "translateX(" + img_scroll + "px)"
                })
            }
        }
    });
}



// /*----  Functions  ----*/
// function tm_pfbox_animation() {
//     const tmPfItem = gsap.utils.toArray(".featured-imagebox-services-style3");
//     tmPfItem.forEach((target) => {
//         const tm_fimg = target.querySelector('.tm-animation-hover-img');
//         const t1 = gsap.timeline();
//         t1.to(tm_fimg, {
//             opacity: 1,
//             duration: 0.4,
//             scale: 1,
//             ease: "Power2.easeOut"
//         })
//         target.tmpf_hover = t1.play().reversed(true);
//         target.addEventListener("mouseenter", tmpfitem);
//         target.addEventListener("mouseleave", tmpfitem);
//         target.addEventListener("mousemove", (e) => {
//             let xpos = e.offsetX;
//             let ypos = e.offsetY;
//             const t1 = gsap.timeline();
//             t1.to(tm_fimg, { x: xpos, y: ypos });
//             stagger: 5000
//         });
//     });

//     function tmpfitem() {
//         this.tmpf_hover.reversed(!this.tmpf_hover.reversed());
//     }
// }

// jQuery(window).on("load", function() {
//     tm_pfbox_animation(); 
//     gsap.delayedCall(1, () =>
//         ScrollTrigger.getAll().forEach((t) => {
//             t.refresh();
//         })
//     );
// });


/*------------------------------------------------------------------------------*/
/* Contact Form
/*------------------------------------------------------------------------------*/
$(function() {
    //Contact Form Validation
    if($('#contactform').length){
        $('#submit').click(function(){
            var o = new Object();
            var form = '#contactform';
            
            var username = $('#contactform .username').val();
            var email = $('#contactform .email').val();
            var message = $('#contactform .message').val();
            
            if(username == '' || email == '' || message == '')
            {
                $('#contactform .response').html('<div class="failed">Please fill the required fields.</div>');
                return false;
            }
            
            $.ajax({
                url:"php/sendemail.php",
                method:"POST",
                data: $(form).serialize(),
                beforeSend:function(){
                    $('#contactform .response').html('<div class="text-info">Loading...</div>');
                },
                success:function(data){
                    $('form').trigger("reset");
                    $('#contactform .response').fadeIn().html(data);
                    setTimeout(function(){
                        $('#contactform .response').fadeOut("slow");
                    }, 5000);
                },
                error:function(){
                    $('#contactform .response').fadeIn().html(data);
                }
            });
        });
    }

    });


/*------------------------------------------------------------------------------*/  
/*active */
 /*------------------------------------------------------------------------------*/

//  $(".featured-imagebox-post-border").hover(
//     function () {
//         $(".featured-imagebox-post-border.active").addClass("inactive").removeClass("active");
//     },
//     function () {
//         $(".featured-imagebox-post-border.inactive").addClass("active").removeClass("inactive");
//     }
// );

 /*---------------------------------------------------------------------
      Wow init
    ----------------------------------------------------------------------*/
    if (typeof WOW == "function")
        new WOW().init();

