/**
 * CheckoutController
 *
 * @description :: Server-side logic for managing checkouts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) { 
		partials.getCartContent(req, function(cartContent) {
			return res.view({
			    cart: cartContent,
			    scripts: [
	            	'/js/vendor/bootstrap-table.js'
	            ],
	            stylesheets: [
	               	'/styles/bootstrap-table.css',
	               	'/styles/checkout.css',
	               	// '/styles/custom_shop_item.css'		// 主要效果: 圖片 hover
	            ]
			});
		});
	},
};

