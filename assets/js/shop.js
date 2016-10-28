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