/**
 * Created by Sallar Kaboli <sallar.kaboli@gmail.com>
 * @sallar
 * 
 * Released under the MIT License.
 * http://sallar.mit-license.org/
 * 
 * This document demonstrates three things:
 * 
 * - Creating a simple parallax effect on the content
 * - Creating a Medium.com-style blur on scroll image
 * - Getting scroll position using requestAnimationFrame for better performance
 */


/**
 * Cache
 */
var $blur    = $('.bg_overlay')
  , wHeight  = $(window).height();

var isScrolling = false;
direction = "";

$(window).on('resize', function(){
  wHeight = $(window).height();
});

/**
 * requestAnimationFrame Shim 
 */
window.requestAnimFrame = (function()
{
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

/**
 * Scroller
 */
function Scroller()
{
  this.latestKnownScrollY = 0;
}

Scroller.prototype = {
  /**
   * Initialize
   */
  init: function() {
    window.addEventListener('scroll', this.onScroll.bind(this), false);
  },

  /**
   * Capture Scroll
   */
  onScroll: function() {
    var lastScrollTop = 0;
    
    var testString = "test";
    $(window).scroll(function(event){
      var st = $(this).scrollTop();
      var direction = ""; 
       if (st > lastScrollTop && !isScrolling){
           // downscroll code
            direction="down";
            console.log("first direction: " + direction);
            isScrolling = true;
            autoscroll(direction)
            //$('#a h2').html(isScrolling);
       } else if (!isScrolling) {
          // upscroll code
         
         direction="up";
         autoscroll(direction)
            //isScrolling = true;
       }
       lastScrollTop = st;
       this.testString = direction;
    });
    
    this.latestKnownScrollY = window.scrollY;
     window.requestAnimFrame(this.update.bind(this));
  },

  /**
   * Update.
   */
  update: function() {
    //autoscroll("down");
    var currentScrollY = this.latestKnownScrollY;
    /**
     * Do The Dirty Work Here
     */
    var blurScroll = currentScrollY * 2;
    
    $blur.css({
      'opacity' : blurScroll / wHeight
    });
  }
};

 function autoscroll(direction){
   console.log("autoscroll: " +direction + " isScrolling: " + isScrolling);
   if (this.direction == "down") {
    $('html, body').animate({
      scrollTop: $("#c").offset().top
    }, 2000);
  } else if (this.direction == "up") {
    $('html, body').animate({
      scrollTop: $("#a").offset().top
    }, 2000);
  }
   isScrolling = false;
}



/**
 * Attach!
 */
var scroller = new Scroller();  
scroller.init();