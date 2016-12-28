/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require('lodash');

module.exports = {
	index: function (req, res) { 
		Items.find({ where: {available: true}, limit: 4, sort: 'id DESC' }).exec(function (err, new_items) {
			if (err) { return res.serverError(err); }
			for (var i = 0; i<new_items.length; i++){
				new_items[i].item_img = new_items[i].item_img[0];
			}

			if(typeof req.session.user == "undefined"){
				return res.view({
			    	new_items: new_items,
			    	scripts: [
	                	'/js/home.js'
	                ],
	                stylesheets: [
	                	// '/styles/custom_home.css',
	                	// '/styles/custom_shop_item.css'		// 主要效果: 圖片 hover
	                ],
	                cart: []
			    });
			}else{
				User.findOne({id: req.session.user.id}).populate('cart')
				.then(function(currentUser){
					var ItemImgs = Items.find({id: _.map(currentUser.cart, 'productNumber')}).then(function(ItemImgs){
						return ItemImgs;
					});
					return [currentUser, ItemImgs];
				})
				.spread(function(currentUser, ItemImgs){
					ItemImgs = _.keyBy(ItemImgs, 'id');

					currentUser.cart = _.map(currentUser.cart, function(cart) {
						cart.item_img = ItemImgs[cart.productNumber].item_img;
						cart.item_name = ItemImgs[cart.productNumber].item_name;
						if(!ItemImgs[cart.productNumber].special_price){
							cart.price = ItemImgs[cart.productNumber].price;
						}else{
							cart.price = ItemImgs[cart.productNumber].special_price;
						}
						return cart;
					});
					// res.json(currentUser);
					return res.view({
				    	new_items: new_items,
				    	scripts: [
		                	'/js/home.js'
		                ],
		                stylesheets: [
		                	// '/styles/custom_home.css',
		                	// '/styles/custom_shop_item.css'		// 主要效果: 圖片 hover
		                ],
		                cart: currentUser.cart
				    });
				})
				.catch(function(err){
					return res.serverError(err);
				});


				// User.find({id: req.session.user.id}).populate('cart').exec(function(err2, currentUser){
				// 	if (err2) { return res.serverError(err2); }

				// 	console.log(currentUser[0]);
				
				//     return res.view({
				//     	new_items: new_items,
				//     	scripts: [
		  //               	'/js/home.js'
		  //               ],
		  //               stylesheets: [
		  //               	// '/styles/custom_home.css',
		  //               	// '/styles/custom_shop_item.css'		// 主要效果: 圖片 hover
		  //               ],
		  //               cart: currentUser[0].cart
				//     });
				// });



			}
		});
	},
};

