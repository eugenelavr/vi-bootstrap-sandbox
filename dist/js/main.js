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
                         'news',
                         'events',
                         'contact']
  });

  $.ajax({
    type: "get",
    url: "https://www.vi.ai/five-short-videos-on-adtech/",
    dataType: "jsonp",
    success: function (response) {
      console.log();
    }
  });
});