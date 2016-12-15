$(document).ready(function () {

  var fillContent = function (url) {

    if (this) {
      var elementToFill = this;

      $.ajax(url).done(function (data) {

        var $source = $(data).find('.entry-content');
        $source.find('h2').each(function (index, element) {
          var h4 = $('<h4>');
          $(h4).html($(element).html());
          $(element).replaceWith(h4);
        });

        elementToFill.append($source);

      });
    } else {
      return;
    }

  };

  $.fn.fillPrivacyTerms = fillContent;

});