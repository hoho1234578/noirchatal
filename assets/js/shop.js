// $("#item_img_indicators li").on("click", function(){
//    $("#item_img_indicators li").parent().find(".active").removeClass("active");
//    $(this).addClass("active");
// });

$(function() {

	// 商品數量計數器
	var timeout;
	$("#item_detail_quantity span").first().on({
  	  	mousedown: function(){
  	  		var quantity = parseInt($("#item_detail_quantity input").val());
  	  		if(quantity > 1){
  	  			var quantity = parseInt($("#item_detail_quantity input").val());
  	  			quantity--;
	  	  		$("#item_detail_quantity input").val(quantity); 
	  	  		timeout = setInterval(function(){
		        	$("#item_detail_quantity input").val(quantity--); 
				}, 300);
			}
  	  	},
  	  	mouseup: function(){
  	  		clearInterval(timeout);
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
  	  	}
  	});
});