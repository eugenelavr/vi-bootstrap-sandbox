$(document).ready(function () {

  var structure = {
    source: {
      elementName: 'article',
      date: '.posted-on',
      heading: '.entry-title',
      content: '.entry-summary p'
    },

    destination: {
      elementName: '.panel',
      date: '.panel-heading h5',
      heading: '.news__link-title',
      content: '.panel-body p'
    }
  };

  var fillNewsEvents = function (url) {

    var element = this;

    $.ajax(url).done(function (data) {

      var sourceElements = $(data).find(structure.source.elementName).slice(0, 3);
      var destinationElements = $(element).find(structure.destination.elementName).slice(0, 3);

      $(destinationElements).each(function (index, element) {

        var $sourceElement = $(sourceElements[index]);

        var sourceDate = $sourceElement.find(structure.source.date).html();
        var sourceHeading = $sourceElement.find(structure.source.heading).html();
        var sourceContent = $sourceElement.find(structure.source.content).html();

        $(element).find(structure.destination.date).html(sourceDate);
        $(element).find(structure.destination.heading).html(sourceHeading);
        $(element).find(structure.destination.content).html(sourceContent);

      });

    });

  };

  $.fn.fillNewsEvents = fillNewsEvents;

});