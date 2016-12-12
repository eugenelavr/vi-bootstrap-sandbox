$(function () {
  var formsLink = './dist/mc-forms/';
  var formsFlag = false;

  window.hidePopup = function () {
    $('.sub-popup select').off('change');
    $('.sub-popup').removeClass('visible');
    $('body').removeClass('noscroll');
    window.fullpageScrolling = false;
  };

  $('.sub-popup-link').on('click touchstart', function (evt) {
    if (formsFlag) return false;
    $('#spinner').addClass('visible');
    console.log($('#spinner')[0]);
    $('body').addClass('noscroll');
    formsFlag = true;
    var targetForm = $(this).attr('for');
    hidePopup();
    $('#' + targetForm).addClass('visible');
    $('.sub-popup-content').hide();
    window.tmp_jq = $;
    $('#' + targetForm + ' .sub-popup-content').load(formsLink + targetForm + '.html', function () {
      window.$ = window.tmp_jq; // this is a hack, because mailchimp script replaces our jquery instance and breaks the site
      $.getScript('//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js', function () {
        window.fullpageScrolling = true;
        $('#' + targetForm).addClass('visible');
        $('.sub-popup-content').show();
        $('#spinner').removeClass('visible');
        window.$ = window.tmp_jq;
        formsFlag = false;
        var $resp = $('#mce-success-response');
        $resp.one("DOMSubtreeModified",function(){ // we have no API for mailchimp here, so we are catching success container change
          $('.sub-popup input, .sub-popup .mc-form-select').remove();
          $('.sub-popup h1').text('Almost finished...');
          $resp.remove();
          $('.popup-success').show();
          setTimeout(hidePopup, 5000); // designer asked to hide after 5 sec after success
        });
        $('.sub-popup select').on('change', function() { // emulation of placeholder/filled selectbox
          if ($(this).val() !== "") {
            $(this).addClass('choosen');
          } else {
            $(this).removeClass('choosen');
          }
        });
        window.mc.ajaxOptions.beforeSubmit = function () {
          $('#mc-embedded-subscribe').prop({
            value: 'sending',
            disabled: true
          });
        };
        var mce_error_response = $('#mce-error-response');
        setInterval(function () {
          if (mce_error_response.css("display") !== 'none') {
            $('#mc-embedded-subscribe').prop({
              value: 'send',
              disabled: false
            });
          }
        }, 300);
        console.log('downloaded');
      });
    });
    return false;
  });

  $('.sub-popup .sub-popup-close').on('click touchstart', function() {
    hidePopup();
  });

  $('.sub-popup-inner').on('click touchstart', function (evt) {
    evt.stopPropagation();
  });
});
