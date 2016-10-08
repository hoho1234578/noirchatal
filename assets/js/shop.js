$("#item_img_indicators li").on("click", function(){
   $("#item_img_indicators li").parent().find(".active").removeClass("active");
   $(this).addClass("active");
});

// $(function () {
//   $('[data-toggle="tooltip"]').tooltip({trigger: 'manual'}).tooltip('show');
// });

$("#item_detail_quantity span").first().on("click", function(){
   $("#item_img_indicators li").parent().find(".active").removeClass("active");
   $(this).addClass("active");
});