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
			// console.log("請先登入或註冊會員！");
			// res.send("請先登入或註冊會員！");
			// res.cookie('ccart', { items: [1,2,3] });

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
				}

				return [castratedItem];
			})
			.spread(function(item){
				console.log(req.cookies);
				console.log(item);
				if(typeof req.cookies.cartItems != "undefined" ){
					var indexOfItem = _.findIndex(item, function(o) { return o.productNumber == productNumber; });
					if(indexOfItem > -1){
						res.cookie('cartItems', _.update(req.cookies, 'cartItems['+indexOfItem+'].productNumber', function(n) { return n + amount; }));
					}else{
						var ttt = _.concat(req.cookies.cartItems, item);
						res.cookie('cartItems', ttt);
					}
				}else{
					console.log("no content");
					// res.cookie('cartItems', [item]);
					// res.cookie('cart', { items: [1,2,314] });
				}
				res.cookie('cart', { items: [1,2,34545] });
				console.log(req.cookies);
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
			console.log("請先登入或註冊會員！");
			res.send("請先登入或註冊會員！");
		}else{
			Cart.destroy({ customer: req.session.user.id, productNumber: productNumber }).exec(function (err) {
                if (err) { return res.serverError(err); }
                return res.ok();
            });
		}
	},
};

