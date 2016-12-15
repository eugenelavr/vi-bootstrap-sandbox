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

  if (isDesktopWidth()) {

    if (window.location.href.includes('#')) {

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

  } else {
    $('.wrapper').removeClass('hidden');
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