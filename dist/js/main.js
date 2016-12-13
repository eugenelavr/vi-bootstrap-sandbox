$(document).ready(function () {

  var startDesktop = function () {

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

  var isDesktopWidth = function () {

    if (document.body.clientWidth >= 768) {
      return true;
    } else {
      return false;
    }

  };

  if (isDesktopWidth()) {

    $('#video-background').removeClass('hidden');
    $('#video-background').one('pause', function (event) {
      $(this).fadeOut(1000, function () {
        $(this).remove();
      });
      $('.wrapper').removeClass('invisible');
    });

    $('#fullpage').fullpage({
      css3: true,
      navigation: true,
      keyboardScrolling: true,
      // responsiveWidth: 768,
      afterResponsive: function (isResponsive) {
        
      },
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

    startDesktop();

  } else {
    $('.wrapper').removeClass('invisible');
  }

  window.addEventListener('resize', function () {

    // if (!isDesktopWidth() && $.fn.fullpage.setAllowScrolling) {

    //   console.log('bingo');
    //   // $.fn.fullpage.setMouseWheelScrolling(false);
    //   $.fn.fullpage.setAllowScrolling(false);

    // } else {

    //   startDesktop();

    // }

    if (isDesktopWidth) {
      startDesktop();
    }
    
  });

  $('section.news').fillNewsEvents('./dist/news/news-content.html', 'news');
  $('section.events').fillNewsEvents('./dist/events/events-content.html', 'events');

});