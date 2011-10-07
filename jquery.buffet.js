/*
 * Buffet - A basic jQuery carousel scroller
 
 * Copyright (c) 2011 Kyle Truscott
 *
 * http://keighl.com
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function ($) {

  "use strict";
  
  // ----------------------------------
  
  var methods = {
    
    move : function (dir) {
      
      return $(this).each(function () {
        
        var $this = $(this),
        data      = $(this).data('buffet');  
        
        if (!data) {
          return false;
        }
        
        if (!data.is_moving) {
        
          data.is_moving       = true;
          var current_position = parseInt($(this).position().left, 10);
                  
          // Calculate the next position by direction
          var pos = (dir === "next") ? current_position - data.move_by : current_position + data.move_by;
                    
          /*
          * If the proposed position is beyond our max
          * set the it to the max; this prevents whitespace on the 
          * end of the scroller
          */
                    
          if (pos <= data.scroll_max) {
            
            pos = data.scroll_max;
            
            if ($(data.next).size()) {
              $(data.next).addClass('inactive');
            }
            
            if ($(data.prev).size()) {
              $(data.prev).removeClass('inactive');
            }
            
          } else if (pos >= 0) {
          
          /*
          * If the proposed position is above 0
          * set the it to 0, this prevents whitespace at
          * the beginning of the scroller
          */
                      
            pos = 0;
            
            if ($(data.next).size()) {
              $(data.next).removeClass('inactive');
            }
            
            if ($(data.prev).size()) {
              $(data.prev).addClass('inactive');
            }
            
          } else {
            
            if ($(data.next).size()) {
              $(data.next).removeClass('inactive');
            }
            
            if ($(data.prev).size()) {
              $(data.prev).removeClass('inactive');
            }
            
          }
          
          console.log(pos);
          
          
          /*
          * move it!
          */
          
          $(this).stop().animate({
            left : pos
          }, data.speed, data.easing, function () {
            data.is_moving = false;
          });
          
        }
        
      });  
      
    },
    
    // --------------------------------
    
    next : function () {
      
      return $(this).each(function () {
        
        methods.move.call($(this), "next");
        
      });
      
    },
    
    // --------------------------------
    
    prev : function () {
      
      return $(this).each(function () {
        
        methods.move.call($(this), "prev");
        
      });
      
    },
    
    // --------------------------------
    
    init : function (options) { 
      
      return $(this).each(function () {
        
        var settings = {
          scroll_by         : 3,
          easing            : 'linear',
          speed             : 300,
          next              : null,
          prev              : null,
          wrapper           : $(this).parent(),
          children          : $(this).children(),
          trim              : ($(this).children().size()) 
                              ? parseInt($(this).children().first().css('margin-right'), 10) 
                              : 0
        };
        
        /*
        * What is trim?
        * A bit of right margin that can throw off the math behind this thing.
        * Basically, we want the scroller to end flush with the right side of the last element.
        * Since we calculate the width of the scrollable area from the width/margin of the first child,
        * we'll need to subtract the "trim" regardless of whether or not the user removes the
        * right margin on the last element
        */        
        
        if (options) { 
          $.extend(settings, options);
        }
        
        var $this = $(this), 
        data      = $(this).data('buffet');

        if (!data) {
          
          settings.is_moving     = false;
          settings.index         = 0;
          
          
          /*
          * If there's nothing to scroll, shut it down
          */
          
          if (!$(settings.children).size()) {
            return false;
          }
          
          settings.child_width   = parseInt($(this).children().eq(0).outerWidth(true), 10);
          settings.move_by       = settings.child_width * settings.scroll_by;
          settings.scroll_width  = 0; // override later
          settings.scroll_max    = 0; // override later
          settings.wrapper_width = settings.wrapper.innerWidth();
          
          /*
          * Figure out the total width of the scroller, and set the width to that number.
          * Subtract the trim (explained above) 
          * Also, determine the maximum amount we can scroll before going too far. 
          */          
                  
          settings.scroll_width = settings.child_width * $(settings.children).size() - settings.trim;
          settings.scroll_max   = settings.scroll_width - settings.wrapper_width;
          settings.scroll_max   = (settings.scroll_max <= 0) ? 0 : settings.scroll_max * -1;
              
          /*
          * If scroller isn't full, shut it down. Nothing to scroll
          */
          
          if (settings.scroll_max === 0) {
            return false;
          }
                            
          
          /*
          * Set the scroller's css in case the user didn't
          */
          
          $this.css({
            position : "absolute",
            top      : 0,
            left     : 0
          });
          
          if ($(settings.next).size()) {
            
            $(settings.next).bind('click.buffet', function () {
              methods.move.call($this, "next");
              return false;
            });
            
          }
          
          if ($(settings.prev).size()) {
            
            $(settings.prev).bind('click.buffet', function () {
              methods.move.call($this, "prev");
              return false;
            }).addClass('inactive');
            
          }
          
          $($this).data('buffet', settings);             
          
        }
                
      });
      
    },
    
    // --------------------------------
    
    destroy : function () {
      
      return this.each(function () {
        
        var data = $(this).data('buffet');  
        
        /*
        * Unbind prev / next events
        */
        
        if ($(data.next).size()) {
          $(data.next).unbind('click.buffet');
        }
        
        if ($(data.prev).size()) {
          $(data.prev).unbind('click.buffet');
        }
        
        /*
        * Remove the settings object
        */
        
        $(this).data('buffet', null);  
        
      });
      
    }
    
  };
  
  // ----------------------------------
  
  $.fn.buffet = function (method) {
    
   if (methods[method]) {
      
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    
    } else if (typeof method === 'object' || !method) {
      
      return methods.init.apply(this, arguments);
    
    } else {
      
      $.error('Method ' +  method + ' does not exist on buffet!');
    
    }
    
  };

}(jQuery));

