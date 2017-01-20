/**
 * CheckoutController
 *
 * @description :: Server-side logic for managing checkouts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require('lodash');

module.exports = {
	index: function (req, res) { 
		
		
		if(typeof req.session.user == "undefined"){
    		if(typeof req.cookies.cartItems == "undefined"){
    			sails.hooks.http.app.render('partials/navbar', {cart: []}, cb);
    		}else{
    			sails.hooks.http.app.render('partials/navbar', {cart: req.cookies.cartItems}, cb);
    		}
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
				sails.hooks.http.app.render('partials/navbar', {cart: currentUser.cart}, cb);
			})
			.catch(function(err){
				return res.serverError(err);
			});
		}



		
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
			return res.view({
			    cart: currentUser.cart,
			    scripts: [
	            	'/js/vendor/bootstrap-table.js'
	            ],
	            stylesheets: [
	               	'/styles/bootstrap-table.css',
	               	// '/styles/custom_shop_item.css'		// 主要效果: 圖片 hover
	            ]
			});
		})
		.catch(function(err){
			return res.serverError(err);
		});



	},
};

