/**
 * CartController
 *
 * @description :: Server-side logic for managing carts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');

module.exports = {
	addToCart: function (req, res) {
		// console.log(req.body);	// get POST parameters
		// console.log(req.params);	// get GET parameters
		var productNumber = req.param("productNumber");
		var amount = parseInt(req.param("amount"));

		if(typeof req.session.user === "undefined"){
			Items.findOne({ id: productNumber })
			.then(function(item){
				var price;
				if(!item.special_price){
					price = item.price;
				}else{
					price = item.special_price;
				}

				var castratedItem = {
					'item_name': item.item_name,
					'price': price,
					'item_img': item.item_img,
					'productNumber': item.id,
					'amount': amount
				}

				return [castratedItem];
			})
			.spread(function(item){
				if(typeof req.cookies.cartItems != "undefined" ){
					var indexOfItem = _.findIndex(req.cookies.cartItems, function(o) { return o.productNumber == productNumber; });
					if(indexOfItem > -1){ // update item
						res.cookie('cartItems', _.update(req.cookies, 'cartItems['+indexOfItem+'].amount', function(n) { return n + amount; }).cartItems);
					}else{ // no item
						res.cookie('cartItems', _.concat(req.cookies.cartItems, item));
					}
				}else{ // empty cart
					res.cookie('cartItems', [item]);
				}
				return res.ok();
			});
		}else{
			Cart.findOne({ customer: req.session.user.id, productNumber: productNumber }).exec(function(err, cart){
				if (err) { return res.serverError(err); }

				if(cart){
					Cart.update({ id: cart.id }, { amount: cart.amount+amount }).exec(function(err2, newCart){
	                    if(err2){ res.send(500,{err:"DB error"}) }
	                    else{ res.send(newCart); }
	                });
				}else{
					Cart.create({ productNumber: productNumber,  amount: amount,  customer: req.session.user }).exec(function(err2, newCart){
						if(err2){ res.send(500,{err:"DB error"}) }
	                    else{ res.send(newCart); }
					});
				}
			});
		}
	},
	throwFromCart: function (req, res) {
		// console.log(req.body);	// get POST parameters
		// console.log(req.params);	// get GET parameters
		var productNumber = req.param("productNumber");
		var amount = parseInt(req.param("amount"));

		if(typeof req.session.user === "undefined"){
			// console.log("請先登入或註冊會員！");
			// res.send("請先登入或註冊會員！");
			var result = _.remove(req.cookies.cartItems, function(o){
				return o.productNumber != productNumber;
			});
			res.cookie('cartItems', result);
		}else{
			Cart.destroy({ customer: req.session.user.id, productNumber: productNumber }).exec(function (err) {
                if (err) { return res.serverError(err); }
            });
		}
		return res.ok();
	},
};

