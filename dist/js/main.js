$(document).ready(function () {

  var startDesktop = function (settings) {

    if (settings.veel) {
      $('.wrapper').removeClass('hidden');    

      $('#advertiser_veel').veel({
        radius: 200,
        activeAngle: 0,
        startAngle: 115,
        endAngle: 130
      });

      $('#publishers_veel').veel({
        radius: 200,
        startAngle: 295,
        endAngle: 130
      });

      $('#team_veel').veel({});
    }

    if (settings.fullpage) {
      $('#fullpage').fullpage({
        css3: true,
        navigation: true,
        keyboardScrolling: true,
        normalScrollElements: '.modal',
        navigationTooltips: [
          'home', 
          'intro', 
          'vi', 
          'advertisers', 
          'publishers', 
          'servicelevels', 
          'highlight',
          'team',
          'news',
          'events',
          'contact'
        ],
        sectionsColor: ['', '', '', '', '', '', '', '', '', '', '#000']
      });
    }

  };

  var isDesktopWidth = function () {

    if (document.body.clientWidth >= 768) {
      return true;
    } else {
      return false;
    }

  };

  if ( !isMobile.any && isDesktopWidth() ) {

    if (window.location.href.indexOf('#') !== -1) {

      startDesktop({
        veel: true,
        fullpage: true
      });

    } else {

      $('#video-background').removeClass('hidden');

      $('#video-background').one('pause', function (event) {
        $(this).fadeOut(1000, function () {
          $(this).remove();
        });

        startDesktop({
          veel: true,
          fullpage: true
        });

      });

    }

  } else if (isMobile.any) {
    $('.wrapper').removeClass('hidden');

      (function () {

        $('#teamMobile').find('.col-xs-4').on('click', function (event) {
          var $container = $('#teamMobile');
          var $activeItem = $container.find('#teamActiveItem').clone();
          var activeItemContent = $activeItem.find('.team-icon--full').html();
          var $inActiveItem = $(this).clone();
          var inActiveContent = $inActiveItem.find('.team-icon--full').html();

          $('#teamActiveItem .team-icon--full').html(inActiveContent);
          $(this).find('.thumbnail').html( $activeItem.find('.team-icon--small').html() );
          $(this).find('.team-icon--full').html( activeItemContent );

        });

    })();
     
  }

  window.addEventListener('resize', function () {

    if (isDesktopWidth) {
      startDesktop({
        veel: true
      });
    }
    
  });

  $('section.news').fillNewsEvents('./dist/news/news-content.html', 'news');
  $('section.events').fillNewsEvents('./dist/events/events-content.html', 'events');
  $('#privacyPolicy .modal-body').fillPrivacyTerms('./dist/privacy-policy.html');
  $('#terms .modal-body').fillPrivacyTerms('./dist/terms.html');

});