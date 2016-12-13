$(document).ready(function () {

  var structure = {
    sourceNews: {
      elementName: 'article',
      date: '.posted-on',
      title: '.entry-title',
      content: '.entry-summary p'
    },

    sourceEvents: {
      elementName: '.listing-item',
      date: '.excerpt .date',
      title: '.excerpt .title',
      content: '.excerpt .event-info'
    },

    destination: {
      elementName: '.panel',
      date: '.panel-heading h5',
      title: '.link-title',
      content: '.panel-body p'
    }
  };

  var fillNewsEvents = function (url, type) {

    var source = undefined;

    if (type === 'news') {
      source = structure.sourceNews;
    } else if (type === 'events') {
      source = structure.sourceEvents;
    } else {
      return;
    }

    var element = this;

    $.ajax(url).done(function (data) {

      var sourceElements = $(data).find(source.elementName).slice(0, 3);
      var destinationElements = $(element).find(structure.destination.elementName).slice(0, 3);

      $(destinationElements).each(function (index, element) {

        var $sourceElement = $(sourceElements[index]);

        var sourceDate = $sourceElement.find(source.date).html();
        var sourceTitle = undefined;
        if (type === 'news') {
          sourceTitle = $sourceElement.find(source.title).html();
        }
        else {
          sourceTitle = $sourceElement.find(source.title);
        }
        var sourceContent = $sourceElement.find(source.content).html();

        $(element).find(structure.destination.date).html(sourceDate);
        $(element).find(structure.destination.title).html(sourceTitle);
        $(element).find(structure.destination.content).html(sourceContent);

      });

    });

  };

  $.fn.fillNewsEvents = fillNewsEvents;

});