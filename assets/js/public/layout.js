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
  if($(window).width()>978){
    var scaleX = ($('.liCart').width()+90)/$('.modalToggle').outerWidth();
    var scaleY = 70/$('.modalToggle').outerHeight();
  }else{
    var scaleX = $('.liCart').width()/$('.modalToggle').outerWidth();
    var scaleY = $('.liCart').outerHeight()/$('.modalToggle').outerHeight();
  }

  for (index = 1; index < maxIndex; index++) { 
    var row = Math.ceil(index/4);
    var column = index%4;
    var disX = 100*((column+3)%4);
    var disY = 100*(row-1);
    var indexZ = maxIndex-index;

    // var rand = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);

    if(index==1){
      style.sheet.insertRule('.modalToggle{z-index:'+indexZ+';}', 0);
      // style.sheet.insertRule('div.deck-container.collapsed .modalToggle{background-color: black', 1);
      style.sheet.insertRule('div.deck-container.collapsed .modalToggle{transform: translate(0%, 0%) scale('+scaleX+','+scaleY+');}', 1);
    } else{
      // style.sheet.insertRule('.d'+Number(index)+'{z-index:'+indexZ+';}', 0);
      style.sheet.insertRule($( ".itemGrid" ).eq(index-2).attr("class")+'{z-index:'+indexZ+';}', 0);
      // style.sheet.insertRule('.d'+Number(index)+'{background-color:'+rand+'; z-index:'+indexZ+'}', 0);
      style.sheet.insertRule('div.deck-container.collapsed .itemGrid:nth-child('+Number(index)+'){transform: translate('+disX+'%, -'+disY+'%) scale('+scaleX+','+scaleY+');}', 0);
    }
  }



  $(function() {
    $('.liCart').click(
      function () {
        $('div.deck-container').toggleClass('collapsed');
      }
    );

    $('.modalToggle').click(
      function () {
        $('div.deck-container').toggleClass('collapsed');
      }
    );

    $('.deck-container').click(
      function (event) {
        if(event.target.className == "deck-container"){
          $('div.deck-container').toggleClass('collapsed');
        }
      }
    );
  });


  $(document).on("click",".closeToggle",function(e){
    // e.preventDefault();

    $(this).parent().parent().parent().parent().remove();

    $.ajax({
      method: "POST",
      url: "/throwFromCart",
      // processData: false,
      // contentType: 'html',
      data: { productNumber: $(this).attr('value'), amount: 5 }
    })
    .done(function(data,status,xhr){
      xhr.getResponseHeader("myHeader");
      console.log("done");
      $(this).parent().parent().parent().parent().remove();
    })
    .fail(function(){
      console.log("fail");
    });

  });


  $(document).on("click","#checkoutModalToggle",function(e){
    $('.checkoutModal').toggleClass('collapsed');
  });

  $(document).on("click","#checkoutModalLogin",function(e){
    $.ajax({
      method: "POST",
      url: "/login",
      data: { email: $("input[name='email']").val(), password: $("input[name='password']").val() }
    })
    .done(function(data,status,xhr){
      xhr.getResponseHeader("myHeader");
      console.log(data);
    })
    .fail(function(){
      console.log("fail");
    });
  });




});