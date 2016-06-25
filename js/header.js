update_header = function(e) {
  var distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 130,
      header = document.querySelector("header");
    var avatar = document.getElementsByTagName("avatar");
    if (distanceY > shrinkOn) {
      classie.add(header,"small");
    } else {
      if (classie.has(header,"small")) {
        classie.remove(header,"small");
      }
    }
}
function init() {
  update_header();
  window.addEventListener('scroll', update_header);
  /*
  $(window).scroll(function(){
    if($(document).scrollTop() > 0)
  {
      if($('header').data('size') == 'big')
      {
          $('header').data('size','small');
          $('header').stop().animate({
              height: '90px'
          },600);
      }
  }
  else
    {
      if($('header').data('size') == 'small')
        {
          $('header').data('size','big');
          $('header').stop().animate({
              height:'220px'
          },600);
        }  
    }
  });*/
}
window.onload = init();