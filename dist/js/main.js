$(document).ready(function () {
  $('#fullpage').fullpage({
    css3: true,
    navigation: true,
    navigationTooltips: ['home', 
                         'intro', 
                         'vi', 
                         'advertisers', 
                         'publishers', 
                         'servicelevels', 
                         'highlight',
                         'team',
                         'news',
                         'events',
                         'contact']
  });

  $('.meet-the-team').veel({});

});