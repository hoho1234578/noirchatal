// $("#item_img_indicators li").on("click", function(){
//    $("#item_img_indicators li").parent().find(".active").removeClass("active");
//    $(this).addClass("active");
// });


var page_num = 0;

$(function() {

  for ( var i = 0; i < 6; i++ ){
    $('.item_list').slice(i, i+1).delay(i*50).fadeIn();
  }

  $(window).scroll(function() {
    // End of the document reached?
    if ($(document).height() - $(window).height() == $(window).scrollTop()) {
      var a = 6+3*page_num;
      var b = a + 3;
      // $('.item_list').slice(a, b).delay(page_num*50).fadeIn();

      for ( var i = 0; i < 3; i++ ){
        $('.item_list').slice(a+i, a+i+1).delay(i*50).fadeIn();
      }
      page_num++;
    }
  });

	$(".hovereffect").addClass("in");

  $(document).on("click","#item_add_to_bag",function(e){
    var amount = $("#item_detail_quantity .form-control").val();
    var productNumber = this.value;
    $.post("/addToCart", { productNumber: productNumber, amount: amount }, function(res){
      if(res.err) {
        // showDialog("錯誤訊息",res.err);
      } else {
        switch(res.type){
          case "create":
            var style = (function() {
              // Create the <style> tag
              var style = document.createElement("style");

              // WebKit hack
              style.appendChild(document.createTextNode(""));

              // Add the <style> element to the page
              document.head.appendChild(style);

              return style;
            })();

            if($(window).width()>978){
              var scaleX = ($('.liCart').width()+90)/(screen.width/4);
              var scaleY = 70/(screen.width/4);
            }else{
              var scaleX = $('.liCart').width()/(screen.width/4);
              var scaleY = $('.liCart').outerHeight()/(screen.width/4);
            }
            var indexToInject = $('.itemGrid').length+2;
            var row = Math.ceil(indexToInject/4);
            var column = indexToInject%4;
            var disX = 100*((column+3)%4);
            var disY = 100*(row-1);

            style.sheet.insertRule('div.deck-container.collapsed .itemGrid:nth-child('+Number(indexToInject)+'){transform: translate('+disX+'%, -'+disY+'%) scale('+scaleX+','+scaleY+');}', 0);
          
            $('.deck-container').append(res.data);
          break;
          case "update":
            $('.cItem'+productNumber).replaceWith(res.data);
          break;
        }
      }
    });
  });

	// 商品數量計數器
	var timeout;
	$("#item_detail_quantity span").first().on({
  	  	mousedown: function(){
  	  		var quantity = parseInt($("#item_detail_quantity input").val());
  	  		if(quantity > 1){
  	  			quantity--;
	  	  		$("#item_detail_quantity input").val(quantity); 
	  	  		timeout = setInterval(function(){
		        	$("#item_detail_quantity input").val(quantity--); 
				}, 300);	
			}
  	  	},
  	  	mouseup: function(){
  	  		clearInterval(timeout);
  	  		$("#item_detail_quantity input").trigger("change");
  	  	}
  	});
  	
  	$("#item_detail_quantity span").last().on({
  	  	mousedown: function(){
  	  		var quantity = parseInt($("#item_detail_quantity input").val());
  	  		quantity++;
  	  		$("#item_detail_quantity input").val(quantity); 
  	  		timeout = setInterval(function(){
	        	$("#item_detail_quantity input").val(quantity++); 
			}, 300);
  	  	},
  	  	mouseup: function(){
  	  		clearInterval(timeout);
  	  		$("#item_detail_quantity input").trigger("change");
  	  	}
  	});

  	// 檢查商品數量是否合理
  	$("#item_detail_quantity input").on("change paste keyup", function(){
  		this.value = this.value.replace(/\D/g, ''); // 只能輸入整數值
  		var QTY = parseInt($("#item_detail_quantity").attr("value"));
  		var quantity = parseInt($("#item_detail_quantity input").val());
  		
  		// 判斷下單樣是否大於庫存量
  		if (quantity > QTY){
  			$("#item_detail_quantity input").val(QTY); 
  		}
  		// 判斷 input 是否為 null，是 null 的話就預設數量為 1
  		if ($("#item_detail_quantity input").val() == ""){
  			$("#item_detail_quantity input").val("1"); 
  		}

  		// $.post(
    //         '/check_QTY',
    //             {quantity: quantity}
    //         ).fail(function(res){
    //             alert("Error: " + res.getResponseHeader("error"));
    //         });
  	});
});