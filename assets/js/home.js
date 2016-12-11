$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1500);
        return false;
      }
    }
  });
});







// 以下控制 cart modal
$(document).ready(function(){
  var style = (function() {
      // Create the <style> tag
      var style = document.createElement("style");

      // WebKit hack
      style.appendChild(document.createTextNode(""));

      // Add the <style> element to the page
      document.head.appendChild(style);

      return style;
  })();

  // $(window).resize(function() {
  //   wdth=$(window).width();
  // });

  var maxIndex = $('div.deck-container .itemGrid').length+2;
  var scaleX = $('.liCart').width()/$('.itemGrid').width();
  var scaleY = $('.liCart').outerHeight()/$('.itemGrid').height();
  for (index = 1; index < maxIndex; index++) { 
    var row = Math.ceil(index/4);
    var column = index%4;
    var disX = 100*((4-column)%4);
    var disY = 100*(row-1);
    var indexZ = maxIndex-(4*(row)-index+1+4*(row-1));

      var rand = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);

      if(index<4){
        style.sheet.insertRule('.d'+Number(index)+'{background-color:'+rand+'; z-index:'+indexZ+'}', 0);
        style.sheet.insertRule('div.deck-container.collapsed .itemGrid:nth-child('+Number(index+1)+'){transform:'+'translate('+disX+'%, -'+disY+'%) scale('+scaleX+','+scaleY+')}', 0);
      } else if(index>4){
        style.sheet.insertRule('.d'+Number(index)+'{background-color:'+rand+'; z-index:'+indexZ+'}', 0);
        style.sheet.insertRule('div.deck-container.collapsed .itemGrid:nth-child('+Number(index)+'){transform:'+'translate('+disX+'%, -'+disY+'%) scale('+scaleX+','+scaleY+')}', 0);
      } else{
        style.sheet.insertRule('.modalToggle{background-color:rgba(244, 244, 242,1); z-index:'+indexZ+'}', 0);
        style.sheet.insertRule('div.deck-container.collapsed .modalToggle{transform:'+'translate('+disX+'%, -'+disY+'%) scale('+scaleX+','+scaleY+')}', 0);
      }
  }

  $(function() {
      $('.liCart, .itemGrid:nth-child(4)').click(
        function () {
            $('div.deck-container').toggleClass('collapsed');
        }
      );

      $('.modalToggle').click(
        function () {
            $('div.deck-container').toggleClass('collapsed');
        }
      );
  });
});