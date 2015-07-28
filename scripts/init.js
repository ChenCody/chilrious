/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

/*----------------------------------------------------*/
/* FitText Settings
------------------------------------------------------ */

    setTimeout(function() {
	   $('h1.responsive-headline').fitText(1, { minFontSize: '32px', maxFontSize: '46px' });
	 }, 100);


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);
     if (target) {
       $('html, body').stop().animate({
         'scrollTop': $target.offset().top
       }, 800, 'swing', function () {
         window.location.hash = target;
       });
     }
     else{
       $('html, body').stop().animate({
         'scrollTop': 0
       }, 800, 'swing', function () {
         window.location.hash = '';
       });
     }
	});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");

	sections.waypoint({

      handler: function(event, direction) {

		   var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');
      navigation_links.parent().removeClass("current");
			active_link.parents().addClass("current");

		},
		offset: '35%'
	});


/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

   $('header').css({ 'height': $(window).height() });
   $(window).on('resize', function() {
        $('header').css({ 'height': $(window).height() });
        $('body').width($(window).width())
   });


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

   $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
      var nav = $('#nav-wrap');

	   if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
	      nav.fadeOut('fast');
	   }
      else {
         if (y < h*.20) {
            nav.removeClass('opaque').fadeIn('fast');
         }
         else {
            nav.addClass('opaque').fadeIn('fast');
         }
      }

	});


/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/
    var area = ''
    $('.item-wrap a').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 200,
       showCloseBtn: false,
       mainClass: 'mfp-fade',
       callbacks: {
         elementParse: function (item) {
           area=$(item.src+' .carousel-area');
         },
         open: function () {
           area.height(area.find('li').eq(0).height())
         },
         close:function () {
           area.find('.carousel-list').css('left', 0);
           area.find('.carousel-dot').find('li').eq(0).addClass('active').siblings().removeClass('active');
           area.height('auto')
         }
     }

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
    		e.preventDefault();
    		$.magnificPopup.close();

    });


/*----------------------------------------------------*/
/*	Flexslider
/*----------------------------------------------------*/
   $('.flexslider').flexslider({
      namespace: "flex-",
      controlsContainer: ".flex-container",
      animation: 'slide',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
   });

/*----------------------------------------------------*/
/*	contact form
------------------------------------------------------*/

   $('form#contactForm button.submit').click(function() {

      $('#image-loader').fadeIn();

      var contactName = $('#contactForm #contactName').val();
      var contactEmail = $('#contactForm #contactEmail').val();
      var contactSubject = $('#contactForm #contactSubject').val();
      var contactMessage = $('#contactForm #contactMessage').val();

      var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
               '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

      $.ajax({

	      type: "POST",
	      url: "inc/sendEmail.php",
	      data: data,
	      success: function(msg) {

            // Message was sent
            if (msg == 'OK') {
               $('#image-loader').fadeOut();
               $('#message-warning').hide();
               $('#contactForm').fadeOut();
               $('#message-success').fadeIn();   
            }
            // There was an error
            else {
               $('#image-loader').fadeOut();
               $('#message-warning').html(msg);
	            $('#message-warning').fadeIn();
            }

	      }

      });
      return false;
   });

   /*----------------------------------------------------*/
   /*	getting time
    ------------------------------------------------------*/
   var time_area=$('#call-to-action .time');
   setInterval(function () {
     var curTime=new Date();
     var day=curTime.getDate();
     var week=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][curTime.getDay()];
     var Month=['January','February','March','April','May','June','July','August','September ','October','November','December'][curTime.getMonth()];
     var year=curTime.getFullYear();
     var hour_24=curTime.getHours();
     var hour,isAm;
     if(hour_24<=12){
       hour=(~~hour_24);
       isAm=' am'
     }
     else{
       hour=(~~hour_24)-12;
       isAm=' pm';
     }
     time_area.html('<p>'+week+' '+addZero(day)+' '+Month+'</p><p>'+year+'</p><p>+'+addZero(hour)+':'+addZero(curTime.getMinutes())+':'+addZero(curTime.getSeconds())+isAm+'</p>')
   },500);

   function addZero(num){
     if((~~num)<10)
      return '0'+num;
     else
      return num;
   }

   // carousel

   var caAllArea=$('.carousel-area');
   caAllArea.each(function () {
     var caArea = $(this);
     var caList=$(this).children('.carousel-list');
     var caEach=caList.children('li');
     var caLen = caEach.length;
     var caWidth = caEach.width();
     var caDot= '';
     for(var i=caLen;i>0;i--) {
       caDot+='<li></li>'
     }
     caArea.append('<ul class="carousel-dot">'+caDot+'</ul>');
     caArea.find('.carousel-dot li').eq(0).addClass('active');

     caArea.delegate('.carousel-dot li','click', function () {
       var index=$(this).index();
       caList.css('left',-index*caWidth+'px');
       caArea.height(caEach.eq(index).height());
       $(this).addClass('active').siblings().removeClass('active');
     })
   })


   //跳转
   $('.product-a').on('click',function() {
     window.location.href = 'http://www.chilrious.net/cityclock.html';
   })


});








