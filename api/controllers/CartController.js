/**
 * CartController
 *
 * @description :: Server-side logic for managing carts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');
var fs = require('fs');
var ejs = require('ejs');

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
						result = _.update(req.cookies, 'cartItems['+indexOfItem+'].amount', function(n) { return n + amount; }).cartItems;
						res.cookie('cartItems', result);
						res.ok({type: "update", data: result[indexOfItem].amount});
					}else{ // no item
						fs.readFile('./views/partials/cartItem.ejs', 'utf8', function (err,data) {
							if (err) {
						    	return console.log(err);
						  	}
						  	res.cookie('cartItems', _.concat(req.cookies.cartItems, item));
							res.ok({type: 'create', data: ejs.render(data, {eachItem: item})});
						});
					}
				}else{ // empty cart
					fs.readFile('./views/partials/cartItem.ejs', 'utf8', function (err,data) {
						if (err) {
							return console.log(err);
						}
						res.cookie('cartItems', [item]);
						res.ok({type: 'create', data: ejs.render(data, {eachItem: item})});
					});
				}
				// return res.ok();
			});
		}else{
			Cart.findOne({ customer: req.session.user.id, productNumber: productNumber }).exec(function(err, cart){
				if (err) { return res.serverError(err); }

				if(cart){
					Cart.update({ id: cart.id }, { amount: cart.amount+amount }).exec(function(err2, newCart){
	                    if(err2){ res.send(500,{err:"DB error"}) }
	                    else{ res.ok({type: 'update', data: cart.amount+amount}); }
	                });
				}else{
					Cart.create({ productNumber: productNumber,  amount: amount,  customer: req.session.user }).populate('productNumber').exec(function(err2, newCart){
						if(err2){ res.send(500,{err:"DB error"}) }
	                    else{
	                    	Items.findOne({ id: productNumber }).exec(function(err3, item){
	                    		if(err3){ res.send(500,{err:"DB error"}) }
	                    		else{
			                    	fs.readFile('./views/partials/cartItem.ejs', 'utf8', function (err4,data) {
										if (err4) {
									    	return console.log(err);
									  	}
			                    		res.ok({type: 'create', data: ejs.render(data, {eachItem: item})});
									});
			                    }
							});
	                    }
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

