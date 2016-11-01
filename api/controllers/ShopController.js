/**
 * ShopController
 *
 * @description :: Server-side logic for managing Shops
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {
		var id = req.params[0].split("+");
		Category.find({id: id}).exec(function (err, items) {			
			var id_arr = items[0].items;
			if (items.length > 1){
				for (var i = 1; i < items.length; i++){
					id_arr = intersect(id_arr, items[i].items);
				}
			}

			Items.find({ where: {id: id_arr, available: true}, sort: 'id DESC' }).exec(function (err, items) {
				if (err) { return res.serverError(err); }
				for(var i = 0; i < items.length; i++){
					items[i].item_img = items[i].item_img[0];
				}
				return res.view({
					items: items,
					scripts: [
						'/js/shop.js'
		            ],
		            stylesheets: [
		                '/styles/custom_shop_item.css',		// 主要效果: 圖片 hover
	            		'/styles/custom_shop.css'			// 主要效果: 讓圖片貼齊上方 menu
	            ]
				});
			});
		});
	},

	show_detail: function (req, res) {
		Items.find({id: req.params[0]}).exec(function (err, item) {
			if (err) { return res.serverError(err); }
			item = item[0];
			if (item.available == true) {
				item.item_img = item.item_img;
				return res.view('shop/item_detail', {
					item: item,
					scripts: [
		                '/js/shop.js'
		            ],
		            stylesheets: [
                		'/styles/custom_shop.css'			// 主要效果: 讓圖片貼齊上方 menu
		            ]
				});
			}else{
				return res.send('This item is not available now!');
			}
			
		});
	},

	check_QTY: function (req, res) {
		console.log(req.params);
		Items.find({id: req.params[0]}).exec(function (err, item) {
			if (err) { return res.serverError(err); }
			console.log(item);
			return res.send('Hi there!');

			
		});
	},
};

// 找兩陣列交集
var intersect = function (a, b) {
	var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        if (b.indexOf(e) !== -1) return true;
    });

}