// vi wheel (veel) jquery plugin

(function($) {
  'use strict'

  $.fn.veel = function (options) {
    return this.each(function(){
      var $container = this;
      var opt = $.extend({
        radius: 250,
        startAngle: 225,
        endAngle: 270,
        activeAngle: 180
      }, options);

      $($container).data('opt', opt);

      var imgs = $('> div', $container),
          imgLen = imgs.length,
          imgLenMiddle = imgLen / 2,
          freeImgLen = imgLen -1,
          disperceAngle = parseInt($(this).data('opt').endAngle / freeImgLen, 10),
          halfDisperceAngle = parseInt(disperceAngle / 2, 10),
          minimumAnimationAngle = 180;

      function countClock(middle, active, clicked) {
        if (clicked < active) {
          clicked = clicked + imgLen;
        }
        return clicked > (middle + active);
      }

      $.fn.extend({
        setAngle: function(angle, radius) {
          var aAngle = -angle;
          var transform = 'rotate(#{angle}deg) translateX(#{radius}px) rotate(#{aangle}deg)';
          transform = transform.replace(/#{angle}/g, angle)
            .replace(/#{aangle}/g, aAngle)
            .replace(/#{radius}/g, radius)
          this.css({
            'transform' : transform
          });
          this.data('angle', angle);
        },
        memoNext: function(angle) {
          this.data('next-angle', angle);
        },
        setNext: function(radius) {
          this.each(function() {
            $(this).setAngle($(this).data('next-angle'), radius);
          });
        },
        getAngle: function() {
          return this.data('angle');
        }
      });

      imgs.each(function(index) {
        var angle = $($container).data('opt').activeAngle;
        if (!$(this).hasClass('active')) {
          angle = (index - 1) * disperceAngle + $($container).data('opt').startAngle + halfDisperceAngle;
        }
        $(this).setAngle(angle, $($container).data('opt').radius);
      });

      imgs.click(function(evt) {
        var clickedIndex = $(this).index(),
            activeInd = $('.active', $container).index(),
            clockwise = countClock(imgLenMiddle, activeInd, clickedIndex),
            distance = Math.abs(activeInd - clickedIndex),
            shortDistance = distance < imgLenMiddle ? distance : imgLen - distance;
        for(var i = 0; i < imgLen; i++) {
          var ind = i < shortDistance ? imgLen - shortDistance + i : i - shortDistance;
          if (clockwise) {
            ind = i >= (imgLen - shortDistance) ? shortDistance - imgLen + i : i + shortDistance;
          }
          var oldAngle = $(imgs[i]).getAngle(),
              newAngle = $(imgs[ind]).getAngle();
          if (clockwise) {
            if (oldAngle > newAngle)
              newAngle += 360;
          } else {
            if (oldAngle < newAngle)
              newAngle -= 360;
          }
          $(imgs[i]).memoNext(newAngle);
        }
        imgs.addClass('animate').removeClass('active');
        $(this).addClass('active');
        imgs.setNext($($container).data('opt').radius);
        imgs.trigger('mouseleave');
        setTimeout(function() {
          imgs.trigger('mouseleave');
          imgs.removeClass('animate')} , 1500); // this fixes bug after veel animation
      });

      imgs.mouseenter(function(evt) {
        if ($('body.mobile').length > 0 || $(this).hasClass('animate')) {
          return;
        }
        var $this = $(this);
        var $image = $('.wheel-item-image', $this);
        var $function = $('.function', $this);
        $image.addClass('hover');
        if ($this.hasClass('active')) {
          return;
        }
        $this.mousemove(function(evt) {
          var thisOffset = $this.offset(),
              mouseOffset = evt.pageX - thisOffset.left,
              thisCenter = $this.width() / 2,
              angle = (mouseOffset - thisCenter)*0.6;
              angle = angle > 45 ? 45 : angle;
              angle = angle < -45 ? -45 : angle;
          var transform = 'rotate3d(-0.1, 1, -0.1, {angle}deg) translate3d(0, 0, {z}px)'.replace('{angle}', angle);
          $image.css({
            'transform': transform.replace('{z}', '-5'),
            'transition': 'none'
          });
          $function.css({
            'transform': transform.replace('{z}', '20'),
            'transition': 'none'
          });
        });
      });
      imgs.mouseleave(function() {
        $('.wheel-item-image, .function', $(this)).removeClass('hover').removeAttr('style');
        $(this).off('mousemove');
      });

    });
  }
}(jQuery));
